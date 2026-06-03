import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const bioceramicPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const sistem51Png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
const audemarsApPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

gsap.registerPlugin(ScrollTrigger)

function boldify(text: string, boldPhrases: string[]) {
  const escaped = boldPhrases.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`, 'g')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    boldPhrases.includes(part)
      ? <strong key={i} style={{ fontWeight: 700 }}>{part}</strong>
      : <span key={i}>{part}</span>
  )
}

const rows = [
  {
    id: 'bioceramic',
    imageSide: 'left' as const,
    label: 'Materiale',
    title: 'Bioceramic',
    body: 'Sviluppato e brevettato da Swatch, il Bioceramic è un materiale composito di spicco nell\'orologeria moderna. È composto per due terzi da ceramica di alta qualità e per un terzo da materiale di origine biologica derivato dall\'olio di ricino, il che lo rende un materiale resistente con una finitura opaca liscia e setosa.',
    boldWords: ['Swatch', 'ceramica', 'biologica'],
    image: bioceramicPng,
    imageAlt: 'Bioceramic material',
  },
  {
    id: 'sistem51',
    imageSide: 'right' as const,
    label: 'Movimento',
    title: 'Sistem51',
    body: 'SISTEM51 è il movimento iconico di Swatch e l\'unico movimento meccanico con un assemblaggio automatizzato al 100%. Questo movimento di fabbricazione svizzera è ora disponibile in una versione a carica manuale progettata senza vite centrale.',
    boldWords: ['SISTEM51', 'Swatch', '100%', 'carica manuale'],
    image: sistem51Png,
    imageAlt: 'SISTEM51 movement',
  },
  {
    id: 'audemarspiguet',
    imageSide: 'left' as const,
    label: 'Heritage',
    title: 'Audemars Piguet',
    body: 'Audemars Piguet contribuisce a plasmare l\'orologeria svizzera dal 1875. Noto per i suoi modelli audaci e ultra-lussuosi, il marchio è la forza creativa che sta dietro all\'iconica Royal Oak, una collezione che rappresenta un simbolo di innovazione, audacia e maestria artigianale d\'avanguardia.',
    boldWords: ['Audemars Piguet', 'Royal Oak'],
    image: audemarsApPng,
    imageAlt: 'Audemars Piguet',
  },
]

export function PillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      rows.forEach((_, i) => {
        gsap.fromTo(`.pill-row-${i}`,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.pill-row-${i}`,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-05"
      style={{
        background: 'transparent',
        padding: '160px 8%',
        boxSizing: 'border-box',
      }}
    >
      {rows.map((row, i) => (
        <div
          key={row.id}
          className={`pill-row-${i}`}
          style={{
            display: 'flex',
            flexDirection: row.imageSide === 'left' ? 'row' : 'row-reverse',
            alignItems: 'center',
            gap: 24,
            marginBottom: i < rows.length - 1 ? 24 : 0,
          }}
        >
          {/* Child 1 — circular image, standalone, no background */}
          <img
            src={row.image}
            alt={row.imageAlt}
            style={{
              width: 300,
              height: 300,
              minWidth: 300,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
              display: 'block',
            }}
          />

          {/* Child 2 — rounded rectangle with text only */}
          <div style={{
            flex: 1,
            height: 300,
            background: '#ffffff',
            borderRadius: 200,
            padding: '48px 80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '40px',
              fontWeight: 600,
              fontStyle: 'normal',
              lineHeight: '48px',
              letterSpacing: '-2px',
              color: '#1A1A1A',
              marginBottom: 16,
            }}>
              {row.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: '24px',
              letterSpacing: '-0.4px',
              color: '#191919',
            }}>
              {boldify(row.body, row.boldWords)}
            </div>
          </div>

        </div>
      ))}
    </section>
  )
}
