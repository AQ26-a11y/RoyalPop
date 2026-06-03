import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import iconMemory from '../../imports/icon-memory.svg'

const TEXT = "Let's play"
const CHARS = TEXT.split('')

interface FloatingCTAProps { onOpen: () => void }

export function FloatingCTA({ onOpen }: FloatingCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLImageElement>(null)
  const charRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const chars = charRefs.current.filter((el): el is HTMLDivElement => el !== null)
    const icon = iconRef.current
    const container = containerRef.current
    if (!chars.length || !icon || !container) return

    gsap.set(chars, { y: '100%' })
    gsap.set(icon, { opacity: 0 })

    const lastCharStart = (CHARS.length - 1) * 0.04

    const tl = gsap.timeline({ repeat: -1 })

    // Staggered character reveal
    tl.to(chars, {
      y: '0%',
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.04,
    })

    // Icon fades in simultaneously with last character
    tl.to(icon, {
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
    }, lastCharStart)

    // Hold for 5 seconds using container as delay target
    tl.to(container, { opacity: 1, duration: 5 })

    // Instant reset
    tl.set(chars, { y: '100%' })
    tl.set(icon, { opacity: 0 })

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: 60,
        right: 40,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={onOpen}
    >
      {/* Text — characters split for animation */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        {CHARS.map((char, i) => (
          <div
            key={i}
            style={{ overflow: 'hidden', display: 'inline-block', lineHeight: '38px' }}
          >
            <div
              ref={el => { charRefs.current[i] = el }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                fontSize: 32,
                fontWeight: 400,
                fontSynthesis: 'none',
                lineHeight: '32px',
                letterSpacing: '-0.64px',
                color: '#1A1A1A',
                whiteSpace: 'pre',
              }}
            >
              {char}
            </div>
          </div>
        ))}
      </div>

      {/* Icon */}
      <img
        ref={iconRef}
        src={iconMemory}
        alt=""
        style={{ width: 48, height: 48, display: 'block', flexShrink: 0 }}
      />
    </div>
  )
}
