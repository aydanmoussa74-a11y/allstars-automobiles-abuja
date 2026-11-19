import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Check, Info, Repeat, Scale, Search, X } from 'lucide-react';
import {
  buildWhatsAppUrl,
  type DockFilter,
  SAMPLE_VEHICLES,
  type Vehicle,
} from '../data/inventory';
import { CarPhoto } from './CarPhoto';
import { VehicleComparator } from './VehicleComparator';

interface InventoryBriefSectionProps {
  activeFilter: DockFilter;
  onSelectFilter: (filter: DockFilter) => void;
  vehicles: Vehicle[];
  selectedVehicle: Vehicle;
  compareIds: [string, string];
  onChangeCompareIds: (nextIds: [string, string]) => void;
  onToggleCompareVehicle: (vehicleId: string) => void;
  onSelectVehicle: (vehicleId: string) => void;
  onInspectVehicle: (vehicle: Vehicle) => void;
  onRequestSwapForVehicle: (vehicleLabel: string) => void;
}

const STOCK_FILTERS: DockFilter[] = [
  'All Stock',
  'Luxury SUVs',
  'Executive Sedans',
  'Direct Tokunbo',
];

const PAGE_SIZE = 6;

export function InventoryBriefSection({
  activeFilter,
  onSelectFilter,
  vehicles,
  selectedVehicle,
  compareIds,
  onChangeCompareIds,
  onToggleCompareVehicle,
  onSelectVehicle,
  onInspectVehicle,
  onRequestSwapForVehicle,
}: InventoryBriefSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter, searchQuery]);

  const searchedVehicles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter((v) =>
      `${v.year} ${v.make} ${v.model} ${v.trim} ${v.category} ${v.priceNaira}`
        .toLowerCase()
        .includes(q)
    );
  }, [vehicles, searchQuery]);

  const paginatedVehicles = useMemo(
    () => searchedVehicles.slice(0, visibleCount),
    [searchedVehicles, visibleCount]
  );

  const hasMore = visibleCount < searchedVehicles.length;

  const activeBrief =
    searchedVehicles.find((v) => v.id === selectedVehicle.id) ??
    searchedVehicles[0] ??
    selectedVehicle;

  const whatsappInquiryText = `Hello Allstars Automobiles Abuja, I am inquiring about the ${activeBrief.year} ${activeBrief.make} ${activeBrief.model} (${activeBrief.trim}) listed at ${activeBrief.priceNaira} [Ref: ${activeBrief.refCode}]. Is it available for inspection on Ahmadu Bello Way?`;

  return (
    <section
      id="inventory"
      className="py-10 sm:py-24 lg:py-28 px-safe"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Page Header + Search */}
        <div className="flex flex-col gap-6 border-b border-white/[0.10] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#A1A1AA]">
              Abuja Lot Catalog · Preview Inventory
            </p>
            <h1
              className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-5xl"
              style={{ lineHeight: 1.06, textWrap: 'balance' }}
            >
              Browse verified Abuja stock and inspect any brief.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#D4D4D8] sm:text-lg">
              Filter by body class, compare any two models side by side, or tap a card to launch
              360° spin, hotspots, and lot walkaround reels.
            </p>
          </div>

          <div className="w-full lg:max-w-xs">
            <label htmlFor="inventory-search" className="sr-only">
              Search vehicles by make, model, or year
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]"
                aria-hidden="true"
              />
              <input
                id="inventory-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Lexus, GLE, Prado..."
                className="min-h-[48px] w-full rounded-full border border-white/20 bg-[#161616] pl-11 pr-10 text-base text-white placeholder:text-[#A1A1AA] focus:border-white/50 focus:outline-none sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#D4D4D8] hover:text-white active:scale-[0.95]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Chips + Compare Jump + Count */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div
            className="no-scrollbar flex max-w-full items-center gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Filter vehicle catalog"
          >
            {STOCK_FILTERS.map((filter) => {
              const isActive =
                activeFilter === filter ||
                (activeFilter === 'Sell / Swap' && filter === 'All Stock');
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onSelectFilter(filter)}
                  className={`min-h-[42px] rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'border border-white/20 bg-[#161616] text-[#D4D4D8] hover:border-white/40 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById('vehicle-comparator')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-pill inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-white transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.97]"
            >
              <Scale className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Compare 2 Rides</span>
            </button>
            <p className="font-mono-tabular text-xs text-[#A1A1AA]">
              Showing {paginatedVehicles.length} of {searchedVehicles.length} matching units
            </p>
          </div>
        </div>

        {/* Paginated / Expandable Car Grid */}
        {searchedVehicles.length === 0 ? (
          <div className="glass-obsidian mt-10 rounded-2xl p-10 text-center">
            <p className="text-lg font-semibold text-white">
              No preview vehicles match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-2 text-sm text-[#D4D4D8]">
              Clear your search filter or message our WhatsApp desk to source a specific trim.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onSelectFilter('All Stock');
                }}
                className="min-h-[46px] rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black transition-[transform,opacity] duration-150 active:scale-[0.98]"
              >
                Reset Catalog Filters
              </button>
              <a
                href={buildWhatsAppUrl(
                  `Hello Allstars Automobiles Abuja, can you source a ${searchQuery.trim()} for me?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center rounded-full border border-white/20 px-6 py-2.5 text-xs font-medium text-white transition-[transform,border-color] duration-150 active:scale-[0.98]"
              >
                Request Custom Sourcing
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {paginatedVehicles.map((vehicle) => {
                const isSelected = vehicle.id === activeBrief.id;
                const isComparing = compareIds.includes(vehicle.id);
                return (
                  <article
                    key={vehicle.id}
                    className={`glass-obsidian group flex flex-col justify-between rounded-2xl p-5 transition-[border-color,background-color] duration-150 ${
                      isSelected
                        ? 'border-white/45'
                        : 'hover:border-white/25'
                    }`}
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectVehicle(vehicle.id);
                          onInspectVehicle(vehicle);
                        }}
                        className="block w-full text-left transition-transform duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-xl"
                      >
                        <CarPhoto
                          src={vehicle.imageUrl}
                          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                          silhouette={vehicle.silhouette}
                          paintHex={vehicle.paintHex}
                          className="aspect-[4/3] w-full"
                        />

                        <div className="mt-4">
                          <div className="flex items-center justify-between gap-2 text-xs text-[#A1A1AA]">
                            <span>
                              {vehicle.category} · {vehicle.origin}
                            </span>
                            <span className="font-mono-tabular">{vehicle.year}</span>
                          </div>

                          <h2 className="mt-1.5 font-display text-xl font-semibold text-white group-hover:underline decoration-white/30 underline-offset-4">
                            {vehicle.make} {vehicle.model}
                          </h2>
                          <p className="mt-0.5 truncate text-sm text-[#D4D4D8]">
                            {vehicle.trim}
                          </p>
                        </div>
                      </button>

                      <div className="mt-4 grid grid-cols-2 gap-2 border-y border-white/[0.10] py-3.5 text-xs">
                        <div>
                          <span className="block text-xs text-[#A1A1AA]">Mileage</span>
                          <span className="font-mono-tabular font-medium text-white">
                            {vehicle.mileage}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-xs text-[#A1A1AA]">Asking Price</span>
                          <span className="font-mono-tabular text-sm font-bold text-white">
                            {vehicle.priceNaira}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3.5 flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 text-emerald-400">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                            aria-hidden="true"
                          />
                          <span>{vehicle.lotStatus}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#D4D4D8]">
                          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                          <span>{vehicle.dutyStatus}</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectVehicle(vehicle.id);
                          onInspectVehicle(vehicle);
                        }}
                        className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-white/20 bg-transparent px-3.5 py-2 text-xs font-medium text-white whitespace-nowrap transition-[transform,border-color,background-color] duration-150 hover:border-white/40 hover:bg-white/[0.06] active:scale-[0.97]"
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleCompareVehicle(vehicle.id)}
                        aria-pressed={isComparing}
                        title={isComparing ? 'Selected in comparator' : 'Add to side-by-side comparator'}
                        className={`inline-flex min-h-[44px] items-center justify-center gap-1 rounded-full px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-[transform,border-color,background-color,color] duration-150 active:scale-[0.97] ${
                          isComparing
                            ? 'bg-white/20 border border-white/50 text-white font-semibold'
                            : 'border border-white/20 text-[#D4D4D8] hover:border-white/40 hover:text-white'
                        }`}
                      >
                        <Scale className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                      </button>
                      <a
                        href={buildWhatsAppUrl(
                          `Hello Allstars Automobiles Abuja, I am inquiring about the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.priceNaira}, Ref: ${vehicle.refCode}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.97]"
                      >
                        <span>WhatsApp</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Expand / Collapse Pagination Controls */}
            {searchedVehicles.length > PAGE_SIZE && (
              <div className="mt-10 flex flex-col items-center justify-center gap-3">
                {hasMore ? (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
                  >
                    Load More Vehicles ({searchedVehicles.length - paginatedVehicles.length} remaining)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVisibleCount(PAGE_SIZE)}
                    className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/20 px-6 py-2 text-xs font-medium text-white transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
                  >
                    Show Fewer Vehicles
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Side-by-Side Vehicle Comparator */}
        <VehicleComparator
          vehicles={SAMPLE_VEHICLES}
          compareIds={compareIds}
          onChangeCompareIds={onChangeCompareIds}
          onInspectVehicle={onInspectVehicle}
        />

        {/* Active Vehicle Summary Bar + Preview Note */}
        <div className="glass-obsidian mt-8 rounded-2xl p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium text-white">
                  Selected Brief: {activeBrief.year} {activeBrief.make} {activeBrief.model} ·{' '}
                  <span className="font-mono-tabular">{activeBrief.priceNaira}</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#D4D4D8]">
                  Preview notice: Sample vehicles, photos, and Naira prices shown in this catalog
                  are preview placeholders ready to be replaced with live Abuja lot photos and
                  real-time inventory.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={buildWhatsAppUrl(whatsappInquiryText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-semibold text-black whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
              >
                <span>Inquire on WhatsApp</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() =>
                  onRequestSwapForVehicle(
                    `${activeBrief.year} ${activeBrief.make} ${activeBrief.model} (${activeBrief.priceNaira})`
                  )
                }
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-white whitespace-nowrap transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
              >
                <Repeat className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Swap Into This Car</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
