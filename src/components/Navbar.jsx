import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Navbar.css";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  message: "",
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  const templateParams = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
    time: new Date().toLocaleString(),
  };

  emailjs.send(
    "service_62078",
    "template_euabu3k",
    templateParams,
    "jaWt0EtuhMcCabzDe"
  );

  emailjs.send(
    "service_62078",
    "template_t96jtd3",  
    {
      name: formData.name,
      email: formData.email,
    },
    "jaWt0EtuhMcCabzDe"
  );

  alert("✅ Message sent!");

  // clear form
  setFormData({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  setShowModal(false);


  console.log("Form Data:", formData);

  alert("Message sent!");

  // clear form
  setFormData({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  setShowModal(false);
};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-mode");
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#hero" className="navbar-logo">
            <span className="logo-bracket">[</span>
            <span className="logo-name">RK</span>
            <span className="logo-bracket">]</span>
          </a>

          {/* Links */}
          <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  <span className="link-num">//</span> {link.label}
                </a>
              </li>
            ))}

            <li>
              <button
                className="nav-cta"
                onClick={() => {
                  setShowModal(true);
                  setMenuOpen(false);
                }}
              >
                Hire Me
              </button>
            </li>
          </ul>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2>Hire Me</h2>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={formData.name}
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                value={formData.email}
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <textarea
                placeholder="Message"
                value={formData.message}
                required
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <button type="submit" className="submit-btn">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}