import { useEffect, useRef } from 'react'

export default function LiveBackground() {
  const glowRef = useRef(null)

  useEffect(() => {
    let mouse = { x: 0.5, y: 0.5 }
    let rafId

    function onMove(e) {
      const cx = e.touches ? e.touches[0].clientX : e.clientX
      const cy = e.touches ? e.touches[0].clientY : e.clientY
      mouse.x = cx / window.innerWidth
      mouse.y = cy / window.innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchstart', onMove, { passive: true })

    function animate() {
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
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchstart', onMove)
    }
  }, [])

  return (
    <div className="live-bg" aria-hidden="true">
      <div className="grid-base" />
      <div ref={glowRef} className="grid-glow" />
    </div>
  )
}
