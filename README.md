# Rupak Kumar — AI/ML Engineer Portfolio 🚀

A premium, interactive, and highly optimized portfolio website designed for an AI/ML Engineer. Featuring custom animations, a dynamic glassmorphic UI, an interactive AI Guide ("Aria"), and deep technical sections highlighting machine learning projects and data science expertise.

---

## 🌟 Key Features

- **Dynamic Hero Section:** Canvas-based interactive particle network using pure Math/Canvas (no external 3D libraries required) with animated stat counters.
- **AI Guide "Aria":** A custom CSS-animated guide character that tracks your scroll position and provides contextual messages for each section.
- **Targeted Resume Selector:** A sleek interactive modal that allows recruiters to download specific resumes tailored for AI Engineering, ML Engineering, or Data Science.
- **ML Pipeline Visualizer:** A step-by-step visual representation of End-to-End ML and Agentic AI workflows.
- **Glassmorphic UI:** Modern frosted-glass aesthetic applied to cards, navigation, and modals.
- **Responsive & Optimized:** 100% mobile responsive with lazy-loading for images and Open Graph (OG) meta tags for professional social sharing.

---

## 💻 Tech Stack

- **Framework:** React 18 + Vite (Blazing fast development server)
- **Styling:** Pure CSS with CSS Variables (Design Tokens) for easy theme management
- **Animations:** 
  - Framer Motion (Component mounting & layout animations)
  - GSAP & Lenis (Smooth scrolling & scroll-triggered effects)
- **Interactive Elements:** HTML5 Canvas (Particle Network)

---

## 📂 Project Structure

```text
portfolio/
├── public/
│   ├── certificates/   ← PDF certificates and credentials
│   ├── pdf_models/     ← Targeted Resumes (AI, ML, Data Science)
│   └── images/         ← Profile pictures and project screenshots
├── src/
│   ├── assets/
│   │   └── global.css        ← Global design tokens, typography, and utility classes
│   ├── components/
│   │   ├── Navbar.jsx        ← Responsive top navigation
│   │   ├── Footer.jsx        ← Minimalist branded footer
│   │   ├── GuideGirl.jsx     ← Animated AI guide "Aria"
│   │   ├── CustomCursor.jsx  ← Custom cursor implementation
│   │   └── BackToTop.jsx     ← Floating scroll-to-top button
│   ├── sections/
│   │   ├── HeroSection.jsx   ← Particle canvas, animated stats, intro
│   │   ├── AboutSection.jsx  ← Terminal-styled about me
│   │   ├── SkillsSection.jsx ← Technical skills grid
│   │   ├── PipelineSection.jsx ← ML/AI workflow methodology
│   │   ├── ProjectsSection.jsx ← Project case studies
│   │   ├── ExperienceSection.jsx ← Professional experience
│   │   ├── CertificatesSection.jsx ← Credentials with PDF links
│   │   ├── TimelineSection.jsx ← Educational/Professional journey
│   │   └── ContactSection.jsx  ← Contact form & Resume selector
│   ├── data/
│   │   └── portfolioData.js  ← ⭐️ CENTRALIZED DATA: Edit this file to update content!
│   └── App.jsx               ← Main application layout
├── index.html                ← HTML entry point & OG Meta Tags
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rupakkumar-76319/portfolio_v2.git
   cd portfolio_v2/portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The app will run at `http://localhost:5173/`*

4. **Build for production:**
   ```bash
   npm run build
   ```
   *This will generate a highly optimized `dist` folder ready for deployment.*

---

## ⚙️ Customization

The portfolio is designed to be easily updatable without digging through complex component code. **Almost all content is driven by a single file: `src/data/portfolioData.js`.**

### 1. Update Personal Info
Change your name, role, email, and social links in the `personalInfo` object.

### 2. Add or Edit Projects
Find the `projects` array and add your latest work:
```javascript
{
  id: 1,
  title: "GitHub Intelligence MCP Server",
  desc: "An AI-powered GitHub MCP Server...",
  category: "ai-eng",
  tags: ["AI", "Python", "MCP", "LLM", "GitHub API"],
  github: "https://github.com/...",
  demo: "#",
  status: "in-progress",
}
```

### 3. Update the Resume Files
Place your new PDF resumes inside `public/pdf_models/Resume/`. Ensure the filenames match the links specified in `ContactSection.jsx`.

---

## 🌐 Deployment

This project is optimized for effortless deployment on platforms like Vercel, Netlify, or GitHub Pages.

**Deploying to Vercel (Recommended):**
1. Push your code to GitHub.
2. Log into [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your GitHub repository.
4. Leave the default build settings (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
5. Click **Deploy**.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE). Feel free to fork, customize, and use it for your own portfolio!

---
*Built by Rupak Kumar for the AI/ML Engineering community.*
