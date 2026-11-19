import { useEffect, useState, type FormEvent, type MouseEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppUrl, SAMPLE_VEHICLES } from '../data/inventory';

interface TradeInSectionProps {
  presetTargetCar: string;
}

const QUICK_SWAP_TARGETS = [
  SAMPLE_VEHICLES[0],
  SAMPLE_VEHICLES[1],
  SAMPLE_VEHICLES[2],
  SAMPLE_VEHICLES[4],
  SAMPLE_VEHICLES[6],
];

const CONDITION_GRADES = [
  'Tokunbo / Mint',
  'Clean Nigerian-Used',
  'Needs Minor Work',
] as const;

const INSPECTION_SLOTS = [
  'Today 10AM–1PM',
  'Today 2PM–5PM',
  'Saturday Slot',
] as const;

export function TradeInSection({ presetTargetCar }: TradeInSectionProps) {
  const [currentCar, setCurrentCar] = useState('');
  const [targetCar, setTargetCar] = useState(presetTargetCar);
  const [conditionGrade, setConditionGrade] = useState<string>(CONDITION_GRADES[1]);
  const [inspectionSlot, setInspectionSlot] = useState<string>(INSPECTION_SLOTS[0]);
  const [conditionNotes, setConditionNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');

  useEffect(() => {
    if (presetTargetCar) {
      setTargetCar(presetTargetCar);
    }
  }, [presetTargetCar]);

  const formattedMessage = [
    'Hello Allstars Automobiles Abuja, I would like a Trade-In / Swap valuation:',
    `• Current Car & Year: ${currentCar.trim() || '[Not specified]'}`,
    `• Condition Grade: ${conditionGrade}`,
    `• Target Car / Swap Request: ${targetCar.trim() || 'Open to Abuja lot options'}`,
    `• Preferred Inspection / Video Slot: ${inspectionSlot}`,
    `• Condition Notes: ${conditionNotes.trim() || 'Clean daily driver, ready for inspection'}`,
    'Please share an estimated swap range and inspection window on Ahmadu Bello Way.',
  ].join('\n');

  const isReady = Boolean(currentCar.trim() && targetCar.trim());
  const waUrl = buildWhatsAppUrl(formattedMessage);

  const handleDispatchClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!currentCar.trim()) {
      event.preventDefault();
      setErrorMessage('Please enter your current car make, model, and year.');
      document.getElementById('current-car')?.focus();
      return;
    }
    if (!targetCar.trim()) {
      event.preventDefault();
      setErrorMessage('Please enter the target vehicle or swap request.');
      document.getElementById('target-car')?.focus();
      return;
    }

    setErrorMessage('');
    setSubmittedUrl(waUrl);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentCar.trim()) {
      setErrorMessage('Please enter your current car make, model, and year.');
      return;
    }
    if (!targetCar.trim()) {
      setErrorMessage('Please enter the target vehicle or swap request.');
      return;
    }

    setErrorMessage('');
    setSubmittedUrl(waUrl);
  };

  return (
    <section
      id="trade-in"
      className="py-10 sm:py-24 lg:py-28 px-safe"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="glass-obsidian rounded-2xl p-5 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            {/* Left Copy & Quick Target Chips */}
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-[#A1A1AA]">
                Trade-In &amp; Valuation Desk
              </p>
              <h1
                className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-[42px]"
                style={{ lineHeight: 1.08, textWrap: 'balance' }}
              >
                Value your current car and swap in one visit.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#D4D4D8]">
                Skip months of uncertain classified calls. Share your current vehicle details below
                to generate a structured trade-in brief straight to our Abuja WhatsApp desk.
              </p>

              <div className="mt-7 space-y-3 border-t border-white/[0.10] pt-6 text-xs text-[#E4E4E7]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#A1A1AA]">Valuation Basis</span>
                  <span className="text-right font-medium text-white">
                    Live Abuja resale + body scan
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#A1A1AA]">Eligible Vehicles</span>
                  <span className="text-right font-medium text-white">
                    Clean Nigerian-used &amp; Tokunbo
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#A1A1AA]">Inspection Point</span>
                  <span className="text-right font-medium text-white">
                    Ahmadu Bello Way, Central Area
                  </span>
                </div>
              </div>

              {/* Quick Target Selectors */}
              <div className="mt-7">
                <p className="text-xs font-medium text-[#A1A1AA]">
                  Quick-fill target from Abuja lot
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_SWAP_TARGETS.map((car) => {
                    const label = `${car.year} ${car.make} ${car.model} (${car.priceNaira})`;
                    const selected = targetCar === label;
                    return (
                      <button
                        key={car.id}
                        type="button"
                        onClick={() => setTargetCar(label)}
                        className={`min-h-[42px] rounded-full px-4 py-2 text-sm transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                          selected
                            ? 'bg-white text-black font-semibold'
                            : 'border border-white/20 text-[#D4D4D8] hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {car.year} {car.model}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Interactive Trade-In Form Card */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-xl border border-white/[0.12] bg-[#1E1E1E]/90 p-5 sm:p-7"
              >
                <div className="grid gap-6">
                  <div>
                    <label
                      htmlFor="current-car"
                      className="block text-xs font-medium text-white"
                    >
                      Current Car &amp; Year <span className="text-[#A1A1AA]">(Required)</span>
                    </label>
                    <input
                      id="current-car"
                      name="currentCar"
                      type="text"
                      value={currentCar}
                      onChange={(e) => {
                        setCurrentCar(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. 2018 Highlander"
                      className="mt-2 min-h-[48px] w-full rounded-xl border border-white/20 bg-[#111111] px-4 py-3 text-base text-white placeholder:text-[#A1A1AA] focus:border-white/55 focus:outline-none sm:text-sm"
                    />
                  </div>

                  {/* Interactive Condition Grade Pills */}
                  <div>
                    <p className="text-xs font-medium text-white">
                      Vehicle Condition Grade
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Vehicle Condition Grade"
                      className="mt-2.5 flex flex-wrap gap-2"
                    >
                      {CONDITION_GRADES.map((grade) => {
                        const active = conditionGrade === grade;
                        return (
                          <button
                            key={grade}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setConditionGrade(grade)}
                            className={`min-h-[42px] rounded-full px-4 py-2 text-sm transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] ${
                              active
                                ? 'bg-white text-black font-semibold'
                                : 'border border-white/20 bg-[#111111] text-[#D4D4D8] hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {grade}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="target-car"
                      className="block text-xs font-medium text-white"
                    >
                      Target Car / Swap Request <span className="text-[#A1A1AA]">(Required)</span>
                    </label>
                    <input
                      id="target-car"
                      name="targetCar"
                      type="text"
                      value={targetCar}
                      onChange={(e) => {
                        setTargetCar(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. 2022 Lexus RX 350"
                      className="mt-2 min-h-[48px] w-full rounded-xl border border-white/20 bg-[#111111] px-4 py-3 text-base text-white placeholder:text-[#A1A1AA] focus:border-white/55 focus:outline-none sm:text-sm"
                    />
                  </div>

                  {/* Live Video / Lot Slot Pills */}
                  <div>
                    <p className="text-xs font-medium text-white">
                      Preferred Video or Abuja Lot Window
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Preferred inspection slot"
                      className="mt-2.5 flex flex-wrap gap-2"
                    >
                      {INSPECTION_SLOTS.map((slot) => {
                        const active = inspectionSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setInspectionSlot(slot)}
                            className={`min-h-[42px] rounded-full px-4 py-2 text-sm tabular-nums transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] ${
                              active
                                ? 'bg-white text-black font-semibold'
                                : 'border border-white/20 bg-[#111111] text-[#D4D4D8] hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="condition-notes"
                      className="block text-xs font-medium text-white"
                    >
                      Condition Notes
                    </label>
                    <textarea
                      id="condition-notes"
                      name="conditionNotes"
                      rows={3}
                      value={conditionNotes}
                      onChange={(e) => setConditionNotes(e.target.value)}
                      placeholder="Mileage, AC, paint & customs papers..."
                      className="mt-2 w-full rounded-xl border border-white/20 bg-[#111111] px-4 py-3 text-base text-white placeholder:text-[#A1A1AA] focus:border-white/55 focus:outline-none sm:text-sm"
                    />
                  </div>

                  {/* Live Dispatch Preview */}
                  <div className="rounded-xl border border-white/[0.10] bg-[#121212] p-4">
                    <p className="text-xs font-medium text-[#A1A1AA]">
                      Formatted WhatsApp Inquiry Preview
                    </p>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#E4E4E7]">
                      {formattedMessage}
                    </pre>
                  </div>

                  {errorMessage && (
                    <p role="alert" className="text-xs font-medium text-amber-400">
                      {errorMessage}
                    </p>
                  )}

                  {submittedUrl && (
                    <div
                      role="status"
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Trade-in brief prepared for WhatsApp.</span>
                      </span>
                      <a
                        href={submittedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-4 hover:text-white"
                      >
                        Open WhatsApp again
                      </a>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs text-[#A1A1AA]">
                      Opens direct WhatsApp chat (+234 802 262 9781)
                    </span>
                    <a
                      href={isReady ? waUrl : '#trade-in'}
                      target={isReady ? '_blank' : undefined}
                      rel={isReady ? 'noopener noreferrer' : undefined}
                      onClick={handleDispatchClick}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>Send Trade-In Inquiry</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
