import React, { useState, useEffect, useRef } from 'react'
import { guideMessages } from '../data/portfolioData'
import './GuideGirl.css'

const SECTIONS = ['hero', 'about', 'skills', 'pipeline', 'projects', 'timeline', 'contact']

export default function GuideGirl() {
  const [message, setMessage] = useState(guideMessages.hero)
  const [visible, setVisible] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [blinking, setBlinking] = useState(false)
  const [waving, setWaving] = useState(false)
  const [talking, setTalking] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')
  const timeoutRef = useRef(null)

  // Blink occasionally
  useEffect(() => {
    const blinkLoop = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 200)
    }, 3500)
    return () => clearInterval(blinkLoop)
  }, [])

  // Wave on load
  useEffect(() => {
    setTimeout(() => { setWaving(true); setTimeout(() => setWaving(false), 1200) }, 1800)
  }, [])

  // Track scroll section
  useEffect(() => {
    const onScroll = () => {
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          if (id !== currentSection) {
            setCurrentSection(id)
            const msg = guideMessages[id]
            if (msg) {
              setTalking(true)
              setMessage(msg)
              setVisible(true)
              clearTimeout(timeoutRef.current)
              timeoutRef.current = setTimeout(() => setTalking(false), 2000)
            }
          }
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [currentSection])

  if (hidden) return null

  return (
    <div className={`guide-girl ${visible ? 'show' : ''}`}>
      {/* Dismiss button */}
      <button className="guide-dismiss" onClick={() => setHidden(true)} title="Hide guide">✕</button>

      {/* Speech bubble */}
      <div className={`guide-bubble ${talking ? 'talking' : ''}`}>
        <div className="bubble-dot" /><div className="bubble-dot" /><div className="bubble-dot" />
        <p>{message}</p>
      </div>

      {/* Character SVG */}
      <div className={`guide-character ${waving ? 'waving' : ''}`}>
        <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg" className="girl-svg">
          {/* Hair back */}
          <ellipse cx="60" cy="52" rx="32" ry="36" fill="#1a0a2e" />
          <rect x="28" y="60" width="12" height="60" rx="6" fill="#1a0a2e" />
          <rect x="80" y="60" width="12" height="60" rx="6" fill="#1a0a2e" />

          {/* Neck */}
          <rect x="52" y="95" width="16" height="18" rx="4" fill="#f5c6a0" />

          {/* Body — techy outfit */}
          <rect x="32" y="110" width="56" height="60" rx="10" fill="#0b1220" />
          <rect x="32" y="110" width="56" height="4" rx="2" fill="#00d4ff" opacity="0.7" />
          {/* Circuit lines on outfit */}
          <line x1="44" y1="130" x2="76" y2="130" stroke="#00d4ff" strokeWidth="0.8" opacity="0.4" />
          <line x1="44" y1="140" x2="64" y2="140" stroke="#00d4ff" strokeWidth="0.8" opacity="0.4" />
          <circle cx="44" cy="130" r="2" fill="#00d4ff" opacity="0.7" />
          <circle cx="76" cy="130" r="2" fill="#00d4ff" opacity="0.7" />
          <text x="60" y="160" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace" opacity="0.8">AI/ML</text>

          {/* Left arm (waving) */}
          <g className={`arm-left ${waving ? 'wave' : ''}`} style={{ transformOrigin: '38px 118px' }}>
            <rect x="22" y="114" width="16" height="40" rx="8" fill="#f5c6a0" />
            {/* hand */}
            <ellipse cx="30" cy="156" rx="8" ry="6" fill="#f5c6a0" />
          </g>

          {/* Right arm */}
          <rect x="82" y="114" width="16" height="40" rx="8" fill="#f5c6a0" />
          <ellipse cx="90" cy="156" rx="8" ry="6" fill="#f5c6a0" />

          {/* Legs */}
          <rect x="42" y="168" width="14" height="28" rx="7" fill="#0d1a2e" />
          <rect x="64" y="168" width="14" height="28" rx="7" fill="#0d1a2e" />
          {/* Shoes */}
          <ellipse cx="49" cy="196" rx="10" ry="5" fill="#00d4ff" opacity="0.8" />
          <ellipse cx="71" cy="196" rx="10" ry="5" fill="#00d4ff" opacity="0.8" />

          {/* Face */}
          <ellipse cx="60" cy="68" rx="26" ry="28" fill="#f5c6a0" />

          {/* Eyes */}
          <g className={blinking ? 'blink' : ''}>
            {/* Left eye */}
            <ellipse cx="50" cy="66" rx="6" ry="7" fill="white" />
            <ellipse cx="50" cy="67" rx="4" ry="5" fill="#1a0a2e" />
            <circle cx="51.5" cy="65" r="1.5" fill="white" />
            {/* Right eye */}
            <ellipse cx="70" cy="66" rx="6" ry="7" fill="white" />
            <ellipse cx="70" cy="67" rx="4" ry="5" fill="#1a0a2e" />
            <circle cx="71.5" cy="65" r="1.5" fill="white" />
          </g>

          {/* Eyebrows */}
          <path d="M44,57 Q50,53 56,57" stroke="#1a0a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M64,57 Q70,53 76,57" stroke="#1a0a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <ellipse cx="60" cy="74" rx="2" ry="1.5" fill="#e8a87c" />

          {/* Smile / talking mouth */}
          <path className="mouth-smile" d="M52,82 Q60,88 68,82" stroke="#c06060" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Hair front strands */}
          <path d="M30,52 Q34,30 60,28 Q86,30 90,52" fill="#1a0a2e" />
          <path d="M30,55 Q28,44 34,38" stroke="#1a0a2e" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M90,55 Q92,44 86,38" stroke="#1a0a2e" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Fringe */}
          <path d="M38,42 Q44,32 52,40" fill="#1a0a2e" />
          <path d="M52,40 Q58,28 66,40" fill="#1a0a2e" />
          <path d="M66,40 Q74,32 80,44" fill="#1a0a2e" />

          {/* Hair highlight */}
          <path d="M50,30 Q58,26 66,30" stroke="#7b2fff" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Blush */}
          <ellipse cx="44" cy="76" rx="7" ry="4" fill="#ffb3b3" opacity="0.4" />
          <ellipse cx="76" cy="76" rx="7" ry="4" fill="#ffb3b3" opacity="0.4" />

          {/* Ear */}
          <ellipse cx="33" cy="70" rx="4" ry="5" fill="#f5c6a0" />
          <ellipse cx="87" cy="70" rx="4" ry="5" fill="#f5c6a0" />

          {/* Earring — cyan teardrop */}
          <ellipse cx="33" cy="76" rx="2" ry="3" fill="#00d4ff" opacity="0.9" />
          <ellipse cx="87" cy="76" rx="2" ry="3" fill="#00d4ff" opacity="0.9" />
        </svg>

        {/* Floating particles around character */}
        <div className="guide-particles">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Name tag */}
      <div className="guide-nametag">
        <span className="nametag-dot" />
        ARIA · AI GUIDE
      </div>
    </div>
  )
}
