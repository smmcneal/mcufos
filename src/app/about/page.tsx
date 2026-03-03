import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About mcufos.com — editorial standards, sourcing policy, and how to contribute.',
}

export default function AboutPage() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--blue-core)',
              border: '1px solid var(--blue-dim)', background: 'rgba(59,125,216,0.08)',
              padding: '0.2rem 0.5rem', borderRadius: '2px',
            }}>Site</span>
          </div>
          <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            About MCUFOS
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '720px' }}>

          {[
            {
              title: 'What is MCUFOS?',
              body: `MCUFOS is an independent educational reference database covering three subject areas: serial killers, cults, and UFO/UAP cases. Each entry is sourced from court records, government documents, established journalism, and academic publications.

The goal is to provide accurate, well-sourced information in one place — not to sensationalize, glorify, or speculate. This is a reference tool, not entertainment.`,
            },
            {
              title: 'Editorial Standards',
              body: `Every entry on MCUFOS must meet the following minimum standards before publication:

Minimum two verifiable sources per entry. At least one source must be a primary or institutional source — a court document, government record, or established publication. Wikipedia alone is not sufficient; we trace back to primary sources.

Facts are presented as facts. Disputed claims are labeled as disputed. Speculation is not presented as fact — particularly in UFO cases where the nature of incidents is often genuinely unknown.

Victim names are only included where they are already part of the public record (court documents, official reports). We do not publish victim information that has not already been made public.

Content warnings are applied to entries with especially graphic descriptions of violence or abuse.`,
            },
            {
              title: 'Living People and Active Organizations',
              body: `We apply extra caution to content involving living people or organizations that are still active. We do not make unsubstantiated claims about living individuals. Where allegations exist but have not been proven in court, they are clearly labeled as allegations.

If you believe an entry contains inaccurate information about a living person or active organization, please use our corrections form.`,
            },
            {
              title: 'How to Contribute',
              body: `MCUFOS grows through community contribution. You can:

Submit a new entry suggestion — we review all submissions before publishing. We cannot guarantee publication but read every suggestion.

Report a correction — if you spot an error, outdated information, or an unsupported claim, let us know. We take accuracy seriously and will investigate all correction requests.`,
            },
            {
              title: 'Disclaimer',
              body: `MCUFOS is an independent educational reference database. It is not affiliated with any law enforcement agency, government body, or media organization. Content is sourced from public records and reputable publications and is provided for educational and informational purposes only.`,
            },
          ].map((section) => (
            <div key={section.title} style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-condensed)', fontSize: '1.4rem', fontWeight: 700,
                color: 'var(--text-primary)', marginBottom: '1rem',
                paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)',
              }}>
                {section.title}
              </h2>
              <div className="prose-dark">
                {section.body.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ))}

          {/* CTA links */}
          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap',
            paddingTop: '1rem', borderTop: '1px solid var(--border)',
          }}>
            <Link href="/submit" className="btn btn-primary">Submit an Entry</Link>
            <Link href="/corrections" className="btn btn-ghost">Report a Correction</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
