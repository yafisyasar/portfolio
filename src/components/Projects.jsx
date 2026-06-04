import { useState, useEffect } from 'react'

const CACHE_KEY = 'gh-projects'
const CACHE_TTL = 3600000

const REPOS = ['ElCare', 'bimg1', '128barcode-generator']

const FALLBACKS = {
  '128barcode-generator': {
    description: 'Generates 128 format barcodes',
    homepage: 'https://128barcode-generator.vercel.app',
  },
  ElCare: {
    description: 'Elderly monitoring dashboard using activation and power consumption of everyday electronic appliances',
    homepage: '',
  },
  bimg1: {
    description: 'Deep Zoom Sky map with hover icons',
    homepage: '',
  },
}

const TECH = {
  '128barcode-generator': ['HTML', 'CSS', 'JavaScript'],
  ElCare: ['Python', 'HTML', 'CSS', 'JavaScript'],
  bimg1: ['Python', 'HTML', 'Tailwind CSS'],
}

const AWARDS = {
  ElCare: "Won Hackers' Choice Award 2026",
  bimg1: 'Global Nominee at NASA Space Apps Challenge 2025',
}

export default function Projects() {
  const [repos, setRepos] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchAll() {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const { data, time } = JSON.parse(cached)
          if (Date.now() - time < CACHE_TTL) {
            if (!cancelled) setRepos(data)
            return
          }
        } catch {}
      }

      const results = []
      for (const name of REPOS) {
        try {
          const res = await fetch(`https://api.github.com/repos/yafisyasar/${name}`)
          if (!res.ok) throw new Error('API error')
          const d = await res.json()
          results.push({ name, data: d })
        } catch {
          results.push({ name, data: null })
        }
      }
      if (!cancelled) {
        setRepos(results)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: results, time: Date.now() }))
        } catch {}
      }
    }
    fetchAll()
    return () => { cancelled = true }
  }, [])

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-number">01.</span> Projects
        </h2>
        <div className="projects-grid">
          {REPOS.map((name, i) => {
            const entry = repos ? repos.find(r => r.name === name) : null
            const d = entry?.data
            const desc = d?.description || FALLBACKS[name]?.description || ''
            const stars = d?.stargazers_count ?? 0
            const lang = d?.language || ''
            const ghUrl = d?.html_url || `https://github.com/yafisyasar/${name}`
            const liveUrl = FALLBACKS[name]?.homepage || ''
            const award = AWARDS[name] || ''
            const tech = TECH[name] || []

            return (
              <div key={name} className="project-card">
                <div className="project-folder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div className="project-links">
                  <a href={ghUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                  {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="External link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  )}
                </div>
                <h3 className="project-title">{name}</h3>
                <p className="project-desc">{desc}</p>
                {award && <p className="project-award">{award}</p>}
                <div className="project-meta">
                  {stars > 0 && (
                    <span className="project-stars">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {stars}
                    </span>
                  )}
                  {lang && <span className="project-lang">{lang}</span>}
                </div>
                <ul className="project-tech">
                  {tech.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
