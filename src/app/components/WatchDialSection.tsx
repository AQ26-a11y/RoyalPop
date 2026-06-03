import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import dialImg from '../../imports/03_d_1920x950.jpg'

const TITLE_STYLE = {
  fontFamily: 'var(--font-body)',
  fontSize: 40,
  fontWeight: 600,
  lineHeight: '48px',
  letterSpacing: '-2px',
  color: '#1A1A1A',
  marginBottom: 12,
} as const

const BODY_STYLE = {
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '26px',
  color: '#3A3A3A',
} as const

export function WatchDialSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const imgWrapper = imgWrapperRef.current
    if (!section || !imgWrapper) return

    const applyInitialState = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const imgH = vw * (950 / 1920)
      gsap.set(imgWrapper, {
        width: vw,
        height: imgH,
        top: (vh - imgH) / 2,
        left: 0,
      })
    }

    applyInitialState()

    gsap.set('.wd-block-1', { opacity: 0, y: 60 })
    gsap.set('.wd-block-2', { opacity: 0, y: 60 })
    gsap.set('.wd-block-3', { opacity: 0, y: 60 })

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
    tl.to('.wd-block-1', { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.40)
    tl.to('.wd-block-2', { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.55)
    tl.to('.wd-block-3', { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.70)

    // Phase 5 (0.87 → 1.0): all blocks exit up
    tl.to('.wd-block-1, .wd-block-2, .wd-block-3', {
      opacity: 0,
      y: -40,
      duration: 0.13,
      ease: 'none',
    }, 0.87)

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
          .wd-mobile-stack { display: flex !important; }
          .wd-desktop-sticky { display: none !important; }
        }
        @media (min-width: 769px) {
          .wd-mobile-stack { display: none !important; }
        }
      `}</style>

      {/* Desktop: sticky scroll-driven */}
      <div ref={sectionRef} className="wd-desktop-sticky" style={{ height: '500vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          {/* Image */}
          <div
            ref={imgWrapperRef}
            style={{ position: 'absolute', overflow: 'hidden', zIndex: 2 }}
          >
            <img
              src={dialImg}
              alt="Royal Pop watch dial"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
            />
          </div>

          {/* Text panel — right: 62.5% → 87.5% */}
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
            gap: 40,
            zIndex: 1,
          }}>
            <div className="wd-block-1">
              <div style={TITLE_STYLE}>The Dial</div>
              <div style={BODY_STYLE}>A canvas of colour and craft. The Royal Pop dial draws on 50 years of Royal Oak iconography — the iconic tapisserie pattern reimagined through Swatch's irreverent pop sensibility.</div>
            </div>
            <div className="wd-block-2">
              <div style={TITLE_STYLE}>Sapphire Crystal</div>
              <div style={BODY_STYLE}>Protected by a scratch-resistant sapphire crystal, the dial remains perfectly legible. Anti-reflective coating ensures clarity from every angle, in any light.</div>
            </div>
            <div className="wd-block-3">
              <div style={TITLE_STYLE}>Royal Oak DNA</div>
              <div style={BODY_STYLE}>The octagonal bezel, the integrated bracelet, the petit tapisserie — every detail traces back to Gerald Genta's 1972 masterpiece, now reborn in bold bioceramic.</div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="wd-mobile-stack" style={{
        display: 'none',
        flexDirection: 'column',
        background: 'transparent',
      }}>
        <img
          src={dialImg}
          alt="Royal Pop watch dial"
          style={{ width: '100%', height: '40vh', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: '48px 24px' }}>
          <div>
            <div style={TITLE_STYLE}>The Dial</div>
            <div style={BODY_STYLE}>A canvas of colour and craft. The Royal Pop dial draws on 50 years of Royal Oak iconography — the iconic tapisserie pattern reimagined through Swatch's irreverent pop sensibility.</div>
          </div>
          <div>
            <div style={TITLE_STYLE}>Sapphire Crystal</div>
            <div style={BODY_STYLE}>Protected by a scratch-resistant sapphire crystal, the dial remains perfectly legible. Anti-reflective coating ensures clarity from every angle, in any light.</div>
          </div>
          <div>
            <div style={TITLE_STYLE}>Royal Oak DNA</div>
            <div style={BODY_STYLE}>The octagonal bezel, the integrated bracelet, the petit tapisserie — every detail traces back to Gerald Genta's 1972 masterpiece, now reborn in bold bioceramic.</div>
          </div>
        </div>
      </div>
    </>
  )
}
