import { useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Film,
  Pause,
  Play,
  RotateCw,
  ScanEye,
  X,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  type InspectionHotspot,
  type Vehicle,
} from '../data/inventory';
import { CarPhoto } from './CarPhoto';
import { VehicleSilhouette } from './VehicleSilhouette';

type StageMode = 'hotspots' | 'spin' | 'reel';

interface InteractiveCarStageProps {
  vehicle: Vehicle;
  motionPaused: boolean;
  onInspectDrawer?: () => void;
  compact?: boolean;
}

interface ReelChapter {
  id: string;
  timecode: string;
  label: string;
  focusOrigin: string;
  caption: string;
}

const REEL_CHAPTERS: ReelChapter[] = [
  {
    id: 'exterior',
    timecode: '00:00',
    label: 'Exterior',
    focusOrigin: '50% 50%',
    caption: 'Walkaround stance, panel alignment & LED lighting signature',
  },
  {
    id: 'paint',
    timecode: '00:05',
    label: 'Paint & Trim',
    focusOrigin: '30% 42%',
    caption: 'Factory micrometer reading verified across doors, hood & fenders',
  },
  {
    id: 'engine',
    timecode: '00:10',
    label: 'Engine & Docs',
    focusOrigin: '72% 55%',
    caption: 'OBD-II diagnostic scan & Nigeria Customs C-Number port clearance',
  },
];

function getAngleLabel(deg: number): string {
  const normalized = ((deg % 360) + 360) % 360;
  if (normalized < 25 || normalized >= 335) return 'Front 3/4 Studio';
  if (normalized < 70) return 'Passenger Quarter';
  if (normalized < 115) return 'Side Profile';
  if (normalized < 160) return 'Rear Quarter';
  if (normalized < 205) return 'Rear Profile';
  if (normalized < 250) return 'Driver Rear 3/4';
  if (normalized < 295) return 'Driver Flank';
  return 'Driver Front 3/4';
}

