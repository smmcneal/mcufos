'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function SubmitPage() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    database: '',
    name: '',
    reason: '',
    sources: '',
    submitter_email: '',
  })

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    if (!form.database || !form.name || !form.reason) return
    setState('submitting')
    try {
      const { error } = await supabase.from('submissions').insert({
        type: 'new_entry',
        database: form.database,
        subject_name: form.name,
        reason: form.reason,
        sources: form.sources,
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
              textTransform: 'uppercase', color: 'var(--blue-core)',
              border: '1px solid var(--blue-dim)', background: 'rgba(59,125,216,0.08)',
              padding: '0.2rem 0.5rem', borderRadius: '2px',
            }}>Contribute</span>
          </div>
          <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.5rem' }}>
            Submit an Entry
          </h1>
          <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '520px' }}>
            Suggest a new entry for the database. We review all submissions — we cannot guarantee publication but read every suggestion.
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
                Submission received
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Thank you for your suggestion. We'll review it against our editorial standards and source requirements. If we publish the entry, it will appear in the database.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => { setState('idle'); setForm({ database: '', name: '', reason: '', sources: '', submitter_email: '' }) }}
                  className="btn btn-ghost">Submit another</button>
                <Link href="/" className="btn btn-ghost">Back to home</Link>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Database */}
              <div>
                <label style={labelStyle}>Database *</label>
                <select
                  value={form.database}
                  onChange={e => set('database', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="">Select a database...</option>
                  <option value="serial_killers">Serial Killers</option>
                  <option value="cults">Cults</option>
                  <option value="ufo_cases">UFO Cases</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label style={labelStyle}>Name of Subject *</label>
                <input
                  type="text"
                  placeholder="e.g. John Wayne Gacy, Heaven's Gate, Phoenix Lights"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Reason */}
              <div>
                <label style={labelStyle}>Why should this be included? *</label>
                <textarea
                  placeholder="Brief explanation of who/what this is and why it belongs in the database..."
                  value={form.reason}
                  onChange={e => set('reason', e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              {/* Sources */}
              <div>
                <label style={labelStyle}>Sources (links or references)</label>
                <textarea
                  placeholder="List any sources you know of — court records, news articles, Wikipedia, books..."
                  value={form.sources}
                  onChange={e => set('sources', e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Your Email (optional)</label>
                <input
                  type="email"
                  placeholder="Only used to notify you if the entry is published"
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
                disabled={state === 'submitting' || !form.database || !form.name || !form.reason}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', opacity: (!form.database || !form.name || !form.reason) ? 0.5 : 1 }}
              >
                {state === 'submitting' ? 'Submitting...' : 'Submit Entry'}
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`select option { background: var(--bg-raised); }`}</style>
    </div>
  )
}
