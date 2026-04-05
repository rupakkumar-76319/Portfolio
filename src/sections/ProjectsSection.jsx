import React, { useEffect, useRef } from 'react'
import { projects } from '../data/portfolioData'
import './ProjectsSection.css'

const statusColors = {
  completed: '#00ffaa',
  'in-progress': '#00d4ff',
  planned: '#7b2fff',
}

export default function ProjectsSection() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.proj-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <div className="section-label proj-reveal"><span>04</span> Projects</div>
        <h2 className="section-title proj-reveal">
          End-to-End <span style={{ color: 'var(--accent-primary)' }}>AI Systems</span>
        </h2>
        <p className="section-subtitle proj-reveal">
          Each project demonstrates my ability to take a problem from raw data all the way to a deployed, real-world solution.
        </p>

        {/* Project cards */}
        <div className="projects-grid">
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              className="project-card card proj-reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Top bar */}
              <div className="project-top">
                <div className="project-index mono">{String(proj.id).padStart(2, '0')}</div>
                <div className="project-status" style={{ '--status-color': statusColors[proj.status] }}>
                  <span className="status-dot" />
                  {proj.status}
                </div>
              </div>

              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>

              <div className="project-tags">
                {proj.tags.map((tag, j) => (
                  <span key={j} className="tag">{tag}</span>
                ))}
              </div>

              <div className="project-pipeline-mini">
                <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Pipeline:</span>
                <div className="mini-steps">
                  {proj.pipeline.map((s, j) => (
                    <React.Fragment key={j}>
                      <span className="mini-step">{s}</span>
                      {j < proj.pipeline.length - 1 && (<span className="mini-arrow">→</span>)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
 
              <div className="project-links">
                {proj.github && (proj.github !== "#") && (
                  <a href={proj.github} className="proj-link" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {proj.powerBI && (proj.powerBI !== "#") && (
                  <a href={proj.powerBI} className="proj-link powerbi" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    PowerBI
                  </a>
                )}
                {proj.details && (proj.details !== "#" || proj.details !=="") && (
                  <a href={proj.details} className="proj-link" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16v16H4z"/>
                      <path d="M9 9h6v6H9z"/>
                    </svg>
                    Details
                  </a>
                )}
                {proj.demo && proj.demo !== "#" && (
                  <a href={proj.demo} className="proj-link proj-link-demo" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Add project placeholder */}
          <div className="project-card project-placeholder proj-reveal" style={{ transitionDelay: '0.36s' }}>
            <div className="placeholder-inner">
              <div className="placeholder-icon">+</div>
              <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                More projects coming soon
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Add your projects in <code>src/data/portfolioData.js</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
