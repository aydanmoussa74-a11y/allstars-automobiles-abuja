import { ArrowUpRight, Check, Scale } from 'lucide-react';
import {
  buildWhatsAppUrl,
  formatNaira,
  type Vehicle,
} from '../data/inventory';
import { CarPhoto } from './CarPhoto';

interface VehicleComparatorProps {
  vehicles: Vehicle[];
  compareIds: [string, string];
  onChangeCompareIds: (nextIds: [string, string]) => void;
  onInspectVehicle: (vehicle: Vehicle) => void;
}

export function VehicleComparator({
  vehicles,
  compareIds,
  onChangeCompareIds,
  onInspectVehicle,
}: VehicleComparatorProps) {
  const carA =
    vehicles.find((v) => v.id === compareIds[0]) ?? vehicles[0];
  const carB =
    vehicles.find((v) => v.id === compareIds[1]) ??
    vehicles[1] ??
    vehicles[0];

  if (!carA || !carB) return null;

  const priceDiff = Math.abs(carA.priceValueNaira - carB.priceValueNaira);
  const cheaperLabel =
    carA.priceValueNaira === carB.priceValueNaira
      ? 'Identical asking price'
      : carA.priceValueNaira < carB.priceValueNaira
        ? `${carA.make} ${carA.model} saves ${formatNaira(priceDiff)}`
        : `${carB.make} ${carB.model} saves ${formatNaira(priceDiff)}`;

  const compareWhatsAppUrl = buildWhatsAppUrl(
    `Hello Allstars Automobiles Abuja, I am comparing two vehicles on your lot:\n1) ${carA.year} ${carA.make} ${carA.model} (${carA.priceNaira}, Ref: ${carA.refCode})\n2) ${carB.year} ${carB.make} ${carB.model} (${carB.priceNaira}, Ref: ${carB.refCode})\nCan I inspect both units side by side on Ahmadu Bello Way?`
  );

  const specRows = [
    {
      label: 'Asking Price',
      valA: carA.priceNaira,
      valB: carB.priceNaira,
      mono: true,
    },
    {
      label: 'Model Year',
      valA: String(carA.year),
      valB: String(carB.year),
      mono: true,
    },
    {
      label: 'Odometer',
      valA: carA.mileage,
      valB: carB.mileage,
      mono: true,
    },
    {
      label: 'Powertrain',
      valA: carA.engine,
      valB: carB.engine,
      mono: false,
    },
    {
      label: 'Drivetrain',
      valA: carA.drivetrain,
      valB: carB.drivetrain,
      mono: false,
    },
    {
      label: 'Transmission',
      valA: carA.transmission,
      valB: carB.transmission,
      mono: false,
    },
  ];

  return (
    <div
      id="vehicle-comparator"
      className="glass-obsidian mt-12 rounded-2xl p-5 sm:p-7"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/[0.10] pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A1A1AA]">
            <Scale className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            <span>Side-by-Side Spec Comparator</span>
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
            Compare any two Abuja units live.
          </h2>
        </div>

        <div className="glass-pill inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs md:self-auto">
          <span className="text-[#A1A1AA]">Price Delta:</span>
          <span className="font-mono-tabular font-semibold text-white">
            {formatNaira(priceDiff)}
          </span>
          <span className="hidden text-[#D4D4D8] sm:inline">
            · {cheaperLabel}
          </span>
        </div>
      </div>

      {/* Vehicle Selectors + Photos */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {[
          { slot: 0 as const, car: carA, label: 'Vehicle A' },
          { slot: 1 as const, car: carB, label: 'Vehicle B' },
        ].map(({ slot, car, label }) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.10] bg-[#121214]/90 p-4"
          >
            <label
              htmlFor={`compare-select-${slot}`}
              className="block text-xs font-medium text-[#A1A1AA]"
            >
              {label}
            </label>
            <select
              id={`compare-select-${slot}`}
              value={car.id}
              onChange={(e) => {
                const next: [string, string] = [compareIds[0], compareIds[1]];
                next[slot] = e.target.value;
                onChangeCompareIds(next);
              }}
              className="mt-2 min-h-[46px] w-full rounded-xl border border-white/20 bg-[#0D0D0F] px-3.5 py-2 text-base font-medium text-white focus:border-white/50 focus:outline-none sm:text-sm"
            >
              {vehicles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.year} {item.make} {item.model} ({item.priceNaira})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => onInspectVehicle(car)}
              className="group mt-4 block w-full text-left active:scale-[0.99] transition-transform duration-150"
            >
              <CarPhoto
                src={car.imageUrl}
                alt={`${car.year} ${car.make} ${car.model}`}
                silhouette={car.silhouette}
                paintHex={car.paintHex}
                className="aspect-[16/10] w-full"
              />
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="font-display text-base font-semibold text-white group-hover:underline">
                  {car.year} {car.make} {car.model}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 shrink-0">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{car.dutyStatus}</span>
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#A1A1AA]">{car.trim}</p>
            </button>
          </div>
        ))}
      </div>

      {/* Spec Comparison Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.10] bg-[#111113]/85">
        <div className="divide-y divide-white/[0.08]">
          {specRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-2 px-4 py-3.5 text-xs sm:grid-cols-12 sm:items-center"
            >
              <span className="font-medium text-[#A1A1AA] sm:col-span-4">
                {row.label}
              </span>
              <span
                className={`text-white sm:col-span-4 ${
                  row.mono ? 'font-mono-tabular font-semibold' : 'tabular-nums'
                }`}
              >
                <span className="mr-1.5 text-[#A1A1AA] sm:hidden">A:</span>
                {row.valA}
              </span>
              <span
                className={`text-white sm:col-span-4 ${
                  row.mono ? 'font-mono-tabular font-semibold' : 'tabular-nums'
                }`}
              >
                <span className="mr-1.5 text-[#A1A1AA] sm:hidden">B:</span>
                {row.valB}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#D4D4D8] tabular-nums">{cheaperLabel}</p>
        <a
          href={compareWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
        >
          <span>Inquire About Both on WhatsApp</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
