import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  {
    number: '90 h',
    label: '— Power reserve',
    description: 'A single full wind of ~80 turns',
  },
  {
    number: '15',
    label: '— Active patents',
    description: 'Filed for this movement alone',
  },
  {
    number: '21.6K',
    label: '— Vibrations / hour',
    description: 'Anti-magnetic Nivachron spring',
  },
  {
    number: '2',
    label: '— Case styles',
    description: 'Lépine & Savonnette',
  },
]

export function SpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((_, i) => {
        gsap.fromTo(
          `.specs-block-${i}`,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            scrollTrigger: {
              trigger: `.specs-block-${i}`,
              start: `top 90%`,
              toggleActions: 'play none none reverse',
              once: false,
            },
            delay: i * 0.12,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        background: '#000000',
        width: '100%',
        padding: '120px',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        backgroundColor: '#1A1A1A',
      }}
    >
      {STATS.map((stat, i) => (
        <div
          key={i}
          className={`specs-block-${i}`}
          style={{
            background: '#000000',
            padding: '40px 32px',
            opacity: 0,
          }}
        >
          <div style={{
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: '#4A4A4A',
            color: 'transparent',
            fontFamily: 'var(--font-body)',
            fontSize: 80,
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '80px',
            letterSpacing: '-4.8px',
          }}>
            {stat.number}
          </div>
          <div style={{
            color: '#FFFFFF',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '24px',
            letterSpacing: '-0.4px',
            marginTop: 16,
          }}>
            {stat.label}
          </div>
          <div style={{
            color: '#7D7D7D',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            marginTop: 8,
          }}>
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  )
}
