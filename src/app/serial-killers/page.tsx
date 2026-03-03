'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import EntryCard from '@/components/EntryCard'

type SerialKiller = {
  id: string
  slug: string
  full_name: string
  short_bio: string | null
  confirmed_victims: number | null
  active_from: number | null
  active_to: number | null
  birth_country: string | null
  status: string | null
  content_warning: boolean
}

const STATUSES = ['executed', 'imprisoned', 'deceased', 'at_large', 'unknown']
const PER_PAGE = 24

export default function SerialKillersPage() {
  const [entries, setEntries] = useState<SerialKiller[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [sort, setSort] = useState('full_name')
  const [page, setPage] = useState(0)

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('serial_killers')
      .select('id,slug,full_name,short_bio,confirmed_victims,active_from,active_to,birth_country,status,content_warning', { count: 'exact' })
      .eq('published', true)

    if (search.trim()) {
      query = query.textSearch('fts', search.trim())
    }
    if (status) {
      query = query.eq('status', status)
    }

    query = query.order(sort).range(page * PER_PAGE, (page + 1) * PER_PAGE - 1)

    const { data, count, error } = await query
    if (!error) {
      setEntries(data ?? [])
      setTotal(count ?? 0)
    }
    setLoading(false)
  }, [search, status, sort, page])

  useEffect(() => {
    const timer = setTimeout(fetchEntries, search ? 300 : 0)
    return () => clearTimeout(timer)
  }, [fetchEntries, search])

  // Reset page when filters change
  useEffect(() => { setPage(0) }, [search, status, sort])

  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--blue-core)',
              border: '1px solid var(--blue-dim)',
              background: 'rgba(59,125,216,0.08)',
              padding: '0.2rem 0.5rem',
              borderRadius: '2px',
            }}>
              Database
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)' }}>
              SK-001 through SK-{String(total).padStart(3, '0')}
            </span>
          </div>
          <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.5rem' }}>
            Serial Killers
          </h1>
          <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '500px' }}>
            Documented cases drawn from court records, law enforcement files, and verified publications.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Search + filters bar */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {/* Search */}
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
              placeholder="Search by name, method, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--border-bright)',
              borderRadius: '4px',
              padding: '0.75rem 1rem',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.85rem',
              color: status ? 'var(--text-primary)' : 'var(--text-muted)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="">All Statuses</option>
            {STATUSES.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--border-bright)',
              borderRadius: '4px',
              padding: '0.75rem 1rem',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="full_name">A–Z</option>
            <option value="confirmed_victims">Most Victims</option>
            <option value="active_from">Earliest Active</option>
          </select>
        </div>

        {/* Result count */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem',
          letterSpacing: '0.05em',
        }}>
          {loading ? 'Loading...' : `Showing ${entries.length} of ${total} entries`}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                height: '200px',
                background: 'var(--bg-surface)',
                borderRadius: '4px',
                border: '1px solid var(--border)',
                animation: 'pulse 1.5s ease-in-out infinite',
                opacity: 0.6,
              }} />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 0',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
          }}>
            No entries found matching your search.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {entries.map((entry) => (
              <EntryCard
                key={entry.id}
                slug={entry.slug}
                name={entry.full_name}
                shortBio={entry.short_bio}
                meta1Label="Victims"
                meta1Value={entry.confirmed_victims}
                meta2Label="Active"
                meta2Value={
                  entry.active_from && entry.active_to
                    ? entry.active_from === entry.active_to
                      ? String(entry.active_from)
                      : `${entry.active_from}–${entry.active_to}`
                    : entry.active_from ?? null
                }
                badge="SK"
                badgeColor="red"
                href={`/serial-killers/${entry.slug}`}
                contentWarning={entry.content_warning}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '3rem',
          }}>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="btn btn-ghost"
              style={{ opacity: page === 0 ? 0.4 : 1 }}
            >
              ← Prev
            </button>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              padding: '0 1rem',
            }}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="btn btn-ghost"
              style={{ opacity: page >= totalPages - 1 ? 0.4 : 1 }}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        select option { background: var(--bg-raised); }
      `}</style>
    </div>
  )
}
