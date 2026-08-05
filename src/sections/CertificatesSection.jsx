import React, { useEffect, useRef, useState } from 'react';
import { certificates } from '../data/portfolioData';
import './CertificatesSection.css';

const categories = [
  { id: 'all', label: 'All', color: 'var(--accent-primary)' },
  { id: 'ai-eng', label: 'AI Eng.', color: 'var(--accent-secondary)' },
  { id: 'ml-eng', label: 'ML Eng.', color: 'var(--accent-primary)' },
  { id: 'data-analysis', label: 'Data Analysis', color: '#00ffaa' },
];

export default function CertificatesSection() {
  const ref = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

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
      ref.current.querySelectorAll('.cert-reveal').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, [activeFilter]); // Re-run when filter changes to animate new items

  const filteredCerts = activeFilter === 'all' 
    ? certificates 
    : certificates.filter(c => c.category === activeFilter);

  return (
    <section id="certificates" className="certificates-section" ref={ref}>
      <div className="container">
        <div className="section-label cert-reveal in-view"><span>06</span> Credentials</div>
        <h2 className="section-title cert-reveal in-view">
          Verified <span style={{ color: 'var(--accent-primary)' }}>Certifications</span>
        </h2>
        <p className="section-subtitle cert-reveal in-view">
          Continuous learning and verified achievements from top institutions and platforms.
        </p>

        <div className="cert-filters cert-reveal in-view">
          {categories.map(cat => {
            const count = cat.id === 'all' 
              ? certificates.length 
              : certificates.filter(c => c.category === cat.id).length;
            
            return (
              <button
                key={cat.id}
                className={`cert-filter-btn ${activeFilter === cat.id ? 'active' : ''} ${cat.id}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
                <span className="cert-count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="certificates-grid">
          {filteredCerts.map((cert, i) => (
            <div 
              key={cert.id} 
              className={`cert-card cert-reveal in-view ${cert.category}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="cert-badge">{cert.category.replace('-', ' ').toUpperCase()}</div>
              <div className="cert-icon-wrapper">
                <span className="cert-icon">{cert.icon}</span>
              </div>
              <div className="cert-content">
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">
                  <span className="mono" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', marginRight: '6px' }}>&lt;Issuer&gt;</span>
                  {cert.issuer}
                </p>
                <div className="cert-footer">
                  <span className="cert-date mono">{cert.date}</span>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-verify-btn">
                    View
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
