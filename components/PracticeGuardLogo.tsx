interface Props {
  size?: number
  className?: string
}

/** Shield + tooth + lock — matches PracticeGuard brand mark */
export default function PracticeGuardLogo({ size = 24, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M32 4 L56 14 L56 36 C56 52 42 62 32 66 C22 62 8 52 8 36 L8 14 Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* tooth */}
      <path
        d="M32 18 C26 18 23 22 23 28 L25 40 C26 43 29 44 32 41 C35 44 38 43 39 40 L41 28 C41 22 38 18 32 18Z"
        fill="currentColor"
      />
      {/* lock body */}
      <rect x="27" y="48" width="10" height="8" rx="1.5" fill="currentColor" />
      {/* lock shackle */}
      <path
        d="M29 48 V46 C29 43.5 35 43.5 35 46 V48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
