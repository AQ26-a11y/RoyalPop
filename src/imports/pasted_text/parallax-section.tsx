Replace the entire content of "ParallaxSection.tsx" with this exact code:

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import img1 from '../imports/IMG1.jpg'
import img2 from '../imports/IMG2.jpg'
import img3 from '../imports/IMG3.jpg'
import img4 from '../imports/IMG4.jpg'
import img5 from '../imports/IMG5.jpg'

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return

    // Set sticky height to exact viewport height
    sticky.style.height = window.innerHeight + 'px'
    const onResize = () => { sticky.style.height = window.innerHeight + 'px' }
    window.addEventListener('resize', onResize)

    // All words start hidden below (100% = below overflow hidden container)
    gsap.set('.p-word-2', { yPercent: 100 })
    gsap.set('.p-word-3', { yPercent: 100 })

    const tl = gsap.timeline({ paused: true })

    // Images move up at different speeds
    tl.to('.p-img-1', { y: '-50vh', ease: 'none' }, 0)
    tl.to('.p-img-2', { y: '-70vh', ease: 'none' }, 0)
    tl.to('.p-img-3', { y: '-40vh', ease: 'none' }, 0)
    tl.to('.p-img-4', { y: '-60vh', ease: 'none' }, 0)
    tl.to('.p-img-5', { y: '-80vh', ease: 'none' }, 0)

    // Word 1 visible → exits up at 30%
    tl.to('.p-word-1', { yPercent: -100, duration: 0.08, ease: 'power3.in' }, 0.28)

    // Word 2 enters from below at 30% → exits up at 62%
    tl.to('.p-word-2', { yPercent: 0, duration: 0.08, ease: 'power3.out' }, 0.30)
    tl.to('.p-word-2', { yPercent: -100, duration: 0.08, ease: 'power3.in' }, 0.60)

    // Word 3 enters from below at 62% → exits up at 92%
    tl.to('.p-word-3', { yPercent: 0, duration: 0.08, ease: 'power3.out' }, 0.62)
    tl.to('.p-word-3', { yPercent: -100, duration: 0.08, ease: 'power3.in' }, 0.92)

    // Drive timeline with manual scroll progress
    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1)
      tl.progress(progress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      tl.kill()
    }
  }, [])

  const fontSize = 'clamp(48px, 8vw, 120px)'
  const fontStyle: React.CSSProperties = {
    fontFamily: '"Zalando Sans", sans-serif',
    fontSize,
    fontWeight: 700,
    fontVariationSettings: '"wdth" 115',
    color: '#1A1A1A',
    lineHeight: 1,
    letterSpacing: '-0.01em',
    whiteSpace: 'nowrap',
  }

  return (
    <div
      ref={sectionRef}
      style={{
        height: '200vh',
        position: 'relative',
        overflowX: 'hidden',
        background: '#ffffff',
      }}
    >
      <div
        ref={stickyRef}
        className="p-sticky"
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Images */}
        <img className="p-img-1" src={img1} alt="" style={{ position: 'absolute', top: '15%', left: '4%', width: 'clamp(180px, 22vw, 360px)', height: 'auto', borderRadius: 12 }} />
        <img className="p-img-2" src={img2} alt="" style={{ position: 'absolute', top: '8%', right: '4%', width: 'clamp(160px, 20vw, 320px)', height: 'auto', borderRadius: 12 }} />
        <img className="p-img-3" src={img3} alt="" style={{ position: 'absolute', top: '55%', left: '55%', width: 'clamp(200px, 24vw, 400px)', height: 'auto', borderRadius: 12 }} />
        <img className="p-img-4" src={img4} alt="" style={{ position: 'absolute', top: '60%', right: '3%', width: 'clamp(180px, 22vw, 360px)', height: 'auto', borderRadius: 12 }} />
        <img className="p-img-5" src={img5} alt="" style={{ position: 'absolute', top: '70%', left: '5%', width: 'clamp(160px, 20vw, 320px)', height: 'auto', borderRadius: 12 }} />

        {/* Text — replicates Hyundai structure exactly */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          pointerEvents: 'none',
          display: 'flex',
          gap: '0.25em',
          alignItems: 'center',
        }}>
          {/* Words container with overflow hidden — exactly like .one-goal__title-words */}
          <div style={{
            overflow: 'hidden',
            position: 'relative',
            height: '1.1em',
          }}>
            <div className="p-word-1" style={{ ...fontStyle, position: 'absolute', top: 0, left: 0 }}>Tradizione.</div>
            <div className="p-word-2" style={{ ...fontStyle, position: 'absolute', top: 0, left: 0 }}>Rivoluzione.</div>
            <div className="p-word-3" style={{ ...fontStyle, position: 'absolute', top: 0, left: 0 }}>Royal POP</div>
          </div>
        </div>
      </div>
    </div>
  )
}