export function InteractiveCarStage({
  vehicle,
  motionPaused,
  onInspectDrawer,
  compact = false,
}: InteractiveCarStageProps) {
  const [mode, setMode] = useState<StageMode>('hotspots');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [angleDeg, setAngleDeg] = useState<number>(0);
  const [autoSpin, setAutoSpin] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [reelPlaying, setReelPlaying] = useState<boolean>(true);
  const [activeChapterId, setActiveChapterId] = useState<string>(
    REEL_CHAPTERS[0].id
  );

  const dragStartRef = useRef<{ x: number; startAngle: number } | null>(null);

  useEffect(() => {
    setActiveHotspotId(null);
    setAngleDeg(0);
    setActiveChapterId(REEL_CHAPTERS[0].id);
  }, [vehicle.id]);

  useEffect(() => {
    if (mode !== 'spin' || !autoSpin || motionPaused || isDragging) return;
    const timer = window.setInterval(() => {
      setAngleDeg((prev) => (prev + 1) % 360);
    }, 36);
    return () => window.clearInterval(timer);
  }, [mode, autoSpin, motionPaused, isDragging]);

  const activeHotspot: InspectionHotspot | undefined = vehicle.hotspots.find(
    (h) => h.id === activeHotspotId
  );

  const activeChapter: ReelChapter =
    REEL_CHAPTERS.find((c) => c.id === activeChapterId) ?? REEL_CHAPTERS[0];

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (mode !== 'spin') return;
    setIsDragging(true);
    setAutoSpin(false);
    dragStartRef.current = { x: e.clientX, startAngle: angleDeg };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const nextAngle =
      (((dragStartRef.current.startAngle + Math.round(deltaX * 0.65)) % 360) +
        360) %
      360;
    setAngleDeg(nextAngle);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const rad = (angleDeg * Math.PI) / 180;
  const shiftX = Math.sin(rad) * 14;
  const scaleTilt = 0.96 + Math.abs(Math.cos(rad)) * 0.06;
  const isMirroredProfile = angleDeg > 90 && angleDeg < 270;
  const blueprintOpacity = Math.min(0.65, Math.abs(Math.sin(rad)) * 0.68);

  const walkaroundWhatsAppUrl = buildWhatsAppUrl(
    `Hello Allstars Automobiles Abuja, please send me a live WhatsApp walkaround video of the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.priceNaira}, Ref: ${vehicle.refCode}).`
  );

  return (
    <div className="space-y-3">
      {/* Top Interactive Mode Switcher (wraps cleanly on narrow mobile viewports) */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          role="tablist"
          aria-label="Interactive vehicle inspection mode"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'hotspots'}
            onClick={() => setMode('hotspots')}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] ${
              mode === 'hotspots'
                ? 'bg-white text-black font-semibold'
                : 'glass-pill text-[#D4D4D8] hover:border-white/35 hover:text-white'
            }`}
          >
            <ScanEye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Hotspots</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mode === 'spin'}
            onClick={() => setMode('spin')}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] ${
              mode === 'spin'
                ? 'bg-white text-black font-semibold'
                : 'glass-pill text-[#D4D4D8] hover:border-white/35 hover:text-white'
            }`}
          >
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>360° Spin</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mode === 'reel'}
            onClick={() => setMode('reel')}
            className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] ${
              mode === 'reel'
                ? 'bg-white text-black font-semibold'
                : 'glass-pill text-[#D4D4D8] hover:border-white/35 hover:text-white'
            }`}
          >
            <Film className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lot Reel</span>
          </button>
        </div>

        {onInspectDrawer && (
          <button
            type="button"
            onClick={onInspectDrawer}
            className="glass-pill inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#E4E4E7] whitespace-nowrap transition-[transform,border-color,color] duration-150 hover:border-white/35 hover:text-white active:scale-[0.97]"
          >
            <span>Full Brief</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Stage Viewport */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.12] bg-[#0D0D0F]">
        {/* Subtle Animated Specular Lighting */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-10 left-1/4 z-10 h-28 w-1/2 rounded-full bg-white/[0.12] blur-2xl ${
            motionPaused ? '' : 'animate-studio-sweep'
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-[22%] left-0 z-10 h-[1px] w-40 bg-gradient-to-r from-transparent via-white/60 to-transparent ${
            motionPaused ? '' : 'animate-studio-streak'
          }`}
        />

        {/* MODE 1: TAPPABLE HOTSPOTS */}
        {mode === 'hotspots' && (
          <div className="relative">
            <div className={motionPaused ? '' : 'animate-car-stage-pan'}>
              <CarPhoto
                src={vehicle.imageUrl}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                silhouette={vehicle.silhouette}
                paintHex={vehicle.paintHex}
                priority
                className="aspect-[16/10] w-full rounded-none border-0"
              />
            </div>

            {/* Hotspot Pins */}
            {vehicle.hotspots.map((spot) => {
              const isSelected = activeHotspotId === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() =>
                    setActiveHotspotId(isSelected ? null : spot.id)
                  }
                  aria-label={`Inspect ${spot.label}: ${spot.title}`}
                  aria-pressed={isSelected}
                  style={{
                    left: `${spot.xPercent}%`,
                    top: `${spot.yPercent}%`,
                  }}
                  className="group/pin absolute z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-[transform,background-color,border-color] duration-150 group-active/pin:scale-90 ${
                      isSelected
                        ? 'scale-110 border-white bg-white text-black'
                        : 'border-white/50 bg-black/70 text-white hover:border-white hover:bg-black/85'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSelected ? 'bg-black' : 'bg-emerald-400'
                      }`}
                    />
                  </span>
                </button>
              );
            })}

            {/* Active Hotspot Verification Popover */}
            {activeHotspot && (
              <div
                className={`glass-obsidian relative z-20 m-3 rounded-xl p-3.5 sm:absolute sm:inset-x-3 sm:bottom-3 sm:m-0 ${
                  compact ? 'sm:p-3' : 'sm:p-4'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{activeHotspot.label}</span>
                      </span>
                      <span className="text-[#A1A1AA]" aria-hidden="true">
                        ·
                      </span>
                      <span className="font-medium text-white">
                        {activeHotspot.title}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#E4E4E7] tabular-nums sm:text-sm">
                      {activeHotspot.reading}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveHotspotId(null)}
                    aria-label="Close inspection pin readout"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-[#D4D4D8] hover:text-white active:scale-90"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: 360° DRAG-TO-SPIN STUDIO */}
        {mode === 'spin' && (
          <div className="relative">
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{ touchAction: 'pan-y' }}
              className="relative aspect-[16/10] w-full cursor-grab select-none overflow-hidden bg-[#0B0B0D] active:cursor-grabbing"
              aria-label="Interactive 360 degree drag-to-spin studio"
            >
              {/* Primary Photo Perspective Layer */}
              <div
                className="h-full w-full transition-transform duration-75"
                style={{
                  transform: `translate3d(${shiftX}px, 0, 0) scale(${scaleTilt}) ${
                    isMirroredProfile ? 'scaleX(-1)' : 'scaleX(1)'
                  }`,
                }}
              >
                <CarPhoto
                  src={vehicle.imageUrl}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} 360 studio view`}
                  silhouette={vehicle.silhouette}
                  paintHex={vehicle.paintHex}
                  priority
                  className="h-full w-full rounded-none border-0"
                />
              </div>

              {/* Architectural CAD Profile Blend on Side Angles */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-150"
                style={{
                  opacity: blueprintOpacity,
                  transform: isMirroredProfile ? 'scaleX(-1)' : 'scaleX(1)',
                }}
              >
                <VehicleSilhouette
                  type={vehicle.silhouette}
                  paintHex={vehicle.paintHex}
                  modelLabel=""
                  className="h-full w-full rounded-none border-0 bg-transparent"
                />
              </div>

              {/* Studio Floor Turntable Arc */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 bottom-4 h-7 rounded-[100%] border border-white/25 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_70%)]"
              />

              {/* Angle Telemetry Pill */}
              <div className="glass-pill pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
                <RotateCw className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                <span className="font-mono-tabular font-semibold text-white">
                  {angleDeg}°
                </span>
                <span className="text-[#D4D4D8]">
                  {getAngleLabel(angleDeg)}
                </span>
              </div>
            </div>

            {/* Turntable Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.10] bg-[#121214] px-3.5 py-2.5 text-xs">
              <span className="text-[#A1A1AA]">
                Swipe horizontally to orbit vehicle
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAutoSpin(false);
                    setAngleDeg((prev) => (prev - 45 + 360) % 360);
                  }}
                  className="min-h-[36px] rounded-full border border-white/20 px-3 py-1 font-mono-tabular text-xs font-medium text-white hover:border-white/40 active:scale-95"
                >
                  -45°
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAutoSpin(false);
                    setAngleDeg((prev) => (prev + 45) % 360);
                  }}
                  className="min-h-[36px] rounded-full border border-white/20 px-3 py-1 font-mono-tabular text-xs font-medium text-white hover:border-white/40 active:scale-95"
                >
                  +45°
                </button>
                <button
                  type="button"
                  onClick={() => setAutoSpin((prev) => !prev)}
                  disabled={motionPaused}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium transition-[transform,background-color,color] duration-150 active:scale-95 ${
                    motionPaused
                      ? 'border border-white/10 text-[#71717A] cursor-not-allowed'
                      : autoSpin
                        ? 'bg-white text-black font-semibold'
                        : 'border border-white/20 text-white hover:border-white/40'
                  }`}
                >
                  {autoSpin && !motionPaused ? (
                    <Pause className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <Play className="h-3 w-3" aria-hidden="true" />
                  )}
                  <span>
                    {motionPaused
                      ? 'Paused Globally'
                      : autoSpin
                        ? 'Auto-Spin On'
                        : 'Auto-Spin'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: VIDEO-READY LOT WALKAROUND REEL */}
        {mode === 'reel' && (
          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0B0D]">
              {vehicle.videoUrl ? (
                <video
                  src={vehicle.videoUrl}
                  poster={vehicle.imageUrl}
                  autoPlay={!motionPaused}
                  muted
                  loop
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`h-full w-full transition-transform duration-500 ${
                    reelPlaying && !motionPaused ? 'animate-lot-reel' : ''
                  }`}
                  style={{ transformOrigin: activeChapter.focusOrigin }}
                >
                  <CarPhoto
                    src={vehicle.imageUrl}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} lot walkaround`}
                    silhouette={vehicle.silhouette}
                    paintHex={vehicle.paintHex}
                    priority
                    className="h-full w-full rounded-none border-0"
                  />
                </div>
              )}

              {/* Reel Telemetry Overlay */}
              <div className="glass-pill pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
                <span
                  className={`h-2 w-2 rounded-full ${
                    reelPlaying && !motionPaused
                      ? 'bg-emerald-400'
                      : 'bg-zinc-400'
                  }`}
                  aria-hidden="true"
                />
                <span className="font-mono-tabular font-semibold text-white">
                  {activeChapter.timecode}
                </span>
                <span className="text-[#D4D4D8]">Lot Walkaround Reel</span>
              </div>

              {!vehicle.videoUrl && (
                <button
                  type="button"
                  onClick={() => setReelPlaying((prev) => !prev)}
                  aria-label={reelPlaying ? 'Pause lot reel' : 'Play lot reel'}
                  className="glass-pill absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-150 hover:border-white/40 active:scale-95"
                >
                  {reelPlaying && !motionPaused ? (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              )}

              {/* Bottom Caption */}
              <div className="glass-obsidian pointer-events-none absolute inset-x-3 bottom-3 z-20 rounded-xl px-3.5 py-2.5">
                <p className="text-xs font-medium text-white">
                  {activeChapter.label} ·{' '}
                  <span className="font-normal text-[#E4E4E7]">
                    {activeChapter.caption}
                  </span>
                </p>
              </div>
            </div>

            {/* Chapter Pills + Live Video Walkaround Request */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-white/[0.10] bg-[#121214] p-3">
              <div className="flex flex-wrap items-center gap-2">
                {REEL_CHAPTERS.map((chapter) => {
                  const isCurrent = activeChapterId === chapter.id;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => setActiveChapterId(chapter.id)}
                      className={`min-h-[36px] rounded-full px-3 py-1.5 text-xs whitespace-nowrap transition-[transform,background-color,color] duration-150 active:scale-95 ${
                        isCurrent
                          ? 'bg-white text-black font-semibold'
                          : 'border border-white/15 text-[#D4D4D8] hover:text-white'
                      }`}
                    >
                      <span className="font-mono-tabular mr-1.5 opacity-75">
                        {chapter.timecode}
                      </span>
                      <span>{chapter.label}</span>
                    </button>
                  );
                })}
              </div>

              <a
                href={walkaroundWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black whitespace-nowrap shrink-0 transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-95"
              >
                <span>Book Live Video Walkaround</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
