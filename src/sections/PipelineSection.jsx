import React, { useEffect, useRef, useState, useCallback } from 'react'
import { pipeline, aiPipeline } from '../data/portfolioData'
import './PipelineSection.css'

const TABS = [
  {
    id: 'ml',
    label: 'ML Engineering',
    data: pipeline,
    heading: <>ML Engineering <span style={{ color: 'var(--accent-primary)' }}>Workflow</span></>,
    subtitle: 'I follow a structured ML workflow that moves from data understanding to deploying real-world predictive systems.',
    tagline: 'This pipeline represents my approach to building complete ML solutions — from messy raw data to production-ready predictive systems.',
  },
  {
    id: 'ai',
    label: 'AI Engineering',
    data: aiPipeline,
    heading: <>AI Engineering <span style={{ color: 'var(--accent-secondary)' }}>Workflow</span></>,
    subtitle: 'I build intelligent AI systems using LLMs, prompt engineering, RAG, and agentic architectures for real-world automation.',
    tagline: 'This pipeline represents my approach to building AI-powered systems — from problem analysis to deploying autonomous intelligent agents.',
  },
]

export default function PipelineSection() {
  const ref = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const resumeTimeout = useRef(null)

  const currentTab = TABS[activeTab]
  const currentPipeline = currentTab.data

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.pipe-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % currentPipeline.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [isPaused, currentPipeline.length])

  // Tab switch handler
  const handleTabSwitch = useCallback((index) => {
    setActiveTab(index)
    setActive(0)
    setIsPaused(false)
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current)
    }
  }, [])

  // Step click handler
  const handleStepClick = useCallback((index) => {
    setActive(index)
    setIsPaused(true)

    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current)
    }

    resumeTimeout.current = setTimeout(() => {
      setIsPaused(false)
    }, 8000)
  }, [])

  return (
    <section id="pipeline" className="pipeline-section" ref={ref}>
      <div className="container">
        <div className="section-label pipe-reveal"><span>05</span> Methodology</div>

        {/* Workflow Tabs */}
        <div className="workflow-tabs pipe-reveal">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              className={`workflow-tab ${activeTab === i ? 'active' : ''} ${tab.id === 'ai' ? 'ai-tab' : ''}`}
              onClick={() => handleTabSwitch(i)}
            >
              <span className="tab-icon">{tab.id === 'ml' ? '⚙️' : '🤖'}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <h2 className="section-title pipe-reveal">
          {currentTab.heading}
        </h2>
        <p className="section-subtitle pipe-reveal">
          {currentTab.subtitle}
        </p>

        <div className="pipeline-container pipe-reveal">
          <div className="pipeline-steps">
            {currentPipeline.map((step, i) => (
              <div
                key={`${currentTab.id}-${i}`}
                className={`pipeline-step ${active === i ? 'active' : ''}`}
                onClick={() => handleStepClick(i)}
              >
                <div className="step-left">
                  <div className="step-number">{step.step}</div>
                  <div className={`step-connector ${i < currentPipeline.length - 1 ? 'show' : ''}`}>
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
                    {step.tools.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pipeline-detail">
            <div className={`detail-card ${activeTab === 1 ? 'ai-accent' : ''}`}>
              <div className="detail-header">
                <span className="detail-step-num mono">
                  STEP {currentPipeline[active].step}
                </span>
                <span className="detail-icon">
                  {currentPipeline[active].icon}
                </span>
              </div>

              <h3 className="detail-title">
                {currentPipeline[active].title}
              </h3>

              <p className="detail-desc">{currentPipeline[active].desc}</p>

              <div className="detail-tools">
                <span className="mono">Tools:</span>
                <div className="tools-list">
                  {currentPipeline[active].tools.map((tool, i) => (
                    <span key={i} className="tool-badge">{tool}</span>
                  ))}
                </div>
              </div>

              <div className="detail-outcome">
                <span className="mono">Outcome:</span>
                <p>{currentPipeline[active].outcome}</p>
              </div>

              <div className="detail-impact">
                <span className="mono">Impact:</span>
                <p>{currentPipeline[active].impact}</p>
              </div>

              <div className="detail-progress">
                {currentPipeline.map((_, i) => (
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
                  {'// pipeline.step(' + currentPipeline[active].step + ')'}
                </span>
                <br />
                <span className="code-execute mono">
                  {'execute("' + currentPipeline[active].executeText + '")'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="pipeline-tagline pipe-reveal">
          {currentTab.tagline}
        </p>
      </div>
    </section>
  )
}
