const projects = [
  {
    title: 'ElCare',
    desc: 'Elderly monitoring dashboard using activation and power consumption of everyday electronic appliances. Won Hackers\' Choice Award 2026.',
    tech: ['Python', 'HTML', 'CSS', 'JavaScript'],
    links: { github: 'https://github.com/yafisyasar/ElCare', live: 'https://github.com/yafisyasar/ElCare' },
  },
  {
    title: 'Bimg',
    desc: 'Deep Zoom Sky map with hover icons. Global Nominee at NASA Space Apps Challenge 2025.',
    tech: ['Python', 'HTML', 'Tailwind CSS'],
    links: { github: 'https://github.com/yafisyasar/bimg1', live: 'https://github.com/yafisyasar/bimg1' },
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-number">01.</span> Projects
        </h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-folder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="project-links">
                <a href={p.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href={p.links.live} target="_blank" rel="noopener noreferrer" aria-label="External link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-tech">
                {p.tech.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
