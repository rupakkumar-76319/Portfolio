import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion";
import { personalInfo } from '../data/portfolioData'
import './HeroSection.css'

/* ── Typing effect hook ─────────────────────────────────── */
function useTypingEffect(texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2200) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(current.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        setDisplay(current.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
        if (charIndex <= 1) {
          setIsDeleting(false)
          setIndex(prev => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, index, texts, typingSpeed, deletingSpeed, pauseTime])

  return display
}

/* ── Floating code snippets (decorative) ─────────────────── */
const codeSnippets = [
  { text: 'model.fit(X_train, y_train)', top: '15%', left: '3%', delay: 0 },
  { text: 'accuracy: 0.97', top: '72%', left: '6%', delay: 1.2 },
  { text: 'import tensorflow as tf', top: '25%', right: '4%', delay: 0.6 },
  { text: 'loss: 0.023', top: '82%', right: '8%', delay: 1.8 },
  { text: 'pipeline.deploy()', top: '45%', right: '2%', delay: 2.4 },
]

/* ── Stats counter configuration ────────────────────────── */
const stats = [
  { endValue: 7, suffix: '+', label: 'Projects Built' },
  { endValue: 15, suffix: '+', label: 'Technologies' },
  { endValue: 2, suffix: '', label: 'Institutions' },
  { endValue: 7, suffix: '', label: 'Certifications' },
]

/* ── Animated Counter Component ─────────────────────────── */
function StatCounter({ endValue, suffix, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    // Small delay to let the page load before starting
    const timeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [endValue]);

  return (
    <div className="hero-stat">
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label mono">{label}</span>
    </div>
  );
}

export default function HeroSection() {
  const canvasRef = useRef(null)
  const typedText = useTypingEffect([
    'AI / ML Engineer',
    'Data Scientist',
    'AI Pipeline Builder',
    'ML Pipeline Builder',
    'Problem Solver',
  ])

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

    const N = 100
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 0.5,
      pulse: Math.random() * Math.PI * 2,
    }))

    let rafId
    const draw = (time) => {
      ctx.clearRect(0, 0, W, H)

      /* Connections between nodes */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 160) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.1 * (1 - dist/160)})`; ctx.lineWidth = 0.6; ctx.stroke()
          }
        }

        /* Mouse interaction */
        const mdx = nodes[i].x - mouse.x, mdy = nodes[i].y - mouse.y
        const mdist = Math.sqrt(mdx*mdx + mdy*mdy)
        if (mdist < 200) {
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(123,47,255,${0.3 * (1 - mdist/200)})`; ctx.lineWidth = 1; ctx.stroke()
        }

        /* Pulsing nodes */
        const pulse = Math.sin(time * 0.002 + nodes[i].pulse) * 0.5 + 1
        const radius = nodes[i].r * pulse
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, radius, 0, Math.PI*2)

        /* Gradient coloring based on position */
        const hue = (nodes[i].x / W) * 40 + 180
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${0.5 + pulse * 0.2})`
        ctx.fill()

        /* Glow effect for larger nodes */
        if (nodes[i].r > 1.3) {
          ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, radius * 3, 0, Math.PI*2)
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.04)`; ctx.fill()
        }

        nodes[i].x += nodes[i].vx; nodes[i].y += nodes[i].vy
        if (nodes[i].x < 0 || nodes[i].x > W) nodes[i].vx *= -1
        if (nodes[i].y < 0 || nodes[i].y > H) nodes[i].vy *= -1
      }
      rafId = requestAnimationFrame(draw)
    }
    draw(0)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); window.removeEventListener('mousemove', onMouse) }
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Gradient overlays for depth */}
      <div className="hero-gradient-top" />
      <div className="hero-gradient-bottom" />

      {/* Floating code snippets */}
      {codeSnippets.map((s, i) => (
        <motion.div
          key={i}
          className="hero-code-float mono"
          style={{ top: s.top, left: s.left, right: s.right }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 + s.delay }}
        >
          <span className="code-prefix">{'> '}</span>{s.text}
        </motion.div>
      ))}

      <div className="hero-container">

        {/* LEFT TEXT */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Status badge */}
          <motion.div
            className="hero-status"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="status-pulse" />
            <span className="mono">Open to Opportunities</span>
          </motion.div>

          <motion.p
            className="hero-intro mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {'// hello, I\'m'}
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="name-first">Rupak</span>
            <span className="name-last">Kumar</span>
          </motion.h1>

          <motion.div
            className="hero-typing-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span className="typing-prefix">{'<'}</span>
            <span className="hero-typing">{typedText}</span>
            <span className="typing-cursor">|</span>
            <span className="typing-suffix">{' />'}</span>
          </motion.div>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {personalInfo.subtitle}. Transforming raw data into production-ready
            AI systems — from exploration to deployment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <button
              className="hero-btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              <span className="btn-text">View Projects</span>
              <span className="btn-arrow">→</span>
            </button>
            <button
              className="hero-btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              <span className="btn-text">Get in Touch</span>
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href={`mailto:${personalInfo.email}`} className="social-link" title="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </motion.div>

        </motion.div>

        {/* RIGHT — PROFILE IMAGE */}
        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, scale: 0.85, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Decorative rings */}
          <div className="hero-ring hero-ring-1" />
          <div className="hero-ring hero-ring-2" />
          <div className="hero-ring hero-ring-3" />

          {/* Photo with glow */}
          <div className="hero-photo-container">
            <div className="hero-photo-glow" />
            <img src={personalInfo.photo} alt="Rupak Kumar" className="hero-photo" loading="lazy" />
            <div className="hero-photo-border" />
          </div>

          {/* Floating badges */}
          <motion.div
            className="hero-badge hero-badge-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5, type: 'spring' }}
          >
            <span className="badge-icon">🧠</span>
            <span className="badge-text mono">ML</span>
          </motion.div>

          <motion.div
            className="hero-badge hero-badge-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5, type: 'spring' }}
          >
            <span className="badge-icon">⚡</span>
            <span className="badge-text mono">AI</span>
          </motion.div>

          <motion.div
            className="hero-badge hero-badge-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.0, duration: 0.5, type: 'spring' }}
          >
            <span className="badge-icon">📊</span>
            <span className="badge-text mono">Data</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar at bottom */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        {stats.map((s, i) => (
          <StatCounter key={i} endValue={s.endValue} suffix={s.suffix} label={s.label} />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        onClick={() => scrollToSection('about')}
      >
        <span className="mono scroll-text">scroll</span>
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
      </motion.div>

    </section>
  );
}
