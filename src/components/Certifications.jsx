import { useState, useEffect } from 'react'

const certs = [
  {
    title: 'UI/UX Design Internship',
    issuer: 'Cognifyz Technologies',
    date: 'Jun – Jul 2025',
    desc: 'Completed a UI/UX design internship, demonstrating dedication, coordination skills, and attention to detail.',
    file: '/certificates/Cognifyz Technologies.pdf',
  },
  {
    title: 'Frontend Development Internship',
    issuer: 'Minusbugs Pvt Ltd',
    date: 'May – Jun 2025',
    desc: 'Worked on Elite Store frontend using Next.js. Demonstrated sincerity, dedication, and professional conduct.',
    file: '/certificates/Yafis Yasar A Internship Certificate.pdf',
  },
  {
    title: 'Space Apps Challenge',
    issuer: 'NASA',
    date: 'Oct 2025',
    desc: 'Global Nominee — built Bimg, a deep-zoom sky map with hover icons. Awarded Galactic Problem Solver.',
    file: '/certificates/nasa.pdf',
  },
  {
    title: 'Cybersecurity Job Simulation',
    issuer: 'Forage',
    date: 'Apr 2025',
    desc: 'Designed a phishing email simulation and interpreted phishing simulation results.',
    file: '/certificates/Forage_cs.pdf',
  },
  {
    title: 'UX Design Introduction',
    issuer: 'Forage',
    date: 'Apr 2025',
    desc: 'Conducted competitive analysis, customer research, user research, and survey design.',
    file: '/certificates/Forage_UX.pdf',
  },
]

export default function Certifications() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!selected) return
    const handler = (e) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected])

  return (
    <>
      <section id="certifications" className="section">
        <div className="section-inner">
          <h2 className="section-title">
            <span className="section-number">03.</span> Certifications
          </h2>
          <div className="certs-grid">
            {certs.map((c, i) => (
              <div key={i} className="cert-card" onClick={() => setSelected(c.file)}>
                <div className="cert-card-header">
                  <svg className="cert-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-issuer">{c.issuer}</p>
                <p className="cert-date">{c.date}</p>
                <p className="cert-desc">{c.desc}</p>
                <span className="btn btn-outline cert-btn">View Certificate</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="cert-overlay" onClick={() => setSelected(null)}>
          <div className="cert-modal" onClick={e => e.stopPropagation()}>
            <div className="cert-modal-header">
              <span className="cert-modal-title">Certificate</span>
              <button className="cert-close" onClick={() => setSelected(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="cert-modal-body">
              <iframe src={selected} title="Certificate" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
