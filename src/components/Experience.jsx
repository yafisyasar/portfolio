const experiences = [
  {
    role: 'UI/UX Intern',
    company: 'Cognifyz Technologies',
    period: '2025',
    points: [
      'Completed a UI/UX design internship focused on user interface and experience design',
      'Worked on design projects applying UX research and prototyping principles',
    ],
  },
  {
    role: 'Event Organiser',
    company: 'Bi0s Meetup, Kochi',
    period: 'Oct 2024 - Present',
    points: [
      'Volunteering at Bi0s Meetup every month organized by Team Bi0s Kochi',
      'Assisting in event coordination and community engagement',
    ],
  },
  {
    role: 'Hackers\' Choice Award 2026',
    company: 'Luftetar - Sahrdhaya College of Advanced Studies',
    period: 'Jan 2026',
    points: [
      'Won certificate and cash prize for ElCare – Elderly Monitoring Dashboard',
    ],
  },
  {
    role: 'NASA Space Apps Challenge',
    company: 'Global Nominees 2025 - MACE College of Engineering',
    period: 'Nov 2025',
    points: [
      'Won certificate for Bimg – Big image viewer (Deep Zoom Sky map)',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-number">04.</span> Experience
        </h2>
        <div className="experience-list">
          {experiences.map((exp, i) => (
            <div key={i} className="experience-item">
              <div className="experience-marker" />
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-role">{exp.role}</h3>
                  <span className="experience-company">{exp.company}</span>
                </div>
                <p className="experience-period">{exp.period}</p>
                <ul className="experience-points">
                  {exp.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
