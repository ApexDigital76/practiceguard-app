interface Props {
  size?: number
  className?: string
}

/** Shield + tooth + lock mark for PracticeGuard Compliance */
export default function PracticeGuardLogo({ size = 24, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.12)}
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* shield */}
      <path
        d="M32 4 L58 14 L58 36 C58 52 44 62 32 68 C20 62 6 52 6 36 L6 14 Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* tooth */}
      <path
        d="M32 16 C25 16 22 21 22 28 L24 42 C25 46 28 47 32 43 C36 47 39 46 40 42 L42 28 C42 21 39 16 32 16Z"
        fill="currentColor"
      />
      {/* lock body */}
      <rect x="26" y="50" width="12" height="9" rx="1.5" fill="currentColor" />
      {/* lock shackle */}
      <path
        d="M28.5 50 V47.5 C28.5 44.5 35.5 44.5 35.5 47.5 V50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
