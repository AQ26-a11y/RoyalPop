import { useState, useEffect, useCallback, useRef } from 'react'
import lanBaFrontal from '../../imports/LAN-BA-Frontal-3.png'
import iconDiameter from '../../imports/arrows_left_right_circle_24dp_000000_FILL0_wght300_GRAD0_opsz24_1.svg'
import iconThickness from '../../imports/height_24dp_000000_FILL0_wght300_GRAD0_opsz24_1.svg'
import iconColour from '../../imports/colors_24dp_000000_FILL0_wght300_GRAD0_opsz24_1.svg'
import iconStrap from '../../imports/texture_24dp_000000_FILL0_wght300_GRAD0_opsz24_1.svg'
import iconCrystal from '../../imports/sound_detection_glass_break_24dp_000000_FILL0_wght300_GRAD0_opsz24_1.svg'

export interface ProductModalData {
  name: string
  price: string
  mainImage: string
  specs: { icon: string; label: string; value: string }[]
}

export const LAN_BA_DATA: ProductModalData = {
  name: 'Lan Ba',
  price: '€ 400,00',
  mainImage: lanBaFrontal,
  specs: [
    { icon: iconDiameter, label: 'Diameter:',       value: '40 mm' },
    { icon: iconThickness, label: 'Thickness:',     value: '8.4 mm' },
    { icon: iconColour,   label: 'Item colour:',    value: 'Blue' },
    { icon: iconStrap,    label: 'Strap material:', value: 'Calfskin' },
    { icon: iconCrystal,  label: 'Crystal:',        value: 'Sapphire' },
  ],
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: ProductModalData
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [visible, setVisible]     = useState(false)
  const [animating, setAnimating] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)))
    } else {
      setAnimating(false)
    }
  }, [isOpen, product])

  const handleTransitionEnd = useCallback(() => {
    if (!animating) setVisible(false)
  }, [animating])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleCtaEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setBlobPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setCtaHovered(true)
  }

  const handleCtaLeave = () => setCtaHovered(false)

  const nameParts = product.name.split(' ')
  const nameLine1 = nameParts[0]
  const nameLine2 = nameParts.slice(1).join(' ')

  if (!visible) return null

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9997,
        background: 'rgba(26, 26, 26, 0.70)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        opacity: animating ? 1 : 0,
        transition: 'opacity 400ms ease-out',
      }}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '90vh',
          overflow: 'hidden',
          background: '#F7F7F7',
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          transform: animating ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 400ms ease-out',
          zIndex: 9999,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 48,
            right: 48,
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#1A1A1A',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* LEFT COLUMN */}
        <div style={{
          width: '30%',
          flexShrink: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 80,
          gap: 24,
          boxSizing: 'border-box',
        }}>
          {/* Product title — line break after first word */}
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 124,
            fontWeight: 700,
            lineHeight: '100px',
            letterSpacing: '-2px',
            color: '#1A1A1A',
            marginBottom: 40,
          }}>
            <div>{nameLine1}</div>
            {nameLine2 && <div>{nameLine2}</div>}
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: 'rgb(0 0 0 / 8%)' }} />

          {/* Price */}
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 24,
            fontWeight: 700,
            lineHeight: '48px',
            letterSpacing: '-0.96px',
            color: '#000000',
            marginBottom: 24,
          }}>
            {product.price}
          </div>

          {/* CTA — same blob hover as sticky button */}
          <div
            ref={ctaRef}
            onMouseEnter={handleCtaEnter}
            onMouseLeave={handleCtaLeave}
            style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              width: '100%',
              padding: '24px 40px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              borderRadius: 80,
              outline: '1px solid #505050',
              background: '#1A1A1A',
              cursor: 'pointer',
              boxSizing: 'border-box',
              transform: `scale(${ctaHovered ? 1.06 : 1})`,
              transformOrigin: 'center center',
              transition: 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <span style={{
              position: 'absolute',
              left: blobPos.x,
              top: blobPos.y,
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: '#FFFFFF',
              transform: `translate(-50%, -50%) scale(${ctaHovered ? 1 : 0})`,
              transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            <span style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: ctaHovered ? '#1A1A1A' : '#FFF',
              fontFamily: 'var(--font-heading)',
              fontSize: 20,
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '20px',
              letterSpacing: 0,
              transition: 'color 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              userSelect: 'none',
            }}>
              Find in store
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.7653 10.973V18.9423C20.7653 19.4474 20.5903 19.875 20.2403 20.225C19.8903 20.575 19.4628 20.75 18.9578 20.75H5.07304C4.56804 20.75 4.14054 20.575 3.79054 20.225C3.44054 19.875 3.26554 19.4474 3.26554 18.9423V10.9538C2.86288 10.6231 2.56063 10.1939 2.35879 9.66625C2.15679 9.13875 2.15263 8.56925 2.34629 7.95775L3.35779 4.65375C3.49113 4.23325 3.71738 3.89417 4.03654 3.6365C4.35588 3.37883 4.73729 3.25 5.18079 3.25H18.8308C19.2745 3.25 19.6533 3.37308 19.9673 3.61925C20.2815 3.86542 20.5103 4.20392 20.6538 4.63475L21.6845 7.95775C21.8782 8.56925 21.874 9.13683 21.672 9.6605C21.4702 10.1843 21.168 10.6218 20.7653 10.973ZM14.2155 10.25C14.7617 10.25 15.1723 10.083 15.4473 9.749C15.7223 9.415 15.8348 9.05633 15.7848 8.673L15.177 4.75H12.7653V8.7C12.7653 9.1205 12.9076 9.484 13.1923 9.7905C13.477 10.0968 13.818 10.25 14.2155 10.25ZM9.71554 10.25C10.1757 10.25 10.549 10.0968 10.8355 9.7905C11.1222 9.484 11.2655 9.1205 11.2655 8.7V4.75H8.85379L8.24629 8.7115C8.19229 9.06667 8.30379 9.41192 8.58079 9.74725C8.85779 10.0824 9.23604 10.25 9.71554 10.25ZM5.26554 10.25C5.63604 10.25 5.95463 10.1208 6.22129 9.8625C6.48796 9.60417 6.65271 9.2795 6.71554 8.8885L7.30379 4.75H5.18079C5.07179 4.75 4.98529 4.774 4.92129 4.822C4.85713 4.87017 4.80904 4.94233 4.77704 5.0385L3.81529 8.29225C3.68329 8.72175 3.74554 9.15542 4.00204 9.59325C4.25838 10.0311 4.67954 10.25 5.26554 10.25ZM18.7655 10.25C19.3065 10.25 19.7206 10.0375 20.0078 9.6125C20.295 9.1875 20.3642 8.74742 20.2155 8.29225L19.2038 5.01925C19.1718 4.92308 19.1238 4.85417 19.0598 4.8125C18.9956 4.77083 18.909 4.75 18.8 4.75H16.727L17.3153 8.8885C17.3781 9.2795 17.5429 9.60417 17.8095 9.8625C18.0762 10.1208 18.3949 10.25 18.7655 10.25ZM5.07304 19.25H18.9578C19.0475 19.25 19.1211 19.2212 19.1788 19.1635C19.2366 19.1058 19.2655 19.0321 19.2655 18.9423V11.6615C19.1565 11.7013 19.0655 11.726 18.9923 11.7355C18.9193 11.7452 18.8437 11.75 18.7655 11.75C18.3155 11.75 17.9197 11.6686 17.578 11.5058C17.2364 11.3429 16.9052 11.082 16.5845 10.723C16.3039 11.0358 15.9719 11.2853 15.5885 11.4713C15.2052 11.6571 14.768 11.75 14.277 11.75C13.8527 11.75 13.4527 11.6618 13.077 11.4855C12.7014 11.3093 12.3475 11.0552 12.0155 10.723C11.7065 11.0552 11.3565 11.3093 10.9655 11.4855C10.5744 11.6618 10.1782 11.75 9.77704 11.75C9.32571 11.75 8.90263 11.6683 8.50779 11.5048C8.11296 11.3413 7.76554 11.0807 7.46554 10.723C7.04488 11.1435 6.65729 11.4198 6.30279 11.552C5.94846 11.684 5.60271 11.75 5.26554 11.75C5.18721 11.75 5.10638 11.7452 5.02304 11.7355C4.93971 11.726 4.85379 11.7013 4.76529 11.6615V18.9423C4.76529 19.0321 4.79421 19.1058 4.85204 19.1635C4.90971 19.2212 4.98338 19.25 5.07304 19.25Z" fill={ctaHovered ? '#1A1A1A' : '#E1E1E1'}/>
              </svg>
            </span>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img
            src={product.mainImage}
            alt={product.name}
            style={{
              maxHeight: '98%',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div style={{
          width: '30%',
          flexShrink: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: '80px',
          gap: '8px',
          boxSizing: 'border-box',
          marginLeft: '-30px',
        }}>
          {product.specs.map(({ icon, label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '24px',
                alignItems: 'center',
                gap: 16,
                borderRadius: 16,
                background: 'rgb(255 255 255 / 80%)',
                boxSizing: 'border-box',
              }}
            >
              <img src={icon} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  color: '#1A1A1A',
                  fontFamily: 'var(--font-body)',
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: '24px',
                  letterSpacing: '-0.16px',
                  flexShrink: 0,
                }}>
                  {label}
                </span>
                <span style={{
                  color: '#1A1A1A',
                  fontFamily: 'var(--font-body)',
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: '24px',
                  letterSpacing: '-0.16px',
                }}>
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
