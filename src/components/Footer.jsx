import React from 'react';
import './Footer.css';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">[ RK ]</h3>
            <p className="footer-tagline">Building Intelligent Data Systems</p>
          </div>
          
          <div className="footer-links-row">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`} className="footer-link">Email</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Rupak Kumar. All rights reserved.
          </p>
          <div className="footer-built-with">
            Built with React <span style={{ color: 'var(--accent-primary)' }}>✦</span> Designed for AI
          </div>
        </div>
      </div>
    </footer>
  );
}
