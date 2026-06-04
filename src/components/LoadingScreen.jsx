import { useState, useEffect } from 'react'

const bootLines = [
  { text: '> Initializing terminal...', delay: 200 },
  { text: '> Loading portfolio modules...', delay: 600 },
  { text: '> Establishing connection...', delay: 1000 },
  { text: '> System ready.', delay: 1400 },
]

export default function LoadingScreen({ onFinish }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => setVisibleLines(v => v + 1), bootLines[visibleLines].delay)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 1
      })
    }, 25)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100 && visibleLines >= bootLines.length) {
      const timer = setTimeout(() => setFading(true), 400)
      return () => clearTimeout(timer)
    }
  }, [progress, visibleLines])

  useEffect(() => {
    if (fading) {
      const timer = setTimeout(onFinish, 500)
      return () => clearTimeout(timer)
    }
  }, [fading, onFinish])

  return (
    <div className={`loading-screen${fading ? ' fade-out' : ''}`}>
      <div className="loading-terminal">
        <div className="loading-lines">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <p key={i} className="loading-line">
              {line.text}
            </p>
          ))}
          {visibleLines >= bootLines.length && (
            <p className="loading-line cursor-line">
              {'> '}<span className="loading-cursor">_</span>
            </p>
          )}
        </div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-percent">{progress}%</p>
      </div>
    </div>
  )
}
