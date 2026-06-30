interface Props {
  size?: number
  className?: string
}

export default function PracticeGuardLogo({ size = 24, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield shape */}
      <path
        d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V6L12 2z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Medical cross */}
      <rect x="10.5" y="7" width="3" height="10" rx="0.75" fill="currentColor" />
      <rect x="7" y="10.5" width="10" height="3" rx="0.75" fill="currentColor" />
    </svg>
  )
}
