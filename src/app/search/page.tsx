'use client'

import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Result = {
  id: string
  slug: string
  name: string
  shortBio: string | null
  db: 'serial-killers' | 'cults' | 'ufos'
  dbLabel: string
  badge: string
  badgeColor: string
  meta: string | null
}

const DB_FILTER_OPTIONS = [
  { value: 'all', label: 'All Databases' },
  { value: 'serial-killers', label: 'Serial Killers' },
  { value: 'cults', label: 'Cults' },
  { value: 'ufos', label: 'UFO Cases' },
]

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  'serial-killers': { color: '#e05c52', borderColor: '#5c1f1a', background: 'rgba(192,57,43,0.1)' },
  cults:            { color: '#e8a020', borderColor: '#5c3a00', background: 'rgba(212,136,10,0.1)' },
  ufos:             { color: 'var(--blue-bright)', borderColor: 'var(--blue-dim)', background: 'rgba(59,125,216,0.1)' },
}

export default function SearchPage() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
const [query, setQuery] = useState(searchParams?.get('q') ?? '')
  const [filter, setFilter] = useState('all')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const runSearch = useCallback(async (q: string, f: string) => {
    if (!q.trim()) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)

    const all: Result[] = []

    try {
      if (f === 'all' || f === 'serial-killers') {
        const { data } = await supabase
          .from('serial_killers')
          .select('id,slug,full_name,short_bio,confirmed_victims,active_from,active_to')
          .eq('published', true)
          .textSearch('fts', q.trim(), { type: 'websearch' })
          .limit(20)

        for (const r of data ?? []) {
          all.push({
            id: r.id,
            slug: r.slug,
            name: r.full_name,
            shortBio: r.short_bio,
            db: 'serial-killers',
            dbLabel: 'Serial Killers',
            badge: 'SK',
            badgeColor: 'serial-killers',
            meta: r.confirmed_victims ? `${r.confirmed_victims} victims` : null,
          })
        }
      }

      if (f === 'all' || f === 'cults') {
        const { data } = await supabase
          .from('cults')
          .select('id,slug,name,short_bio,founded_year,membership_peak')
          .eq('published', true)
          .textSearch('fts', q.trim(), { type: 'websearch' })
          .limit(20)

        for (const r of data ?? []) {
          all.push({
            id: r.id,
            slug: r.slug,
            name: r.name,
            shortBio: r.short_bio,
            db: 'cults',
            dbLabel: 'Cults',
            badge: 'CT',
            badgeColor: 'cults',
            meta: r.founded_year ? `Founded ${r.founded_year}` : null,
          })
        }
      }

      if (f === 'all' || f === 'ufos') {
        const { data } = await supabase
          .from('ufo_cases')
          .select('id,slug,title,short_bio,incident_year,location')
          .eq('published', true)
          .textSearch('fts', q.trim(), { type: 'websearch' })
          .limit(20)

        for (const r of data ?? []) {
          all.push({
            id: r.id,
            slug: r.slug,
            name: r.title,
            shortBio: r.short_bio,
            db: 'ufos',
            dbLabel: 'UFO Cases',
            badge: 'UFO',
            badgeColor: 'ufos',
            meta: r.incident_year ? String(r.incident_year) : r.location,
          })
        }
      }
    } catch (e) {
      console.error(e)
    }

    setResults(all)
    setLoading(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => runSearch(query, filter), 300)
    return () => clearTimeout(timer)
  }, [query, filter, runSearch])

  const counts = {
    'serial-killers': results.filter(r => r.db === 'serial-killers').length,
    cults: results.filter(r => r.db === 'cults').length,
    ufos: results.filter(r => r.db === 'ufos').length,
  }

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--blue-core)',
              border: '1px solid var(--blue-dim)', background: 'rgba(59,125,216,0.08)',
              padding: '0.2rem 0.5rem', borderRadius: '2px',
            }}>Global Search</span>
          </div>
          <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
            Search All Databases
          </h1>

          {/* Search input */}
          <div style={{ position: 'relative', maxWidth: '680px' }}>
            <svg style={{
              position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', pointerEvents: 'none',
            }} width="16" height="16" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              autoFocus
              className="search-input"
              type="text"
              placeholder="Search serial killers, cults, UFO cases..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ paddingLeft: '3rem', fontSize: '1rem', height: '52px' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-muted)',
                  cursor: 'pointer', padding: '0.25rem', lineHeight: 1,
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {DB_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.45rem 1rem',
                borderRadius: '3px',
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                background: filter === opt.value ? 'rgba(59,125,216,0.15)' : 'transparent',
                borderColor: filter === opt.value ? 'var(--blue-core)' : 'var(--border-bright)',
                color: filter === opt.value ? 'var(--blue-bright)' : 'var(--text-muted)',
              }}
            >
              {opt.label}
              {searched && opt.value !== 'all' && (
                <span style={{
                  marginLeft: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: filter === opt.value ? 'var(--blue-core)' : 'var(--text-dim)',
                }}>
                  {counts[opt.value as keyof typeof counts] ?? 0}
                </span>
              )}
              {searched && opt.value === 'all' && (
                <span style={{ marginLeft: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                  {results.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* States */}
        {!searched && !loading && (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}>
              SEARCH
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
              Enter a name, location, or keyword above
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {['Ted Bundy', 'Jonestown', 'Roswell', 'Waco', 'Heaven\'s Gate'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em',
                    color: 'var(--text-muted)', background: 'var(--bg-surface)',
                    border: '1px solid var(--border)', borderRadius: '3px',
                    padding: '0.4rem 0.8rem', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            Searching...
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              No results found for "{query}"
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
              Try a different spelling or keyword
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {results.map((result) => (
              <Link
                key={`${result.db}-${result.id}`}
                href={`/${result.db}/${result.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.25rem',
                  transition: 'border-color 0.2s, transform 0.15s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--blue-mid)'
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)'
                  }}
                >
                  {/* Badge */}
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '0.25rem 0.5rem',
                    borderRadius: '2px', border: '1px solid', flexShrink: 0,
                    marginTop: '2px',
                    ...BADGE_STYLES[result.badgeColor],
                  }}>
                    {result.badge}
                  </span>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-condensed)', fontSize: '1.1rem',
                        fontWeight: 600, color: 'var(--text-primary)',
                      }}>
                        {result.name}
                      </h3>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        color: 'var(--text-dim)', letterSpacing: '0.08em',
                      }}>
                        {result.dbLabel}
                      </span>
                      {result.meta && (
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                          color: 'var(--text-dim)', letterSpacing: '0.05em',
                        }}>
                          · {result.meta}
                        </span>
                      )}
                    </div>
                    {result.shortBio && (
                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                        color: 'var(--text-muted)', lineHeight: 1.5,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {result.shortBio}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <span style={{ color: 'var(--text-dim)', flexShrink: 0, marginTop: '2px' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
