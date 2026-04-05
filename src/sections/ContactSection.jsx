import React, { useEffect, useRef, useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import './ContactSection.css'

export default function ContactSection() {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.ct-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <div className="section-label ct-reveal"><span>06</span> Contact</div>
        <h2 className="section-title ct-reveal">
          Let's Build Something <span style={{ color: 'var(--accent-primary)' }}>Intelligent</span>
        </h2>
        <p className="section-subtitle ct-reveal">
          I’m actively seeking AI/ML internship opportunities where I can apply my skills in data, machine learning, and real-world problem solving.
        </p>
        <p className="contact-focus">
          Focused on building end-to-end AI/ML systems — from data to deployment.
        </p>

        <div className="contact-grid">
          {/* Left — message */}
          <div className="contact-left ct-reveal">
            <div className="contact-availability">
              <span className="avail-dot" />
              <span className="mono" style={{ fontSize: '0.75rem', color: '#00ffaa' }}>
                🚀 Actively Seeking AI/ML Internships
              </span>
            </div>

            <div className="contact-links">
              {/* Email */}
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                <div>
                  <div className="contact-label mono">Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="contact-value">
                    {personalInfo.email}
                  </a>
                </div>
                <button className="copy-btn" onClick={copyEmail}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              {/* GitHub */}
              <div className="contact-item">
                <span className="contact-icon">⌥</span>
                <div>
                  <div className="contact-label mono">GitHub</div>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-value">
                    {personalInfo.github.replace('https://', '')}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="contact-item">
                <span className="contact-icon">◈</span>
                <div>
                  <div className="contact-label mono">LinkedIn</div>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-value">
                    {personalInfo.linkedin.replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-cta-row">
              <button
                className="primary-btn"
                onClick={() => window.location.href = `mailto:${personalInfo.email}`}>
                Contact Me
              </button>
              <button
                className="secondary-btn"
                onClick={() =>window.open(personalInfo.resumeUrl, "_blank", "noopener,noreferrer")}>
                Download Resume
              </button>
            </div>
          </div>

          {/* Right — message terminal */}
          <div className="contact-right ct-reveal">
            <div className="message-terminal">
              <div className="terminal-header">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                <span className="mono terminal-title">send_message.py</span>
              </div>
              <div className="terminal-body">
                <div className="t-line"><span className="t-cmd">import</span> opportunity</div>
                <div className="t-line" style={{ marginTop: '10px' }}>
                  <span className="t-cmd">msg</span> = {'{'}
                </div>
                <div className="t-line" style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#00ffaa' }}>"from"</span>: <span style={{ color: 'var(--accent-secondary)' }}>"you"</span>,
                </div>
                <div className="t-line" style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#00ffaa' }}>"to"</span>: <span style={{ color: 'var(--accent-secondary)' }}>"Rupak Kumar"</span>,
                </div>
                <div className="t-line" style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#00ffaa' }}>"about"</span>: <span style={{ color: 'var(--accent-secondary)' }}>"AI/ML opportunity"</span>,
                </div>
                <div className="t-line" style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#00ffaa' }}>"result"</span>: <span style={{ color: '#00ffaa' }}>"intelligent_solution"</span>
                </div>
                <div className="t-line">{'}'}</div>
                <div className="t-line" style={{ marginTop: '10px' }}>
                  <span className="t-cmd">if</span> opportunity == 
                  <span style={{ color: '#00ffaa' }}> "AI/ML Internship"</span>:
                </div>

                <div className="t-line" style={{ paddingLeft: '20px' }}>
                  connect_with(
                  <span style={{ color: 'white' }}>"Rupak Kumar"</span>)
                </div>
                <div className="t-line t-out" style={{ color: '#00ffaa', marginTop: '8px' }}>
                  ✓ Connection initialized — Ready to build intelligent systems.
                </div>
                <div className="t-line t-cursor"><span className="cursor-blink">█</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
