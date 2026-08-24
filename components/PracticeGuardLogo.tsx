interface Props {
  size?: number
  className?: string
}

/**
 * PracticeGuard logo — mesh tooth + pulse lockup (SVG asset).
 */
export default function PracticeGuardLogo({ size = 40, className = '' }: Props) {
  const height = size
  const width = Math.round(size * (400 / 120))
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/practiceguard-logo.svg"
      alt="PracticeGuard"
      width={width}
      height={height}
      className={className}
      style={{ height: size, width: 'auto' }}
    />
  )
}
