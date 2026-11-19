import { Pause, Play, SlidersHorizontal } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/inventory';
import { BrandMark } from './BrandMark';
import type { AppPage } from './MobileSidebar';

interface HeaderProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  motionPaused: boolean;
  onToggleMotion: () => void;
  onOpenMobileMenu: () => void;
}

const NAV_ITEMS: { id: AppPage; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'trade-in', label: 'Trade-In' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'showroom', label: 'Showroom' },
];

export function Header({
  currentPage,
  onNavigate,
  motionPaused,
  onToggleMotion,
  onOpenMobileMenu,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0A0A] pt-safe px-safe">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:px-6 sm:gap-4 lg:gap-8">
        {/* Zone 1: Compact Mobile Brand Mark ("ALLSTARS") & Full Desktop Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex min-w-0 items-center gap-2 font-display text-sm font-semibold tracking-tight text-white whitespace-nowrap shrink-0 transition-opacity duration-150 active:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm sm:gap-2.5 sm:text-[15px]"
        >
          <BrandMark size={26} />
          <span className="sm:hidden">ALLSTARS</span>
          <span className="hidden sm:inline">ALLSTARS AUTOMOBILES</span>
        </button>

        {/* Zone 2: Clean Single-Line Page Links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 transition-[color,opacity] duration-150 active:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm ${
                  isActive ? 'text-white font-semibold' : 'text-[#B4B4BC] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Pause Motion Control + Compact Mobile WhatsApp Pill + Drawer Trigger */}
        <div className="flex items-center gap-2 shrink-0 sm:gap-2.5">
          <button
            type="button"
            onClick={onToggleMotion}
            aria-pressed={motionPaused}
            className="hidden lg:inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/20 bg-transparent px-3.5 py-1.5 text-xs font-medium text-[#D4D4D8] whitespace-nowrap shrink-0 transition-[transform,border-color,color] duration-150 hover:border-white/40 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {motionPaused ? (
              <Play className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Pause className="h-3 w-3" aria-hidden="true" />
            )}
            <span>{motionPaused ? 'Resume motion' : 'Pause motion'}</span>
          </button>

          <a
            href={buildWhatsAppUrl(
              'Hello Allstars Automobiles Abuja, I would like to speak with the WhatsApp Desk.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center justify-center rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-black whitespace-nowrap shrink-0 transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:min-h-[40px] sm:px-5 sm:py-2 sm:text-sm"
          >
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">WhatsApp Desk</span>
          </a>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open lot filters, showroom hours, and legal menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#161616] text-white transition-[transform,border-color,background-color] duration-150 active:scale-[0.95] active:bg-[#222222] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
