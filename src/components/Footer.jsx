import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Rupak Kumar</p>
      <p>Built with React • AI/ML Portfolio</p>
    </footer>
  )
}
