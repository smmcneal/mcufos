'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function CorrectionsPage() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    database: '',
    entry_name: '',
    incorrect_info: '',
    correct_info: '',
    source: '',
    submitter_email: '',
  })

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    if (!form.database || !form.entry_name || !form.incorrect_info) return
    setState('submitting')
    try {
      const { error } = await supabase.from('submissions').insert({
        type: 'correction',
        database: form.database,
        subject_name: form.entry_name,
        reason: form.incorrect_info,
        sources: `Correct info: ${form.correct_info}\n\nSource: ${form.source}`,
        submitter_email: form.submitter_email || null,
        status: 'pending',
      })
      if (error) throw error
      setState('success')
    } catch {
      setState('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-raised)',
    border: '1px solid var(--border-bright)',
    borderRadius: '4px',
    padding: '0.75rem 1rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#e8a020',
              border: '1px solid #5c3a00', background: 'rgba(212,136,10,0.08)',
              padding: '0.2rem 0.5rem', borderRadius: '2px',
            }}>Corrections</span>
          </div>
          <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.5rem' }}>
            Report a Correction
          </h1>
          <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '520px' }}>
            Found an error or outdated information? We take accuracy seriously. All correction requests are reviewed.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '600px' }}>

          {state === 'success' ? (
            <div style={{
              background: 'rgba(39,174,96,0.06)', border: '1px solid #0f4023',
              borderLeft: '3px solid #3dbc6e', borderRadius: '0 4px 4px 0',
              padding: '2rem',
            }}>
              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.3rem', color: '#3dbc6e', marginBottom: '0.5rem' }}>
                Correction received
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Thank you for helping us maintain accuracy. We'll investigate and update the entry if the correction is verified.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => { setState('idle'); setForm({ database: '', entry_name: '', incorrect_info: '', correct_info: '', source: '', submitter_email: '' }) }}
                  className="btn btn-ghost">Submit another</button>
                <Link href="/" className="btn btn-ghost">Back to home</Link>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <div>
                <label style={labelStyle}>Database *</label>
                <select value={form.database} onChange={e => set('database', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select a database...</option>
                  <option value="serial_killers">Serial Killers</option>
                  <option value="cults">Cults</option>
                  <option value="ufo_cases">UFO Cases</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Entry Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ted Bundy, Peoples Temple, Roswell Incident"
                  value={form.entry_name}
                  onChange={e => set('entry_name', e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>What is incorrect? *</label>
                <textarea
                  placeholder="Describe the specific information that is wrong or outdated..."
                  value={form.incorrect_info}
                  onChange={e => set('incorrect_info', e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              <div>
                <label style={labelStyle}>What is the correct information?</label>
                <textarea
                  placeholder="What should it say instead?"
                  value={form.correct_info}
                  onChange={e => set('correct_info', e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              <div>
                <label style={labelStyle}>Source for correction</label>
                <input
                  type="text"
                  placeholder="Link or reference that supports the correction"
                  value={form.source}
                  onChange={e => set('source', e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Your Email (optional)</label>
                <input
                  type="email"
                  placeholder="In case we need to follow up"
                  value={form.submitter_email}
                  onChange={e => set('submitter_email', e.target.value)}
                  style={inputStyle}
                />
              </div>

              {state === 'error' && (
                <div style={{
                  background: 'rgba(192,57,43,0.08)', border: '1px solid #5c1f1a',
                  borderRadius: '4px', padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#e05c52',
                }}>
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={state === 'submitting' || !form.database || !form.entry_name || !form.incorrect_info}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', opacity: (!form.database || !form.entry_name || !form.incorrect_info) ? 0.5 : 1 }}
              >
                {state === 'submitting' ? 'Submitting...' : 'Submit Correction'}
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`select option { background: var(--bg-raised); }`}</style>
    </div>
  )
}
