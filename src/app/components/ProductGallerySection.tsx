import { useState, useRef, useCallback } from 'react'
import huitBlancPng from '../../imports/HUIT-BLANC-new.png'
import orenji from '../../imports/ORENJI-HACHI.png'
import blaueAcht from '../../imports/BLAUE-ACHT-new.png'
import ottoRosso from '../../imports/OTTO-ROSSO-new.png'
import otgRoz from '../../imports/OTG-ROZ.png'
import ochoNegro from '../../imports/OCHO-NEGRO.png'
import greenEight from '../../imports/GREEN-EIGHT.png'
import lanBa from '../../imports/LAN-BA.png'

const PRODUCTS = [
  { name: 'Blaue Acht',   image: blaueAcht,   color: '#D5E1BB' },
  { name: 'Huit Blanc',   image: huitBlancPng, color: '#DEDEDE' },
  { name: 'Orenji Hachi', image: orenji,       color: '#BAC6E2' },
  { name: 'Otto Rosso',   image: ottoRosso,    color: '#EFCDCC' },
  { name: 'Lan Ba',       image: lanBa,        color: '#BBE3EF' },
  { name: 'Green Eight',  image: greenEight,   color: '#C5E5C6' },
  { name: 'Ocho Negro',   image: ochoNegro,    color: '#D3D3D3' },
  { name: 'Otg Roz',      image: otgRoz,       color: '#EEDBDE' },
]

const N = PRODUCTS.length
// Three copies: [copy A | copy B (start here) | copy C]
const EXTENDED = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS]
const START = N // index in the middle copy

const ITEM_VW = 65
const TRANSITION = 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)'

export function ProductGallerySection() {
  const [active, setActiveState] = useState(START)
  const activeRef = useRef(START)
  const prevProductIdx = useRef(START % N)
  const nameKey = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const setActive = (val: number) => {
    activeRef.current = val
    setActiveState(val)
  }

  const go = (dir: 1 | -1) => {
    const next = activeRef.current + dir
    const productIdx = ((next % N) + N) % N
    if (productIdx !== prevProductIdx.current) {
      nameKey.current += 1
      prevProductIdx.current = productIdx
    }
    setActive(next)
  }

  // After the CSS transition ends, silently teleport back to the middle copy
  const handleTransitionEnd = useCallback(() => {
    const cur = activeRef.current
    let target: number | null = null
    if (cur >= N * 2) target = cur - N
    else if (cur < N) target = cur + N
    if (target === null) return

    const track = trackRef.current
    if (track) track.style.transition = 'none'
    activeRef.current = target
    setActiveState(target)
    // Re-enable transition after the silent reposition is painted
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (track) track.style.transition = TRANSITION
      })
    })
  }, [])

  const productIdx = ((active % N) + N) % N
  const current = PRODUCTS[productIdx]
  const nameWords = current.name.split(' ')

  return (
    <section
      id="section-04b"
      style={{
        background: '#F5F5F5',
        paddingTop: 72,
        paddingBottom: 48,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes pgNameIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pg-name {
          animation: pgNameIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      {/* Carousel + ghost text wrapper */}
      <div style={{ position: 'relative', paddingTop: '8vh' }}>

        {/* Ghost background text */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '62vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            overflow: 'hidden',
          }}
        >
          <span style={{
            fontFamily: '"Stack Sans Text Expanded", var(--font-body)',
            fontSize: 'clamp(80px, 14.6vw, 216px)',
            fontWeight: 700,
            lineHeight: '1.2',
            letterSpacing: '-0.04em',
            color: current.color,
            opacity: 0.32,
            transition: 'color 0.55s ease',
            whiteSpace: 'nowrap',
          }}>
            {current.name}
          </span>
        </div>

        {/* Product name — absolutely positioned, aligned with ghost text cap-height */}
        <div
          key={nameKey.current}
          className="pg-name"
          style={{
            position: 'absolute',
            left: `${(100 - ITEM_VW) / 2}vw`,
            top: 'calc(31vh - 7vw)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          {nameWords.map((word, i) => (
            <div
              key={i}
              style={{
                fontFamily: '"Stack Sans Text Expanded", var(--font-body)',
                fontSize: 40,
                fontWeight: 700,
                lineHeight: '46px',
                letterSpacing: '-1.6px',
                color: '#000',
                whiteSpace: 'nowrap',
              }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Sliding track — 3× extended list for seamless infinite loop */}
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            display: 'flex',
            width: `${EXTENDED.length * ITEM_VW}vw`,
            transform: `translateX(calc(${(100 - ITEM_VW) / 2}vw - ${active * ITEM_VW}vw))`,
            transition: TRANSITION,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {EXTENDED.map((p, i) => {
            const isActive = i === active
            const isAdjacent = Math.abs(i - active) === 1
            return (
              <div
                key={i}
                style={{
                  width: `${ITEM_VW}vw`,
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: '62vh',
                  cursor: isActive ? 'default' : 'pointer',
                }}
                onClick={() => {
                  if (isActive) return
                  const dist = i - activeRef.current
                  if (dist === 1 || dist === -1) go(dist as 1 | -1)
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    height: '110%',
                    width: 'auto',
                    maxWidth: '99%',
                    objectFit: 'contain',
                    display: 'block',
                    opacity: isActive ? 1 : isAdjacent ? 0.72 : 0.25,
                    filter: isActive ? 'none' : 'grayscale(30%)',
                    transform: isActive ? 'scale(1)' : isAdjacent ? 'scale(0.94)' : 'scale(0.88)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 }}>
          <button
            onClick={() => go(-1)}
            aria-label="Previous product"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#1A1A1A',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#000')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={() => go(1)}
            aria-label="Next product"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#1A1A1A',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#000')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
