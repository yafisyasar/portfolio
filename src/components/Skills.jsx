const categories = [
  {
    label: 'Languages',
    skills: ['Python', 'C', 'C++', 'JavaScript'],
  },
  {
    label: 'Frameworks',
    skills: ['Django', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Node.js'],
  },
  {
    label: 'Web Technologies',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'REST APIs'],
  },
  {
    label: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'Linux', 'Figma', 'VS Code'],
  },
  {
    label: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
  },
  {
    label: 'Core CS',
    skills: ['DSA', 'OOP', 'DBMS', 'IoT', 'Cybersecurity'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="section-number">02.</span> Skills
        </h2>
        <div className="skills-grid">
          {categories.map(cat => (
            <div key={cat.label} className="skill-category">
              <h3 className="skill-category-title">{cat.label}</h3>
              <ul className="skill-list">
                {cat.skills.map(s => (
                  <li key={s} className="skill-item">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
