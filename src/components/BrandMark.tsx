interface BrandMarkProps {
  size?: number;
  className?: string;
}

export function BrandMark({ size = 32, className = '' }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
      className={`shrink-0 ${className}`}
    >
      {/* Subtle dark architectural squircle badge */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        fill="#161616"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1.2"
      />

      {/* Precision baseline rail */}
      <line
        x1="8.5"
        y1="30.5"
        x2="31.5"
        y2="30.5"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
      />

      {/* Secondary architectural "A" (right, muted silver) */}
      <path
        d="M17.2 27.5L23.8 11L30.4 27.5"
        stroke="#A1A1AA"
        strokeWidth="1.9"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <line
        x1="20.1"
        y1="22.2"
        x2="27.5"
        y2="22.2"
        stroke="#A1A1AA"
        strokeWidth="1.65"
        strokeLinecap="square"
      />

      {/* Primary architectural "A" (left, crisp white) */}
      <path
        d="M9.6 27.5L16.2 11L22.8 27.5"
        stroke="#FFFFFF"
        strokeWidth="2.1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <line
        x1="12.5"
        y1="22.2"
        x2="19.9"
        y2="22.2"
        stroke="#F5F5F5"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}
