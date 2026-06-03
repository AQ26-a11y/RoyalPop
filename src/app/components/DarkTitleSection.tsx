import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  id: string
  lines: string[]
  accent?: string
  paddingTop?: number
  zIndex?: number
  marginTop?: number | string
  scrub?: number
  letterSpacing?: string
  fontSize?: string
  lineHeight?: string
  fontWeight?: number
  fontVariationSettings?: string
  textTransform?: string
}

export function DarkTitleSection({ id, lines, accent, paddingTop = 80, zIndex = 2, marginTop = 0, scrub = 1, letterSpacing = '-1.44px', fontSize = '144px', lineHeight = '124px', fontWeight = 400, fontVariationSettings = '', textTransform = 'uppercase' }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { x: '100%' },
        {
          x: '-100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="dark-title-section"
      style={{
        background: '#191919',
        position: 'relative',
        zIndex,
        marginTop,
        marginBottom: 0,
        paddingTop,
        paddingBottom: 80,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        ref={textRef}
        className="dark-title-text"
        style={{
          color: '#FFFFFF',
          fontFamily: 'var(--font-heading)',
          fontVariationSettings,
          fontSize,
          fontStyle: 'normal',
          fontWeight,
          lineHeight,
          letterSpacing,
          textTransform: textTransform as React.CSSProperties['textTransform'],
          whiteSpace: 'nowrap',
          overflow: 'visible',
          clip: 'unset',
          clipPath: 'none',
          mask: 'none',
          height: 'auto',
          minHeight: 'unset',
          paddingTop: '0.15em',
          paddingBottom: '0.15em',
          width: 'max-content',
          display: 'block',
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ color: accent && i === 0 ? accent : undefined, overflow: 'visible', clip: 'unset', clipPath: 'none', mask: 'none', width: '100%', maxWidth: 'none', paddingLeft: '0.05em', paddingRight: '0.05em' }}>
            {line}
          </div>
        ))}
      </div>
    </section>
  )
}
