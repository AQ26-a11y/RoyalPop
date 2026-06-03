import { useEffect, useRef } from 'react'
import { StopIcon } from './StopIcon'

export function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const animFrame = useRef<number>()

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    document.body.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const render = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      animFrame.current = requestAnimationFrame(render)
    }

    const onEnterLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest('a, button, [data-cursor]')
      if (!el || !wrapperRef.current) return
      const cursor = el.getAttribute('data-cursor')
      const state = cursor || 'hover'
      wrapperRef.current.setAttribute('data-state', state)
      if (labelRef.current) {
        const label = el.getAttribute('data-cursor-label') || ''
        labelRef.current.textContent = label
        labelRef.current.style.opacity = label ? '1' : '0'
      }
    }

    const onLeaveLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('a, button, [data-cursor]')) return
      if (!wrapperRef.current) return
      wrapperRef.current.removeAttribute('data-state')
      if (labelRef.current) {
        labelRef.current.style.opacity = '0'
        labelRef.current.textContent = ''
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnterLink)
    document.addEventListener('mouseout', onLeaveLink)
    animFrame.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnterLink)
      document.removeEventListener('mouseout', onLeaveLink)
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      id="cursor-wrapper"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      <div
        id="cursor-svg"
        style={{
          width: 48,
          height: 48,
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformOrigin: 'top left',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 6.5H12L11.5 40H13.5L21 33L23.5 37.2508L25 41.5L27 44.5H30.5L32 41L29.5 37.2508L27.5 31.5H36V28L29.5 21.5L21.5 13.5L17.5 9.5L15.5 7.5L14.5 6.5Z" fill="white"/>
          <path d="M26.28 29.7075V34.2825H28.575V32.0025H37.71V27.4275H35.43V29.7075H26.28Z" fill="black"/>
          <path d="M33.135 25.1324H35.43V27.4274H33.135V25.1324Z" fill="black"/>
          <path d="M30.855 38.8575H33.135V43.4175H30.855V38.8575Z" fill="black"/>
          <path d="M30.855 22.8525H33.135V25.1325H30.855V22.8525Z" fill="black"/>
          <path d="M28.575 34.2825H30.855V38.8575H28.575V34.2825Z" fill="black"/>
          <path d="M28.575 20.5724H30.855V22.8524H28.575V20.5724Z" fill="black"/>
          <path d="M26.28 43.4175H30.855V45.7125H26.28V43.4175Z" fill="black"/>
          <path d="M26.28 18.2775H28.575V20.5725H26.28V18.2775Z" fill="black"/>
          <path d="M24 38.8575H26.28V43.4175H24V38.8575Z" fill="black"/>
          <path d="M24 15.9975H26.28V18.2775H24V15.9975Z" fill="black"/>
          <path d="M21.7051 34.2825H24.0001V38.8575H21.7051V34.2825Z" fill="black"/>
          <path d="M21.7051 13.7025H24.0001V15.9975H21.7051V13.7025Z" fill="black"/>
          <path d="M19.425 32.0025H21.705V34.2825H19.425V32.0025Z" fill="black"/>
          <path d="M19.425 11.4225H21.705V13.7025H19.425V11.4225Z" fill="black"/>
          <path d="M17.145 34.2825H19.425V36.5625H17.145V34.2825Z" fill="black"/>
          <path d="M17.145 9.14246H19.425V11.4225H17.145V9.14246Z" fill="black"/>
          <path d="M14.8501 36.5625H17.1451V38.8575H14.8501V36.5625Z" fill="black"/>
          <path d="M14.8501 6.84747H17.1451V9.14247H14.8501V6.84747Z" fill="black"/>
          <path d="M10.29 2.28748V41.1375H14.85V38.8575H12.57V6.84748H14.85V4.56748H12.57V2.28748H10.29Z" fill="black"/>
        </svg>
      </div>
      <div
        id="cursor-play-circle"
        style={{
          position: 'absolute',
          top: -40,
          left: -40,
          width: 80,
          height: 80,
          borderRadius: 60,
          background: 'rgba(0, 0, 0, 0.40)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StopIcon style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      <div
        ref={labelRef}
        id="cursor-label"
        style={{
          position: 'absolute',
          top: 44,
          left: 8,
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#191919',
          whiteSpace: 'nowrap',
          opacity: 0,
          transition: 'opacity 0.2s ease',
        }}
      />
      <style>{`
        #cursor-wrapper[data-state="hover"] #cursor-svg {
          transform: scale(0.75);
        }
        #cursor-wrapper[data-state="drag"] #cursor-svg {
          transform: scale(0.6);
        }
        #cursor-wrapper[data-state="play"] #cursor-svg {
          opacity: 0 !important;
          pointer-events: none;
        }
        #cursor-wrapper[data-state="play"] #cursor-play-circle {
          opacity: 1 !important;
        }
        @media (hover: none) {
          #cursor-wrapper { display: none; }
        }
      `}</style>
    </div>
  )
}
