import { ArrowUpRight, Info, Star } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/inventory';
import { SAMPLE_REVIEWS } from '../data/reviews';
import type { AppPage } from './MobileSidebar';

interface ReviewsPageProps {
  onNavigate: (page: AppPage) => void;
}

export function ReviewsPage({ onNavigate }: ReviewsPageProps) {
  return (
    <section className="py-10 sm:py-24 lg:py-28 px-safe">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#A1A1AA]">
            Abuja Buyer Reviews · Preview Testimonials
          </p>
          <h1
            className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:mt-4 sm:text-5xl"
            style={{ lineHeight: 1.06, textWrap: 'balance' }}
          >
            Built on transparent inspections and clean customs handovers.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#D4D4D8] sm:mt-5 sm:text-lg">
            Read how private buyers and fleet leads across Abuja, Lagos, and Port Harcourt inspect,
            swap, and take delivery from Ahmadu Bello Way.
          </p>
        </div>

        {/* Summary Metrics Bar */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <div className="glass-obsidian rounded-2xl p-6">
            <p className="font-display text-3xl font-bold text-white tabular-nums">4.9 / 5.0</p>
            <p className="mt-1.5 text-sm font-semibold text-white">Inspection Satisfaction</p>
            <p className="mt-2 text-sm text-[#D4D4D8]">
              Independent mechanic scans and paint-depth checks welcomed prior to payment.
            </p>
          </div>
          <div className="glass-obsidian rounded-2xl p-6">
            <p className="font-display text-3xl font-bold text-white tabular-nums">100%</p>
            <p className="mt-1.5 text-sm font-semibold text-white">Customs Verification</p>
            <p className="mt-2 text-sm text-[#D4D4D8]">
              Every tokunbo handover includes original e-customs exit and C-Number documentation.
            </p>
          </div>
          <div className="glass-obsidian rounded-2xl p-6">
            <p className="font-display text-3xl font-bold text-white tabular-nums">36 STATES</p>
            <p className="mt-1.5 text-sm font-semibold text-white">Flatbed Dispatch</p>
            <p className="mt-2 text-sm text-[#D4D4D8]">
              Insured door-to-door carrier delivery for out-of-state buyers after video inspection.
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="glass-obsidian flex flex-col justify-between rounded-2xl p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3.5 w-3.5 fill-white text-white"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="font-mono-tabular text-xs text-[#A1A1AA]">
                    {review.dateLabel}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#E4E4E7] sm:text-[15px]">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-white/[0.10] pt-4">
                <p className="text-sm font-semibold text-white">{review.buyerName}</p>
                <p className="mt-0.5 text-xs text-[#A1A1AA]">
                  {review.buyerRole} · {review.location}
                </p>
                <p className="mt-2 text-xs font-medium text-[#E4E4E7]">
                  {review.vehiclePurchased} · {review.serviceType}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Preview Notice + CTA */}
        <div className="glass-obsidian mt-12 flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-[#D4D4D8]">
              Preview notice: Buyer reviews shown here are representative preview placeholders ready
              to be replaced with verified client testimonials from your Abuja lot records.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('inventory')}
              className="min-h-[44px] rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-white whitespace-nowrap transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.98]"
            >
              Browse Inventory
            </button>
            <a
              href={buildWhatsAppUrl(
                'Hello Allstars Automobiles Abuja, I would like to book an Ahmadu Bello Way inspection.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-semibold text-black whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
            >
              <span>Book Inspection</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
