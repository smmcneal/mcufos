'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomepageSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/search')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', maxWidth: '580px', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
        <svg style={{
          position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-muted)', pointerEvents: 'none',
        }} width="16" height="16" viewBox="0 0 15 15" fill="none">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder="Search all databases..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ paddingLeft: '3rem', height: '52px', fontSize: '1rem' }}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ height: '52px', padding: '0 1.75rem', fontSize: '0.9rem' }}>
        Search
      </button>
    </form>
  )
}
