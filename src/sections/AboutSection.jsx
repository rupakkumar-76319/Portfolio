import React, { useEffect, useRef } from 'react'
import { aboutText } from '../data/portfolioData'
import { ChevronDown } from "lucide-react";
import './AboutSection.css'

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view')),
      { threshold: 0.15 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Left — text content */}
          <div className="about-left">
            <div className="section-label reveal">
              <span>01</span> About Me
            </div>
            <h2 className="section-title reveal">Turning Data Into<br />
              <span className="accent-text">Intelligent Systems</span>
            </h2>

            <p className="about-intro reveal">{aboutText.intro}</p>
            <p className="about-story reveal">{aboutText.story}</p>

            <div className="about-philosophy reveal">
              <span className="quote-mark">"</span>
              <p>{aboutText.philosophy}</p>
              <span className="quote-mark">"</span>
            </div>

            <p className="about-goal reveal">{aboutText.goal}</p>
          </div>

          {/* Right — current focus card */}
          <div className="about-right">
            <div className="focus-card card reveal">
              <div className="focus-card-header">
                <span className="mono" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>
                  // currently_focused_on
                </span>
              </div>
              <ul className="focus-list">
                {aboutText.currentFocus.map((item, i) => (
                  <li key={i} className="focus-item">
                    <span className="focus-bullet">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech visual */}
            <div className="terminal-body">
                <div className="t-line">
                  <span className="t-cmd">cat</span> profile.txt
                </div>

                <div className="t-line t-out">Background: Electronics & Communication + Data Science</div>

                <div className="t-line t-out">Specialization: Artificial Intelligence & Machine Learning</div>

                <div className="t-line t-out">
                  Current Stage:
                  <span style={{ color: '#00ffaa' }}>
                    {" "}Learning → Building → Deploying
                  </span>
                </div>

                <div className="t-line">
                  <span className="t-cmd">echo</span> $career_goal
                </div>

                <div
                  className="t-line t-out"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  "Designing Scalable AI Systems"
                </div>

                <div className="t-line t-cursor">
                  <span className="cursor-blink">█</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
