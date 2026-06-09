export function BentenanPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 100 L20 80 L40 100 L60 80 L80 100 L100 80 L120 100 L140 80 L160 100 L180 80 L200 100"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <path
        d="M0 120 L20 100 L40 120 L60 100 L80 120 L100 100 L120 120 L140 100 L160 120 L180 100 L200 120"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.1"
      />
      <path
        d="M0 60 L20 40 L40 60 L60 40 L80 60 L100 40 L120 60 L140 40 L160 60 L180 40 L200 60"
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.08"
      />
      <path
        d="M100 0 L100 200"
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.08"
      />
      <path
        d="M50 0 L50 200 M150 0 L150 200"
        stroke="currentColor"
        strokeWidth="0.2"
        opacity="0.05"
      />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.3" opacity="0.08" fill="none" />
      <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="0.2" opacity="0.05" fill="none" />
      <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="0.2" opacity="0.06" fill="none" />
      <circle cx="160" cy="40" r="8" stroke="currentColor" strokeWidth="0.2" opacity="0.06" fill="none" />
      <circle cx="40" cy="160" r="8" stroke="currentColor" strokeWidth="0.2" opacity="0.06" fill="none" />
      <circle cx="160" cy="160" r="8" stroke="currentColor" strokeWidth="0.2" opacity="0.06" fill="none" />
      <path
        d="M20 20 Q30 30 20 40 M80 20 Q90 30 80 40 M120 20 Q130 30 120 40 M180 20 Q190 30 180 40"
        stroke="currentColor"
        strokeWidth="0.3"
        opacity="0.08"
        fill="none"
      />
    </svg>
  )
}

export function CornerAccent({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2 2 L58 2 M2 2 L2 58" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M8 2 L8 8 L2 8" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  )
}

export function WaveDivider({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="1440"
      height="60"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 30 Q180 0 360 30 Q540 60 720 30 Q900 0 1080 30 Q1260 60 1440 30 L1440 60 L0 60 Z"
        fill="currentColor"
        opacity="0.03"
      />
    </svg>
  )
}
