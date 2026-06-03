import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const groupImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

gsap.registerPlugin(ScrollTrigger)

export function ImageRevealSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(wrapperRef.current,
        { width: '55%' },
        {
          width: '75%',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{
      paddingBottom: 120,
      background: 'transparent',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div
        ref={wrapperRef}
        style={{
          width: '55%',
          margin: '0 auto',
        }}
      >
        <img
          src={groupImg}
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            borderRadius: 0,
          }}
        />
      </div>
    </div>
  )
}
