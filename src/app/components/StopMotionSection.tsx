import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import f01 from '../../imports/1.jpg'
import f02 from '../../imports/2.jpg'
import f03 from '../../imports/3.jpg'
import f04 from '../../imports/4.jpg'
import f05 from '../../imports/5.jpg'
import f06 from '../../imports/6.jpg'
import f07 from '../../imports/7.jpg'
import f08 from '../../imports/8.jpg'
import f09 from '../../imports/9.jpg'
import f10 from '../../imports/10.jpg'
import f11 from '../../imports/11.jpg'
import f12 from '../../imports/12.jpg'
import f13 from '../../imports/13.jpg'
import f14 from '../../imports/14.jpg'
import f15 from '../../imports/15.jpg'
import f16 from '../../imports/16.jpg'
import f17 from '../../imports/17.jpg'
import f18 from '../../imports/18.jpg'
import f19 from '../../imports/19.jpg'
import f20 from '../../imports/20.jpg'
import f21 from '../../imports/21.jpg'
import f22 from '../../imports/22.jpg'
import f23 from '../../imports/23.jpg'
import f24 from '../../imports/24.jpg'
import f25 from '../../imports/25.jpg'
import f26 from '../../imports/26.jpg'
import f27 from '../../imports/27.jpg'
import f28 from '../../imports/28.jpg'
import f29 from '../../imports/29.jpg'
import f30 from '../../imports/30.jpg'
import f31 from '../../imports/31.jpg'
import f32 from '../../imports/32.jpg'
import f33 from '../../imports/33.jpg'
import f34 from '../../imports/34.jpg'

gsap.registerPlugin(ScrollTrigger)

const smBodyText = "Sistem51 is Swatch's iconic movement and the only mechanical movement with 100% automated assembly. Available in a hand-wound version designed without a central screw."
const smBoldWords = new Set(['Sistem51', "Swatch's", '100%', 'hand-wound'])

const FRAMES = [
  f01, f02, f03, f04, f05, f06, f07, f08, f09, f10,
  f11, f12, f13, f14, f15, f16, f17, f18, f19, f20,
  f21, f22, f23, f24, f25, f26, f27, f28, f29, f30,
  f31, f32, f33, f34,
]

const STATS = [
  { number: '90 h',  end: 90,   suffix: ' h',  decimals: 0, label: '— Power reserve',    description: 'A single full wind of ~80 turns' },
  { number: '15',    end: 15,   suffix: '',    decimals: 0, label: '— Active patents',    description: 'Filed for this movement alone' },
  { number: '21.6K', end: 21.6, suffix: 'K',  decimals: 1, label: '— Vibrations / hour', description: 'Anti-magnetic Nivachron spring' },
  { number: '2',     end: 2,    suffix: '',    decimals: 0, label: '— Case styles',       description: 'Lépine & Savonnette' },
]

const countUp = (
  el: HTMLSpanElement,
  end: number,
  suffix: string,
  decimals: number,
  duration: number,
) => {
  let startTime: number | null = null
  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = end * eased
    el.textContent = parseFloat(current.toFixed(decimals)) + suffix
    if (progress < 1) requestAnimationFrame(step)
    else el.textContent = parseFloat(end.toFixed(decimals)) + suffix
  }
  requestAnimationFrame(step)
}

