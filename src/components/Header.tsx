'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/serial-killers', label: 'Serial Killers', badge: 'SK' },
  { href: '/cults',          label: 'Cults',          badge: 'CT' },
  { href: '/ufos',           label: 'UFO Cases',      badge: 'UFO' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{
      background: 'var(--bg-deep)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Top accent line */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--blue-core) 40%, var(--blue-bright) 60%, transparent)',
      }} />

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        gap: '2rem',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              letterSpacing: '0.1em',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}>
              MCU<span style={{ color: 'var(--blue-bright)' }}>FOS</span>
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              .com
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          flex: 1,
        }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: active ? 'var(--blue-bright)' : 'var(--text-secondary)',
                  background: active ? 'rgba(59, 125, 216, 0.1)' : 'transparent',
                  border: `1px solid ${active ? 'var(--blue-dim)' : 'transparent'}`,
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.08em',
                  color: active ? 'var(--blue-core)' : 'var(--text-dim)',
                  background: active ? 'rgba(59, 125, 216, 0.15)' : 'var(--bg-raised)',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '2px',
                  border: '1px solid',
                  borderColor: active ? 'var(--blue-dim)' : 'var(--border)',
                }}>
                  {link.badge}
                </span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side: Search + About */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <Link
            href="/search"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '3px',
              border: '1px solid var(--border-bright)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            title="Search"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Link>

          <Link
            href="/about"
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              padding: '0.4rem 0.75rem',
              transition: 'color 0.2s',
            }}
          >
            About
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              background: 'transparent',
              border: '1px solid var(--border-bright)',
              borderRadius: '3px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 2L13 13M13 2L2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 4h11M2 7.5h11M2 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border)',
          padding: '1rem 1.5rem',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border)',
                fontFamily: 'var(--font-condensed)',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: pathname.startsWith(link.href) ? 'var(--blue-bright)' : 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              padding: '0.75rem 0',
              fontFamily: 'var(--font-condensed)',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            Search
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
