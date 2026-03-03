import Link from 'next/link'

type EntryCardProps = {
  slug: string
  name: string
  shortBio?: string | null
  meta1Label: string
  meta1Value?: string | number | null
  meta2Label: string
  meta2Value?: string | number | null
  badge: string
  badgeColor: 'red' | 'blue' | 'amber'
  href: string
  contentWarning?: boolean
}

export default function EntryCard({
  name,
  shortBio,
  meta1Label,
  meta1Value,
  meta2Label,
  meta2Value,
  badge,
  badgeColor,
  href,
  contentWarning,
}: EntryCardProps) {
  const badgeStyle = {
    red:   { color: '#e05c52', borderColor: '#5c1f1a', background: 'rgba(192,57,43,0.1)' },
    blue:  { color: 'var(--blue-bright)', borderColor: 'var(--blue-dim)', background: 'rgba(37,99,168,0.1)' },
    amber: { color: '#e8a020', borderColor: '#5c3a00', background: 'rgba(212,136,10,0.1)' },
  }[badgeColor]

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Card top bar */}
        <div style={{
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
          }}>
            Case File
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {contentWarning && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#e8a020',
                border: '1px solid #5c3a00',
                background: 'rgba(212,136,10,0.08)',
                padding: '0.15rem 0.4rem',
                borderRadius: '2px',
              }}>
                CW
              </span>
            )}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.2rem 0.5rem',
              borderRadius: '2px',
              border: '1px solid',
              ...badgeStyle,
            }}>
              {badge}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
          }}>
            {name}
          </h3>

          {shortBio && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {shortBio}
            </p>
          )}
        </div>

        {/* Card footer stats */}
        <div style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
        }}>
          {[
            { label: meta1Label, value: meta1Value },
            { label: meta2Label, value: meta2Value },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '0.2rem',
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: value ? 'var(--text-secondary)' : 'var(--text-dim)',
              }}>
                {value ?? '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}
