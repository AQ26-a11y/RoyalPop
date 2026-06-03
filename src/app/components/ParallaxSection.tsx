import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
const img1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const img2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const img3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const img4 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const img5 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

export function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.set('.p-word-1', { filter: 'blur(0px)', opacity: 1, yPercent: 0 })
    gsap.set('.p-word-2', { filter: 'blur(20px)', opacity: 0, yPercent: 0 })
    gsap.set('.p-word-3', { filter: 'blur(20px)', opacity: 0, yPercent: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to('.p-word-1', { filter: 'blur(20px)', opacity: 0, duration: 0.12, ease: 'power2.in' }, 0.28)
    tl.to('.p-word-2', { filter: 'blur(0px)', opacity: 1, duration: 0.12, ease: 'power2.out' }, 0.38)
    tl.to('.p-word-2', { filter: 'blur(20px)', opacity: 0, duration: 0.12, ease: 'power2.in' }, 0.58)
    tl.to('.p-word-3', { filter: 'blur(0px)', opacity: 1, duration: 0.12, ease: 'power2.out' }, 0.68)
    tl.to('.p-word-3', { filter: 'blur(20px)', opacity: 0, duration: 0.12, ease: 'power2.in' }, 0.90)

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1)
      tl.progress(progress)

      const els = section.querySelectorAll('.p-el')
      const speeds = [0.35, 0.22, 0.12, 0, 0]
      els.forEach((el, i) => {
        const ypar = -scrolled * speeds[i]
        ;(el as HTMLElement).style.transform = `translateY(${ypar}px)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      tl.kill()
    }
  }, [])

  const wordStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'none',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(48px, 8vw, 120px)',
    fontWeight: 700,
    color: '#1A1A1A',
    lineHeight: 1,
    letterSpacing: '-1px',
    whiteSpace: 'nowrap',
  }

  const images = [img1, img2, img3, img4, img5]
  const imgStyles: React.CSSProperties[] = [
    { maxWidth: '22.5rem', marginRight: 'auto' },
    { maxWidth: '32rem', marginLeft: 'auto', marginRight: '12%' },
    { maxWidth: '25rem' },
    { maxWidth: '22.5rem', marginLeft: '8%' },
    { maxWidth: '32rem', marginLeft: 'auto' },
  ]

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'clip',
        paddingBottom: '12rem',
        background: 'transparent',
      }}
    >
      {/* STICKY TEXT — stays centered while images scroll */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 5,
        height: '100lvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          overflow: 'hidden',
          height: '8em',
          position: 'relative',
          minWidth: 'clamp(300px, 40vw, 700px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
          <div className="p-word-1" style={wordStyle}>Tradition</div>
          <div className="p-word-2" style={wordStyle}>Revolution</div>
          <div className="p-word-3" style={wordStyle}>Royal Pop</div>
        </div>
      </div>

      {/* IMAGES — scroll normally in page flow with parallax offset */}
      <div style={{
        position: 'relative',
        marginTop: '-100lvh',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '10vh 0vw',
        zIndex: 1,
      }}>
        {images.map((src, i) => (
          <div
            key={i}
            className="p-el"
            style={{
              width: '100%',
              aspectRatio: '450 / 500',
              position: 'relative',
              willChange: 'transform',
              ...imgStyles[i],
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 0,
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
