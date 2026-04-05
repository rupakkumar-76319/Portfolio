import React, { useEffect, useRef, useState, useCallback } from 'react'
import { pipeline } from '../data/portfolioData'
import './PipelineSection.css'

export default function PipelineSection() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const resumeTimeout = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.pipe-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % pipeline.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleStepClick = useCallback((index) => {
  // instant navigation
  setActive(index)

  // pause autoplay
  setIsPaused(true)

  // reset resume timer
  if (resumeTimeout.current) {
    clearTimeout(resumeTimeout.current)
  }

  // auto resume after 8s idle
  resumeTimeout.current = setTimeout(() => {
    setIsPaused(false)
  }, 8000)

}, [])

  return (
    <section id="pipeline" className="pipeline-section" ref={ref}>
      <div className="container">
        <div className="section-label pipe-reveal"><span>03</span> Methodology</div>
        <h2 className="section-title pipe-reveal">
          AI/ML Engineering <span style={{ color: 'var(--accent-primary)' }}>Workflow</span>
        </h2>
        <h4>Inspired by the progression from Data Analyst → Data Scientist → AI/ML Engineer.</h4>
        <p className="section-subtitle pipe-reveal">
          I follow a structured AI/ML workflow that moves from data understanding to deploying real-world intelligent systems.
        </p>

        <div className="pipeline-container pipe-reveal">
          <div className="pipeline-steps">
            {pipeline.map((step, i) => (
              <div
                key={i}
                className={`pipeline-step ${active === i ? 'active' : ''}`}
                onClick={() => handleStepClick(i)}
              >
                <div className="step-left">
                  <div className="step-number">{step.step}</div>
                  <div className={`step-connector ${i < pipeline.length - 1 ? 'show' : ''}`}>
                    <div className="connector-line" />
                    <div className="connector-dot" />
                  </div>
                </div>
                <div className="step-content">
                  <div className="step-header">
                    <span className="step-icon">{step.icon}</span>
                    <h3 className="step-title">{step.title}</h3>
                  </div>
                  <p className="step-desc">{step.desc}</p>
                  <div className="detail-tools">
                    <span className="mono tools-label">Tools:</span>{" "}
                    {pipeline[active].tools.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pipeline-detail">
            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-step-num mono">
                  STEP {pipeline[active].step}
                </span>
                <span className="detail-icon">
                  {pipeline[active].icon}
                </span>
              </div>

              <h3 className="detail-title">
                {pipeline[active].title}
              </h3>

              <p className="detail-desc">{pipeline[active].desc}</p>

              <div className="detail-tools">
                <span className="mono">Tools:</span>
                <div className="tools-list">
                  {pipeline[active].tools.map((tool, i) => (
                    <span key={i} className="tool-badge">{tool}</span>
                  ))}
                </div>
              </div>

              <div className="detail-outcome">
                <span className="mono">Outcome:</span>
                <p>{pipeline[active].outcome}</p>
              </div>

              <div className="detail-impact">
                <span className="mono">Impact:</span>
                <p>{pipeline[active].impact}</p>
              </div>

              <div className="detail-progress">
                {pipeline.map((_, i) => (
                  <div
                    key={i}
                    className={`progress-dot ${
                      i === active ? "active" : i < active ? "done" : ""
                    }`}
                    onClick={() => handleStepClick(i)}
                  />
                ))}
              </div>

              <div className="detail-code">
                <span className="code-comment mono">
                  {'// pipeline.step(' + pipeline[active].step + ')'}
                </span>
                <br />
                <span className="code-execute mono">
                  {'execute("' + pipeline[active].executeText + '")'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="pipeline-tagline pipe-reveal">
          This pipeline represents my approach to building complete AI solutions — from messy raw data to production-ready intelligent systems.
        </p>
      </div>
    </section>
  )
}
