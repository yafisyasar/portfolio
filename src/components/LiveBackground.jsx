import { useEffect, useRef } from 'react'

const BLOB_COUNT = 5
const COLORS = [
  '88, 166, 255',
  '56, 139, 253',
  '121, 192, 255',
  '30, 80, 180',
  '20, 60, 140',
]

export default function LiveBackground() {
  const blobsRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const el = blobsRef.current
    if (!el) return
    const blobs = el.querySelectorAll('.blob')
    let mouse = { x: 0.5, y: 0.5 }
    let targets = Array.from({ length: BLOB_COUNT }, () => ({ x: 0.5, y: 0.5 }))
    let rafId

    function onMouse(e) {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    function animate() {
      for (let i = 0; i < blobs.length; i++) {
        const t = targets[i]
        t.x += (mouse.x - t.x) * 0.008 * (1 + i * 0.15)
        t.y += (mouse.y - t.y) * 0.008 * (1 + i * 0.15)

        const offsetX = (t.x - 0.5) * 80
        const offsetY = (t.y - 0.5) * 80
        blobs[i].style.transform = `translate(${offsetX}px, ${offsetY}px)`
      }

      if (glowRef.current) {
        const mx = mouse.x * window.innerWidth
        const my = mouse.y * window.innerHeight
        glowRef.current.style.webkitMaskPosition = `${mx - 200}px ${my - 200}px`
        glowRef.current.style.maskPosition = `${mx - 200}px ${my - 200}px`
      }

      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div ref={blobsRef} className="live-bg" aria-hidden="true">
      <div className="grid-base" />
      <div ref={glowRef} className="grid-glow" />
      {COLORS.map((c, i) => (
        <div
          key={i}
          className="blob"
          style={{
            width: `${200 + i * 120}px`,
            height: `${200 + i * 120}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(${c}, 0.08), rgba(${c}, 0) 70%)`,
            top: `${10 + i * 18}%`,
            left: `${5 + i * 20}%`,
          }}
        />
      ))}
    </div>
  )
}
