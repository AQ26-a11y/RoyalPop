import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

// ── Card back (same for all cards) ──────────────────────────────────────────
import cardBack from '../../imports/card-memory-latoA-2.png'

// ── Pair images: [variant-A, variant-B] ─────────────────────────────────────
// To add a new pair, append one entry here — no other changes needed.
import blaueAcht1   from '../../imports/Blaue-Acht-1-1.png'
import blaueAcht2   from '../../imports/Blaue-Acht-1-1.png'
import greenEight1  from '../../imports/Green-Eight-1-1.png'
import greenEight2  from '../../imports/Green-Eight-1-1.png'
import huitBlanc1   from '../../imports/Huit-Blanc-1-1.png'
import huitBlanc2   from '../../imports/Huit-Blanc-1-1.png'
import lanBa1       from '../../imports/Lan-Ba-1-2.png'
import lanBa2       from '../../imports/Lan-Ba-1-2.png'
import ochoNegro1   from '../../imports/Ocho-Negro-1-1.png'
import ochoNegro2   from '../../imports/Ocho-Negro-1-1.png'
import orenji1      from '../../imports/Orenji-Hachi-1.png'
import orenji2      from '../../imports/Orenji-Hachi-1.png'
import otgRoz1      from '../../imports/Otg-Roz-1.png'
import otgRoz2      from '../../imports/Otg-Roz-1.png'
import ottoRosso1   from '../../imports/Otto-Rosso-1.png'
import ottoRosso2   from '../../imports/Otto-Rosso-1.png'

// ── Card pair configuration ──────────────────────────────────────────────────
// Each tuple is [variantA, variantB] — the two front-face images for that pair.
// Matching logic uses the array index (imageId), not the image URLs.
const CARD_PAIRS: [string, string][] = [
  [blaueAcht1,  blaueAcht2 ],  // 0 – Blaue Acht
  [greenEight1, greenEight2],  // 1 – Green Eight
  [huitBlanc1,  huitBlanc2 ],  // 2 – Huit Blanc
  [lanBa1,      lanBa2     ],  // 3 – Lan Ba
  [ochoNegro1,  ochoNegro2 ],  // 4 – Ocho Negro
  [orenji1,     orenji2    ],  // 5 – Orenji Hachi  (swap imports above when ready)
  [otgRoz1,     otgRoz2    ],  // 6 – Otg Roz       (swap imports above when ready)
  [ottoRosso1,  ottoRosso2 ],  // 7 – Otto Rosso    (swap imports above when ready)
]

// ── Types ────────────────────────────────────────────────────────────────────
interface Card { id: number; imageId: number; image: string }

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createCards(): Card[] {
  const deck = CARD_PAIRS.flatMap(([imgA, imgB], imageId) => [
    { imageId, image: imgA },
    { imageId, image: imgB },
  ])
  return shuffleArray(deck).map((c, id) => ({ id, ...c }))
}

import qrImage from '../../imports/qr-swatch-com.png'

// ── Component ────────────────────────────────────────────────────────────────
interface Props { isOpen: boolean; onClose: () => void }

