import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: Promise<{ slug: string }> }

async function getEntry(slug: string) {
  const { data } = await supabase
    .from('ufo_cases')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data
}

async function getSources(id: string) {
  const { data } = await supabase
    .from('sources')
    .select('*')
    .eq('parent_table', 'ufo_cases')
    .eq('parent_id', id)
  return data ?? []
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const entry = await getEntry(slug)
  if (!entry) return { title: 'Not Found' }
  return {
    title: `${entry.title} | UFO Cases`,
    description: entry.short_bio ?? undefined,
  }
}

export default async function UfoProfile({ params }: Props) {
    const { slug } = await params
  const entry = await getEntry(slug)
  if (!entry) notFound()
  const sources = await getSources(entry.id)

  const classificationColors: Record<string, { color: string; border: string; bg: string }> = {
    confirmed:   { color: '#3dbc6e', border: '#0f4023', bg: 'rgba(39,174,96,0.08)' },
    unconfirmed: { color: '#e8a020', border: '#5c3a00', bg: 'rgba(212,136,10,0.08)' },
    debunked:    { color: '#e05c52', border: '#5c1f1a', bg: 'rgba(192,57,43,0.08)' },
    unexplained: { color: 'var(--blue-bright)', border: 'var(--blue-dim)', bg: 'rgba(59,125,216,0.08)' },
    unknown:     { color: 'var(--text-muted)', border: 'var(--border)', bg: 'var(--bg-raised)' },
  }

  const classStyle = entry.classification ? (classificationColors[entry.classification] ?? classificationColors.unknown) : classificationColors.unknown

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-deep)', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/ufos" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            UFO Cases
          </Link>
          <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>›</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {entry.title}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--blue-bright)',
              border: '1px solid var(--blue-dim)', background: 'rgba(59,125,216,0.08)',
              padding: '0.2rem 0.5rem', borderRadius: '2px',
            }}>UFO</span>
            {entry.classification && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: classStyle.color,
                border: `1px solid ${classStyle.border}`, background: classStyle.bg,
                padding: '0.2rem 0.5rem', borderRadius: '2px',
              }}>
                {entry.classification}
              </span>
            )}
            {entry.incident_year && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                {entry.incident_year}
              </span>
            )}
          </div>

          <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.25rem' }}>
            {entry.title}
          </h1>

          {entry.location && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              📍 {entry.location}{entry.country ? `, ${entry.country}` : ''}
            </p>
          )}

          {entry.short_bio && (
            <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '680px', lineHeight: 1.6 }}>
              {entry.short_bio}
            </p>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem', alignItems: 'start' }}>

          {/* Main content */}
          <div>
            {entry.full_profile && (
              <div style={{
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                borderRadius: '4px', padding: '2rem', marginBottom: '2rem',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--blue-core)', marginBottom: '1.5rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                  Incident Report
                  <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                </h2>
                <div className="prose-dark">
                  {entry.full_profile.split('\n\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {entry.disputed_claims && (
              <div style={{
                background: 'rgba(212,136,10,0.05)', border: '1px solid #5c3a00',
                borderLeft: '3px solid #e8a020', borderRadius: '0 4px 4px 0',
                padding: '1.25rem 1.5rem', marginBottom: '2rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#e8a020', marginBottom: '0.5rem' }}>
                  ⚠ Disputed Claims
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {entry.disputed_claims}
                </p>
              </div>
            )}

            {sources.length > 0 && (
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Sources</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {sources.map((source) => (
                    <div key={source.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue-core)', border: '1px solid var(--blue-dim)', padding: '0.15rem 0.4rem', borderRadius: '2px', flexShrink: 0, marginTop: '2px' }}>
                        {source.source_type ?? 'ref'}
                      </span>
                      <div>
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', color: 'var(--blue-bright)' }}>{source.title}</a>
                        ) : (
                          <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{source.title}</span>
                        )}
                        {source.publication && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{source.publication}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                Incident Data
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'Date', value: entry.incident_date ? new Date(entry.incident_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : entry.incident_year },
                  { label: 'Location', value: entry.location },
                  { label: 'Country', value: entry.country },
                  { label: 'Witnesses', value: entry.witnesses },
                  { label: 'Classification', value: entry.classification },
                ].filter(s => s.value != null).map(({ label, value }) => (
                  <div key={label} className="stat-block" style={{ borderLeftColor: 'var(--blue-core)' }}>
                    <div className="stat-label">{label}</div>
                    <div className="stat-value">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/ufos" className="btn btn-ghost" style={{ justifyContent: 'center' }}>
              ← Back to Database
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
