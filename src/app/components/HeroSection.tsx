import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CherryMascot } from './CherryMascot'
import { CassettaMascot } from './CassettaMascot'

gsap.registerPlugin(ScrollTrigger)


export function HeroSection() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const videoCircleWrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const [stopCursor, setStopCursor] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false })

  useEffect(() => {
    console.log('Video src:', '/Campaign-video.mp4')
    const videoEl = videoCircleWrapperRef.current?.querySelector('video')
    if (videoEl) {
      console.log('Video element found')
      console.log('Video readyState:', videoEl.readyState)
      console.log('Video error:', videoEl.error)
      videoEl.play().catch(e => console.log('Play error:', e))
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      // Line 1 — same timing as logo (position 0 in timeline)
      tl.fromTo(line1Ref.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, ease: 'power3.out' },
        0
      )

      // Line 2 — starts at 60% of Line 1 duration (0.48s after Line 1)
      tl.fromTo(line2Ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0.48
      )

      tl.fromTo('.hero-mascot-left',
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' },
        1.1
      )
      .fromTo('.hero-mascot-right',
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' },
        1.25
      )

      gsap.to('.hero-mascot-left', {
        y: -12,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to('.hero-mascot-right', {
        y: -10,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.8,
      })

      gsap.to('.hero-circle-3', {
        y: -14,
        duration: 2.0,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.4,
      })

      gsap.to('.hero-circle-5', {
        y: -10,
        duration: 1.9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.1,
      })

      const tl1 = gsap.timeline({ repeat: -1, repeatDelay: 1.8 })
      tl1.fromTo('.hero-mascot-left', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' })
      tl1.to('.hero-mascot-left', { opacity: 0, scale: 0, duration: 0.4, ease: 'power2.in', delay: 1 })

      const tl2 = gsap.timeline({ repeat: -1, repeatDelay: 0.9, delay: 1.3 })
      tl2.fromTo('.hero-mascot-right', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 2.2, ease: 'elastic.out(1, 0.5)' })
      tl2.to('.hero-mascot-right', { opacity: 0, scale: 0, duration: 0.4, ease: 'power2.in', delay: 1.5 })

      const tl3 = gsap.timeline({ repeat: -1, repeatDelay: 2.1, delay: 0.6 })
      tl3.fromTo('.hero-circle-3', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1.8, ease: 'elastic.out(1, 0.5)' })
      tl3.to('.hero-circle-3', { opacity: 0, scale: 0, duration: 0.4, ease: 'power2.in', delay: 1.2 })

      const tl4 = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 2.0 })
      tl4.fromTo('.hero-circle-5', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 2.5, ease: 'elastic.out(1, 0.5)' })
      tl4.to('.hero-circle-5', { opacity: 0, scale: 0, duration: 0.4, ease: 'power2.in', delay: 1.8 })

      gsap.set(videoCircleWrapperRef.current, { x: 0 })

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate: self => {
const overlay = document.getElementById('video-play-overlay')
            if (overlay) overlay.style.opacity = self.progress > 0.55 ? '1' : '0'
          },
        }
      })

      scrollTl
        .to(videoCircleWrapperRef.current, {
          width: '100vw',
          height: '56.25vw',
          borderRadius: '0px',
          x: () => {
            const el = videoCircleWrapperRef.current
            if (!el) return 0
            const rect = el.getBoundingClientRect()
            const elCenterX = rect.left + rect.width / 2
            return window.innerWidth / 2 - elCenterX
          },
          force3D: false,
          duration: 0.6,
          ease: 'power2.inOut',
        }, 0)
        .to(['.hero-title-word', '.hero-mascot-left', '.hero-mascot-right'], {
          opacity: 0, duration: 0.25, ease: 'power2.in',
        }, 0)
    })

    return () => ctx.revert()
  }, [])

  const FONT: React.CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: '124px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '124px',
    letterSpacing: '-2px',
    whiteSpace: 'nowrap',
    color: 'rgb(26, 26, 26)',
    textAlign: 'center',
    textTransform: 'lowercase',
    display: 'flex',
    justifyContent: 'center',
    gap: '0.16em',
  }

  return (
    <>

      <div ref={scrollWrapperRef} style={{ height: '300vh', position: 'relative', margin: 0, padding: 0, zIndex: 1 }}>
        <div
          ref={stickyRef}
          style={{
            position: 'sticky', top: 0,
            height: '100vh', background: 'transparent',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            paddingBottom: 80,
            overflow: 'visible',
            zIndex: 1,
          }}
        >
{/* Title + mascots — mascots absolutely anchored left/right, centered vertically */}
          <div style={{ position: 'relative', width: '100%' }}>

            {/* Circle 1 — LEFT */}
            <div
              className="hero-mascot-left"
              style={{
                position: 'absolute',
                top: '50%',
                left: 43,
                transform: 'translateY(-50%)',
                opacity: 1,
                zIndex: 20,
                width: 108,
                height: 108,
                borderRadius: '50%',
                background: 'rgba(167, 209, 215, 0.5)',
                backdropFilter: 'blur(12px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
                border: '1px solid rgba(91, 183, 92, 0.3)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 24px rgba(91, 183, 92, 0.2), 18.85px 64.09px 101.79px 0px rgba(0, 0, 0, 0.5)',
              }}
            />

            {/* Circle 5 — pink, overlapping video-circle-wrapper */}
            <div className="hero-circle-5" style={{
              position: 'absolute',
              top: '95%',
              left: 'calc(50% + 110px)',
              zIndex: 4,
              width: 108,
              height: 108,
              borderRadius: '50%',
              background: 'rgba(91, 183, 92, 0.5)',
              backdropFilter: 'blur(12px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
              border: '1px solid rgba(235, 139, 161, 0.3)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 24px rgba(235, 139, 161, 0.2), 18.85px 64.09px 101.79px 0px rgba(0, 0, 0, 0.5)',
            }} />

            {/* Circle 3 — green, overlapping "e" in "The" */}
            <div className="hero-circle-3" style={{
              position: 'absolute',
              top: '-23%',
              left: '22%',
              zIndex: 10,
              width: 108,
              height: 108,
              borderRadius: '50%',
              background: 'rgba(235, 139, 161, 0.5)',
              backdropFilter: 'blur(12px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
              border: '1px solid rgba(167, 209, 215, 0.3)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 24px rgba(167, 209, 215, 0.2), 18.85px 64.09px 101.79px 0px rgba(0, 0, 0, 0.5)',
            }} />



            {/* Title */}
            <div
              ref={titleRef}
              style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 9%', width: '100%' }}
            >
              {/* Line 1: THE NEW ROYAL POP */}
              <div style={{ overflowX: 'visible', overflowY: 'hidden', paddingBottom: '0.2em', paddingTop: '0.1em' }}>
                <div ref={line1Ref} style={{
                  ...FONT,
                  overflow: 'visible',
                  height: 'auto',
                  minHeight: 'unset',
                  clipPath: 'none',
                  mask: 'none',
                  width: 'auto',
                  marginBottom: 0,
                }}>
                  <span className="hero-title-word" style={{ display: 'inline-block', overflow: 'visible', textTransform: 'none' }}>The</span>
                  <span className="hero-title-word" style={{ display: 'inline-block', overflow: 'visible' }}>new</span>
                  <span className="hero-title-word" style={{ display: 'inline-block', overflow: 'visible', textTransform: 'none' }}>Royal</span>
                  <span className="hero-title-word" style={{ display: 'inline-block', overflow: 'visible', textTransform: 'none', color: '#1A1A1A' }}>Pop</span>
                </div>
              </div>

              {/* Line 2: POP NEVER [circle] STOPS */}
              <div style={{ overflow: 'visible', paddingBottom: '0.2em', paddingTop: '0.1em' }}>
                <div ref={line2Ref} style={{
                  ...FONT,
                  overflow: 'visible',
                  clipPath: 'none',
                  mask: 'none',
                  height: 'auto',
                  minHeight: 'unset',
                  width: 'auto',
                  alignItems: 'center',
                }}>
                  <span className="hero-title-word" style={{ display: 'inline-block', overflow: 'visible', height: 'auto', width: 'auto' }}>POP</span>
                  <span className="hero-title-word" style={{ display: 'inline-block', overflow: 'visible', height: 'auto', width: 'auto' }}>NEVER</span>

                  {/* Video circle */}
                  <div
                    ref={videoCircleWrapperRef}
                    id="video-circle-wrapper"
                    className="hero-video"
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      overflow: 'hidden',
                      borderRadius: '100px',
                      width: 116,
                      height: 116,
                      position: 'relative',
                      left: 0,
                      top: 8,
                      opacity: 1,
                      flexShrink: 0,
                      cursor: 'none',
                      zIndex: 5,
                      background: '#F7F7F7',
                      marginLeft: 0,
                      marginRight: 0,
                    }}
                    data-cursor="play"
                    onMouseMove={(e) => setStopCursor({ x: e.clientX, y: e.clientY, visible: true })}
                    onMouseEnter={(e) => setStopCursor({ x: e.clientX, y: e.clientY, visible: true })}
                    onMouseLeave={() => setStopCursor(prev => ({ ...prev, visible: false }))}
                  >
                    <video
                      src="https://res.cloudinary.com/dmjyysuan/video/upload/q_auto/f_auto/v1779715053/video-new_pqhvpa.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#F7F7F7' }}
                    />
                  </div>

                  <span className="hero-title-word" style={{ display: 'inline-block', overflow: 'visible', height: 'auto', width: 'auto' }}>STOPS</span>
                </div>
              </div>
            </div>

            {/* Circle 2 — RIGHT */}
            <div
              className="hero-mascot-right"
              style={{
                position: 'absolute',
                top: -60,
                right: '4%',
                transform: 'translateY(-50%)',
                opacity: 1,
                zIndex: 20,
                width: 108,
                height: 108,
                borderRadius: '50%',
                background: 'rgba(254, 213, 9, 0.5)',
                backdropFilter: 'blur(12px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
                border: '1px solid rgba(254, 213, 9, 0.3)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 24px rgba(254, 213, 9, 0.2), 18.85px 64.09px 101.79px 0px rgba(0, 0, 0, 0.5)',
              }}
            />
          </div>

        </div>
      </div>

      {/* Cursor-following stop icon */}
      <div
        className="cursor-stop-icon"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          opacity: stopCursor.visible ? 1 : 0,
          zIndex: 9000,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 200ms ease',
          width: 64,
          height: 64,
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          left: stopCursor.x,
          top: stopCursor.y,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="12" height="12" fill="white" rx="2"/>
        </svg>
      </div>
    </>
  )
}
