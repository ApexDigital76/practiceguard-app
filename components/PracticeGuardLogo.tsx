interface Props {
  size?: number
  className?: string
}

/**
 * PracticeGuard mark — digital mesh shield with ECG pulse through center.
 * Matches the approved lockup (wireframe shield + pulse).
 */
export default function PracticeGuardLogo({ size = 28, className = '' }: Props) {
  const c = 'currentColor'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shield outline */}
      <path
        d="M40 4 L10 16 L10 42 C10 60 24 74 40 82 C56 74 70 60 70 42 L70 16 Z"
        stroke={c}
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill={c}
        fillOpacity="0.08"
      />

      {/* Mesh network inside shield */}
      <g stroke={c} strokeWidth="0.9" opacity="0.85">
        {/* horizontal rows */}
        <path d="M18 22 H62" />
        <path d="M16 32 H64" />
        <path d="M16 42 H64" />
        <path d="M18 52 H62" />
        <path d="M22 62 H58" />
        {/* verticals */}
        <path d="M28 14 V68" />
        <path d="M40 8 V78" />
        <path d="M52 14 V68" />
        {/* diagonals */}
        <path d="M18 22 L40 42 L62 22" />
        <path d="M16 32 L40 52 L64 32" />
        <path d="M16 42 L40 62 L64 42" />
        <path d="M62 22 L40 42 L18 22" />
        <path d="M64 32 L40 52 L16 32" />
      </g>

      {/* Network nodes */}
      <g fill={c}>
        <circle cx="28" cy="22" r="1.6" />
        <circle cx="40" cy="18" r="1.8" />
        <circle cx="52" cy="22" r="1.6" />
        <circle cx="20" cy="32" r="1.5" />
        <circle cx="40" cy="32" r="1.8" />
        <circle cx="60" cy="32" r="1.5" />
        <circle cx="20" cy="42" r="1.5" />
        <circle cx="40" cy="42" r="2" />
        <circle cx="60" cy="42" r="1.5" />
        <circle cx="28" cy="52" r="1.5" />
        <circle cx="40" cy="52" r="1.8" />
        <circle cx="52" cy="52" r="1.5" />
        <circle cx="34" cy="62" r="1.4" />
        <circle cx="46" cy="62" r="1.4" />
        <circle cx="40" cy="72" r="1.4" />
      </g>

      {/* Pulse line through both sides of the shield */}
      <path
        d="M2 42 H16 L20 34 L26 50 L32 28 L40 58 L48 28 L54 50 L60 34 L64 42 H78"
        stroke={c}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
