import { useEffect } from 'react';
import { ArrowUpRight, Check, MapPin, Repeat, X } from 'lucide-react';
import {
  buildWhatsAppUrl,
  SHOWROOM_ADDRESS,
  type Vehicle,
} from '../data/inventory';
import { InteractiveCarStage } from './InteractiveCarStage';

interface VehicleBriefDrawerProps {
  vehicle: Vehicle | null;
  motionPaused: boolean;
  onClose: () => void;
  onSwapIntoVehicle: (vehicleLabel: string) => void;
}

export function VehicleBriefDrawer({
  vehicle,
  motionPaused,
  onClose,
  onSwapIntoVehicle,
}: VehicleBriefDrawerProps) {
  useEffect(() => {
    if (!vehicle) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  const whatsappInquiryText = `Hello Allstars Automobiles Abuja, I am inquiring about the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.trim}) listed at ${vehicle.priceNaira} [Ref: ${vehicle.refCode}]. Is it available for inspection on Ahmadu Bello Way?`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-vehicle-title"
      onClick={onClose}
    >
      <div
        className="glass-obsidian relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:rounded-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile sheet handle */}
        <div
          aria-hidden="true"
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/25 sm:hidden"
        />

        {/* Top Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.10] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
              <span className="font-mono-tabular">{vehicle.refCode}</span>
              <span aria-hidden="true">·</span>
              <span>{vehicle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{vehicle.origin}</span>
            </div>
            <h3
              id="drawer-vehicle-title"
              className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl"
            >
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <p className="mt-0.5 text-sm text-[#D4D4D8]">{vehicle.trim}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close vehicle brief"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#1E1E1E] text-white transition-[transform,border-color,background-color] duration-150 hover:border-white/40 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Interactive Photo / 360° / Lot Reel Stage */}
        <div className="mt-5">
          <InteractiveCarStage
            vehicle={vehicle}
            motionPaused={motionPaused}
            compact
          />
        </div>

        {/* Price + Verification Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.10] bg-[#121212] p-4">
          <div>
            <p className="text-xs text-[#A1A1AA]">Asking Price (Preview)</p>
            <p className="mt-0.5 font-mono-tabular text-2xl font-bold text-white">
              {vehicle.priceNaira}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>{vehicle.lotStatus}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F5F5F5]">
              <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span>{vehicle.dutyStatus}</span>
            </span>
          </div>
        </div>

        {/* Tabular Specs Grid */}
        <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.10] bg-white/[0.10] sm:grid-cols-3">
          <div className="bg-[#1A1A1A] p-3.5">
            <dt className="text-xs text-[#A1A1AA]">Model Year</dt>
            <dd className="mt-1 font-mono-tabular text-sm font-semibold text-white">
              {vehicle.year}
            </dd>
          </div>
          <div className="bg-[#1A1A1A] p-3.5">
            <dt className="text-xs text-[#A1A1AA]">Odometer</dt>
            <dd className="mt-1 font-mono-tabular text-sm font-semibold text-white">
              {vehicle.mileage}
            </dd>
          </div>
          <div className="bg-[#1A1A1A] p-3.5">
            <dt className="text-xs text-[#A1A1AA]">Drivetrain</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{vehicle.drivetrain}</dd>
          </div>
          <div className="bg-[#1A1A1A] p-3.5">
            <dt className="text-xs text-[#A1A1AA]">Powertrain</dt>
            <dd className="mt-1 text-sm font-medium text-[#F5F5F5] tabular-nums">
              {vehicle.engine}
            </dd>
          </div>
          <div className="bg-[#1A1A1A] p-3.5">
            <dt className="text-xs text-[#A1A1AA]">Transmission</dt>
            <dd className="mt-1 text-sm font-medium text-[#F5F5F5] tabular-nums">
              {vehicle.transmission}
            </dd>
          </div>
          <div className="bg-[#1A1A1A] p-3.5">
            <dt className="text-xs text-[#A1A1AA]">Finish</dt>
            <dd className="mt-1 text-sm font-medium text-[#F5F5F5]">
              {vehicle.exteriorColor} / {vehicle.interiorColor}
            </dd>
          </div>
        </dl>

        {/* Inspection Brief */}
        <div className="mt-5 rounded-xl border border-white/[0.10] bg-[#121212] p-4">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B4B4BC]">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Physical Inspection · {SHOWROOM_ADDRESS}</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#E4E4E7]">
            {vehicle.inspectionNote}
          </p>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.10] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={buildWhatsAppUrl(whatsappInquiryText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Inquire on WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => {
              onSwapIntoVehicle(
                `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.priceNaira})`
              );
              onClose();
            }}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-medium text-[#F5F5F5] whitespace-nowrap transition-[transform,border-color,background-color] duration-150 hover:border-white/40 hover:bg-white/[0.05] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <Repeat className="h-4 w-4" aria-hidden="true" />
            <span>Swap Into This Car</span>
          </button>
        </div>
      </div>
    </div>
  );
}
