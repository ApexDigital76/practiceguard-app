export const PRACTICE_GUARD_ICON_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA4CAYAAABNGP5yAAAgnElEQVR42t17Z3hU17X2u/cpUzQa9V6QKEIgEM0UA7ZE75hiyRjsEDeIC3YI";

interface Props {
  size?: number
  className?: string
}

/** PracticeGuard mark — mesh shield + pulse (from approved lockup) */
export default function PracticeGuardLogo({ size = 28, className = '' }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={PRACTICE_GUARD_ICON_SRC}
      alt="PracticeGuard"
      width={size}
      height={size}
      className={className}
      style={{ height: size, width: 'auto' }}
    />
  )
}
