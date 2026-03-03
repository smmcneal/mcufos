import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for mcufos.com',
}

export default function PrivacyPage() {
  const sections = [
    {
      title: 'What data we collect',
      body: `MCUFOS collects minimal data. We do not require user accounts, do not track individual users, and do not sell data to third parties.

The only personal data we collect is what you voluntarily provide through our contact forms (Submit an Entry, Report a Correction). This includes your email address if you choose to provide it, and the content of your submission. This data is used only to process your submission and contact you if necessary.

We use Vercel Analytics, a privacy-friendly analytics tool that does not use cookies and does not collect personally identifiable information. It records aggregate page view data only.`,
    },
    {
      title: 'Cookies',
      body: `MCUFOS does not use tracking cookies. No advertising cookies, no third-party tracking pixels.

The only cookies that may be set are strictly necessary session cookies used by our hosting infrastructure. These cannot be disabled without affecting site functionality.`,
    },
    {
      title: 'Third-party services',
      body: `We use the following third-party services to operate this site:

Vercel — hosting and analytics (privacy policy: vercel.com/legal/privacy-policy)
Supabase — database infrastructure (privacy policy: supabase.com/privacy)
Cloudinary — image hosting (privacy policy: cloudinary.com/privacy)

These services may process data in accordance with their own privacy policies.`,
    },
    {
      title: 'Data retention',
      body: `Form submissions (entry suggestions, correction reports) are retained for as long as necessary to process the request. Submissions that are not acted upon are periodically deleted.

We do not retain analytics data longer than 90 days.`,
    },
    {
      title: 'Your rights',
      body: `You have the right to request deletion of any personal data you have submitted to us via our contact forms. To make a request, use the corrections form and describe what you would like removed, or contact us directly.`,
    },
    {
      title: 'Contact',
      body: `Questions about this privacy policy can be submitted through our corrections form. We will respond to privacy-related requests within 30 days.`,
    },
  ]

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.5rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '720px' }}>
          {sections.map((section) => (
            <div key={section.title} style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-condensed)', fontSize: '1.3rem', fontWeight: 700,
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
        </div>
      </div>
    </div>
  )
}
