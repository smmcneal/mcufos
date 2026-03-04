import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import HomepageSearch from '@/components/HomepageSearch'

export const revalidate = 3600 // rebuild this page every hour

async function getStats() {
  const [sk, ct, ufo] = await Promise.all([
    supabase.from('serial_killers').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('cults').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('ufo_cases').select('id', { count: 'exact', head: true }).eq('published', true),
  ])
  return {
    serialKillers: sk.count ?? 0,
    cults: ct.count ?? 0,
    ufos: ufo.count ?? 0,
  }
}

async function getLatest() {
  const [sk, ct, ufo] = await Promise.all([
    supabase.from('serial_killers').select('slug,full_name,confirmed_victims').eq('published', true).order('created_at', { ascending: false }).limit(4),
    supabase.from('cults').select('slug,name,founded_year').eq('published', true).order('created_at', { ascending: false }).limit(4),
    supabase.from('ufo_cases').select('slug,title,incident_year').eq('published', true).order('created_at', { ascending: false }).limit(4),
  ])
  return { sk: sk.data ?? [], ct: ct.data ?? [], ufo: ufo.data ?? [] }
}

export default async function HomePage() {
  const [stats, latest] = await Promise.all([getStats(), getLatest()])
  const total = stats.serialKillers + stats.cults + stats.ufos

  const categories = [
    {
      href: '/serial-killers',
      badge: 'SK',
      label: 'Serial Killers',
      count: stats.serialKillers,
      description: 'Documented cases drawn from court records, law enforcement files, and verified publications.',
      accentColor: '#e05c52',
      borderColor: '#5c1f1a',
      bg: 'rgba(192,57,43,0.06)',
      entries: latest.sk.map(e => ({ slug: e.slug, name: e.full_name, meta: e.confirmed_victims ? `${e.confirmed_victims} victims` : null })),
    },
    {
      href: '/cults',
      badge: 'CT',
      label: 'Cults',
      count: stats.cults,
      description: 'Organizations using coercive control, manipulation, and isolation. Sourced from survivor accounts and legal records.',
      accentColor: '#e8a020',
      borderColor: '#5c3a00',
      bg: 'rgba(212,136,10,0.06)',
      entries: latest.ct.map(e => ({ slug: e.slug, name: e.name, meta: e.founded_year ? `Founded ${e.founded_year}` : null })),
    },
    {
      href: '/ufos',
      badge: 'UFO',
      label: 'UFO Cases',
      count: stats.ufos,
      description: 'UAP encounters and incidents sourced from government records, military testimony, and verified eyewitness accounts.',
      accentColor: 'var(--blue-bright)',
      borderColor: 'var(--blue-dim)',
      bg: 'rgba(59,125,216,0.06)',
      entries: latest.ufo.map(e => ({ slug: e.slug, name: e.title, meta: e.incident_year ? String(e.incident_year) : null })),
    },
  ]

  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-deep)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(4rem, 10vw, 8rem) 0 clamp(3rem, 8vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(var(--border-bright) 1px, transparent 1px), linear-gradient(90deg, var(--border-bright) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />
        {/* Blue glow blob */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,125,216,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--blue-core)', marginBottom: '1.5rem',
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--blue-core)' }} />
            Reference Database
            <span style={{ width: '20px', height: '1px', background: 'var(--blue-core)' }} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            letterSpacing: '0.06em',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            MCU<span style={{ color: 'var(--blue-bright)' }}>FOS</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            lineHeight: 1.5,
            marginBottom: '0.75rem',
          }}>
            A searchable reference database of serial killers, cults, and UFO cases. Factual. Sourced. Documented.
          </p>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.1em',
            marginBottom: '2.5rem',
          }}>
            {total.toLocaleString()} entries across 3 databases
          </p>

          {/* Search bar — client component */}
          <HomepageSearch />
        </div>
      </section>

      {/* ── Category Cards ───────────────────────── */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-void)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}>
            {categories.map((cat) => (
              <div key={cat.href} style={{
                background: cat.bg,
                border: `1px solid ${cat.borderColor}`,
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Card header */}
                <div style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: `1px solid ${cat.borderColor}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: cat.accentColor, border: `1px solid ${cat.borderColor}`,
                      padding: '0.2rem 0.5rem', borderRadius: '2px',
                    }}>
                      {cat.badge}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-condensed)', fontSize: '1.2rem',
                      fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em',
                    }}>
                      {cat.label}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.8rem',
                    color: cat.accentColor, opacity: 0.5, letterSpacing: '0.05em',
                  }}>
                    {cat.count}
                  </span>
                </div>

                {/* Description */}
                <div style={{ padding: '1.25rem 1.5rem', flex: 1 }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                    color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem',
                  }}>
                    {cat.description}
                  </p>

                  {/* Recent entries list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {cat.entries.slice(0, 3).map((entry) => (
                      <Link
                        key={entry.slug}
                        href={`${cat.href}/${entry.slug}`}
                        style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '0.4rem 0',
                          borderBottom: `1px solid ${cat.borderColor}`,
                          textDecoration: 'none',
                          transition: 'color 0.15s',
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--font-condensed)', fontSize: '0.88rem',
                          color: 'var(--text-secondary)',
                        }}>
                          {entry.name}
                        </span>
                        {entry.meta && (
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                            color: 'var(--text-dim)', letterSpacing: '0.05em',
                          }}>
                            {entry.meta}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Browse link */}
                <Link href={cat.href} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.9rem',
                  borderTop: `1px solid ${cat.borderColor}`,
                  fontFamily: 'var(--font-condensed)', fontSize: '0.8rem',
                  fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: cat.accentColor, textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                >
                  Browse All {cat.label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer disclaimer ────────────────────── */}
      <section style={{ padding: '2rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: 'var(--text-dim)', letterSpacing: '0.08em', lineHeight: 1.8,
          }}>
            mcufos.com is an educational reference database. All content is sourced from public records and reputable publications.
            <br />
            <Link href="/about" style={{ color: 'var(--text-muted)' }}>Editorial standards</Link>
            {' · '}
            <Link href="/submit" style={{ color: 'var(--text-muted)' }}>Submit an entry</Link>
            {' · '}
            <Link href="/corrections" style={{ color: 'var(--text-muted)' }}>Report a correction</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
