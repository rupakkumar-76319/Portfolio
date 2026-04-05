# Rupak Kumar — AI/ML Engineer Portfolio

A dark, futuristic portfolio website with neural network particle animations, animated AI guide character (Aria), and full AI/ML content sections.

## Tech Stack
- **React + Vite** — Fast dev experience
- **GSAP** — Scroll animations
- **Lenis** — Smooth scrolling
- **Three.js / Canvas** — Particle network hero
- **Framer Motion** — Component animations
- **Pure CSS** — Custom cursor, animated guide

## Folder Structure
```
portfolio/
├── public/
│   ├── models/       ← Add your .glb 3D models here
│   ├── images/       ← Static images & favicon
│   └── fonts/        ← Custom font files (if self-hosting)
├── src/
│   ├── assets/
│   │   └── global.css        ← Design tokens & global styles
│   ├── components/
│   │   ├── Navbar.jsx        ← Fixed top navigation
│   │   ├── Footer.jsx        ← Footer
│   │   ├── GuideGirl.jsx     ← Animated AI guide "Aria"
│   │   └── CustomCursor.jsx  ← Custom cursor
│   ├── sections/
│   │   ├── HeroSection.jsx   ← Landing + particle canvas
│   │   ├── AboutSection.jsx  ← About + terminal block
│   │   ├── SkillsSection.jsx ← 4-column skill cards
│   │   ├── PipelineSection.jsx ← ML workflow visualizer
│   │   ├── ProjectsSection.jsx ← Project cards grid
│   │   ├── TimelineSection.jsx ← Journey timeline
│   │   └── ContactSection.jsx  ← Contact + code terminal
│   ├── data/
│   │   └── portfolioData.js  ← ⭐ EDIT THIS FILE for your content
│   ├── hooks/                ← Custom React hooks
│   ├── utils/                ← Helper functions
│   ├── pages/                ← Page components (for routing)
│   ├── App.jsx
│   └── main.jsx
├── projects/                 ← Project case study markdown files
├── backend/                  ← Contact form API (Node/Express)
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Customization

### Update your content
Edit `src/data/portfolioData.js` — all text, projects, skills, and social links are centralized here.

### Add your projects
In `portfolioData.js`, find the `projects` array and add your real projects:
```js
{
  id: 4,
  title: "Your Project Name",
  desc: "Brief description of what it does.",
  tags: ["Python", "FastAPI", "Scikit-learn"],
  github: "https://github.com/yourusername/project",
  demo: "https://your-demo-url.com",
  status: "completed", // "completed" | "in-progress" | "planned"
}
```

### Add a 3D Model (optional)
Place a `.glb` file in `public/models/` and integrate it using `@react-three/fiber` in HeroSection.

### Update contact info
In `portfolioData.js`, update `personalInfo` with your real email, GitHub, and LinkedIn.

## Guide Character — Aria
The animated guide girl "Aria" lives in `src/components/GuideGirl.jsx`.
- She detects scroll position and shows contextual messages per section
- She blinks, waves, and floats with CSS animations
- She can be dismissed by clicking the ✕ button
- Update her messages in `portfolioData.js` under `guideMessages`

## Deployment
Works on Vercel, Netlify, GitHub Pages:
```bash
npm run build
# Deploy the /dist folder
```

## License
MIT — Feel free to use and customize.
