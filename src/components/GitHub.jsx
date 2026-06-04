import { useState, useEffect } from 'react'

const FALLBACK = [
  { name: 'HTML', pct: 31.0 },
  { name: 'Python', pct: 25.7 },
  { name: 'JavaScript', pct: 21.4 },
  { name: 'CSS', pct: 15.7 },
  { name: 'C', pct: 4.2 },
  { name: 'TypeScript', pct: 2.0 },
]

const CACHE_KEY = 'gh-langs'
const CACHE_TTL = 3600000

export default function GitHub() {
  const [langs, setLangs] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function fetchLangs() {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const { data, time } = JSON.parse(cached)
          if (Date.now() - time < CACHE_TTL) {
            if (!cancelled) setLangs(data)
            return
          }
        } catch {}
      }

      try {
        const repoRes = await fetch('https://api.github.com/users/yafisyasar/repos?per_page=30')
        if (!repoRes.ok) throw new Error('API error')
        const repos = await repoRes.json()
        const totals = {}
        for (const repo of repos) {
          if (repo.fork) continue
          const langRes = await fetch(repo.languages_url)
          if (!langRes.ok) continue
          const langData = await langRes.json()
          for (const [lang, bytes] of Object.entries(langData)) {
            totals[lang] = (totals[lang] || 0) + bytes
          }
        }
        if (!cancelled) {
          const total = Object.values(totals).reduce((a, b) => a + b, 0)
          const sorted = Object.entries(totals)
            .map(([name, bytes]) => ({ name, bytes, pct: (bytes / total) * 100 }))
            .sort((a, b) => b.bytes - a.bytes)
          setLangs(sorted)
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data: sorted, time: Date.now() }))
          } catch {}
        }
      } catch {
        if (!cancelled) {
          setError(true)
          setLangs(FALLBACK)
        }
      }
    }
    fetchLangs()
    return () => { cancelled = true }
  }, [])

  return (
    <section id="github" className="section">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-number">03.</span> Languages
        </h2>
        <div className="lang-bars">
          {langs ? (
            langs.map(l => (
              <div key={l.name} className="lang-row">
                <div className="lang-label">
                  <span className="lang-name">{l.name}</span>
                  <span className="lang-pct">{l.pct.toFixed(1)}%</span>
                </div>
                <div className="lang-track">
                  <div className="lang-fill" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))
          ) : (
            <p className="lang-loading">Loading...</p>
          )}

        </div>
      </div>
    </section>
  )
}
