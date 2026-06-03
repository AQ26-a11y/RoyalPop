import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const bodyText = 'When joyful boldness and positive provocation meet haute horlogerie, the result is far more than a simple watch: it is a declaration of creativity in the form of a timepiece. And this statement takes shape in a collection that breaks the rules of watchmaking and revolutionizes the traditional way of wearing a watch.'

export function Section03() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shared = {
        trigger: '.section-03-headline',
        start: 'top 95%',
        toggleActions: 'play reverse play reverse',
      }

      gsap.fromTo('.section-03-line-1',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.3, scrollTrigger: shared }
      )
      gsap.fromTo('.section-03-line-2',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.6, scrollTrigger: shared }
      )
      gsap.fromTo('.section-03-line-3',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.9, scrollTrigger: shared }
      )

      gsap.to('.section-03-body .word-highlight', {
        color: '#1A1A1A',
        stagger: { each: 0.03, from: 'start' },
        ease: 'none',
        scrollTrigger: {
          trigger: '.section-03-body',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const titleLines = [
    { text: 'Audemars Piguet', cls: 'section-03-line-1' },
    { text: '& Swatch break the', cls: 'section-03-line-2' },
    { text: 'rules of watchmaking', cls: 'section-03-line-3' },
  ]

  return (
    <section
      ref={sectionRef}
      id="section-03"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '160px 0',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
        {/* LEFT spacer — column 1 (0% → 12.5%) — mirrors right gap of 12.5% */}
        <div style={{ width: '12.5%', flexShrink: 0 }} />

        {/* HEADLINE — columns 3–4 (25% → 50%) */}
        <h2
          ref={titleRef}
          className="section-03-headline"
          style={{
            width: '25%',
            flexShrink: 0,
            fontFamily: 'var(--font-heading)',
            fontSize: '40px',
            fontWeight: 600,
            fontStyle: 'normal',
            lineHeight: '48px',
            letterSpacing: '-0.2px',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            overflow: 'visible',
            height: 'auto',
            minHeight: 'unset',
            clipPath: 'none',
            mask: 'none',
            color: '#1A1A1A',
            textAlign: 'left',
            margin: 0,
          }}
        >
          {titleLines.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.1em' }}>
              <div className={line.cls} style={{ display: 'block' }}>{line.text}</div>
            </div>
          ))}
        </h2>

        {/* GAP — columns 4–5 (37.5% → 62.5%) */}
        <div style={{ width: '25%', flexShrink: 0 }} />

        {/* BODY TEXT — columns 7–8 (62.5% → 87.5%) */}
        <p
          className="section-03-body"
          style={{
            width: '25%',
            flexShrink: 0,
            overflow: 'visible',
            height: 'auto',
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: '28px',
            letterSpacing: '-0.4px',
            color: '#191919',
            opacity: 1,
            textAlign: 'left',
            margin: 0,
          }}
        >
          {bodyText.split(' ').map((word, i) => (
            <span key={i} className="word-highlight" style={{ color: '#B3B3B3' }}>{word}{' '}</span>
          ))}
        </p>

        {/* RIGHT spacer — column 8 right (87.5% → 100%) */}
        <div style={{ width: '12.5%', flexShrink: 0 }} />
    </section>
  )
}
