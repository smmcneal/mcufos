/**
 * mcufos.com — Serial Killers Mass Import
 * Replaces existing serial_killers table with CSV data
 *
 * Usage:
 *   npx tsx scripts/import-sk.ts
 *
 * Requires .env.local with SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BOILERPLATE = 'Thank you very much in advance.'
const BATCH_SIZE = 100

// ── Helpers ────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function cleanDescription(raw: string): string {
  const idx = raw.indexOf(BOILERPLATE)
  if (idx >= 0) {
    return raw.slice(idx + BOILERPLATE.length).trim()
  }
  return raw.trim()
}

function shortBio(description: string, maxLen = 280): string {
  if (description.length <= maxLen) return description
  const cut = description.lastIndexOf(' ', maxLen)
  return description.slice(0, cut > 0 ? cut : maxLen) + '...'
}

// ── Parse CSV manually (handles quoted fields with commas/newlines) ──

function parseCSV(filePath: string): Record<string, string>[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split(/\r?\n/)
  const headers = parseCSVLine(lines[0])
  const rows: Record<string, string>[] = []

  let i = 1
  while (i < lines.length) {
    if (!lines[i].trim()) { i++; continue }
    
    // Collect full row (may span multiple lines due to quoted fields)
    let rowText = lines[i]
    while (!isCompleteCSVRow(rowText) && i + 1 < lines.length) {
      i++
      rowText += '\n' + lines[i]
    }
    
    const values = parseCSVLine(rowText)
    if (values.length >= headers.length) {
      const row: Record<string, string> = {}
      headers.forEach((h, idx) => { row[h] = values[idx] ?? '' })
      rows.push(row)
    }
    i++
  }
  return rows
}

function isCompleteCSVRow(line: string): boolean {
  let inQuote = false
  for (const ch of line) {
    if (ch === '"') inQuote = !inQuote
  }
  return !inQuote
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuote = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuote = !inQuote
      }
    } else if (ch === ',' && !inQuote) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

// ── Main ────────────────────────────────────────────────────

async function main() {
  console.log('🔪 mcufos.com — Serial Killers Import')
  console.log(`   Supabase: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
  
  // Find the CSV
  const csvPath = path.resolve('scripts/mcufos-sk.csv')
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV not found at ${csvPath}`)
    console.error('   Copy your CSV to scripts/mcufos-sk.csv and try again')
    process.exit(1)
  }

  console.log('\n📂 Parsing CSV...')
  const raw = parseCSV(csvPath)
  console.log(`   Found ${raw.length} rows`)

  // Build records
  const seen = new Set<string>()
  const records = []
  let skipped = 0

  for (const row of raw) {
    const name = row['name']?.trim()
    if (!name || name.length < 2) { skipped++; continue }

    // Generate unique slug
    let slug = slugify(name)
    let attempt = 0
    while (seen.has(slug)) {
      attempt++
      slug = `${slugify(name)}-${attempt}`
    }
    seen.add(slug)

    const rawDesc = row['description'] ?? ''
    const cleaned = cleanDescription(rawDesc)
    
    // Skip entries with no real content after boilerplate stripping
    if (cleaned.length < 20) { skipped++; continue }

    const victims = row['number_of_victims']?.trim()
    const country = row['country']?.trim()
    const state = row['state']?.trim()
    const born = row['born']?.trim()
    const died = row['died']?.trim()
    const dateSpan = row['date_span']?.trim()
    const statusRaw = row['status']?.trim()

    // Map status to our enum
    let status: string | null = null
    if (statusRaw) {
      const sl = statusRaw.toLowerCase()
      if (sl.includes('execut')) status = 'executed'
      else if (sl.includes('imprison') || sl.includes('prison') || sl.includes('sentenced')) status = 'imprisoned'
      else if (sl.includes('deceas') || sl.includes('died') || sl.includes('dead') || sl.includes('suicide')) status = 'deceased'
      else if (sl.includes('large') || sl.includes('fugitive')) status = 'at_large'
    }

    // Parse active years from date_span
    let activeFrom: number | null = null
    let activeTo: number | null = null
    if (dateSpan) {
      const years = dateSpan.match(/\d{4}/g)
      if (years && years.length >= 1) {
        activeFrom = parseInt(years[0])
        if (years.length >= 2) activeTo = parseInt(years[years.length - 1])
      }
    }

    // Parse victims
    let confirmedVictims: number | null = null
    if (victims) {
      const num = parseInt(victims.replace(/[^0-9]/g, ''))
      if (!isNaN(num)) confirmedVictims = num
    }

    // Location: prefer state, then country
    const location = state || country || null

    records.push({
      slug,
      full_name: name,
      short_bio: shortBio(cleaned),
      full_profile: cleaned,
      birth_country: country || null,
      birth_date: born && born.length > 6 ? born : null,
death_date: died && died.length > 6 ? died : null,
      confirmed_victims: confirmedVictims,
      active_from: activeFrom,
      active_to: activeTo,
      status: status,
      modus_operandi: row['modus_operandi']?.trim() || null,
      content_warning: true, // all SK entries get CW by default
      published: true,
    })
  }

  console.log(`   ✅ Built ${records.length} records (skipped ${skipped})`)

  // Confirm before wiping
  console.log('\n⚠️  This will DELETE all existing serial killer entries and replace them.')
  console.log('   Press Ctrl+C within 5 seconds to cancel...')
  await new Promise(r => setTimeout(r, 5000))

  // Delete existing
  // console.log('\n🗑️  Deleting existing entries...')
  // const { error: delError } = await supabase
  //   .from('serial_killers')
  //   .delete()
  //   .neq('id', '00000000-0000-0000-0000-000000000000') // delete all

  // if (delError) {
  //   console.error('❌ Delete failed:', delError.message)
  //   process.exit(1)
  // }
  // console.log('   ✅ Existing entries cleared')

  // Insert in batches
  console.log(`\n⬆️  Inserting ${records.length} records in batches of ${BATCH_SIZE}...`)
  let inserted = 0
  let failed = 0

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE)
    const { error } = await supabase.from('serial_killers').upsert(batch, { onConflict: 'slug' })
    
    if (error) {
      console.error(`   ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message)
      failed += batch.length
    } else {
      inserted += batch.length
      if (inserted % 500 === 0 || inserted === records.length) {
        console.log(`   📥 ${inserted}/${records.length} inserted...`)
      }
    }
  }

  console.log(`\n🎉 Import complete!`)
  console.log(`   ✅ Inserted: ${inserted}`)
  if (failed > 0) console.log(`   ❌ Failed:   ${failed}`)
  console.log(`\n   Run this to verify:`)
  console.log(`   SELECT COUNT(*) FROM serial_killers WHERE published = true;`)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
