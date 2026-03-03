import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border)',
      marginTop: 'auto',
    }}>
      <div className="glow-rule" />

      <div className="container" style={{ padding: '3rem 1.5rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>

          {/* Brand column */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              letterSpacing: '0.1em',
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
            }}>
              MCU<span style={{ color: 'var(--blue-bright)' }}>FOS</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}>
              An educational reference database of serial killers, cults, and UFO cases. Factual. Sourced. Documented.
            </p>
          </div>

          {/* Databases */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
              marginBottom: '1rem',
            }}>
              Databases
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/serial-killers', label: 'Serial Killers' },
                { href: '/cults', label: 'Cults' },
                { href: '/ufos', label: 'UFO Cases' },
                { href: '/search', label: 'Search All' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Site */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
              marginBottom: '1rem',
            }}>
              Site
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/about', label: 'About' },
                { href: '/submit', label: 'Submit an Entry' },
                { href: '/corrections', label: 'Report a Correction' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
            lineHeight: 1.5,
            maxWidth: '600px',
          }}>
            mcufos.com is an educational reference database. All content is sourced from public records and reputable publications. Not affiliated with any law enforcement agency.
          </p>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
          }}>
            © {year} MCUFOS
          </span>
        </div>
      </div>
    </footer>
  )
}
