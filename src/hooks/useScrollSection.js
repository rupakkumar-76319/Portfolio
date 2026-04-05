import { useState, useEffect } from 'react'

export function useScrollSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const onScroll = () => {
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds])

  return active
}
