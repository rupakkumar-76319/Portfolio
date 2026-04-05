import React, { useState, useEffect, useRef } from 'react'
import './HeroGuide.css'

const TOUR_STEPS = [
  {
    label: 'Hero',
    message: "Hi! I'm Aria 👋 Welcome to Rupak Kumar's portfolio. He's an AI/ML engineer who builds intelligent systems from data all the way to deployment.",
    pointer: null,
    delay: 0,
  },
  {
    label: 'About',
    message: "Want to know more about Rupak? Scroll down to the About section — his ECE background and ML journey are explained there! ↓",
    pointer: 'down',
    delay: 3500,
  },
  {
    label: 'Skills',
    message: "Then check his Skills — Python, Scikit-learn, FastAPI... everything needed to build production AI systems! 💪",
    pointer: 'down',
    delay: 7500,
  },
  {
    label: 'Pipeline',
    message: "The Pipeline section shows HOW he thinks — Data → Model → Deploy. Recruiters love this! ⚡",
    pointer: 'down',
    delay: 11500,
  },
  {
    label: 'Projects',
    message: "Projects are the proof! Each one is an end-to-end AI system with GitHub links. Check them out! 🚀",
    pointer: 'down',
    delay: 15000,
  },
  {
    label: 'Contact',
    message: "Ready to hire him? Hit the Contact section at the bottom — he's open to internships and AI/ML opportunities! 📬",
    pointer: 'down',
    delay: 18500,
  },
]

