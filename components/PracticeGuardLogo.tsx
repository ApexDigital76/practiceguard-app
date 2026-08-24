import Image from 'next/image'

interface Props {
  size?: number
  className?: string
  /** When true, shows full lockup (mark + wordmark). Default: mark only for navbar. */
  withWordmark?: boolean
}

/**
 * PracticeGuard logo — digital mesh tooth with ECG pulse.
 * Uses the approved brand asset in /public/media/.
 */
export default function PracticeGuardLogo({
  size = 32,
  className = '',
  withWordmark = false,
}: Props) {
  if (withWordmark) {
    return (
      <Image
        src="/media/practiceguard-logo.png"
        alt="PracticeGuard"
        width={Math.round(size * 3.2)}
        height={size}
        className={className}
        priority
      />
    )
  }

  return (
    <Image
      src="/media/practiceguard-logo-mark.png"
      alt="PracticeGuard"
      width={size}
      height={size}
      className={className}
      priority
    />
  )
}
