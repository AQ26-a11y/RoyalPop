import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const bodyText = 'Inspired by the modular design of our iconic POP line, every watch in the Royal Pop collection adapts effortlessly to your style. With a choice of three different strap lengths, you can wear it or display it in whatever way suits you best. Accessories are available online.'

export function FinalTextBlock() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const shared = {
        trigger: '.ftb-headline',
        start: 'top 95%',
        toggleActions: 'play reverse play reverse' as const,
        invalidateOnRefresh: true,
      }
      gsap.fromTo('.ftb-line-1', { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.3, scrollTrigger: shared })
      gsap.fromTo('.ftb-line-2', { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.6, scrollTrigger: shared })
      gsap.fromTo('.ftb-line-3', { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.9, scrollTrigger: shared })

      gsap.to('.ftb-word', {
        color: 'rgb(58, 58, 58)',
        stagger: { each: 0.03, from: 'start' },
        ease: 'none',
        scrollTrigger: {
          trigger: '.ftb-body',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '160px 0',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Left spacer — column 1 */}
      <div style={{ width: '12.5%', flexShrink: 0 }} />

      {/* Title — columns 2-4 (~37.5%) */}
      <div
        className="ftb-headline"
        style={{ width: '25%', flexShrink: 0 }}
      >
        {[
          { cls: 'ftb-line-1', text: 'Ready to make' },
          { cls: 'ftb-line-2', text: 'an impression' },
          { cls: 'ftb-line-3', text: 'everywhere' },
        ].map(({ cls, text }) => (
          <div key={cls} style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
            <div
              className={cls}
              style={{
                display: 'block',
                color: '#000000',
                fontFamily: 'var(--font-heading)',
                fontSize: 40,
                fontWeight: 700,
                lineHeight: '48px',
                letterSpacing: '-0.2px',
              }}
            >
              {text}
            </div>
          </div>
        ))}
      </div>

      {/* Gap — columns 4-5 */}
      <div style={{ width: '25%', flexShrink: 0 }} />

      {/* Body + caption — columns 6-7 (25%) */}
      <div style={{ width: '25%', flexShrink: 0 }}>
        <p className="ftb-body" style={{
          fontFamily: 'var(--font-body)',
          fontSize: 18,
          fontWeight: 400,
          lineHeight: '28px',
          letterSpacing: '-0.3px',
          margin: 0,
        }}>
          {bodyText.split(' ').map((word, i) => (
            <span
              key={i}
              className="ftb-word"
              style={{ color: 'rgba(0,0,0,0.3)' }}
            >
              {word}{' '}
            </span>
          ))}
        </p>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: '-0.3px',
          color: 'rgb(58, 58, 58)',
          opacity: 0.6,
          marginTop: 16,
          marginBottom: 0,
        }}>
          The Bioceramic Royal Pop collection is available at selected Swatch stores (1 watch per person per store per day).
        </p>
      </div>

      {/* Right spacer — column 8 */}
      <div style={{ width: '12.5%', flexShrink: 0 }} />
    </section>
  )
}