export default function HeroGuide() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const [blinking, setBlinking] = useState(false)
  const [talking, setTalking] = useState(true)
  const [animClass, setAnimClass] = useState('slide-in')
  const timerRef = useRef(null)

  // Blink loop
  useEffect(() => {
    const loop = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 180)
    }, 3200)
    return () => clearInterval(loop)
  }, [])

  // Auto-advance through tour steps
  useEffect(() => {
    if (dismissed) return
    timerRef.current = setInterval(() => {
      setTalking(false)
      setTimeout(() => {
        setStep(prev => {
          if (prev >= TOUR_STEPS.length - 1) {
            clearInterval(timerRef.current)
            return prev
          }
          return prev + 1
        })
        setTalking(true)
      }, 400)
    }, 4500)
    return () => clearInterval(timerRef.current)
  }, [dismissed])

  const goStep = (i) => {
    setTalking(false)
    setTimeout(() => { setStep(i); setTalking(true) }, 200)
  }

  if (dismissed) return null

  const current = TOUR_STEPS[step]

  return (
    <div className={`hero-guide ${animClass}`}>
      {/* Speech bubble */}
      <div className={`hg-bubble ${talking ? 'active' : 'fading'}`}>
        <div className="hg-bubble-tag">
          <span className="hg-tag-dot" />
          ARIA · AI GUIDE
        </div>
        <p className="hg-bubble-text">{current.message}</p>
        <div className="hg-steps">
          {TOUR_STEPS.map((s, i) => (
            <button
              key={i}
              className={`hg-step-dot ${i === step ? 'active' : i < step ? 'done' : ''}`}
              onClick={() => goStep(i)}
              title={s.label}
            />
          ))}
        </div>
        <div className="hg-bubble-tail" />
      </div>

      {/* Character */}
      <div className="hg-character-wrap">
        <button className="hg-dismiss" onClick={() => setDismissed(true)}>✕ hide guide</button>

        {/* Chair + Girl SVG */}
        <svg
          viewBox="0 0 200 280"
          xmlns="http://www.w3.org/2000/svg"
          className={`hg-svg ${blinking ? 'blinking' : ''}`}
        >
          {/* ─── CHAIR ─── */}
          {/* Chair back */}
          <rect x="58" y="155" width="84" height="8" rx="4" fill="#0d1a2e" />
          <rect x="62" y="155" width="6" height="55" rx="3" fill="#0d1a2e" />
          <rect x="132" y="155" width="6" height="55" rx="3" fill="#0d1a2e" />
          {/* Chair seat */}
          <rect x="54" y="195" width="92" height="12" rx="5" fill="#0f2035" />
          {/* Chair legs */}
          <rect x="60" y="207" width="6" height="45" rx="3" fill="#0d1a2e" />
          <rect x="134" y="207" width="6" height="45" rx="3" fill="#0d1a2e" />
          {/* Footrests */}
          <rect x="52" y="248" width="22" height="4" rx="2" fill="#0d1a2e" />
          <rect x="126" y="248" width="22" height="4" rx="2" fill="#0d1a2e" />
          {/* Arm rests */}
          <rect x="46" y="185" width="12" height="5" rx="2.5" fill="#0f2035" />
          <rect x="142" y="185" width="12" height="5" rx="2.5" fill="#0f2035" />
          <rect x="46" y="185" width="5" height="22" rx="2.5" fill="#0d1a2e" />
          <rect x="149" y="185" width="5" height="22" rx="2.5" fill="#0d1a2e" />
          {/* Chair accent glow line */}
          <rect x="58" y="155" width="84" height="2" rx="1" fill="#00d4ff" opacity="0.5" />

          {/* ─── BODY ─── */}
          {/* Legs (seated, bent) */}
          <rect x="74" y="195" width="20" height="36" rx="10" fill="#f5c6a0" />
          <rect x="106" y="195" width="20" height="36" rx="10" fill="#f5c6a0" />
          {/* Shoes */}
          <ellipse cx="84" cy="232" rx="14" ry="6" fill="#00d4ff" opacity="0.85" />
          <ellipse cx="116" cy="232" rx="14" ry="6" fill="#00d4ff" opacity="0.85" />

          {/* Outfit — tech jacket */}
          <rect x="62" y="140" width="76" height="60" rx="12" fill="#0b1220" />
          <rect x="62" y="140" width="76" height="5" rx="3" fill="#00d4ff" opacity="0.6" />
          {/* Circuit lines */}
          <line x1="76" y1="162" x2="124" y2="162" stroke="#00d4ff" strokeWidth="0.8" opacity="0.3" />
          <line x1="76" y1="172" x2="108" y2="172" stroke="#00d4ff" strokeWidth="0.8" opacity="0.3" />
          <circle cx="76" cy="162" r="2.5" fill="#00d4ff" opacity="0.7" />
          <circle cx="124" cy="162" r="2.5" fill="#00d4ff" opacity="0.7" />
          <circle cx="108" cy="172" r="2.5" fill="#7b2fff" opacity="0.8" />
          <text x="100" y="186" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.9" fontWeight="bold">AI / ML</text>

          {/* Left arm on armrest */}
          <rect x="50" y="175" width="22" height="30" rx="11" fill="#f5c6a0" />
          <ellipse cx="61" cy="206" rx="10" ry="7" fill="#f5c6a0" />
          {/* Right arm — pointing / gesturing */}
          <g className="hg-arm-right">
            <rect x="128" y="160" width="20" height="36" rx="10" fill="#f5c6a0" />
            <ellipse cx="138" cy="197" rx="10" ry="7" fill="#f5c6a0" />
          </g>

          {/* Neck */}
          <rect x="90" y="122" width="20" height="22" rx="6" fill="#f5c6a0" />

          {/* ─── HEAD ─── */}
          {/* Hair back */}
          <ellipse cx="100" cy="80" rx="38" ry="40" fill="#180a2a" />
          <path d="M62,90 Q58,115 65,140" stroke="#180a2a" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M138,90 Q142,115 135,140" stroke="#180a2a" strokeWidth="14" fill="none" strokeLinecap="round" />

          {/* Face */}
          <ellipse cx="100" cy="85" rx="32" ry="34" fill="#f5c6a0" />

          {/* Eyes */}
          <g className="hg-eyes">
            {/* Left */}
            <ellipse cx="88" cy="82" rx="7" ry="8" fill="white" />
            <ellipse cx="88" cy="84" rx="5" ry="6" fill="#180a2a" />
            <circle cx="90" cy="81" r="2" fill="white" />
            <ellipse cx="88" cy="75" rx="6" ry="1.5" fill="#180a2a" />
            {/* Right */}
            <ellipse cx="112" cy="82" rx="7" ry="8" fill="white" />
            <ellipse cx="112" cy="84" rx="5" ry="6" fill="#180a2a" />
            <circle cx="114" cy="81" r="2" fill="white" />
            <ellipse cx="112" cy="75" rx="6" ry="1.5" fill="#180a2a" />
          </g>

          {/* Nose */}
          <ellipse cx="100" cy="93" rx="2.5" ry="2" fill="#e8a87c" />

          {/* Smile */}
          <path d="M90,104 Q100,112 110,104" stroke="#c06060" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Blush */}
          <ellipse cx="80" cy="96" rx="9" ry="5" fill="#ffb3b3" opacity="0.4" />
          <ellipse cx="120" cy="96" rx="9" ry="5" fill="#ffb3b3" opacity="0.4" />

          {/* Ears */}
          <ellipse cx="67" cy="87" rx="5" ry="6" fill="#f5c6a0" />
          <ellipse cx="133" cy="87" rx="5" ry="6" fill="#f5c6a0" />
          {/* Earrings */}
          <ellipse cx="67" cy="93" rx="2.5" ry="3.5" fill="#00d4ff" />
          <ellipse cx="133" cy="93" rx="2.5" ry="3.5" fill="#00d4ff" />

          {/* Hair front */}
          <path d="M64,75 Q68,45 100,40 Q132,45 136,75" fill="#180a2a" />
          <path d="M64,78 Q62,60 68,52" stroke="#180a2a" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M136,78 Q138,60 132,52" stroke="#180a2a" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M72,52 Q80,38 90,50" fill="#180a2a" />
          <path d="M90,50 Q100,36 110,50" fill="#180a2a" />
          <path d="M110,50 Q120,38 128,52" fill="#180a2a" />

          {/* Hair highlight */}
          <path d="M82,44 Q100,38 118,44" stroke="#7b2fff" strokeWidth="2" fill="none" opacity="0.7" />

          {/* Headset / tech visor */}
          <rect x="66" y="68" width="68" height="8" rx="4" fill="#0b1220" opacity="0.85" />
          <rect x="66" y="68" width="68" height="2" rx="1" fill="#00d4ff" opacity="0.5" />
          <circle cx="74" cy="72" r="3" fill="#00d4ff" opacity="0.8" />
          <circle cx="126" cy="72" r="3" fill="#7b2fff" opacity="0.8" />

          {/* Holographic tablet in lap */}
          <rect x="74" y="180" width="52" height="35" rx="4" fill="#050f1a" opacity="0.9" />
          <rect x="74" y="180" width="52" height="3" rx="2" fill="#00d4ff" opacity="0.6" />
          {/* Tablet screen content */}
          <line x1="80" y1="192" x2="120" y2="192" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
          <line x1="80" y1="198" x2="110" y2="198" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
          <line x1="80" y1="204" x2="115" y2="204" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
          <circle cx="84" cy="210" r="2" fill="#00ffaa" opacity="0.8" />
          <text x="100" y="212" textAnchor="middle" fill="#00d4ff" fontSize="5" fontFamily="monospace" opacity="0.8">portfolio.run()</text>

          {/* Floating data particles around character */}
          <circle cx="52" cy="110" r="2" fill="#00d4ff" opacity="0.6">
            <animate attributeName="cy" values="110;100;110" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="148" cy="130" r="1.5" fill="#7b2fff" opacity="0.7">
            <animate attributeName="cy" values="130;118;130" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="55" cy="165" r="1.5" fill="#00ffaa" opacity="0.5">
            <animate attributeName="cy" values="165;155;165" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <text x="145" y="108" fill="#00d4ff" fontSize="7" fontFamily="monospace" opacity="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            0.99
          </text>
          <text x="42" y="148" fill="#00ffaa" fontSize="7" fontFamily="monospace" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.2s" repeatCount="indefinite" />
            ML
          </text>
        </svg>

        {/* Floating glow under character */}
        <div className="hg-glow" />
      </div>
    </div>
  )
}
