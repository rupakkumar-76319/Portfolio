import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import { personalInfo } from '../data/portfolioData'
import HeroGuide from '../components/HeroGuide'
import './HeroSection.css'

export default function HeroSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let mouse = { x: W / 2, y: H / 2 }

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)

    const N = 80
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }))

    let rafId
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 140) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - dist/140)})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
        const mdx = nodes[i].x - mouse.x, mdy = nodes[i].y - mouse.y
        const mdist = Math.sqrt(mdx*mdx + mdy*mdy)
        if (mdist < 180) {
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(123,47,255,${0.25 * (1 - mdist/180)})`; ctx.lineWidth = 0.8; ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI*2)
        ctx.fillStyle = 'rgba(0,212,255,0.6)'; ctx.fill()
        nodes[i].x += nodes[i].vx; nodes[i].y += nodes[i].vy
        if (nodes[i].x < 0 || nodes[i].x > W) nodes[i].vx *= -1
        if (nodes[i].y < 0 || nodes[i].y > H) nodes[i].vy *= -1
      }
      rafId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); window.removeEventListener('mousemove', onMouse) }
  }, [])

  return (
    <section className="hero">

      <div className="hero-container">

        {/* LEFT TEXT */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <p className="hero-intro">I'm</p>

          <h1 className="hero-name">
            {personalInfo.name}
          </h1>

          <h2 className="hero-title">
            {personalInfo.title}
          </h2>

          <p className="hero-subtitle">
            {personalInfo.subtitle}
          </p>

        </motion.div>

        {/* RIGHT PHOTO */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={personalInfo.photo} alt="profile" />
        </motion.div>

      </div>

    </section>
  );
}
