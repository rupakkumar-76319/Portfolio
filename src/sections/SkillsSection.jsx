import React, { useEffect, useRef } from 'react'
import { skills } from '../data/portfolioData'
import './SkillsSection.css'

export default function SkillsSection() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.skill-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
  <section id="skills" className="skills-section" ref={ref}>
    <div className="container">

      {/* Section Header */}
      <div className="section-label skill-reveal">
        <span>02</span> Skills
      </div>

      <h2 className="section-title skill-reveal">
        My Tech <span style={{ color: 'var(--accent-primary)' }}>Arsenal</span>
      </h2>

      <p className="section-subtitle skill-reveal">
        From raw data to deployed models — these are the tools and techniques I use to build end-to-end AI systems.
      </p>
      {}
      <p className="skills-learning-note skill-reveal">
        Currently strengthening skills in model deployment and scalable AI systems.
      </p>

      {/* Skills Grid */}
      <div className="skills-grid">
        {skills.map((group, i) => (
          <div
            key={i}
            className="skill-card card skill-reveal"
            style={{
              '--card-color': group.color,
              transitionDelay: `${i * 0.1}s`
            }}
          >
            {/* Card Header */}
            <div className="skill-card-header">
              <span className="skill-icon">{group.icon}</span>
              <h3 className="skill-category">{group.category}</h3>
            </div>

            {/* Skills */}
            <ul className="skill-items">
              {group.items.map((item, j) => (
                <li key={j} className="skill-item">
                  <span className="skill-dot" />

                  <div className="skill-text">
                    <span className="skill-name">{item.name}</span>
                    <span className={`skill-level level-${item.level?.toLowerCase()}`}>
                      {item.level}
                    </span>
                  </div>

                </li>
              ))}
            </ul>
            {/* Glow Accent */}
            <div className="skill-card-accent" />
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}
