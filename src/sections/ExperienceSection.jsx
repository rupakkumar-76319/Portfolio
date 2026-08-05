import React, { useEffect, useRef } from 'react';
import { experience } from '../data/portfolioData';
import './ExperienceSection.css';

export default function ExperienceSection() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        }
      }),
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      ref.current.querySelectorAll('.exp-reveal').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className="container">
        <div className="section-label exp-reveal"><span>03</span> Experience</div>
        <h2 className="section-title exp-reveal">
          Professional <span style={{ color: 'var(--accent-secondary)' }}>Journey</span>
        </h2>
        <p className="section-subtitle exp-reveal">
          Real-world industry experience and structured training.
        </p>

        <div className="experience-list">
          {experience.map((exp, i) => (
            <div 
              key={exp.id} 
              className="exp-card exp-reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="exp-header">
                <div className="exp-role-company">
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company-wrap">
                    <span className="exp-company">{exp.company}</span>
                    <span className="exp-type mono">{exp.type}</span>
                  </div>
                </div>
                <div className="exp-date mono">{exp.date}</div>
              </div>
              
              <div className="exp-body">
                <p className="exp-desc">{exp.desc}</p>
                <div className="exp-focus-tags">
                  {exp.focus.map((f, idx) => (
                    <span key={idx} className="focus-tag">{f}</span>
                  ))}
                </div>
              </div>
              
              <div className="exp-footer">
                <a href={exp.certificate} target="_blank" rel="noopener noreferrer" className="exp-cert-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
