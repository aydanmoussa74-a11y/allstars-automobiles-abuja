import { Pause, Play } from 'lucide-react';
import {
  buildWhatsAppUrl,
  DISPLAY_PHONE,
  GOOGLE_MAPS_URL,
  SHOWROOM_ADDRESS,
} from '../data/inventory';
import { BrandMark } from './BrandMark';
import type { AppPage } from './MobileSidebar';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
  motionPaused: boolean;
  onToggleMotion: () => void;
}

export function Footer({
  onNavigate,
  motionPaused,
  onToggleMotion,
}: FooterProps) {
  return (
    <footer className="border-t border-white/[0.10] bg-[#0A0A0A] pt-14 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-14 px-safe sm:pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* Brand & Address */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-3 font-display text-base font-bold tracking-tight text-white text-left transition-opacity duration-150 active:opacity-75"
            >
              <BrandMark size={34} />
              <span>ALLSTARS AUTOMOBILES WORLDWIDE</span>
            </button>
            <p className="mt-2.5 text-sm text-[#D4D4D8]">{SHOWROOM_ADDRESS}</p>
            <div className="mt-3 space-y-1 text-xs text-[#A1A1AA] tabular-nums">
              <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
              <p>Sat: 8:00 AM – 5:00 PM</p>
            </div>
          </div>

          {/* Direct Contact & Map */}
          <div className="space-y-3 text-sm md:col-span-4">
            <p className="text-xs font-medium text-[#A1A1AA]">Direct Deal Desk</p>
            <div>
              <a
                href="tel:+2348022629781"
                className="font-mono-tabular text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-80 active:opacity-70"
              >
                {DISPLAY_PHONE}
              </a>
            </div>
            <div className="flex flex-wrap gap-5 text-xs">
              <a
                href={buildWhatsAppUrl(
                  'Hello Allstars Automobiles Worldwide Abuja, I would like to book an inspection.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] inline-flex items-center text-[#E4E4E7] underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white active:opacity-75"
              >
                WhatsApp Desk
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] inline-flex items-center text-[#E4E4E7] underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white active:opacity-75"
              >
                Google Maps Directions
              </a>
            </div>
          </div>

          {/* Motion Toggle */}
          <div className="flex flex-col items-start gap-3 md:col-span-3 md:items-end">
            <button
              type="button"
              onClick={onToggleMotion}
              aria-pressed={motionPaused}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-[#D4D4D8] transition-[transform,border-color,color] duration-150 hover:border-white/40 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              {motionPaused ? (
                <Play className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Pause className="h-3 w-3" aria-hidden="true" />
              )}
              <span>{motionPaused ? 'Resume motion' : 'Pause motion'}</span>
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.10] pt-6 text-xs text-[#A1A1AA] lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <p className="tabular-nums text-[#D4D4D8]">
              © {new Date().getFullYear()} Allstars Automobiles Worldwide. Abuja, Nigeria.
            </p>
            <p className="text-xs text-[#A1A1AA]">
              Embedded map subject to{' '}
              <a
                href="https://maps.google.com/help/terms_maps/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/25 underline-offset-2 hover:text-white"
              >
                Google Maps End User Terms
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="min-h-[36px] transition-colors duration-150 hover:text-white active:opacity-75"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('inventory')}
              className="min-h-[36px] transition-colors duration-150 hover:text-white active:opacity-75"
            >
              Inventory
            </button>
            <button
              type="button"
              onClick={() => onNavigate('trade-in')}
              className="min-h-[36px] transition-colors duration-150 hover:text-white active:opacity-75"
            >
              Trade-In
            </button>
            <button
              type="button"
              onClick={() => onNavigate('reviews')}
              className="min-h-[36px] transition-colors duration-150 hover:text-white active:opacity-75"
            >
              Reviews
            </button>
            <button
              type="button"
              onClick={() => onNavigate('showroom')}
              className="min-h-[36px] transition-colors duration-150 hover:text-white active:opacity-75"
            >
              Showroom
            </button>
            <button
              type="button"
              onClick={() => onNavigate('terms')}
              className="min-h-[36px] transition-colors duration-150 hover:text-white active:opacity-75"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="min-h-[36px] transition-colors duration-150 hover:text-white active:opacity-75"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
