import { useEffect, useRef, useState } from 'react'
import { AxSLogo } from './AxSLogo'

export function Navigation() {
  const navRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    nav.style.left = ((window.innerWidth - 678) / 2) + 'px'
    nav.style.width = '678px'
    nav.style.transform = 'none'

    const onScroll = () => {
      const scrollY = window.scrollY
      const progress = Math.min(scrollY / 300, 1)
      const startWidth = 678
      const endWidth = window.innerWidth - 128
      const currentWidth = startWidth + (endWidth - startWidth) * progress
      const startLeft = (window.innerWidth - startWidth) / 2
      const endLeft = 64
      const currentLeft = startLeft + (endLeft - startLeft) * progress
      nav.style.width = currentWidth + 'px'
      nav.style.left = currentLeft + 'px'
      setScrolled(scrollY > 60)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={navRef}
      className="navbar-wrapper"
      style={{
        position: 'fixed',
        top: '24px',
        left: '0px',
        right: 'auto',
        transform: 'none',
        width: '678px',
        zIndex: 1000,
        padding: '24px 40px',
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.5)',
        borderRadius: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <AxSLogo />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '20px',
          color: '#1A1A1A',
          textDecoration: 'none',
        }}
      >
        <span>Contatti</span>
        <span>·</span>
        <span>ITA IT</span>
      </div>
    </div>
  )
}
