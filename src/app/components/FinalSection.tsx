import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const ambientataJpg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

gsap.registerPlugin(ScrollTrigger)

export function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shared = {
        trigger: '.final-section-headline',
        start: 'top 95%',
        toggleActions: 'play reverse play reverse',
      }

      gsap.fromTo('.final-section-line-1',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.3, scrollTrigger: shared }
      )
      gsap.fromTo('.final-section-line-2',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.6, scrollTrigger: shared }
      )

      gsap.to('.final-section-body .word-highlight', {
        color: '#1A1A1A',
        stagger: { each: 0.03, from: 'start' },
        ease: 'none',
        scrollTrigger: {
          trigger: '.final-section-body',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      })

      gsap.to(imageRef.current, {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleLines = [
    { text: 'Ready to make an', cls: 'final-section-line-1' },
    { text: 'impression everywhere', cls: 'final-section-line-2' },
  ]

  return (
    <section
      ref={sectionRef}
      id="section-07"
      style={{
        background: 'transparent',
        padding: '160px 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {/* Col 1 spacer: 0% → 12.5% */}
      <div style={{ width: '12.5%', flexShrink: 0 }} />

      {/* Image: cols 2–3, 12.5% → 37.5% */}
      <div
        ref={imageRef}
        style={{
          width: '25%',
          flexShrink: 0,
          aspectRatio: '3/4',
          overflow: 'hidden',
          borderRadius: 0,
        }}
      >
        <img
          src={ambientataJpg}
          alt="Royal Pop Watch lifestyle"
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Col 4–5 gutter: 37.5% → 62.5% */}
      <div style={{ width: '25%', flexShrink: 0 }} />

      {/* Text: cols 6–7, 62.5% → 87.5% */}
      <div style={{ width: '25%', flexShrink: 0, overflow: 'visible', height: 'auto', margin: 0 }}>
        <h2
          ref={titleRef}
          className="final-section-headline"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '40px',
            fontWeight: 600,
            fontStyle: 'normal',
            lineHeight: '48px',
            letterSpacing: '-2px',
            whiteSpace: 'normal',
            color: '#1A1A1A',
            margin: '0 0 32px',
          }}
        >
          {titleLines.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.1em' }}>
              <div className={line.cls} style={{ display: 'block' }}>{line.text}</div>
            </div>
          ))}
        </h2>

        <p
          className="final-section-body"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '20px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: '32px',
            letterSpacing: '-0.4px',
            color: '#191919',
            margin: '0 0 40px',
            maxWidth: 400,
          }}
        >
          {"The Royal Pop collection redefines the pocket watch with 50 years of AP Royal Oak iconography, wrapped in Swatch's bold bioceramic. Available in limited edition at selected boutiques.".split(' ').map((word, i) => (
            <span key={i} className="word-highlight" style={{ color: '#B3B3B3' }}>{word}{' '}</span>
          ))}
        </p>

        <p style={{
          color: '#1A1A1A',
          fontFamily: '"Helvetica Neue", sans-serif',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: '-0.32px',
          marginTop: 24,
          marginBottom: 0,
          maxWidth: 400,
        }}>
          The Bioceramic Royal Pop collection is available at selected Swatch stores (1 watch per person per store per day).
        </p>

      </div>

      {/* Right spacer: col 8, 87.5% → 100% */}
      <div style={{ width: '12.5%', flexShrink: 0 }} />
    </section>
  )
}
