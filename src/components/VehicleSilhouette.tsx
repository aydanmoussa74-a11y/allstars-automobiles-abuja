import type { VehicleSilhouetteType } from '../data/inventory';

interface VehicleSilhouetteProps {
  type: VehicleSilhouetteType;
  paintHex: string;
  modelLabel: string;
  className?: string;
}

export function VehicleSilhouette({
  type,
  paintHex,
  modelLabel,
  className = '',
}: VehicleSilhouetteProps) {
  const isSedan = type === 'executive-sedan' || type === 'sport-sedan';
  const isBoxy = type === 'boxy-4x4';

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#111111] ${className}`}
      role="img"
      aria-label={`${modelLabel} architectural studio profile`}
    >
      {/* Subtle overhead linear showroom light bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-5 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-16 top-5 h-24 bg-gradient-to-b from-white/[0.05] to-transparent blur-xl"
      />

      {/* Precision SVG Studio Profile */}
      <svg
        viewBox="0 0 640 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-full w-full"
      >
        <defs>
          <linearGradient id={`body-${type}`} x1="0" y1="70" x2="0" y2="215" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={paintHex} stopOpacity="0.95" />
            <stop offset="55%" stopColor="#1A1A1D" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#09090B" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="glass-tint" x1="160" y1="80" x2="480" y2="145" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#27272A" />
            <stop offset="50%" stopColor="#141417" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
          <linearGradient id="floor-fade" x1="320" y1="215" x2="320" y2="265" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Subtle floor horizon line */}
        <line x1="36" y1="224" x2="604" y2="224" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <ellipse cx="320" cy="226" rx="228" ry="6" fill="url(#floor-fade)" />

        {isSedan ? (
          <g>
            {/* Executive / Sport Sedan Body */}
            <path
              d={
                type === 'sport-sedan'
                  ? 'M82 184 L88 154 C96 144 128 136 168 132 L236 92 C264 82 332 82 378 90 L460 128 C510 132 544 142 554 156 L558 184 C558 192 548 196 534 196 L496 196 C492 168 468 156 446 156 C424 156 400 168 396 196 L242 196 C238 168 214 156 192 156 C170 156 146 168 142 196 L96 196 C86 196 82 191 82 184 Z'
                  : 'M86 184 L92 154 C102 144 134 136 174 132 L242 90 C272 81 336 81 382 90 L456 128 C508 132 542 142 552 156 L556 184 C556 192 546 196 532 196 L496 196 C492 168 468 156 446 156 C424 156 400 168 396 196 L242 196 C238 168 214 156 192 156 C170 156 146 168 142 196 L98 196 C89 196 86 191 86 184 Z'
              }
              fill={`url(#body-${type})`}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.25"
            />
            {/* Cabin Glass */}
            <path
              d="M190 132 L248 97 C276 90 330 90 368 97 L434 130 L190 132 Z"
              fill="url(#glass-tint)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <line x1="312" y1="92" x2="306" y2="131" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            {/* Shoulder character crease */}
            <path
              d="M118 149 C205 144 375 143 526 150"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            {/* Crisp LED DRL signature */}
            <path d="M518 154 L548 151" stroke="#F5F5F5" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M90 156 L108 153" stroke="rgba(239,68,68,0.8)" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : isBoxy ? (
          <g>
            {/* Body-on-frame 4x4 SUV (Prado / GX 460) */}
            <path
              d="M84 184 L88 124 C90 100 104 82 130 78 L360 76 C386 76 410 92 436 118 L516 126 C538 130 552 144 554 164 L554 186 C554 193 544 197 532 197 L496 197 C491 164 466 150 442 150 C418 150 393 164 388 197 L246 197 C241 164 216 150 192 150 C168 150 143 164 138 197 L98 197 C89 197 84 192 84 184 Z"
              fill={`url(#body-${type})`}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.25"
            />
            {/* Greenhouse Windows */}
            <path
              d="M114 118 L124 88 L352 86 C374 86 394 98 414 118 L114 118 Z"
              fill="url(#glass-tint)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <line x1="214" y1="87" x2="212" y2="118" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <line x1="308" y1="87" x2="304" y2="118" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            {/* Beltline & step board */}
            <path d="M98 134 L536 140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="248" y1="201" x2="386" y2="201" stroke="rgba(255,255,255,0.28)" strokeWidth="2.5" strokeLinecap="round" />
            {/* LED Signature */}
            <path d="M520 146 L549 144" stroke="#F5F5F5" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M88 136 L98 136" stroke="rgba(239,68,68,0.85)" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            {/* Sleek Luxury Crossover / Flagship SUV (RX 350 / GLE 450) */}
            <path
              d={
                type === 'crossover-suv'
                  ? 'M86 184 L92 142 C100 124 128 114 152 108 L228 80 C264 74 334 74 378 86 L452 118 C506 122 542 134 552 154 L556 184 C556 192 546 196 534 196 L496 196 C491 164 466 151 442 151 C418 151 393 164 388 196 L246 196 C241 164 216 151 192 151 C168 151 143 164 138 196 L98 196 C89 196 86 191 86 184 Z'
                  : 'M84 184 L90 134 C98 112 122 96 154 88 L352 78 C382 78 414 92 448 118 L516 124 C538 128 552 140 555 158 L556 184 C556 192 546 196 534 196 L496 196 C491 164 466 151 442 151 C418 151 393 164 388 196 L246 196 C241 164 216 151 192 151 C168 151 143 164 138 196 L98 196 C89 196 84 191 84 184 Z'
              }
              fill={`url(#body-${type})`}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.25"
            />
            {/* Cabin Glass */}
            <path
              d="M168 118 L234 88 C268 83 328 83 368 92 L426 118 L168 118 Z"
              fill="url(#glass-tint)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <line x1="302" y1="84" x2="296" y2="118" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
            <path d="M110 138 C210 132 385 133 534 142" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <path d="M518 146 L549 143" stroke="#F5F5F5" strokeWidth="2.3" strokeLinecap="round" />
            <path d="M90 144 L106 142" stroke="rgba(239,68,68,0.85)" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Wheels (Front & Rear) */}
        {[192, 444].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="192" r="32" fill="#0B0B0D" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <circle cx={cx} cy="192" r="22" fill="#151518" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle cx={cx} cy="192" r="6" fill="#27272A" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = cx + Math.cos(rad) * 7;
              const y1 = 192 + Math.sin(rad) * 7;
              const x2 = cx + Math.cos(rad) * 21;
              const y2 = 192 + Math.sin(rad) * 21;
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.26)"
                  strokeWidth="1.35"
                />
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
