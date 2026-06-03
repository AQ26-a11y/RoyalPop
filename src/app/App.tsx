import React, { useEffect, useRef, useState } from 'react'
import { AxSLogo } from './components/AxSLogo'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroSection } from './components/HeroSection'
import { DarkTitleSection } from './components/DarkTitleSection'
import { Section03 } from './components/Section03'
import { CarouselSection } from './components/CarouselSection'
import { PillsSection } from './components/PillsSection'
import { FinalSection } from './components/FinalSection'
import { PressCarouselSection } from './components/PressCarouselSection'
import { WatchDialSection } from './components/WatchDialSection'
import { StopMotionSection } from './components/StopMotionSection'
import { ParallaxSection } from './components/ParallaxSection'
import { ScrollRevealSection } from './components/ScrollRevealSection'
import { ProductGallerySection } from './components/ProductGallerySection'
import { FinalTextBlock } from './components/FinalTextBlock'
import { ImageRevealSection } from './components/ImageRevealSection'
import { FloatingCTA } from './components/FloatingCTA'
import { MemoryGameModal } from './components/MemoryGameModal'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    gsap.fromTo('.navbar-wrapper',
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    )

    gsap.fromTo('.cta-sticky-wrapper',
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    )

    // Refresh ScrollTrigger after full render so it measures layout correctly
    const id1 = setTimeout(() => ScrollTrigger.refresh(), 300)
    const id2 = setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => {
      clearTimeout(id1)
      clearTimeout(id2)
    }
  }, [])

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    Promise.all([
      document.fonts.ready,
      new Promise<void>(resolve => {
        if (document.readyState === 'complete') resolve()
        else window.addEventListener('load', () => resolve(), { once: true })
      })
    ]).then(() => {
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    })
  }, [])

  useEffect(() => {
    const setNavPosition = () => {
      const nav = document.querySelector('.navbar-wrapper') as HTMLElement
      if (!nav) return
      const navWidth = 678
      const centeredLeft = (window.innerWidth - navWidth) / 2
      nav.style.position = 'fixed'
      nav.style.top = '24px'
      nav.style.width = navWidth + 'px'
      nav.style.left = centeredLeft + 'px'
      nav.style.right = 'auto'
      nav.style.transform = 'none'
    }

    setTimeout(setNavPosition, 50)

    const onScroll = () => {
      const nav = document.querySelector('.navbar-wrapper') as HTMLElement
      if (!nav) return
      const progress = Math.min(Math.max((window.scrollY - 300) / 900, 0), 1)
      const startWidth = 678
      const endWidth = window.innerWidth - 128
      const currentWidth = startWidth + (endWidth - startWidth) * progress
      const startLeft = (window.innerWidth - startWidth) / 2
      const endLeft = 64
      const currentLeft = startLeft + (endLeft - startLeft) * progress
      nav.style.width = currentWidth + 'px'
      nav.style.left = currentLeft + 'px'
      nav.style.transform = 'none'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', setNavPosition)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', setNavPosition)
    }
  }, [])

  const [gameOpen, setGameOpen] = useState(false)

  const ctaRef = useRef<HTMLDivElement>(null)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 })

  const handleCtaEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setBlobPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setCtaHovered(true)
  }

  const handleCtaLeave = () => setCtaHovered(false)

  return (
    <>
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          scroll-behavior: auto;
          height: auto !important;
          min-height: 100vh;
          overflow: visible !important;
        }

        /* Figma Make mounts into #root — ensure it never clips scroll */
        #root {
          height: auto !important;
          min-height: 100vh;
          overflow: visible !important;
        }

        body {
          background: #F7F7F7;
          color: #191919;
          font-family: var(--font-body);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        :root {
          --color-text:    #191919;
          --color-bg:      #F7F7F7;
          --color-accent:  #E8321A;
          --color-gray:    #8D8D8D;
          --color-dark-bg: #191919;
          --color-white:   #FFFFFF;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      <FloatingCTA onOpen={() => setGameOpen(true)} />
      <MemoryGameModal isOpen={gameOpen} onClose={() => setGameOpen(false)} />

      {/* Navbar */}
      <div style={{ position: 'fixed', top: 24, left: 64, right: 64, width: 'calc(100% - 128px)', zIndex: 500, overflow: 'hidden' }}>
      <nav className="navbar-wrapper" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '32px 48px',
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.5)',
        borderRadius: 100,
        boxSizing: 'border-box',
      }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <AxSLogo />
        </button>

        {/* Right — links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['Contact', '·', 'ITA EN'].map((item, i) => (
            item === '·'
              ? <span key={i} style={{
                  color: '#1A1A1A',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '20px',
                  textAlign: 'center',
                  marginLeft: 4,
                  marginRight: 4,
                }}>·</span>
              : item === 'ITA EN'
                ? <a key={i} href="#" style={{
                    color: '#1A1A1A',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    gap: 8,
                  }}>
                    <span>ITA</span><span>EN</span>
                  </a>
                : <a key={i} href="#" style={{
                    color: '#1A1A1A',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                  }}>{item}</a>
          ))}
        </div>
      </nav>
      </div>

      {/* Sticky bottom CTAs — always visible during scroll */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 9,
        display: 'flex',
        justifyContent: 'center',
        padding: '12px 0',
        marginBottom: 40,
      }}>
        <div
          ref={ctaRef}
          className="cta-sticky-wrapper"
          onMouseEnter={handleCtaEnter}
          onMouseLeave={handleCtaLeave}
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            width: 352,
            padding: '24px 24px 24px 40px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            borderRadius: 80,
            outline: '1px solid #505050',
            background: '#1A1A1A',
            cursor: 'pointer',
            transform: `scale(${ctaHovered ? 1.06 : 1})`,
            transformOrigin: 'center center',
            transition: 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Blob */}
          <span style={{
            position: 'absolute',
            left: blobPos.x,
            top: blobPos.y,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: '#FFFFFF',
            transform: `translate(-50%, -50%) scale(${ctaHovered ? 1 : 0})`,
            transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />
          <button style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: ctaHovered ? '#1A1A1A' : '#FFF',
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: 0,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            Find in store
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7653 10.973V18.9423C20.7653 19.4474 20.5903 19.875 20.2403 20.225C19.8903 20.575 19.4628 20.75 18.9578 20.75H5.07304C4.56804 20.75 4.14054 20.575 3.79054 20.225C3.44054 19.875 3.26554 19.4474 3.26554 18.9423V10.9538C2.86288 10.6231 2.56063 10.1939 2.35879 9.66625C2.15679 9.13875 2.15263 8.56925 2.34629 7.95775L3.35779 4.65375C3.49113 4.23325 3.71738 3.89417 4.03654 3.6365C4.35588 3.37883 4.73729 3.25 5.18079 3.25H18.8308C19.2745 3.25 19.6533 3.37308 19.9673 3.61925C20.2815 3.86542 20.5103 4.20392 20.6538 4.63475L21.6845 7.95775C21.8782 8.56925 21.874 9.13683 21.672 9.6605C21.4702 10.1843 21.168 10.6218 20.7653 10.973ZM14.2155 10.25C14.7617 10.25 15.1723 10.083 15.4473 9.749C15.7223 9.415 15.8348 9.05633 15.7848 8.673L15.177 4.75H12.7653V8.7C12.7653 9.1205 12.9076 9.484 13.1923 9.7905C13.477 10.0968 13.818 10.25 14.2155 10.25ZM9.71554 10.25C10.1757 10.25 10.549 10.0968 10.8355 9.7905C11.1222 9.484 11.2655 9.1205 11.2655 8.7V4.75H8.85379L8.24629 8.7115C8.19229 9.06667 8.30379 9.41192 8.58079 9.74725C8.85779 10.0824 9.23604 10.25 9.71554 10.25ZM5.26554 10.25C5.63604 10.25 5.95463 10.1208 6.22129 9.8625C6.48796 9.60417 6.65271 9.2795 6.71554 8.8885L7.30379 4.75H5.18079C5.07179 4.75 4.98529 4.774 4.92129 4.822C4.85713 4.87017 4.80904 4.94233 4.77704 5.0385L3.81529 8.29225C3.68329 8.72175 3.74554 9.15542 4.00204 9.59325C4.25838 10.0311 4.67954 10.25 5.26554 10.25ZM18.7655 10.25C19.3065 10.25 19.7206 10.0375 20.0078 9.6125C20.295 9.1875 20.3642 8.74742 20.2155 8.29225L19.2038 5.01925C19.1718 4.92308 19.1238 4.85417 19.0598 4.8125C18.9956 4.77083 18.909 4.75 18.8 4.75H16.727L17.3153 8.8885C17.3781 9.2795 17.5429 9.60417 17.8095 9.8625C18.0762 10.1208 18.3949 10.25 18.7655 10.25ZM5.07304 19.25H18.9578C19.0475 19.25 19.1211 19.2212 19.1788 19.1635C19.2366 19.1058 19.2655 19.0321 19.2655 18.9423V11.6615C19.1565 11.7013 19.0655 11.726 18.9923 11.7355C18.9193 11.7452 18.8437 11.75 18.7655 11.75C18.3155 11.75 17.9197 11.6686 17.578 11.5058C17.2364 11.3429 16.9052 11.082 16.5845 10.723C16.3039 11.0358 15.9719 11.2853 15.5885 11.4713C15.2052 11.6571 14.768 11.75 14.277 11.75C13.8527 11.75 13.4527 11.6618 13.077 11.4855C12.7014 11.3093 12.3475 11.0552 12.0155 10.723C11.7065 11.0552 11.3565 11.3093 10.9655 11.4855C10.5744 11.6618 10.1782 11.75 9.77704 11.75C9.32571 11.75 8.90263 11.6683 8.50779 11.5048C8.11296 11.3413 7.76554 11.0807 7.46554 10.723C7.04488 11.1435 6.65729 11.4198 6.30279 11.552C5.94846 11.684 5.60271 11.75 5.26554 11.75C5.18721 11.75 5.10638 11.7452 5.02304 11.7355C4.93971 11.726 4.85379 11.7013 4.76529 11.6615V18.9423C4.76529 19.0321 4.79421 19.1058 4.85204 19.1635C4.90971 19.2212 4.98338 19.25 5.07304 19.25Z" fill={ctaHovered ? '#1A1A1A' : '#E1E1E1'}/>
            </svg>
          </button>
        </div>
      </div>

      {/* 8-column grid overlay — fixed horizontally, full viewport height, behind everything */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {[12.5, 25, 37.5, 50, 62.5, 75, 87.5].map(pct => (
          <div
            key={pct}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${pct}%`,
              width: 1,
              background: '#E8E8E8',
            }}
          />
        ))}
      </div>

      <main style={{ margin: 0, padding: 0, gap: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Section 01: Hero */}
        <HeroSection />

        {/* Section 02: Dark Title */}
        <DarkTitleSection
          id="section-02"
          lines={['Audemars Piguet & Swatch']}
          marginTop={-200}
          paddingTop={80}
          zIndex={1}
          scrub={1.4}
          letterSpacing="-1px"
          fontSize="112px"
          lineHeight="100px"
          fontWeight={600}
          textTransform="none"
        />

        {/* Section 03: Two-column with color scrub */}
        <Section03 />

        {/* Section 03b: Parallax images + text labels */}
        <ParallaxSection />

        {/* Section 04: Carousel */}
        <CarouselSection />

        {/* Section 04b: Product Gallery */}
        {/* <ProductGallerySection /> */}

        {/* Section 05: Material Pills */}
        {/* <PillsSection /> */}

        {/* Section 05b: Scroll Reveal */}
        <ScrollRevealSection />

        {/* Section Press: Press mentions carousel */}
        <PressCarouselSection />

        {/* Section Stop Motion: Frame-by-frame mechanism animation */}
        <StopMotionSection />


        {/* Section 08: Final CTA — commented out */}
        {/* <FinalSection /> */}

        {/* Final text block */}
        <FinalTextBlock />

        {/* Image reveal */}
        <ImageRevealSection />

        {/* Footer */}
        <footer style={{
          background: '#191919',
          padding: '48px 8%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            letterSpacing: '0.06em',
            color: '#8D8D8D',
          }}>
            © 2025 Audemars Piguet × Swatch. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Privacy Policy', 'Terms', 'Find a Store'].map(link => (
              <a key={link} href="#" style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#8D8D8D',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#8D8D8D' }}
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </>
  )
}
