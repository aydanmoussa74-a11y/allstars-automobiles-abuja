import { useEffect } from 'react';
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Pause,
  Phone,
  Play,
  Scale,
  X,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  DISPLAY_PHONE,
  type DockFilter,
  SHOWROOM_ADDRESS,
} from '../data/inventory';
import { BrandMark } from './BrandMark';

export type AppPage =
  | 'home'
  | 'inventory'
  | 'trade-in'
  | 'reviews'
  | 'showroom'
  | 'terms'
  | 'privacy';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onSelectInventoryFilter: (filter: DockFilter) => void;
  onOpenComparator: () => void;
  motionPaused: boolean;
  onToggleMotion: () => void;
}

const QUICK_FILTERS: DockFilter[] = [
  'All Stock',
  'Luxury SUVs',
  'Executive Sedans',
  'Direct Tokunbo',
];

export function MobileSidebar({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onSelectInventoryFilter,
  onOpenComparator,
  motionPaused,
  onToggleMotion,
}: MobileSidebarProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-black/80 backdrop-blur-sm md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Showroom tools and quick filters"
      onClick={onClose}
    >
      <aside
        className="flex h-full w-[86%] max-w-sm flex-col justify-between overflow-y-auto border-l border-white/15 bg-[#111113] p-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/[0.10] pb-3.5">
            <div className="flex items-center gap-2.5">
              <BrandMark size={28} />
              <div>
                <p className="font-display text-sm font-bold tracking-tight text-white">
                  ALLSTARS LOT DESK
                </p>
                <p className="text-xs text-[#A1A1AA]">Quick Filters &amp; Hours</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close showroom tools drawer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#161616] text-white transition-[transform,background-color] duration-150 active:scale-[0.95] active:bg-[#222222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Quick Inventory Filters */}
          <div className="mt-4">
            <p className="px-1 text-xs font-medium text-[#A1A1AA]">
              Filter Abuja Stock
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {QUICK_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    onSelectInventoryFilter(filter);
                    onNavigate('inventory');
                    onClose();
                  }}
                  className="min-h-[42px] rounded-xl border border-white/15 bg-[#161616]/90 px-3 py-2 text-left text-xs font-medium text-[#F5F5F5] transition-[transform,border-color,background-color] duration-150 hover:border-white/40 active:scale-[0.97]"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Showroom Tools */}
          <div className="mt-4 border-t border-white/[0.10] pt-4 space-y-2">
            <p className="px-1 text-xs font-medium text-[#A1A1AA]">
              Tools &amp; Accessibility
            </p>

            <button
              type="button"
              onClick={() => {
                onOpenComparator();
                onClose();
              }}
              className="flex min-h-[44px] w-full items-center justify-between rounded-xl border border-white/15 bg-[#161616]/90 px-3.5 text-left text-xs font-medium text-white transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
            >
              <span>Compare 2 Rides Side-by-Side</span>
              <Scale className="h-4 w-4 text-[#D4D4D8]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onToggleMotion}
              aria-pressed={motionPaused}
              className="flex min-h-[44px] w-full items-center justify-between rounded-xl border border-white/15 bg-[#161616]/90 px-3.5 text-xs font-medium text-[#F5F5F5] transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
            >
              <span>{motionPaused ? 'Resume motion' : 'Pause motion'}</span>
              {motionPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Direct Showroom Info */}
          <div className="mt-4 border-t border-white/[0.10] pt-4 space-y-2 text-xs">
            <p className="px-1 font-medium text-[#A1A1AA]">
              Abuja Showroom Desk
            </p>
            <div className="rounded-xl border border-white/[0.10] bg-[#141414]/90 p-3 space-y-2">
              <div className="flex items-start gap-2 text-[#E4E4E7]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" aria-hidden="true" />
                <span>{SHOWROOM_ADDRESS}</span>
              </div>
              <div className="flex items-start gap-2 text-[#D4D4D8] tabular-nums">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" aria-hidden="true" />
                <div>
                  <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
                  <p>Sat: 8:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-4 border-t border-white/[0.10] pt-3.5">
            <p className="px-1 text-xs font-medium text-[#A1A1AA]">Legal</p>
            <div className="mt-1 flex flex-wrap gap-5 px-1 text-xs text-[#D4D4D8]">
              <button
                type="button"
                onClick={() => {
                  onNavigate('terms');
                  onClose();
                }}
                className={`min-h-[38px] underline underline-offset-4 hover:text-white active:opacity-75 ${
                  currentPage === 'terms'
                    ? 'text-white font-semibold decoration-white'
                    : 'decoration-white/25'
                }`}
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('privacy');
                  onClose();
                }}
                className={`min-h-[38px] underline underline-offset-4 hover:text-white active:opacity-75 ${
                  currentPage === 'privacy'
                    ? 'text-white font-semibold decoration-white'
                    : 'decoration-white/25'
                }`}
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Direct Contact Actions */}
        <div className="mt-4 space-y-2 border-t border-white/[0.10] pt-4">
          <a
            href="tel:+2348022629781"
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-[#161616] px-5 text-xs font-medium text-white transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-mono-tabular">Call {DISPLAY_PHONE}</span>
          </a>

          <a
            href={buildWhatsAppUrl(
              'Hello Allstars Automobiles Abuja, I would like to speak with the WhatsApp Desk.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
          >
            <span>WhatsApp Desk</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </aside>
    </div>
  );
}
