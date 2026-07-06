import { useState, useEffect } from 'react'

const TITLES = ['BCA Student', 'Developer', 'UI/UX Enthusiast', 'Problem Solver', 'IoT Enthusiast', 'Gamer']

export default function TypeWriter() {
  const [display, setDisplay] = useState('')
  const [cursor, setCursor] = useState(true)
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const blink = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    const title = TITLES[i]

    if (!deleting) {
      if (display.length < title.length) {
        const t = setTimeout(() => setDisplay(title.slice(0, display.length + 1)), 70)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }

    if (display.length > 0) {
      const t = setTimeout(() => setDisplay(display.slice(0, -1)), 30)
      return () => clearTimeout(t)
    }

    setDeleting(false)
    setI((i + 1) % TITLES.length)
  }, [display, deleting, i])

  return (
    <span>
      {display}
      <span className={`typewriter-cursor ${cursor ? '' : 'hidden'}`}>_</span>
    </span>
  )
}
