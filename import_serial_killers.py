#!/usr/bin/env python3
"""
Serial Killer CSV Importer for mcufos.com
Parses CSV files and imports them into Supabase serial_killers table.

Usage:
  pip install supabase python-dotenv
  python import_serial_killers.py --dir /path/to/csv/folder --dry-run
  python import_serial_killers.py --dir /path/to/csv/folder
"""

import os
import re
import csv
import json
import argparse
from pathlib import Path
from datetime import datetime

# --- Install check ---
try:
    from supabase import create_client
    from dotenv import load_dotenv
except ImportError:
    print("Missing dependencies. Run: pip install supabase python-dotenv")
    exit(1)

load_dotenv(".env.local")

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")


def slugify(text: str) -> str:
    """Convert a name to a URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text


def parse_year(value: str) -> int | None:
    """Extract a 4-digit year from a string."""
    if not value:
        return None
    match = re.search(r"\b(1[89]\d{2}|20\d{2})\b", str(value))
    return int(match.group(1)) if match else None


def parse_int(value: str) -> int | None:
    """Extract first integer from a string."""
    if not value:
        return None
    match = re.search(r"\d+", str(value).replace(",", ""))
    return int(match.group()) if match else None


def extract_field(rows: list, *keys: str) -> str:
    """
    Search for a field value in the structured section at the bottom of the CSV.
    Tries multiple key variations to handle inconsistencies across files.
    """
    keys_lower = [k.lower().strip() for k in keys]
    for row in rows:
        if not row:
            continue
        # Flatten all cells in the row
        cells = [str(c).strip() for c in row if str(c).strip()]
        if not cells:
            continue
        first = cells[0].lower()
        if any(k in first for k in keys_lower):
            # Value is in the next non-empty cell
            for cell in cells[1:]:
                if cell and cell.lower() not in keys_lower:
                    return cell.strip()
    return ""


def build_timeline(rows: list) -> str:
    """
    Reconstruct the timeline narrative from the Date/Age/Life Event rows.
    Returns a single readable text block.
    """
    timeline_lines = []
    in_timeline = False

    for row in rows:
        if not row or all(str(c).strip() == "" for c in row):
            continue

        cells = [str(c).strip() for c in row]

        # Detect header row
        if cells[0].lower() == "date" or (len(cells) > 1 and cells[1].lower() == "age"):
            in_timeline = True
            continue

        # Stop at general information section
        if any("general information" in str(c).lower() for c in cells):
            break
        if any("childhood information" in str(c).lower() for c in cells):
            break

        if not in_timeline:
            continue

        date_val = cells[0] if len(cells) > 0 else ""
        life_event = cells[2] if len(cells) > 2 else (cells[1] if len(cells) > 1 else "")

        if life_event:
            if date_val:
                timeline_lines.append(f"[{date_val}] {life_event}")
            else:
                # Continuation of previous entry
                if timeline_lines:
                    timeline_lines[-1] += " " + life_event
                else:
                    timeline_lines.append(life_event)

    return "\n\n".join(timeline_lines)


def parse_csv_file(filepath: Path) -> dict | None:
    """Parse a single serial killer CSV file into a database record."""
    rows = []
    try:
        with open(filepath, encoding="utf-8-sig", errors="replace") as f:
            reader = csv.reader(f)
            rows = list(reader)
    except Exception as e:
        print(f"  ⚠️  Could not read {filepath.name}: {e}")
        return None

    if not rows:
        return None

    # --- Extract full name and aliases (rows before timeline header) ---
    full_name = ""
    alias_list = []
    SECTION_HEADERS = {"age", "life event", "general information", "childhood information",
                       "serial killing", "killer criminal history", "work history", "relationships"}
    for i, row in enumerate(rows[:12]):
        cell = str(row[0]).strip().strip('"') if row else ""
        if not cell:
            continue
        # Stop at timeline header
        if cell.lower() == "date":
            break
        # Skip known section headers
        if cell.lower() in SECTION_HEADERS:
            continue
        # Skip pure numbers, dates, or mostly-digit strings
        digit_ratio = sum(c.isdigit() for c in cell) / max(len(cell), 1)
        if digit_ratio > 0.35:
            continue
        # Skip if it looks like a date pattern
        if re.match(r"^[\d/,\s\-]+$", cell):
            continue
        # Skip metadata/research notes and junk patterns
        lower_cell = cell.lower()
        if any(kw in lower_cell for kw in [
            "researched", "department", "summarized", "information",
            "university", "college", "childhood", "date age",
            "after college", "radford", "thompson", "hagy"
        ]):
            continue
        # Skip if it looks like a US state or single geographic word (no spaces, title case, short)
        if re.match(r"^[A-Z][a-z]+$", cell) and len(cell) < 15:
            continue
        # Skip researcher credit patterns (contains "and" between names)
        if " and " in lower_cell and len(cell.split()) >= 3:
            continue
        if not full_name:
            full_name = cell
        elif sum(c.isalpha() for c in cell) >= 2:
            alias_list.append(cell)

    if not full_name:
        print(f"  ⚠️  Could not extract name from {filepath.name}")
        return None

    # --- Extract structured fields ---
    victims_raw = extract_field(rows, "number of victims", "victims")
    confirmed_victims = parse_int(victims_raw)

    # Possible victims — look for "confessed to" or "possible"
    possible_victims = None
    if victims_raw:
        confessed = re.search(r"confessed to (\d+)", victims_raw, re.IGNORECASE)
        possible = re.search(r"possible[:\s]+(\d+)", victims_raw, re.IGNORECASE)
        if confessed:
            possible_victims = int(confessed.group(1))
        elif possible:
            possible_victims = int(possible.group(1))

    birth_date_raw = extract_field(rows, "date of birth", "born", "birth date")
    death_date_raw = extract_field(rows, "date of death", "died", "death date", "executed")

    # Parse dates loosely — just extract year for reliability
    birth_year = parse_year(birth_date_raw)
    death_year = parse_year(death_date_raw)

    # Try to build ISO date strings if we have enough info
    def try_parse_date(raw: str) -> str | None:
        if not raw:
            return None
        # Try common formats
        for fmt in ("%m/%d/%Y", "%m-%d-%Y", "%B %d, %Y", "%B, %d, %Y"):
            try:
                return datetime.strptime(raw.strip(), fmt).strftime("%Y-%m-%d")
            except ValueError:
                continue
        # Fall back to year only
        year = parse_year(raw)
        return f"{year}-01-01" if year else None

    birth_date = try_parse_date(birth_date_raw)
    death_date = try_parse_date(death_date_raw)

    country = extract_field(rows, "country where killing", "country", "birth country", "nationality")
    states = extract_field(rows, "states where killing", "state")
    method = extract_field(rows, "method of killing", "weapon", "method")
    killer_type = extract_field(rows, "type of serial killer", "type of killer")
    status_raw = extract_field(rows, "killer executed", "executed", "sentence", "date of death")

    # Determine status
    status = "unknown"
    if death_date or death_year:
        status = "deceased"
    executed_field = extract_field(rows, "killer executed").lower()
    if "yes" in executed_field:
        status = "executed"
    elif "no" in executed_field and (death_date or death_year):
        status = "deceased"

    # Active years — find years from timeline entries that mention murder/crime keywords
    murder_years = []
    crime_keywords = ["murder", "abduct", "kill", "victim", "strangl", "shoot", "stab", "rape", "missing", "body", "arrest", "convict"]
    in_timeline = False
    for row in rows:
        cells = [str(c).strip() for c in row]
        if cells and cells[0].lower() == "date":
            in_timeline = True
            continue
        if any("general information" in str(c).lower() for c in cells):
            break
        if in_timeline and cells:
            life_event = cells[2] if len(cells) > 2 else ""
            if any(kw in life_event.lower() for kw in crime_keywords):
                year = parse_year(cells[0])
                if year and 1800 < year < 2030:
                    murder_years.append(year)

    active_from = min(murder_years) if murder_years else birth_year
    active_to = max(murder_years) if murder_years else death_year

    # Build modus operandi from method + type
    modus_parts = [p for p in [method, killer_type] if p]
    modus_operandi = "; ".join(modus_parts) if modus_parts else None

    # Build short bio
    location = extract_field(rows, "location", "birth location", "states where killing")
    short_bio = f"{full_name} was a serial killer"
    if country:
        short_bio += f" from {country}"
    if confirmed_victims:
        short_bio += f" convicted of {confirmed_victims} murder{'s' if confirmed_victims != 1 else ''}"
    if active_from and active_to and active_from != active_to:
        short_bio += f", active from {active_from} to {active_to}"
    elif active_from:
        short_bio += f", active around {active_from}"
    short_bio += "."

    # Build full profile from timeline
    full_profile = build_timeline(rows)

    return {
        "slug": slugify(full_name),
        "full_name": full_name,
        "aliases": alias_list if alias_list else None,
        "birth_date": birth_date,
        "death_date": death_date,
        "birth_country": country or None,
        "nationality": country or None,
        "status": status,
        "confirmed_victims": confirmed_victims,
        "possible_victims": possible_victims,
        "active_from": active_from,
        "active_to": active_to,
        "modus_operandi": modus_operandi,
        "short_bio": short_bio,
        "full_profile": full_profile if full_profile else None,
        "published": False,  # Review before publishing!
        "content_warning": True,  # Default to true for serial killers
    }


def main():
    parser = argparse.ArgumentParser(description="Import serial killer CSVs to Supabase")
    parser.add_argument("--dir", required=True, help="Directory containing CSV files")
    parser.add_argument("--dry-run", action="store_true", help="Parse only, don't insert to DB")
    parser.add_argument("--output", help="Save parsed records to a JSON file for review")
    args = parser.parse_args()

    csv_dir = Path(args.dir)
    if not csv_dir.exists():
        print(f"Directory not found: {csv_dir}")
        exit(1)

    csv_files = list(csv_dir.glob("*.csv"))
    if not csv_files:
        print(f"No CSV files found in {csv_dir}")
        exit(1)

    print(f"\n📂 Found {len(csv_files)} CSV files in {csv_dir}\n")

    records = []
    failed = []

    for filepath in sorted(csv_files):
        print(f"  Parsing {filepath.name}...", end=" ")
        record = parse_csv_file(filepath)
        if record:
            records.append(record)
            print(f"✅ {record['full_name']}")
        else:
            failed.append(filepath.name)
            print("❌ Failed")

    print(f"\n✅ Parsed: {len(records)}  ❌ Failed: {len(failed)}")

    if failed:
        print("\nFailed files:")
        for f in failed:
            print(f"  - {f}")

    # Optionally save to JSON for review
    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(records, f, indent=2, default=str)
        print(f"\n💾 Saved {len(records)} records to {args.output}")

    if args.dry_run:
        print("\n🔍 Dry run complete — no data inserted.")
        print("Review the output above (or --output file) then run without --dry-run to import.")
        return

    # --- Insert to Supabase ---
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("\n❌ Missing SUPABASE env vars. Make sure .env.local exists with:")
        print("   NEXT_PUBLIC_SUPABASE_URL=...")
        print("   SUPABASE_SERVICE_ROLE_KEY=...")
        exit(1)

    print(f"\n🚀 Connecting to Supabase...")
    client = create_client(SUPABASE_URL, SUPABASE_KEY)

    inserted = 0
    skipped = 0
    errors = []

    for record in records:
        try:
            # Upsert on slug — safe to re-run without duplicating
            result = client.table("serial_killers").upsert(
                record, on_conflict="slug"
            ).execute()
            inserted += 1
            print(f"  ✅ Inserted: {record['full_name']}")
        except Exception as e:
            skipped += 1
            errors.append({"name": record["full_name"], "error": str(e)})
            print(f"  ❌ Error inserting {record['full_name']}: {e}")

    print(f"\n🎉 Done! Inserted: {inserted}  Errors: {skipped}")
    if errors:
        print("\nErrors:")
        for e in errors:
            print(f"  - {e['name']}: {e['error']}")

    print("\n⚠️  All records imported with published=False.")
    print("Review them in Supabase Table Editor, then set published=True when ready.")


if __name__ == "__main__":
    main()
# patch applied
