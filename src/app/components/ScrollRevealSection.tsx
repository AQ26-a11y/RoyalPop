import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ambientataBig from '../../imports/Ambientata-big.jpg'

const TITLE_STYLE = {
  fontFamily: 'var(--font-heading)',
  fontSize: 40,
  fontWeight: 400,
  fontSynthesis: 'none',
  lineHeight: '48px',
  letterSpacing: '-0.5px',
  color: '#1A1A1A',
  marginBottom: 12,
} as const

const BODY_STYLE = {
  fontFamily: 'var(--font-body)',
  fontSize: 18,
  fontWeight: 400,
  lineHeight: '28px',
  letterSpacing: '-0.3px',
  color: 'rgb(58, 58, 58)',
} as const

export function ScrollRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const imgWrapper = imgWrapperRef.current
    if (!section || !imgWrapper) return

    const applyInitialState = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const imgH = vw * 0.5625
      gsap.set(imgWrapper, {
        width: vw,
        height: imgH,
        top: (vh - imgH) / 2,
        left: 0,
      })
    }

    applyInitialState()

    gsap.set('.sr2-block-1', { opacity: 0, y: 60 })
    gsap.set('.sr2-block-2', { opacity: 0, y: 60 })
    gsap.set('.sr2-block-3', { opacity: 0, y: 60 })

    const tl = gsap.timeline({ paused: true })

    // Phase 1 (0 → 0.20): expand to full viewport
    tl.to(imgWrapper, {
      height: () => window.innerHeight,
      width: () => window.innerWidth,
      top: 0,
      duration: 0.20,
      ease: 'none',
    }, 0)

    // Phase 2 (0.20 → 0.40): shift to left half
    tl.to(imgWrapper, {
      width: () => window.innerWidth * 0.5,
      duration: 0.20,
      ease: 'none',
    }, 0.20)

    // Phase 3-5 (0.40 → 0.82): text blocks enter
    tl.to('.sr2-block-1', { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.40)
    tl.to('.sr2-block-2', { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.55)
    tl.to('.sr2-block-3', { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.70)

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      const progress = Math.min(Math.max(-rect.top / sectionHeight, 0), 1)
      tl.progress(progress)
    }

    const onResize = () => {
      applyInitialState()
      tl.invalidate()
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      tl.kill()
    }
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sr2-mobile-stack { display: flex !important; }
          .sr2-desktop-sticky { display: none !important; }
        }
        @media (min-width: 769px) {
          .sr2-mobile-stack { display: none !important; }
        }
      `}</style>

      {/* Desktop: sticky scroll-driven */}
      <div ref={sectionRef} className="sr2-desktop-sticky" style={{ height: '500vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          {/* Image */}
          <div
            ref={imgWrapperRef}
            style={{ position: 'absolute', overflow: 'hidden', zIndex: 2 }}
          >
            <img
              src={ambientataBig}
              alt="Royal Oak x Swatch"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center', display: 'block' }}
            />
          </div>

          {/* Text panel — right grid columns 6–8 (62.5% → 87.5%) */}
          <div style={{
            position: 'absolute',
            left: '62.5%',
            top: 0,
            width: '25%',
            height: '100%',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            gap: 40,
            zIndex: 1,
          }}>
            <div className="sr2-block-1">
              <div style={TITLE_STYLE}>Bioceramic</div>
              <div style={BODY_STYLE}>Developed and patented by Swatch, <span style={{fontWeight:600}}>Bioceramic</span> is a composite material made of two thirds ceramic and one third biological material derived from <span style={{fontWeight:600}}>castor oil</span>.</div>
            </div>
            <div className="sr2-block-2">
              <div style={TITLE_STYLE}>Royal Oak</div>
              <div style={BODY_STYLE}>Born in <span style={{fontWeight:600}}>1972</span>, the <span style={{fontWeight:600}}>Royal Oak</span> was the first luxury sports watch in stainless steel. In the Royal Pop, every iconic detail is reinterpreted in Bioceramic — lighter, bolder, built for a <span style={{fontWeight:600}}>new generation</span>.</div>
            </div>
            <div className="sr2-block-3">
              <div style={TITLE_STYLE}>A Swiss icon</div>
              <div style={BODY_STYLE}>Founded in <span style={{fontWeight:600}}>1875</span>, <span style={{fontWeight:600}}>Audemars Piguet</span> is one of the last truly independent Swiss manufacturers. For <span style={{fontWeight:600}}>150 years</span>, the Maison has pushed the boundaries of watchmaking — and with <span style={{fontWeight:600}}>Royal Pop</span>, for an entirely new audience.</div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="sr2-mobile-stack" style={{
        display: 'none',
        flexDirection: 'column',
        background: 'transparent',
      }}>
        <img
          src={ambientataBig}
          alt="Royal Oak x Swatch"
          style={{ width: '100%', height: '40vh', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: '48px 24px' }}>
          <div>
            <div style={TITLE_STYLE}>Bioceramic</div>
            <div style={BODY_STYLE}>Developed and patented by Swatch, <span style={{fontWeight:600}}>Bioceramic</span> is a composite material made of two thirds ceramic and one third biological material derived from <span style={{fontWeight:600}}>castor oil</span>.</div>
          </div>
          <div>
            <div style={TITLE_STYLE}>Royal Oak</div>
            <div style={BODY_STYLE}>Born in <span style={{fontWeight:600}}>1972</span>, the <span style={{fontWeight:600}}>Royal Oak</span> was the first luxury sports watch in stainless steel. In the Royal Pop, every iconic detail is reinterpreted in Bioceramic — lighter, bolder, built for a <span style={{fontWeight:600}}>new generation</span>.</div>
          </div>
          <div>
            <div style={TITLE_STYLE}>A Swiss icon</div>
            <div style={BODY_STYLE}>Founded in <span style={{fontWeight:600}}>1875</span>, <span style={{fontWeight:600}}>Audemars Piguet</span> is one of the last truly independent Swiss manufacturers. For <span style={{fontWeight:600}}>150 years</span>, the Maison has pushed the boundaries of watchmaking — and with <span style={{fontWeight:600}}>Royal Pop</span>, for an entirely new audience.</div>
          </div>
        </div>
      </div>
    </>
  )
}