export function StopMotionSection() {
  const animWrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    // Preload all frames
    FRAMES.forEach(src => {
      const img = new Image()
      img.src = src
    })

    const animWrapper = animWrapperRef.current
    const img = imgRef.current
    if (!animWrapper || !img) return

    const onScroll = () => {
      const rect = animWrapper.getBoundingClientRect()
      const sectionHeight = animWrapper.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / sectionHeight)
      const frameIndex = Math.min(FRAMES.length - 1, Math.floor((1 - progress) * FRAMES.length))
      img.src = FRAMES[frameIndex]
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    ScrollTrigger.normalizeScroll(true)
    ScrollTrigger.config({ ignoreMobileResize: true })

    // Stats scroll-triggered animations — trigger on stats container, stagger each block
    const ctx = gsap.context(() => {
      const statsContainer = statsRef.current
      if (!statsContainer) return

      gsap.set('.specs-block-0, .specs-block-1, .specs-block-2, .specs-block-3', { opacity: 0, x: 40 })

      gsap.to('.specs-block-0, .specs-block-1, .specs-block-2, .specs-block-3', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: statsContainer,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Animation 1 — SISTEM51 title mask reveal (same as Section03 title)
      gsap.fromTo('.sm-title-line',
        { y: '110%', opacity: 0 },
        {
          y: '0%', opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.3,
          scrollTrigger: {
            trigger: '.sm-text-block',
            start: 'top 95%',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          },
        }
      )

      // Animation 2 — body text word-by-word color reveal (adapted for dark bg)
      gsap.to('.sm-word-highlight', {
        color: '#FFFFFF',
        stagger: { each: 0.03, from: 'start' },
        ease: 'none',
        scrollTrigger: {
          trigger: '.sm-body-text',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        invalidateOnRefresh: true,
        once: true,
        onEnter: () => {
          STATS.forEach((stat, i) => {
            const el = numberRefs.current[i]
            if (!el) return
            setTimeout(() => {
              countUp(el, stat.end, stat.suffix, stat.decimals, 2000)
            }, i * 200)
          })
        },
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    // Outer black container — seamless background across animation + stats
    <div style={{ backgroundColor: '#000000' }}>

      {/* 500vh animation wrapper — sticky image only, no stats inside */}
      <div
        ref={animWrapperRef}
        style={{
          position: 'relative',
          height: '580vh',
          paddingTop: 240,
          boxSizing: 'border-box',
        }}
      >
        <img
          ref={imgRef}
          src={FRAMES[0]}
          alt=""
          style={{
            position: 'sticky',
            top: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'contain',
            objectPosition: 'center center',
            display: 'block',
          }}
        />
      </div>

      {/* Text block between animation and stats */}
      <div className="sm-text-block" style={{
        position: 'relative',
        zIndex: 2,
        marginLeft: 100,
        width: '25%',
        backgroundColor: 'transparent',
        paddingBottom: 80,
      }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 40,
          fontWeight: 400,
          fontSynthesis: 'none',
          lineHeight: '48px',
          letterSpacing: '-0.5px',
          marginBottom: 12,
          overflow: 'hidden',
          paddingBottom: '0.1em',
        }}>
          <div className="sm-title-line" style={{ display: 'block', color: '#FFFFFF' }}>
            Sistem51
          </div>
        </div>
        <div className="sm-body-text" style={{
          fontFamily: 'var(--font-body)',
          fontSize: 18,
          fontWeight: 400,
          lineHeight: '28px',
          letterSpacing: '-0.3px',
        }}>
          {smBodyText.split(' ').map((word, i) => (
            <span
              key={i}
              className="sm-word-highlight"
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontWeight: smBoldWords.has(word.replace(/[.,;!?]$/, '')) ? 600 : 400,
              }}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Stats — outside the sticky wrapper, appear after animation ends */}
      <div
        ref={statsRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          backgroundColor: '#000000',
          paddingLeft: 80,
          paddingRight: 80,
          paddingBottom: 80,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`specs-block-${i}`}
            style={{ backgroundColor: '#000000', padding: '0 32px 40px', opacity: 0 }}
          >
            <div style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontSize: 80,
              fontWeight: 400,
              fontSynthesis: 'none',
              lineHeight: '80px',
              letterSpacing: '-2px',
            }}>
              <span ref={el => { numberRefs.current[i] = el }}>{stat.number}</span>
            </div>
            <div style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontSize: 20,
              fontWeight: 400,
              fontSynthesis: 'none',
              lineHeight: '24px',
              letterSpacing: 0,
              marginTop: 16,
            }}>
              {stat.label}
            </div>
            <div style={{
              color: '#7D7D7D',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: 16,
              fontWeight: 400,
              lineHeight: '24px',
              marginTop: 8,
            }}>
              {stat.description}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
