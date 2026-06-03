---

## NAVIGATION STICKY

```
Logo AP × Swatch [stack verticale] → al scroll > 60px: transizione a layout orizzontale inline compresso
CTA "Find a Store" [text link, outline sottile] + "Buy Now" [filled, colore accent]
```
- La nav diventa sticky immediatamente. Background: `rgba(255,255,255,0.92)` con `backdrop-filter: blur(12px)`
- Su mobile: solo logo + "Buy Now" visibili
- Le due CTA devono sempre essere visibili — sticky sia su desktop che mobile

**Animazione CTA all'entrata (split asimmetrico):**
```
"Find a Store" → translateX(-40px) + opacity 0→1, delay 0ms, duration 600ms
"Buy Now"      → translateX(+40px) + opacity 0→1, delay 120ms, duration 600ms
Easing: cubic-bezier(0.34, 1.56, 0.64, 1) — spring finale
```
Partono a `t=1400ms` nella sequenza hero, dopo le mascotte.

**Hover "Find a Store" (ghost):**
`::before` con `scaleX(0→1)`, `transform-origin: left`, testo cambia colore in sync — duration 280ms

**Hover "Buy Now" (filled):**
Shimmer diagonale: `::before` con gradiente `transparent → rgba(255,255,255,0.25) → transparent`, `translateX(-100%→+100%)` — duration 350ms + `scale(1.02)`

**Sticky durante lo scroll:**
- Entrano con `translateY(-100%)→translateY(0)`, 400ms
- Nav guadagna `backdrop-filter: blur(12px)` simultaneamente
- Su mobile: bottom bar sale con `translateY(+60px)→0`

---

## STRUTTURA DELLA PAGINA — SEZIONE PER SEZIONE

---

### SEZIONE 01 — HERO

**Altezza:** wrapper `height: 300vh` (per consumare scroll), contenuto visivo `position: sticky; top: 0; height: 100vh`
**Background:** `#F7F7F7`

---

#### ANIMAZIONE 1 — LOGO AP × SWATCH (primo elemento che appare)

> **Riferimento visivo:** vedi screenshot allegato — a sinistra lo stato intermedio (loghi sfasati/in movimento), a destra lo stato finale (loghi allineati verticalmente: AUDEMARS PIGUET / × / swatch).

Il logo è composto da tre elementi distinti:
- `logo-ap` — logotipo "AUDEMARS PIGUET" (serif elegante)
- `logo-x` — simbolo "×" separatore
- `logo-swatch` — logotipo "swatch®" con croce rossa

**Stato iniziale (t=0):** tutti e tre i loghi sono fuori campo verso il basso (`translateY(60px)`), `opacity: 0`, con uno sfasamento verticale tra loro.

**Animazione — mask reveal dal basso con sfasamento loghi:**
Ogni logo è avvolto in un container con `overflow: hidden`. Il reveal avviene con `translateY(100%)→translateY(0)` — il testo "sale" da dentro il suo contenitore come se emergesse da sotto una maschera.

```javascript
// Sequenza temporale logo
gsap.timeline()
  .fromTo('#logo-ap',
    { yPercent: 100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 0.7,
      ease: 'power3.out' }
  )
  .fromTo('#logo-x',
    { yPercent: 100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 0.5,
      ease: 'power3.out' },
    '-=0.4'   // si sovrappone leggermente al logo AP
  )
  .fromTo('#logo-swatch',
    { yPercent: 100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 0.7,
      ease: 'power3.out' },
    '-=0.35'
  )
```

**HTML structure necessaria:**
```html
<div id="logo-group" style="overflow: hidden; text-align: center;">
  <div style="overflow: hidden;"><div id="logo-ap"><!-- img AP --></div></div>
  <div style="overflow: hidden;"><div id="logo-x">×</div></div>
  <div style="overflow: hidden;"><div id="logo-swatch"><!-- img Swatch --></div></div>
</div>
```

> Il doppio wrapper (container con `overflow:hidden` + elemento interno che si muove) è la chiave tecnica del mask reveal: il contenuto scorre verso l'alto mentre il bordo del container funge da maschera invisibile. L'effetto visivo risultante è che i loghi "emergono" ordinatamente dal basso, uno dopo l'altro con leggero sfasamento temporale.

---

#### ANIMAZIONE 2 — TITOLO HERO (riferimento: ordrhealth.com "Health curated")

> **Riferimento esatto:** su https://www.ordrhealth.com/ il titolo "Health curated" usa un'animazione di tipo **mask reveal per parola** — ogni parola è avvolta da un container invisibile (`overflow: hidden`) e il testo sale dall'interno verso l'alto con un movimento fluido. Le parole appaiono in sequenza rapida con micro-delay tra ciascuna. Il risultato è una rivelazione "a cascata orizzontale" molto più dinamica del semplice fade-in.

**Testo hero:**
```
Riga 1: THE NEW ROYAL POP
Riga 2: POP NEVER STOPS
```
- "POP" (prima occorrenza, fine riga 1) e "POP" (inizio riga 2) → colore accent `#E8321A`
- Tutto il resto → `#191919`
- Font: BBH Bogle (.title-big) — dimensione che riempie il 90% del viewport width, fluid via clamp(48px, 10vw, 144px)
- `white-space: nowrap` su ogni riga

**Implementazione mask reveal per parola (come ORDR "Health curated"):**

```javascript
// Usa SplitType per dividere ogni riga in parole
// Ogni parola ottiene un wrapper overflow:hidden automatico

import SplitType from 'splittype'

const heroText = new SplitType('.hero-title', { types: 'words' })
// SplitType crea: <div class="word">THE</div> <div class="word">NEW</div> ecc.

// Aggiungi overflow:hidden a ogni .word tramite CSS:
// .hero-title .word { overflow: hidden; display: inline-block; }

gsap.fromTo('.hero-title .word',
  { yPercent: 110 },   // parte da SOTTO il bordo del container
  {
    yPercent: 0,
    duration: 0.75,
    ease: 'power4.out',
    stagger: {
      amount: 0.35,     // distribuzione totale del delay su tutte le parole
      from: 'start'
    },
    delay: 0.6          // parte DOPO il logo (t=600ms)
  }
)
```