export function MemoryGameModal({ isOpen, onClose }: Props) {
  const modalRef   = useRef<HTMLDivElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])
  const entranceTl = useRef<gsap.core.Timeline | null>(null)

  const [isMounted, setIsMounted]   = useState(false)
  const [cards, setCards]           = useState<Card[]>(() => createCards())
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set())
  const [isChecking, setIsChecking] = useState(false)
  const [isWon, setIsWon]           = useState(false)

  const runEntrance = useCallback((delay = 0) => {
    const row1 = cardRefs.current.slice(0, 8).filter((el): el is HTMLDivElement => el !== null)
    const row2 = cardRefs.current.slice(8, 16).filter((el): el is HTMLDivElement => el !== null)
    if (!row1.length) return
    entranceTl.current?.kill()
    gsap.set([...row1, ...row2], { y: '100%' })
    const tl = gsap.timeline({ delay })
    tl.to(row1, { y: '0%', duration: 0.5, ease: 'power3.out', stagger: 0.06 })
    tl.to(row2, { y: '0%', duration: 0.5, ease: 'power3.out', stagger: 0.06 })
    entranceTl.current = tl
  }, [])

  useEffect(() => { if (isOpen) setIsMounted(true) }, [isOpen])

  useEffect(() => {
    if (!isMounted || !modalRef.current) return
    gsap.fromTo(modalRef.current,
      { clipPath: 'circle(0% at 100% 100%)' },
      { clipPath: 'circle(150% at 100% 100%)', duration: 0.8, ease: 'power2.inOut', onComplete: () => runEntrance(0) }
    )
  }, [isMounted, runEntrance])

  const handleClose = useCallback(() => {
    if (!modalRef.current) return
    gsap.to(modalRef.current, {
      clipPath: 'circle(0% at 100% 100%)',
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsMounted(false)
        setCards(createCards())
        setFlippedIds([])
        setMatchedIds(new Set())
        setIsChecking(false)
        setIsWon(false)
        onClose()
      },
    })
  }, [onClose])

  const resetGame = useCallback(() => {
    setCards(createCards())
    setFlippedIds([])
    setMatchedIds(new Set())
    setIsChecking(false)
    setIsWon(false)
    requestAnimationFrame(() => requestAnimationFrame(() => runEntrance(0)))
  }, [runEntrance])

  const handleCardClick = useCallback((card: Card) => {
    if (isChecking) return
    if (matchedIds.has(card.imageId)) return
    if (flippedIds.includes(card.id)) return
    if (flippedIds.length >= 2) return

    const next = [...flippedIds, card.id]
    setFlippedIds(next)

    if (next.length === 2) {
      const c1 = cards.find(c => c.id === next[0])!
      const c2 = cards.find(c => c.id === next[1])!
      if (c1.imageId === c2.imageId) {
        const nm = new Set(matchedIds)
        nm.add(c1.imageId)
        setMatchedIds(nm)
        setFlippedIds([])
        if (nm.size === CARD_PAIRS.length) setTimeout(() => setIsWon(true), 400)
      } else {
        setIsChecking(true)
        setTimeout(() => { setFlippedIds([]); setIsChecking(false) }, 1000)
      }
    }
  }, [isChecking, matchedIds, flippedIds, cards])

  if (!isMounted) return null

  const PILL: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '12px 20px', borderRadius: 80, cursor: 'pointer',
    fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 400, lineHeight: '20px',
  }

  return (
    <>
      <style>{`
        .mc-card {
          position: relative;
          cursor: pointer;
          user-select: none;
          border-radius: 20px;
          overflow: hidden;
        }
        .mc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(135deg, #6BC96E, #47CEEC, #C44945, #CCCCCC, #BEEB3F);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
          z-index: 2;
        }
        .mc-card:hover::before { opacity: 1; }
      `}</style>

      <div ref={modalRef} style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: '#F0FAF8', clipPath: 'circle(0% at 100% 100%)',
        display: 'flex', flexDirection: 'column',
        boxSizing: 'border-box', overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
          padding: '40px 40px 24px', flexShrink: 0, position: 'relative', zIndex: 200, boxSizing: 'border-box',
        }}>
          {!isWon && (
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 80, fontWeight: 400,
              lineHeight: '80px', letterSpacing: '-1.6px', color: '#1A1A1A', margin: 0,
            }}>
              Matching card
            </h1>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            {!isWon && (
              <>
                <button onClick={resetGame} style={{ ...PILL, background: '#1A1A1A', border: 'none', color: '#fff', minWidth: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', paddingLeft: '28px' }}>
                  Reset
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                </button>
                <button style={{ ...PILL, background: 'transparent', border: '1px solid rgb(138 138 138)', color: '#1A1A1A', minWidth: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginRight: '20px', paddingLeft: '28px' }}>
                  Info
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1A1A1A">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </button>
                <div style={{ width: 1, height: 32, background: 'rgba(26,26,26,0.2)' }} />
              </>
            )}
            <button onClick={handleClose} style={{ ...PILL, background: 'transparent', border: 'none', color: '#1A1A1A' }}>
              Close
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1A1A1A">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          padding: '0 40px 40px', boxSizing: 'border-box', position: 'relative',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 7,
            width: '100%',
          }}>
            {cards.map((card, i) => {
              const showFront = flippedIds.includes(card.id) || matchedIds.has(card.imageId)
              return (
                <div key={i} style={{ width: 'calc((100% - 7px * 7) / 8)', flexShrink: 0, overflow: 'hidden' }}>
                  <div ref={el => { cardRefs.current[i] = el }}>
                    <div className="mc-card" onClick={() => handleCardClick(card)}>
                      <div style={{ perspective: '1000px' }}>
                        <div style={{
                          position: 'relative',
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.4s ease',
                          transform: showFront ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}>

                          {/* Back face — defines natural card height */}
                          <img
                            src={cardBack}
                            alt=""
                            style={{
                              width: '100%', height: 'auto', display: 'block',
                              backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                            }}
                          />

                          {/* Front face — absolutely overlaid, same dimensions */}
                          <div style={{
                            position: 'absolute', inset: 0,
                            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            background: 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <img src={card.image} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Win overlay */}
          {isWon && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(247,247,247,0.80)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 24, zIndex: 10, marginTop: '-80px',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 80, fontWeight: 400, lineHeight: '80px', letterSpacing: '-1.6px', color: '#1A1A1A', marginBottom: -16 }}>
                You Win!
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 400, lineHeight: '28px', color: 'rgb(26,26,26)', letterSpacing: 0, textAlign: 'center', maxWidth: 480, margin: 0 }}>
                Scan to unlock exclusive Royal Pop content<br />the story behind the collaboration.
              </p>
              <div style={{ marginBottom: 30 }}>
                <img src={qrImage} alt="QR Code" style={{ width: 120, height: 120, display: 'block', objectFit: 'contain' }} />
              </div>
              <button
                onClick={resetGame}
                onMouseEnter={e => { const b = e.currentTarget; b.style.transform = 'scale(1.03)'; }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.transform = 'scale(1)'; }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '20px 48px', borderRadius: 100, background: '#1A1A1A', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 400, color: '#FFFFFF', transition: 'transform 0.25s ease-out', minWidth: 280 }}
              >
                Play again
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
