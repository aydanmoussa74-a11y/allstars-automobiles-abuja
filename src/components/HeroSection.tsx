import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, MapPin, Pause, Play, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  DOCK_FILTERS,
  type DockFilter,
  HERO_BACKGROUND_IMAGE,
  SHOWROOM_ADDRESS,
  TRUST_STATS,
  type Vehicle,
} from '../data/inventory';
import { SAMPLE_REVIEWS } from '../data/reviews';
import { CarPhoto } from './CarPhoto';
import { InteractiveCarStage } from './InteractiveCarStage';
import type { AppPage } from './MobileSidebar';

interface HeroSectionProps {
  activeFilter: DockFilter;
  onSelectFilter: (filter: DockFilter) => void;
  filteredVehicles: Vehicle[];
  selectedVehicle: Vehicle;
  onInspectVehicle: (vehicle: Vehicle) => void;
  onNavigate: (page: AppPage) => void;
  motionPaused: boolean;
  onToggleMotion: () => void;
}

export function HeroSection({
  activeFilter,
  onSelectFilter,
  filteredVehicles,
  selectedVehicle,
  onInspectVehicle,
  onNavigate,
  motionPaused,
  onToggleMotion,
}: HeroSectionProps) {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const heroContainerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ['start start', 'end start'],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const stageLiftY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  const isTradeInView = activeFilter === 'Sell / Swap';
  const showcaseCar = filteredVehicles[0] ?? selectedVehicle;
  const featuredPicks = filteredVehicles.slice(0, 3);
  const highlightReviews = SAMPLE_REVIEWS.slice(0, 2);

  return (
    <div id="top" className="px-safe">
      {/* HERO WITH ANIMATED CAR SCENE */}
      <section
        ref={heroContainerRef}
        className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32"
      >
        {/* Moody Dark Automotive Background Visual with Scroll Parallax & Motion Toggle */}
        <motion.div
          aria-hidden="true"
          style={motionPaused ? undefined : { y: bgParallaxY }}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {!heroImgFailed && (
            <img
              src={HERO_BACKGROUND_IMAGE}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className={`h-full w-full object-cover object-center opacity-35 grayscale contrast-125 ${
                motionPaused ? '' : 'animate-hero-drift'
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/75 to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0A0A0A_92%)]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          {/* Apple-Grade Display Typography & Breathing Room */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-[#E4E4E7] sm:text-sm">
              <MapPin className="h-3.5 w-3.5 text-[#D4D4D8]" aria-hidden="true" />
              <span>Allstars Automobiles Worldwide</span>
              <span aria-hidden="true">·</span>
              <span>{SHOWROOM_ADDRESS}</span>
            </p>

            <h1
              className="mt-6 font-display font-bold tracking-[-0.03em] text-white"
              style={{
                fontSize: 'clamp(2.35rem, 5.5vw, 4.4rem)',
                lineHeight: 1.05,
                textWrap: 'balance',
              }}
            >
              Buy verified luxury cars in Abuja without guesswork.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#E4E4E7] sm:text-lg">
              Inspect clean-title tokunbo SUVs and executive sedans in person on Ahmadu Bello Way,
              verify full customs duty papers, and close directly with our WhatsApp desk.
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onNavigate('inventory')}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black whitespace-nowrap shrink-0 transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore Inventory ({filteredVehicles.length})</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('trade-in')}
                className="glass-pill inline-flex min-h-[50px] items-center justify-center rounded-full px-7 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-[transform,border-color,background-color] duration-150 hover:border-white/45 hover:bg-white/[0.08] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Value My Car
              </button>
            </div>
          </div>

          {/* Animated Automotive Showcase Stage + Floating Pill Dock */}
          <motion.div
            initial={motionPaused ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            style={motionPaused ? undefined : { y: stageLiftY }}
            transition={{ duration: motionPaused ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-obsidian mx-auto mt-14 max-w-5xl rounded-2xl p-5 sm:p-7"
          >
            {/* Showcase Control Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.10] pb-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-white">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span>{isTradeInView ? 'Trade-In & Swap Desk' : 'Live Lot Showcase'}</span>
                </span>
                <span className="text-[#A1A1AA]" aria-hidden="true">
                  /
                </span>
                <span className="text-[#D4D4D8] tabular-nums">
                  {isTradeInView
                    ? 'Same-day Central Area appraisal'
                    : `${filteredVehicles.length} preview ${
                        filteredVehicles.length === 1 ? 'unit' : 'units'
                      } in "${activeFilter}"`}
                </span>
              </div>

              <button
                type="button"
                onClick={onToggleMotion}
                aria-pressed={motionPaused}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-medium text-[#E4E4E7] transition-[transform,border-color,color] duration-150 hover:border-white/40 hover:text-white active:scale-[0.97]"
              >
                {motionPaused ? (
                  <Play className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Pause className="h-3 w-3" aria-hidden="true" />
                )}
                <span>{motionPaused ? 'Motion paused' : 'Pause motion'}</span>
              </button>
            </div>

            {/* Animated Stage Body */}
            {isTradeInView ? (
              <div className="grid gap-6 py-7 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <p className="text-xs font-medium text-[#A1A1AA]">Direct Swap &amp; Upgrade</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                    Upgrade your current car into any verified Abuja lot unit.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#D4D4D8] sm:text-base">
                    Bring your Nigerian-used or tokunbo vehicle for an honest physical evaluation
                    at Ahmadu Bello Way. Receive a clear settlement figure and drive out the same
                    day.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#E4E4E7]">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      Direct top-up or equity swap
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      Zero listing delays
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-white/[0.10] bg-[#1E1E1E]/90 p-5 md:col-span-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A1A1AA]">Appraisal Window</span>
                      <span className="font-mono-tabular text-white">45 mins on-lot</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A1A1AA]">Accepted Titles</span>
                      <span className="font-mono-tabular text-white">Custom Papers + Reg</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A1A1AA]">Location</span>
                      <span className="text-white">Central Area, Abuja</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('trade-in')}
                    className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
                  >
                    Open Trade-In Desk
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-7 pt-6 pb-2 lg:grid-cols-12 lg:items-center">
                {/* Interactive Hotspots / 360° Spin / Lot Reel Stage */}
                <div className="lg:col-span-7">
                  <InteractiveCarStage
                    vehicle={showcaseCar}
                    motionPaused={motionPaused}
                    onInspectDrawer={() => onInspectVehicle(showcaseCar)}
                  />
                </div>

                {/* Live Spotlight Details */}
                <div className="flex flex-col justify-between lg:col-span-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
                      <span>{showcaseCar.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{showcaseCar.origin}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{showcaseCar.refCode}</span>
                    </div>

                    <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                      {showcaseCar.year} {showcaseCar.make} {showcaseCar.model}
                    </h2>
                    <p className="mt-1 text-sm text-[#D4D4D8]">{showcaseCar.trim}</p>

                    <div className="mt-5 grid grid-cols-2 gap-4 border-y border-white/[0.10] py-4">
                      <div>
                        <p className="text-xs text-[#A1A1AA]">Preview Price</p>
                        <p className="mt-0.5 font-mono-tabular text-lg font-semibold text-white">
                          {showcaseCar.priceNaira}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#A1A1AA]">Mileage</p>
                        <p className="mt-0.5 font-mono-tabular text-lg font-semibold text-white">
                          {showcaseCar.mileage}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#A1A1AA]">Powertrain</p>
                        <p className="mt-0.5 text-xs font-medium text-[#F5F5F5] tabular-nums">
                          {showcaseCar.engine}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#A1A1AA]">Verification</p>
                        <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{showcaseCar.dutyStatus}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onInspectVehicle(showcaseCar)}
                      className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
                    >
                      Inspect Vehicle Brief
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('inventory')}
                      className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium text-white whitespace-nowrap transition-[transform,border-color,background-color] duration-150 hover:border-white/40 hover:bg-white/[0.05] active:scale-[0.98]"
                    >
                      View All Cars
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Floating Pill Dock */}
            <div className="mt-8 flex justify-center">
              <div
                role="tablist"
                aria-label="Vehicle category and action filter"
                className="glass-pill no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full p-1.5"
              >
                {DOCK_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => onSelectFilter(filter)}
                      className={`min-h-[42px] rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-[transform,background-color,color] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:text-[13px] ${
                        isActive
                          ? 'bg-white text-black font-semibold'
                          : 'text-[#D4D4D8] hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CURATED FEATURED LOT PICKS */}
      <section className="border-t border-white/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[#A1A1AA]">Selected Abuja Preview Units</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                Ready for Ahmadu Bello Way inspection.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('inventory')}
              className="glass-pill inline-flex min-h-[44px] items-center gap-2 self-start rounded-full px-5 py-2 text-xs font-medium text-white whitespace-nowrap transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
            >
              <span>Open Full Catalog</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPicks.map((car) => (
              <article
                key={car.id}
                className="glass-obsidian group flex flex-col justify-between rounded-2xl p-5 transition-[border-color,background-color] duration-150 hover:border-white/25"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onInspectVehicle(car)}
                    className="block w-full text-left transition-transform duration-150 active:scale-[0.99]"
                  >
                    <CarPhoto
                      src={car.imageUrl}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      silhouette={car.silhouette}
                      paintHex={car.paintHex}
                      className="aspect-[4/3] w-full"
                    />
                    <div className="mt-4 flex items-center justify-between text-xs text-[#A1A1AA]">
                      <span>{car.category}</span>
                      <span className="font-mono-tabular">{car.year}</span>
                    </div>
                    <h3 className="mt-1.5 font-display text-xl font-semibold text-white">
                      {car.make} {car.model}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#D4D4D8]">{car.trim}</p>
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <span className="font-mono-tabular text-base font-bold text-white">
                    {car.priceNaira}
                  </span>
                  <button
                    type="button"
                    onClick={() => onInspectVehicle(car)}
                    className="min-h-[42px] rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.97]"
                  >
                    View Brief
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST METRICS + BUYER REVIEWS PREVIEW */}
      <section className="border-t border-white/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {TRUST_STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass-obsidian rounded-2xl p-6 sm:p-7"
              >
                <p className="font-display text-3xl font-bold tracking-[-0.03em] text-white tabular-nums sm:text-4xl">
                  {stat.metric}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white">{stat.label}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-[#D4D4D8]">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium text-[#A1A1AA]">Client Confidence</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Verified by buyers across Abuja &amp; Nigeria.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#D4D4D8] sm:text-base">
                Transparent scanner checks, customs verification, and fast swaps.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('reviews')}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
                >
                  <span>Read All Reviews</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('showroom')}
                  className="glass-pill inline-flex min-h-[44px] items-center rounded-full px-5 py-2 text-xs font-medium text-white transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
                >
                  Showroom Map
                </button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {highlightReviews.map((review) => (
                <article
                  key={review.id}
                  className="glass-obsidian flex flex-col justify-between rounded-2xl p-6"
                >
                  <div>
                    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-3.5 w-3.5 fill-white text-white"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#E4E4E7]">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-5 border-t border-white/[0.08] pt-4 text-xs">
                    <p className="font-semibold text-white">{review.buyerName}</p>
                    <p className="mt-0.5 text-[#A1A1AA]">
                      {review.vehiclePurchased} · {review.location}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
