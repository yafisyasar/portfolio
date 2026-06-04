import { useState, useEffect } from 'react'
import ScrambleText from './ScrambleText'

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ loaded }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = links.map(l => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(`#${id}`)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo"><ScrambleText text="YAFIS" start={loaded} /><span className="cursor" /></a>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`nav-link${active === l.href ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
