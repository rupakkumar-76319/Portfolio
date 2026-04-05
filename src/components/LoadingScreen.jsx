import React, { useEffect, useRef, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null)
  const [phase, setPhase] = useState('gather')   // gather | form | blast | done
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('INITIALIZING NEURAL NETWORK...')
  const phaseRef = useRef('gather')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const cx = W / 2, cy = H / 2
    let rafId
    let elapsed = 0
    let lastTime = performance.now()

    const DATA_CHARS = '01アイウエオカキク01%∑∇∂∫π01DATA0110AI ML0110 0.9872 0.1023 0.9991 EPOCH LOSS ACC 01'.split('')

    // ─── PARTICLES ───
    const PARTICLE_COUNT = 220
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const edge = Math.floor(Math.random() * 4)
      let x, y
      if (edge === 0) { x = Math.random() * W; y = -20 }
      else if (edge === 1) { x = W + 20; y = Math.random() * H }
      else if (edge === 2) { x = Math.random() * W; y = H + 20 }
      else { x = -20; y = Math.random() * H }
      return {
        x, y,
        startX: x, startY: y,
        char: DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)],
        size: Math.random() * 12 + 8,
        speed: Math.random() * 1.2 + 0.4,
        color: Math.random() > 0.6 ? '#00d4ff' : Math.random() > 0.5 ? '#7b2fff' : '#00ffaa',
        alpha: Math.random() * 0.5 + 0.5,
        targetAngle: Math.random() * Math.PI * 2,
        targetR: Math.random() * 90 + 20,
        progress: 0,
        delay: Math.random() * 0.4,
      }
    })

    // ─── SPHERE DOTS ───
    const SPHERE_POINTS = 160
    const spherePoints = Array.from({ length: SPHERE_POINTS }, (_, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / SPHERE_POINTS)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 130
      return {
        ox: Math.sin(phi) * Math.cos(theta) * r,
        oy: Math.sin(phi) * Math.sin(theta) * r,
        oz: Math.cos(phi) * r,
        alpha: 0,
      }
    })

    // ─── BLAST PARTICLES ───
    const blastParticles = Array.from({ length: 300 }, () => ({
      x: cx, y: cy,
      vx: (Math.random() - 0.5) * 28,
      vy: (Math.random() - 0.5) * 28,
      size: Math.random() * 4 + 1,
      color: Math.random() > 0.5 ? '#00d4ff' : Math.random() > 0.5 ? '#7b2fff' : '#ffffff',
      alpha: 1,
      decay: Math.random() * 0.025 + 0.012,
    }))

    let sphereRotY = 0
    let blastStarted = false
    let blastAlpha = 0

    const statuses = [
      'INITIALIZING NEURAL NETWORK...',
      'LOADING DATA PIPELINE...',
      'CALIBRATING MODEL WEIGHTS...',
      'DEPLOYING AI SYSTEMS...',
      'RUPAK KUMAR — ONLINE',
    ]

    const draw = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      elapsed += dt

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#030609'
      ctx.fillRect(0, 0, W, H)

      const currentPhase = phaseRef.current

      // ─── GATHER PHASE (0–2.5s) ───
      if (currentPhase === 'gather' || currentPhase === 'form') {
        const gatherT = Math.min(elapsed / 2.5, 1)
        setProgress(Math.floor(gatherT * 60))

        particles.forEach(p => {
          const t = Math.max(0, (gatherT - p.delay) / (1 - p.delay))
          const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
          p.progress = easedT

          const tx = cx + Math.cos(p.targetAngle) * p.targetR * 0.3
          const ty = cy + Math.sin(p.targetAngle) * p.targetR * 0.3
          p.x = p.startX + (tx - p.startX) * easedT
          p.y = p.startY + (ty - p.startY) * easedT

          ctx.save()
          ctx.globalAlpha = p.alpha * (0.4 + easedT * 0.6)
          ctx.fillStyle = p.color
          ctx.font = `${p.size}px 'JetBrains Mono', monospace`
          ctx.fillText(p.char, p.x, p.y)
          ctx.restore()
        })

        if (elapsed >= 2.5 && currentPhase === 'gather') {
          phaseRef.current = 'form'
          setPhase('form')
          setStatusText(statuses[2])
        }
      }

      // ─── FORM PHASE (2.5–5s) — sphere builds ───
      if (currentPhase === 'form') {
        const formT = Math.min((elapsed - 2.5) / 2.5, 1)
        setProgress(60 + Math.floor(formT * 35))
        sphereRotY += dt * 1.2

        spherePoints.forEach((sp, i) => {
          sp.alpha = Math.min(sp.alpha + dt * 2, formT)
          const ry = sphereRotY
          const rx = Math.cos(ry) * sp.ox - Math.sin(ry) * sp.oz
          const rz = Math.sin(ry) * sp.ox + Math.cos(ry) * sp.oz
          const ry2 = sp.oy
          const scale = 1 + rz / 400
          const sx = cx + rx * scale
          const sy = cy + ry2 * scale
          const r = 2.5 * scale

          ctx.beginPath()
          ctx.arc(sx, sy, r, 0, Math.PI * 2)
          const bright = (rz + 130) / 260
          ctx.fillStyle = `rgba(${Math.floor(bright * 0 + 100)}, ${Math.floor(bright * 200 + 55)}, 255, ${sp.alpha * scale})`
          ctx.fill()
        })

        // Draw converging particles faintly
        particles.forEach(p => {
          const tx = cx + Math.cos(p.targetAngle) * p.targetR * 0.15
          const ty = cy + Math.sin(p.targetAngle) * p.targetR * 0.15
          p.x += (tx - p.x) * 0.05
          p.y += (ty - p.y) * 0.05
          ctx.save()
          ctx.globalAlpha = p.alpha * (1 - formT) * 0.6
          ctx.fillStyle = p.color
          ctx.font = `${p.size * 0.7}px monospace`
          ctx.fillText(p.char, p.x, p.y)
          ctx.restore()
        })

        // Glow core
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140 * (0.8 + formT * 0.4))
        grd.addColorStop(0, `rgba(0,212,255,${0.12 * formT})`)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, W, H)

        if (elapsed >= 5.0 && !blastStarted) {
          blastStarted = true
          phaseRef.current = 'blast'
          setPhase('blast')
          setStatusText(statuses[4])
          setProgress(100)
        }
      }

      // ─── BLAST PHASE (5s+) ───
      if (currentPhase === 'blast') {
        blastAlpha = Math.min(blastAlpha + dt * 2.5, 1)

        blastParticles.forEach(bp => {
          bp.x += bp.vx * (1 - blastAlpha * 0.6)
          bp.y += bp.vy * (1 - blastAlpha * 0.6)
          bp.alpha = Math.max(0, bp.alpha - bp.decay)
          if (bp.alpha <= 0) return
          ctx.beginPath()
          ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2)
          ctx.fillStyle = bp.color
          ctx.globalAlpha = bp.alpha
          ctx.fill()
          ctx.globalAlpha = 1
        })

        // White flash
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, 0.9 - blastAlpha * 2)})`
        ctx.fillRect(0, 0, W, H)

        // Fade to black
        if (blastAlpha > 0.5) {
          ctx.fillStyle = `rgba(3,6,9,${(blastAlpha - 0.5) * 2})`
          ctx.fillRect(0, 0, W, H)
        }

        if (blastAlpha >= 1) {
          cancelAnimationFrame(rafId)
          onComplete?.()
          return
        }
      }

      // ─── HUD overlay ───
      if (currentPhase !== 'blast') {
        // Corner brackets
        const bSize = 20, bOff = 30
        ctx.strokeStyle = 'rgba(0,212,255,0.4)'
        ctx.lineWidth = 1.5
        ;[[bOff, bOff], [W - bOff, bOff], [bOff, H - bOff], [W - bOff, H - bOff]].forEach(([bx, by], ci) => {
          const sx = ci % 2 === 0 ? 1 : -1
          const sy = ci < 2 ? 1 : -1
          ctx.beginPath()
          ctx.moveTo(bx, by + sy * bSize); ctx.lineTo(bx, by); ctx.lineTo(bx + sx * bSize, by)
          ctx.stroke()
        })

        // Center crosshair
        ctx.strokeStyle = 'rgba(0,212,255,0.15)'
        ctx.lineWidth = 0.5
        ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    // Update status text periodically
    const statusTimers = [
      setTimeout(() => setStatusText(statuses[1]), 800),
      setTimeout(() => setStatusText(statuses[2]), 2500),
      setTimeout(() => setStatusText(statuses[3]), 4000),
    ]

    return () => {
      cancelAnimationFrame(rafId)
      statusTimers.forEach(clearTimeout)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`loading-screen ${phase === 'blast' ? 'fading' : ''}`}>
      <canvas ref={canvasRef} className="loading-canvas" />

      {/* HUD UI */}
      <div className="loading-hud">
        <div className="loading-name">
          <span className="name-bracket">[</span>
          RUPAK KUMAR
          <span className="name-bracket">]</span>
        </div>
        <div className="loading-role">AI / ML ENGINEER</div>
      </div>

      <div className="loading-footer">
        <div className="loading-status">
          <span className="status-ping" />
          <span className="loading-status-text">{statusText}</span>
        </div>
        <div className="loading-progress-wrap">
          <div className="loading-progress-bar">
            <div className="loading-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="loading-progress-num">{String(progress).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
