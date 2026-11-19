import { ArrowLeft } from 'lucide-react';
import {
  buildWhatsAppUrl,
  DISPLAY_PHONE,
  SHOWROOM_ADDRESS,
} from '../data/inventory';
import type { AppPage } from './MobileSidebar';

interface LegalPageProps {
  mode: 'terms' | 'privacy';
  onNavigate: (page: AppPage) => void;
}

export function LegalPage({ mode, onNavigate }: LegalPageProps) {
  const isTerms = mode === 'terms';

  return (
    <section className="py-16 sm:py-24 lg:py-28 px-safe">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white transition-[transform,border-color] duration-150 hover:border-white/40 active:scale-[0.97]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Overview</span>
        </button>

        <div className="mt-8 border-b border-white/[0.10] pb-8">
          <p className="text-xs font-medium text-[#A1A1AA]">
            Allstars Automobiles Worldwide · Abuja, Nigeria
          </p>
          <h1
            className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl"
            style={{ lineHeight: 1.08 }}
          >
            {isTerms ? 'Terms of Service' : 'Privacy Policy'}
          </h1>
          <p className="mt-4 text-sm text-[#D4D4D8] tabular-nums">
            Effective Date: November 2026 · Showroom: {SHOWROOM_ADDRESS}
          </p>
        </div>

        {isTerms ? (
          <div className="mt-10 space-y-10 text-sm leading-relaxed text-[#D4D4D8] sm:text-base">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                01. Physical Inspection &amp; Pre-Purchase Verification
              </h2>
              <p>
                Allstars Automobiles Worldwide encourages every prospective buyer to inspect
                vehicles in person at our showroom along {SHOWROOM_ADDRESS} prior to purchase.
                Buyers are welcome to bring independent mechanics, paint-depth meters, and OBD-II
                diagnostic equipment during operating hours (Mon–Fri 8:00 AM – 6:00 PM, Sat 8:00 AM
                – 5:00 PM).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                02. Customs Documentation &amp; Title Records
              </h2>
              <p>
                Foreign-used (tokunbo) vehicles listed as &ldquo;Duty Verified&rdquo; are offered
                with Nigeria Customs Service clearance documentation, C-Number records, and VIN
                history for buyer confirmation prior to final bank transfer. Buyers are advised to
                independently validate all customs numbers and chassis VINs before completing
                settlement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                03. Listing Availability &amp; Preview Pricing
              </h2>
              <p>
                Vehicle specifications, mileage figures, photographs, and Naira (₦) prices shown
                on this web platform serve as lot previews and are subject to prior on-lot sale,
                exchange-rate adjustments, or live inventory updates. Final binding pricing and
                availability are confirmed directly in writing through our Abuja Deal Desk on{' '}
                <span className="font-mono-tabular text-white">{DISPLAY_PHONE}</span>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                04. Trade-Ins, Swaps &amp; Nationwide Waybill
              </h2>
              <p>
                WhatsApp trade-in estimates are preliminary ranges based on buyer-supplied details.
                Final swap valuation is confirmed only after physical mechanical and documentation
                inspection on Ahmadu Bello Way. Nationwide waybill dispatch across Nigeria is
                arranged upon cleared payment and signed dispatch authorization.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                05. Direct Deal Desk Contact
              </h2>
              <p>
                For questions regarding vehicle terms, escrow/bank transfer instructions, or
                inspection bookings, contact our Abuja desk directly on{' '}
                <a
                  href={buildWhatsAppUrl('Hello Allstars Automobiles, I have a question on your Terms of Service.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4"
                >
                  WhatsApp ({DISPLAY_PHONE})
                </a>
                .
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-10 space-y-10 text-sm leading-relaxed text-[#D4D4D8] sm:text-base">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                01. Information You Share With Us
              </h2>
              <p>
                When you use the Trade-In / Swap valuation form or initiate a vehicle inquiry, the
                details you enter (such as your current vehicle make, model, year, condition notes,
                and target vehicle) are formatted locally in your browser so you can send them
                directly to our official WhatsApp Deal Desk ({DISPLAY_PHONE}).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                02. How Inquiries &amp; Contact Numbers Are Used
              </h2>
              <p>
                Phone numbers and vehicle details shared via WhatsApp or phone calls are used
                strictly to verify inventory availability, schedule Ahmadu Bello Way inspections,
                prepare trade-in appraisals, or coordinate vehicle delivery. We never sell, rent,
                or distribute buyer phone numbers to third-party brokers or marketing lists.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                03. Embedded Maps &amp; Third-Party Links
              </h2>
              <p>
                Our Showroom &amp; Map view embeds an interactive map for Ahmadu Bello Way, Central
                Area, Abuja, and links out to Google Maps and WhatsApp. Interacting with embedded
                map frames or external WhatsApp links is governed by the respective privacy terms
                of Google and WhatsApp.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                04. Local Browser Preferences
              </h2>
              <p>
                Accessibility settings such as the &ldquo;Pause motion&rdquo; toggle operate
                directly in your browser session without tracking cookies or behavioral ad
                profiling.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-white">
                05. Privacy Inquiries
              </h2>
              <p>
                To request deletion of prior WhatsApp inquiry threads or confirm showroom contact
                records, reach our Abuja office at {SHOWROOM_ADDRESS} or call{' '}
                <a href="tel:+2348022629781" className="font-mono-tabular text-white underline underline-offset-4">
                  {DISPLAY_PHONE}
                </a>
                .
              </p>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
