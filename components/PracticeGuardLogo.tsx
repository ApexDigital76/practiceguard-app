interface Props {
  size?: number
  className?: string
}

export default function PracticeGuardLogo({ size = 24, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 680 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Wide shield — matches LinkedIn logo exactly */}
      <path
        d="M340 90 L130 165 L130 340 C130 455 220 540 340 578 C460 540 550 455 550 340 L550 165 Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinejoin="round"
      />
      {/* Medical cross — vertical */}
      <rect x="312" y="215" width="56" height="210" rx="10" fill="currentColor" />
      {/* Medical cross — horizontal */}
      <rect x="228" y="285" width="224" height="56" rx="10" fill="currentColor" />
    </svg>
  )
}
