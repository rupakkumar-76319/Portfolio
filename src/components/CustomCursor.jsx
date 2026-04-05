import React, { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    let rafId
    const lerp = (a, b, t) => a + (b - a) * t
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => ringRef.current?.classList.add('hovered')
    const onLeave = () => ringRef.current?.classList.remove('hovered')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
