// GSAP animation helpers — import and use in components

export const fadeInUp = (element, delay = 0) => ({
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay }
})

export const staggerReveal = (elements, stagger = 0.1) => ({
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0, duration: 0.6, stagger, ease: 'power2.out' }
})
