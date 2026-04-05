import React, { useEffect, useState } from 'react'
import Navbar from "./components/Navbar";
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import PipelineSection from './sections/PipelineSection'
import ProjectsSection from './sections/ProjectsSection'
import TimelineSection from './sections/TimelineSection'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Lenis from 'lenis'

function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [loaded])

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <PipelineSection />
            <ProjectsSection />
            <TimelineSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
