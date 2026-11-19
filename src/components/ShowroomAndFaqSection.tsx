import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Clock, MapPin, Phone } from 'lucide-react';
import {
  buildWhatsAppUrl,
  DISPLAY_PHONE,
  FAQ_ITEMS,
  GOOGLE_MAPS_URL,
  SHOWROOM_ADDRESS,
} from '../data/inventory';
import { BrandMark } from './BrandMark';

const PROCESS_STEPS = [
  {
    step: '01.',
    title: 'Inspect on Ahmadu Bello Way',
    description:
      'Visit our Central Area lot in Abuja or send a trusted mechanic to scan ECU data, measure paint depth, and road-test the vehicle.',
  },
  {
    step: '02.',
    title: 'Verify Duty & Title Records',
    description:
      'Review original Nigeria Customs Service clearance papers, VIN-matched import records, and clean title documentation on the spot.',
  },
  {
    step: '03.',
    title: 'Close Direct or Waybill Nationwide',
    description:
      'Complete settlement directly with our deal desk—cash, bank transfer, or swap top-up—and drive out or request insured waybill across all 36 states.',
  },
];

// Direct Google Maps embed endpoint (returns HTTP 200 without X-Frame-Options: SAMEORIGIN block)
const GOOGLE_EMBED_SRC =
  'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sAhmadu+Bello+Way,+Central+Area,+Abuja!6i15';

// Secondary OpenStreetMap embed centered directly on Ahmadu Bello Way, Central Area, Abuja (9.0579, 7.4951)
const OSM_EMBED_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=7.475%2C9.042%2C7.515%2C9.072&layer=mapnik&marker=9.0579%2C7.4951';

export function ShowroomAndFaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [mapProvider, setMapProvider] = useState<'google' | 'street'>('google');

  return (
    <section id="showroom" className="py-16 sm:py-24 lg:py-28 px-safe">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Page Header */}
        <div className="flex flex-col gap-5 border-b border-white/[0.10] pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#A1A1AA]">
              Abuja Showroom &amp; Directions
            </p>
            <h1
              className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl"
              style={{ lineHeight: 1.06, textWrap: 'balance' }}
            >
              Visit Ahmadu Bello Way, Central Area, Abuja.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#D4D4D8] sm:text-lg">
              All physical inspections, OBD-II scans, test drives, and trade-in handovers happen
              directly at our Central Area showroom corridor.
            </p>
          </div>

          {/* Map View Switcher */}
          <div
            role="group"
            aria-label="Map provider switcher"
            className="glass-pill inline-flex self-start rounded-full p-1"
          >
            <button
              type="button"
              onClick={() => setMapProvider('google')}
              className={`min-h-[40px] rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-[transform,background-color,color] duration-150 active:scale-[0.97] ${
                mapProvider === 'google'
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#D4D4D8] hover:text-white'
              }`}
            >
              Google Maps
            </button>
            <button
              type="button"
              onClick={() => setMapProvider('street')}
              className={`min-h-[40px] rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-[transform,background-color,color] duration-150 active:scale-[0.97] ${
                mapProvider === 'street'
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#D4D4D8] hover:text-white'
              }`}
            >
              Street Map
            </button>
          </div>
        </div>

        {/* Embedded Interactive Map + Showroom Contact Card */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="glass-obsidian overflow-hidden rounded-2xl lg:col-span-7">
            <iframe
              key={mapProvider}
              title="Allstars Automobiles Worldwide — Ahmadu Bello Way, Central Area, Abuja"
              src={mapProvider === 'google' ? GOOGLE_EMBED_SRC : OSM_EMBED_SRC}
              className="h-[340px] w-full min-h-[320px] sm:h-[400px] lg:h-full lg:min-h-[420px]"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="glass-obsidian flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5">
            <div className="space-y-6">
              {/* Brand Mark Identity Card */}
              <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.10] bg-[#111111]/90 p-3.5">
                <BrandMark size={44} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-tight text-white">
                    AA Brand Mark
                  </p>
                  <p className="mt-0.5 text-xs text-[#A1A1AA]">
                    Allstars Automobiles Worldwide · Abuja
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Allstars Automobiles Worldwide
                  </p>
                  <p className="mt-1 text-sm text-[#D4D4D8]">{SHOWROOM_ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/[0.10] pt-5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                <div className="w-full space-y-2 text-sm">
                  <p className="font-semibold text-white">Showroom Hours</p>
                  <div className="flex items-center justify-between text-xs text-[#E4E4E7] tabular-nums">
                    <span className="text-[#A1A1AA]">Monday – Friday</span>
                    <span>8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#E4E4E7] tabular-nums">
                    <span className="text-[#A1A1AA]">Saturday</span>
                    <span>8:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/[0.10] pt-5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-[#A1A1AA]">Direct Deal Line</p>
                  <a
                    href="tel:+2348022629781"
                    className="mt-1 inline-block font-mono-tabular text-base font-semibold text-white hover:underline active:opacity-75"
                  >
                    {DISPLAY_PHONE}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.10] pt-6">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+2348022629781"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white whitespace-nowrap transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
                >
                  Call Showroom
                </a>
                <a
                  href={buildWhatsAppUrl(
                    'Hello Allstars Automobiles Worldwide Abuja, I would like directions and an appointment for Ahmadu Bello Way.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white whitespace-nowrap transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
                >
                  WhatsApp Desk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Lot Acquisition Process */}
        <div className="mt-16 grid gap-8 border-t border-white/[0.10] pt-14 md:grid-cols-3">
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="space-y-2.5">
              <p className="font-mono-tabular text-xs font-medium text-[#A1A1AA]">
                {item.step}
              </p>
              <h2 className="font-display text-lg font-semibold text-white">
                {item.title}
              </h2>
              <p className="text-sm leading-relaxed text-[#D4D4D8]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="mt-16 grid gap-8 border-t border-white/[0.10] pt-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium text-[#A1A1AA]">Buyer Questions</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Inspection, customs &amp; swap clarity.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#D4D4D8]">
              Straight answers before you visit Ahmadu Bello Way.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="glass-obsidian divide-y divide-white/[0.10] rounded-2xl">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div key={item.id} className="px-5 py-1 sm:px-6">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      aria-expanded={isOpen}
                      className="flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left transition-opacity duration-150 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
                    >
                      <span className="text-sm font-semibold text-white sm:text-base">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#D4D4D8] transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 pr-4 text-sm leading-relaxed text-[#D4D4D8] sm:pr-8">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
