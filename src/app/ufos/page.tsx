'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import EntryCard from '@/components/EntryCard'

type UfoCase = {
  id: string
  slug: string
  title: string
  short_bio: string | null
  incident_year: number | null
  location: string | null
  country: string | null
  classification: string | null
  witnesses: number | null
  content_warning: boolean
}

const CLASSIFICATIONS = ['confirmed', 'unconfirmed', 'debunked', 'unexplained', 'unknown']
const PER_PAGE = 24

export default function UfosPage() {
  const [entries, setEntries] = useState<UfoCase[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [classification, setClassification] = useState('')
  const [sort, setSort] = useState('title')
  const [page, setPage] = useState(0)

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('ufo_cases')
      .select('id,slug,title,short_bio,incident_year,location,country,classification,witnesses,content_warning', { count: 'exact' })
      .eq('published', true)

    if (search.trim()) {
      query = query.textSearch('fts', search.trim())
    }
    if (classification) {
      query = query.eq('classification', classification)
    }

    query = query.order(sort).range(page * PER_PAGE, (page + 1) * PER_PAGE - 1)

    const { data, count, error } = await query
    if (!error) {
      setEntries(data ?? [])
      setTotal(count ?? 0)
    }
    setLoading(false)
  }, [search, classification, sort, page])

  useEffect(() => {
    const timer = setTimeout(fetchEntries, search ? 300 : 0)
    return () => clearTimeout(timer)
  }, [fetchEntries, search])

  useEffect(() => { setPage(0) }, [search, classification, sort])

  const totalPages = Math.ceil(total / PER_PAGE)

  const classificationColors: Record<string, string> = {
    confirmed:   '#3dbc6e',
    unconfirmed: '#e8a020',
    debunked:    '#e05c52',
    unexplained: 'var(--blue-bright)',
    unknown:     'var(--text-muted)',
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--blue-bright)',
              border: '1px solid var(--blue-dim)', background: 'rgba(59,125,216,0.08)',
              padding: '0.2rem 0.5rem', borderRadius: '2px',
            }}>
              Database
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)' }}>
              UFO-001 through UFO-{String(total).padStart(3, '0')}
            </span>
          </div>
          <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.5rem' }}>
            UFO Cases
          </h1>
          <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '500px' }}>
            Documented UAP encounters, sightings, and incidents. Sourced from government records, military testimony, and verified eyewitness accounts.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
            <svg style={{
              position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', pointerEvents: 'none',
            }} width="14" height="14" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search by name, location, year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            style={{
              background: 'var(--bg-raised)', border: '1px solid var(--border-bright)',
              borderRadius: '4px', padding: '0.75rem 1rem',
              fontFamily: 'var(--font-condensed)', fontSize: '0.85rem',
              color: classification ? 'var(--text-primary)' : 'var(--text-muted)',
              outline: 'none', cursor: 'pointer',
            }}
          >
            <option value="">All Classifications</option>
            {CLASSIFICATIONS.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              background: 'var(--bg-raised)', border: '1px solid var(--border-bright)',
              borderRadius: '4px', padding: '0.75rem 1rem',
              fontFamily: 'var(--font-condensed)', fontSize: '0.85rem',
              color: 'var(--text-secondary)', outline: 'none', cursor: 'pointer',
            }}
          >
            <option value="title">A–Z</option>
            <option value="incident_year">Earliest First</option>
            <option value="witnesses">Most Witnesses</option>
          </select>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          {loading ? 'Loading...' : `Showing ${entries.length} of ${total} entries`}
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ height: '200px', background: 'var(--bg-surface)', borderRadius: '4px', border: '1px solid var(--border)', opacity: 0.6 }} />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            No entries found matching your search.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {entries.map((entry) => (
              <div key={entry.id} style={{ position: 'relative' }}>
                {entry.classification && (
                  <div style={{
                    position: 'absolute', top: '0.75rem', left: '1rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: classificationColors[entry.classification] ?? 'var(--text-muted)',
                    zIndex: 1,
                  }}>
                    {entry.classification}
                  </div>
                )}
                <EntryCard
                  slug={entry.slug}
                  name={entry.title}
                  shortBio={entry.short_bio}
                  meta1Label="Year"
                  meta1Value={entry.incident_year}
                  meta2Label="Location"
                  meta2Value={entry.location}
                  badge="UFO"
                  badgeColor="blue"
                  href={`/ufos/${entry.slug}`}
                  contentWarning={entry.content_warning}
                />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '3rem' }}>
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="btn btn-ghost" style={{ opacity: page === 0 ? 0.4 : 1 }}>← Prev</button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0 1rem' }}>Page {page + 1} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="btn btn-ghost" style={{ opacity: page >= totalPages - 1 ? 0.4 : 1 }}>Next →</button>
          </div>
        )}
      </div>
      <style>{`select option { background: var(--bg-raised); }`}</style>
    </div>
  )
}
