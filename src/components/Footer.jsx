import { useState } from 'react'
import Resources from './Resources'

export default function Footer() {
  const [show, setShow] = useState(false)

  return (
    <>
      {show && <Resources />}
      <footer className="footer">
        <p>Built with React & Vite. &copy; {new Date().getFullYear()} Yafis Yasar A.</p>
        <span
          onClick={() => setShow(s => !s)}
          style={{
            display: 'inline-block',
            marginTop: '8px',
            fontSize: '10px',
            color: 'var(--text-muted)',
            opacity: 0.15,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            userSelect: 'none',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.5'}
          onMouseLeave={e => e.target.style.opacity = '0.15'}
        >
          [find hidden resources]
        </span>
      </footer>
    </>
  )
}
