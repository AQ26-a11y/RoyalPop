import { useEffect, useRef } from 'react'
const PRESS_DATA = [
  {
    id: 1,
    name: 'Complex',
    quote: '"Not since the original MoonSwatch has a timepiece captured such widespread attention."',
    url: 'https://www.complex.com/style/a/markelibert/audemars-piguet-swatch-royal-pop-collab',
  },
  {
    id: 2,
    name: 'JCK',
    quote: '"The Audemars Piguet x Swatch Royal Pop announcement has fired up the watch world."',
    url: 'https://www.jckonline.com/editorial-article/swatch-x-audemars-piguet/',
  },
  {
    id: 3,
    name: 'Robb Report',
    quote: '"The Royal Pop is nothing short of a cultural phenomenon."',
    url: 'https://robbreport.com/style/watch-collector/audemars-piguet-swatch-royal-pop-watch-reveal-1238057441/',
  },
  {
    id: 4,
    name: 'Gear Patrol',
    quote: '"Not since the original MoonSwatch has a timepiece captured such widespread attention."',
    url: 'https://www.gearpatrol.com/watches/swatch-audemars-piaget-royal-pop-impressions/',
  },
  {
    id: 5,
    name: 'WatchGuys',
    quote: '"The biggest watch launch since the original MoonSwatch broke the internet in 2022."',
    url: 'https://www.watchguys.com/blogs/watch-news/swatch-teases-audemars-piguet-collaboration',
  },
]

export function PressCarouselSection() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isDragging  = useRef(false)
  const startX      = useRef(0)
  const dragOffset  = useRef(0)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const track   = trackRef.current
    const wrapper = wrapperRef.current
    if (!track || !wrapper) return

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
      dragOffset.current = parseInt(track.style.marginLeft || '0')
      pauseAnimation()
      track.style.cursor = 'grabbing'
      e.preventDefault()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      track.style.marginLeft = (dragOffset.current + e.clientX - startX.current) + 'px'
      e.preventDefault()
    }

    const onMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      track.style.cursor = 'grab'
      resumeAnimation()
    }

    const onEnter = () => pauseAnimation()
    const onLeave = () => { if (!isDragging.current) resumeAnimation() }

    track.addEventListener('mousedown', onMouseDown, { passive: false })
    document.addEventListener('mousemove', onMouseMove, { passive: false })
    document.addEventListener('mouseup', onMouseUp)
    wrapper.addEventListener('mouseenter', onEnter)
    wrapper.addEventListener('mouseleave', onLeave)

    return () => {
      track.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      wrapper.removeEventListener('mouseenter', onEnter)
      wrapper.removeEventListener('mouseleave', onLeave)
      clearTimeout(resumeTimer.current)
    }
  }, [])

  const allItems = [...PRESS_DATA, ...PRESS_DATA]

  return (
    <section
      id="section-press"
      style={{ background: 'transparent', padding: '160px 0', overflow: 'hidden' }}
    >
      <div
        ref={wrapperRef}
        style={{ overflow: 'hidden', cursor: 'grab', userSelect: 'none' }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            animation: 'marqueePress 80s linear infinite',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {allItems.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
            >
              {/* Item: logo + text */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                flexShrink: 0,
              }}>
                {/* Publication name */}
                <span style={{
                  color: 'rgb(26, 26, 26)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 124,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSynthesis: 'none',
                  lineHeight: '164px',
                  letterSpacing: '-2px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  {item.name}
                </span>

                {/* Text block */}
                <div style={{ width: 400, flexShrink: 0 }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    lineHeight: 1.6,
                    color: 'rgb(26, 26, 26)',
                    margin: 0,
                  }}>
                    {item.quote}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: 10,
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'rgb(26, 26, 26)',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  >
                    Read article <span style={{ fontSize: '0.75em' }}>↗</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueePress {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
