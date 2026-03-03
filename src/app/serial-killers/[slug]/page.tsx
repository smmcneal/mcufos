import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: Promise<{ slug: string }> }

async function getEntry(slug: string) {
  const { data } = await supabase
    .from('serial_killers')
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
    .eq('parent_table', 'serial_killers')
    .eq('parent_id', id)
  return data ?? []
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const entry = await getEntry(slug)
  if (!entry) return { title: 'Not Found' }
  return {
    title: `${entry.full_name} | Serial Killers`,
    description: entry.short_bio ?? undefined,
  }
}

export default async function SerialKillerProfile({ params }: Props) {
  const { slug } = await params
  const entry = await getEntry(slug)
  if (!entry) notFound()

  const sources = await getSources(entry.id)

  const statusColors: Record<string, string> = {
    executed:  '#e05c52',
    imprisoned: 'var(--blue-bright)',
    deceased:  'var(--text-muted)',
    at_large:  '#e8a020',
    unknown:   'var(--text-dim)',
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-deep)', borderBottom: '1px solid var(--border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/serial-killers" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Serial Killers
          </Link>
          <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>›</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {entry.full_name}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#e05c52',
              border: '1px solid #5c1f1a', background: 'rgba(192,57,43,0.1)',
              padding: '0.2rem 0.5rem', borderRadius: '2px',
            }}>SK</span>
            {entry.content_warning && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#e8a020',
                border: '1px solid #5c3a00', background: 'rgba(212,136,10,0.08)',
                padding: '0.2rem 0.5rem', borderRadius: '2px',
              }}>
                ⚠ Content Warning
              </span>
            )}
            {entry.status && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: statusColors[entry.status] ?? 'var(--text-muted)',
                border: '1px solid currentColor',
                padding: '0.2rem 0.5rem', borderRadius: '2px',
                opacity: 0.8,
              }}>
                {entry.status}
              </span>
            )}
          </div>

          <h1 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '0.25rem' }}>
            {entry.full_name}
          </h1>

          {entry.aliases && entry.aliases.length > 0 && (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Also known as: {entry.aliases.join(', ')}
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
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '2rem',
                marginBottom: '2rem',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--blue-core)', marginBottom: '1.5rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                  Case Profile
                  <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                </h2>
                <div className="prose-dark">
                  {entry.full_profile.split('\n\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Sources */}
            {sources.length > 0 && (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '1.5rem',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem',
                }}>
                  Sources
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {sources.map((source) => (
                    <div key={source.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: 'var(--blue-core)',
                        border: '1px solid var(--blue-dim)', padding: '0.15rem 0.4rem',
                        borderRadius: '2px', flexShrink: 0, marginTop: '2px',
                      }}>
                        {source.source_type ?? 'ref'}
                      </span>
                      <div>
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', color: 'var(--blue-bright)' }}>
                            {source.title}
                          </a>
                        ) : (
                          <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            {source.title}
                          </span>
                        )}
                        {source.publication && (
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            {source.publication}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border)',
              borderRadius: '4px', overflow: 'hidden',
            }}>
              <div style={{
                padding: '0.75rem 1rem', background: 'var(--bg-raised)',
                borderBottom: '1px solid var(--border)',
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)',
              }}>
                Case Data
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'Full Name', value: entry.full_name },
                  { label: 'Born', value: entry.birth_date ? new Date(entry.birth_date).getFullYear() : null },
                  { label: 'Died', value: entry.death_date ? new Date(entry.death_date).getFullYear() : null },
                  { label: 'Country', value: entry.birth_country },
                  { label: 'Confirmed Victims', value: entry.confirmed_victims },
                  { label: 'Possible Victims', value: entry.possible_victims },
                  { label: 'Active From', value: entry.active_from },
                  { label: 'Active To', value: entry.active_to },
                  { label: 'Status', value: entry.status },
                  { label: 'Method', value: entry.modus_operandi },
                ].filter(s => s.value != null).map(({ label, value }) => (
                  <div key={label} className="stat-block">
                    <div className="stat-label">{label}</div>
                    <div className="stat-value">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/serial-killers" className="btn btn-ghost" style={{ justifyContent: 'center', textAlign: 'center' }}>
              ← Back to Database
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive sidebar */}
      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
