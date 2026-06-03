import { useEffect, useRef, useState } from 'react'
import { ProductModal, LAN_BA_DATA } from './ProductModal'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const blaueAchtPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const greenEightPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const huitBlancPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const lanBaPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const ochoNegroPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const orenjiPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const otgRozPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const ottoRossoPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

gsap.registerPlugin(ScrollTrigger)

const watches = [
  { id: 1, name: 'Blaue Acht',   image: blaueAchtPng,  accent: '#D5E1BB' },
  { id: 2, name: 'Green Eight',  image: greenEightPng, accent: '#C5E5C6' },
  { id: 3, name: 'Huit Blanc',   image: huitBlancPng,  accent: '#DEDEDE' },
  { id: 4, name: 'Lan Ba',       image: lanBaPng,      accent: '#BBE3EF' },
  { id: 5, name: 'Ocho Negro',   image: ochoNegroPng,  accent: '#D3D3D3' },
  { id: 6, name: 'Orenji Hachi', image: orenjiPng,     accent: '#BAC6E2' },
  { id: 7, name: 'Otg Roz',      image: otgRozPng,     accent: '#EEDBDE' },
  { id: 8, name: 'Otto Rosso',   image: ottoRossoPng,  accent: '#EFCDCC' },
]

export function CarouselSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const dragOffset = useRef(0)
  const currentOffset = useRef(0)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    // Title scroll animation
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { x: '100%' },
        {
          x: '-100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          }
        }
      )
    }, sectionRef)

    // Drag on track directly — not on scroll container
    const track = trackRef.current
    if (!track) return

    const pauseAnimation = () => {
      track.style.animationPlayState = 'paused'
      clearTimeout(resumeTimer.current)
    }

    const resumeAnimation = () => {
      resumeTimer.current = setTimeout(() => {
        track.style.animationPlayState = 'running'
      }, 2000)
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      startX.current = e.clientX
      const currentMargin = parseInt(track.style.marginLeft || '0')
      dragOffset.current = currentMargin
      pauseAnimation()
      track.style.animationPlayState = 'paused'
      track.style.cursor = 'grabbing'
      e.preventDefault()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const delta = e.clientX - startX.current
      const newMargin = dragOffset.current + delta
      track.style.marginLeft = newMargin + 'px'
      e.preventDefault()
    }

    const onMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      track.style.cursor = 'grab'
      resumeAnimation()
    }

    // Hover pause
    const wrapper = wrapperRef.current
    const onMouseEnterWrapper = () => pauseAnimation()
    const onMouseLeaveWrapper = () => {
      if (!isDragging.current) resumeAnimation()
    }

    track.addEventListener('mousedown', onMouseDown, { passive: false })
    document.addEventListener('mousemove', onMouseMove, { passive: false })
    document.addEventListener('mouseup', onMouseUp)
    wrapper?.addEventListener('mouseenter', onMouseEnterWrapper)
    wrapper?.addEventListener('mouseleave', onMouseLeaveWrapper)

    return () => {
      ctx.revert()
      track.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      wrapper?.removeEventListener('mouseenter', onMouseEnterWrapper)
      wrapper?.removeEventListener('mouseleave', onMouseLeaveWrapper)
      clearTimeout(resumeTimer.current)
    }
  }, [])

  const allWatches = [...watches, ...watches]

  return (
    <>
    <section
      ref={sectionRef}
      id="section-04"
      style={{
        background: 'transparent',
        padding: 0,
        marginBottom: 160,
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <div style={{ overflow: 'hidden', marginBottom: 80 }}>
        <div
          ref={titleRef}
          style={{
            color: '#1A1A1A',
            fontFamily: 'var(--font-heading)',
            fontSize: '112px',
            fontWeight: 600,
            lineHeight: '112px',
            letterSpacing: '-1px',
            width: 'max-content',
            whiteSpace: 'nowrap',
          }}
        >
          Discover the collection
        </div>
      </div>

      {/* Carousel wrapper — hover pauses here */}
      <div
        ref={wrapperRef}
        style={{
          overflow: 'hidden',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 0,
            padding: '0 5%',
            animation: 'marqueeCards 130s linear infinite',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {allWatches.map((watch, i) => (
            <div
              key={`${watch.id}-${i}`}
              style={{
                minWidth: 'clamp(300px, 32vw, 460px)',
                height: 'auto',
                background: 'transparent',
                borderRadius: 4,
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                position: 'relative',
                zIndex: 10,
              }}
              onClick={() => setModalOpen(true)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-16px) scale(1.03)'
                e.currentTarget.style.transition = 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                e.currentTarget.style.cursor = 'pointer'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.transition = 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                background: 'transparent',
              }}>
                <img
                  src={watch.image}
                  alt={watch.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 720,
                    objectFit: 'contain',
                    overflow: 'visible',
                  }}
                />
              </div>
              <div style={{ padding: 0, textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '40px',
                  fontWeight: 600,
                  lineHeight: '48px',
                  letterSpacing: '-0.5px',
                  color: '#1A1A1A',
                  marginTop: -32,
                  marginBottom: 6,
                }}>
                  {watch.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeCards {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>

    <ProductModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      product={LAN_BA_DATA}
    />
    </>
  )
}
