import React, { useEffect, useRef, useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import './ContactSection.css'

export default function ContactSection() {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)
  const [showResumeMenu, setShowResumeMenu] = useState(false)

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

  // Handle clicking outside the resume menu to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showResumeMenu && !e.target.closest('.resume-dropdown-wrapper')) {
        setShowResumeMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showResumeMenu])

  const openResume = (type) => {
    let url = personalInfo.resumeUrl; // default ML
    if (type === 'ai') url = '/pdf_models/Resume/Resume_AI.pdf';
    if (type === 'data') url = '/pdf_models/Resume/Rupak_DS_Resume.pdf';

    window.open(url, "_blank", "noopener,noreferrer");
    setShowResumeMenu(false);
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <div className="section-label ct-reveal"><span>08</span> Contact</div>
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
                    Initialize Connection ()
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-cta-row">

              <a
                href={`mailto:${personalInfo.email}`}
                className="primary-btn"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Email
              </a>

              <div className="resume-dropdown-wrapper" style={{ position: 'relative' }}>
                <button
                  className="secondary-btn"
                  style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                  onClick={() => setShowResumeMenu(!showResumeMenu)}>
                  Extract Resume <span className="mono" style={{ fontSize: '0.9rem', opacity: 0.7, marginLeft: '8px' }}>[PDF] ▼</span>
                </button>

                {showResumeMenu && (
                  <div className="resume-dropdown-menu">
                    <div className="resume-dropdown-header mono">Select Target Profile:</div>
                    <button className="resume-dropdown-item ai-theme" onClick={() => openResume('ai')}>
                      <span className="r-icon">🤖</span>
                      <div className="r-text">
                        <strong>AI Engineer</strong>
                        <span>Agentic AI & LLMs</span>
                      </div>
                    </button>
                    <button className="resume-dropdown-item ml-theme" onClick={() => openResume('ml')}>
                      <span className="r-icon">⚙️</span>
                      <div className="r-text">
                        <strong>ML Engineer</strong>
                        <span>Pipelines & Models</span>
                      </div>
                    </button>
                    <button className="resume-dropdown-item da-theme" onClick={() => openResume('data')}>
                      <span className="r-icon">📊</span>
                      <div className="r-text">
                        <strong>Data Science</strong>
                        <span>Analytics & SQL</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
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
