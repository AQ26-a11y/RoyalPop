import logoImg from '../../imports/loghi-new.png'

export function AxSLogo() {
  return (
    <img
      src={logoImg}
      width={261}
      height={21}
      alt="Logo"
      style={{ display: 'block', objectFit: 'contain' }}
    />
  )
}
