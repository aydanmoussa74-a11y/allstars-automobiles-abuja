export type DockFilter =
  | 'All Stock'
  | 'Luxury SUVs'
  | 'Executive Sedans'
  | 'Direct Tokunbo'
  | 'Sell / Swap';

export type VehicleCategory = 'Luxury SUVs' | 'Executive Sedans';

export type VehicleSilhouetteType =
  | 'crossover-suv'
  | 'flagship-suv'
  | 'boxy-4x4'
  | 'executive-sedan'
  | 'sport-sedan';

export interface InspectionHotspot {
  id: string;
  label: string;
  title: string;
  reading: string;
  xPercent: number;
  yPercent: number;
}

export interface Vehicle {
  id: string;
  refCode: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  category: VehicleCategory;
  origin: 'Direct Tokunbo';
  priceNaira: string;
  priceValueNaira: number;
  mileage: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  exteriorColor: string;
  interiorColor: string;
  paintHex: string;
  lotStatus: string;
  dutyStatus: string;
  inspectionNote: string;
  silhouette: VehicleSilhouetteType;
  imageUrl: string;
  videoUrl?: string;
  hotspots: InspectionHotspot[];
}

export const WHATSAPP_NUMBER = '2348022629781';
export const DISPLAY_PHONE = '+234 802 262 9781';
export const SHOWROOM_ADDRESS = 'Ahmadu Bello Way, Central Area, Abuja';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/mHfYPrynvybb1BiF9';
export const HERO_BACKGROUND_IMAGE = '/images/cars/hero.jpg';

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message || !message.trim()) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}

export const DOCK_FILTERS: DockFilter[] = [
  'All Stock',
  'Luxury SUVs',
  'Executive Sedans',
  'Direct Tokunbo',
  'Sell / Swap',
];

function createHotspots(
  paintReading: string,
  ecuReading: string,
  customsReading: string,
  cabinReading: string
): InspectionHotspot[] {
  return [
    {
      id: 'engine',
      label: 'Powertrain & ECU',
      title: 'OBD-II & Compression',
      reading: ecuReading,
      xPercent: 25,
      yPercent: 54,
    },
    {
      id: 'paint',
      label: 'Paint Depth',
      title: 'Factory Micrometer',
      reading: paintReading,
      xPercent: 52,
      yPercent: 40,
    },
    {
      id: 'cabin',
      label: 'Cabin & Keys',
      title: 'Trim & Handover',
      reading: cabinReading,
      xPercent: 58,
      yPercent: 60,
    },
    {
      id: 'customs',
      label: 'Duty & Title',
      title: 'Customs Verification',
      reading: customsReading,
      xPercent: 78,
      yPercent: 48,
    },
  ];
}

export const SAMPLE_VEHICLES: Vehicle[] = [
  {
    id: 'lexus-lx-570',
    refCode: 'AAW-LX570-21',
    year: 2021,
    make: 'Lexus',
    model: 'LX 570',
    trim: 'Signature 3-Row 4WD',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦118,000,000',
    priceValueNaira: 118000000,
    mileage: '21,400 mi',
    engine: '5.7L V8 · 383 hp',
    transmission: '8-Speed Automatic',
    drivetrain: 'Full-Time 4WD',
    exteriorColor: 'Obsidian Black',
    interiorColor: 'Cabernet Semi-Aniline',
    paintHex: '#18181B',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Active height control hydraulics tested, Mark Levinson 19-speaker audio, cool box, and full customs C-Number release ready in Central Area.',
    silhouette: 'flagship-suv',
    imageUrl: '/images/cars/lexus-lx-570.jpg',
    hotspots: createHotspots(
      '118 µm original coat across all 12 body panels',
      '0 active fault codes · AHC height hydraulic pressure passed',
      'Tin Can Customs C-Number & VIN Bill of Lading matched',
      'Dual smart keys · Mark Levinson & rear screens tested'
    ),
  },
  {
    id: 'lexus-rx-350',
    refCode: 'AAW-RX350-22',
    year: 2022,
    make: 'Lexus',
    model: 'RX 350',
    trim: 'F-Sport Handling AWD',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦68,500,000',
    priceValueNaira: 68500000,
    mileage: '28,400 mi',
    engine: '3.5L V6 · 295 hp',
    transmission: '8-Speed Automatic',
    drivetrain: 'All-Wheel Drive',
    exteriorColor: 'Caviar Black',
    interiorColor: 'Rioja Red Leather',
    paintHex: '#27272A',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Original factory paint metered across all panels, clean US Carfax history, panoramic roof, and full Tin Can customs clearance.',
    silhouette: 'crossover-suv',
    imageUrl: '/images/cars/lexus-rx-350.jpg',
    hotspots: createHotspots(
      '112 µm uniform factory paint · zero filler detected',
      '3.5L V6 idle & 8-speed shift calibration verified clean',
      'Original Nigeria Customs e-assessment & exit notice',
      'Rioja Red F-Sport leather · panoramic roof sealed'
    ),
  },
  {
    id: 'mercedes-gle-450',
    refCode: 'AAW-GLE450-21',
    year: 2021,
    make: 'Mercedes-Benz',
    model: 'GLE 450',
    trim: '4MATIC AMG Line',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦94,000,000',
    priceValueNaira: 94000000,
    mileage: '31,200 mi',
    engine: '3.0L I6 Turbo EQ Boost',
    transmission: '9G-TRONIC 9-Speed',
    drivetrain: '4MATIC AWD',
    exteriorColor: 'Selenite Grey Metallic',
    interiorColor: 'Black Nappa Leather',
    paintHex: '#52525B',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Burmester surround audio, 360° camera array, air suspension verified leak-free, and dual-key fob handover ready in Central Area.',
    silhouette: 'flagship-suv',
    imageUrl: '/images/cars/mercedes-gle-450.jpg',
    hotspots: createHotspots(
      '121 µm Selenite Grey clearcoat · zero respray',
      '48V EQ Boost & AIRMATIC struts tested leak-free',
      'Full port duty clearance verified against chassis VIN',
      'Burmester audio, 360° cameras & dual key fobs intact'
    ),
  },
  {
    id: 'mercedes-s550',
    refCode: 'AAW-S550-21',
    year: 2021,
    make: 'Mercedes-Benz',
    model: 'S 550',
    trim: 'Executive Long-Wheelbase',
    category: 'Executive Sedans',
    origin: 'Direct Tokunbo',
    priceNaira: '₦138,000,000',
    priceValueNaira: 138000000,
    mileage: '17,900 mi',
    engine: '4.0L Biturbo V8 · 496 hp',
    transmission: '9G-TRONIC 9-Speed',
    drivetrain: '4MATIC AWD',
    exteriorColor: 'Obsidian Black',
    interiorColor: 'Sienna Brown Nappa',
    paintHex: '#18181B',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Rear executive lounge seating with dual tablets, soft-close doors, AIRMATIC suspension, and verified Nigeria Customs port clearance.',
    silhouette: 'executive-sedan',
    imageUrl: '/images/cars/mercedes-s550.jpg',
    hotspots: createHotspots(
      '116 µm Obsidian Black original paintwork',
      'Biturbo V8 scan clean · AIRMATIC ride height balanced',
      'Full Nigeria Customs duty papers & clean title folder',
      'Rear executive lounge tablets & soft-close doors tested'
    ),
  },
  {
    id: 'toyota-prado',
    refCode: 'AAW-PRADO-22',
    year: 2022,
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    trim: 'TX-L 7-Seater',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦86,500,000',
    priceValueNaira: 86500000,
    mileage: '19,800 mi',
    engine: '4.0L V6 Dual VVT-i',
    transmission: '6-Speed Super ECT',
    drivetrain: 'Full-Time 4WD',
    exteriorColor: 'Pearl White',
    interiorColor: 'Saddle Tan Leather',
    paintHex: '#D4D4D8',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Cold-box center console, KDSS suspension, zero frame corrosion, and verified customs C-Number ready for Abuja registration.',
    silhouette: 'boxy-4x4',
    imageUrl: '/images/cars/toyota-prado.jpg',
    hotspots: createHotspots(
      '114 µm Pearl White original finish · clean chassis rails',
      '4.0L V6 & 4WD transfer case locked & road-tested',
      'Verified Nigeria Customs C-Number ready for registration',
      '7-seater Saddle Tan cabin + cold-box fridge working'
    ),
  },
  {
    id: 'lexus-gx-460',
    refCode: 'AAW-GX460-21',
    year: 2021,
    make: 'Lexus',
    model: 'GX 460',
    trim: 'Luxury Package 4WD',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦79,000,000',
    priceValueNaira: 79000000,
    mileage: '24,900 mi',
    engine: '4.6L V8 · 301 hp',
    transmission: '6-Speed Sequential AT',
    drivetrain: 'Full-Time 4WD',
    exteriorColor: 'Obsidian Black',
    interiorColor: 'Ecru Semi-Aniline',
    paintHex: '#18181B',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Body-on-frame V8 flagship with Mark Levinson audio, Crawl Control, and complete verifiable customs duty receipts.',
    silhouette: 'boxy-4x4',
    imageUrl: '/images/cars/lexus-gx-460.jpg',
    hotspots: createHotspots(
      '119 µm Obsidian clearcoat · zero underbody rust',
      '4.6L V8 & Crawl Control actuator tested clean',
      'Complete e-customs exit & port release documentation',
      'Ecru semi-aniline leather + 3rd row power fold'
    ),
  },
  {
    id: 'range-rover-sport',
    refCode: 'AAW-RRS-21',
    year: 2021,
    make: 'Range Rover',
    model: 'Sport HSE Dynamic',
    trim: 'P400 Inline-6 MHEV',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦98,500,000',
    priceValueNaira: 98500000,
    mileage: '23,600 mi',
    engine: '3.0L Turbo I6 · 395 hp',
    transmission: '8-Speed ZF Automatic',
    drivetrain: 'All-Wheel Drive',
    exteriorColor: 'Santorini Black',
    interiorColor: 'Ebony Windsor Leather',
    paintHex: '#18181B',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Meridian surround sound, electronic air suspension calibrated, panoramic roof, and clean diagnostic scan ready on Ahmadu Bello Way.',
    silhouette: 'flagship-suv',
    imageUrl: '/images/cars/range-rover-sport.jpg',
    hotspots: createHotspots(
      '120 µm Santorini Black factory aluminum body',
      'P400 mild-hybrid & air suspension compressor verified',
      'Duty Verified with matched VIN & Tin Can release',
      'Meridian surround audio + dual Touch Pro screens'
    ),
  },
  {
    id: 'porsche-cayenne',
    refCode: 'AAW-CAY-22',
    year: 2022,
    make: 'Porsche',
    model: 'Cayenne',
    trim: 'Platinum Edition AWD',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦112,000,000',
    priceValueNaira: 112000000,
    mileage: '18,200 mi',
    engine: '3.0L Turbo V6 · 335 hp',
    transmission: '8-Speed Tiptronic S',
    drivetrain: 'All-Wheel Drive',
    exteriorColor: 'Chromite Black Metallic',
    interiorColor: 'Black / Chalk Leather',
    paintHex: '#27272A',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Sport Chrono package, 21-inch RS Spyder wheels, Bose surround audio, and verified full Nigerian Customs clearance.',
    silhouette: 'crossover-suv',
    imageUrl: '/images/cars/porsche-cayenne.jpg',
    hotspots: createHotspots(
      '115 µm Chromite Black Metallic · zero accident history',
      'Turbo V6 & Tiptronic S transmission scan 100% clean',
      'Verified Nigerian Customs C-Number & import papers',
      'Sport Chrono clock, Bose audio & 21-inch alloys'
    ),
  },
  {
    id: 'bmw-x5',
    refCode: 'AAW-X5-21',
    year: 2021,
    make: 'BMW',
    model: 'X5 xDrive40i',
    trim: 'M Sport Package',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦84,000,000',
    priceValueNaira: 84000000,
    mileage: '27,500 mi',
    engine: '3.0L TwinPower Turbo I6',
    transmission: '8-Speed Sport Steptronic',
    drivetrain: 'xDrive AWD',
    exteriorColor: 'Mineral White',
    interiorColor: 'Cognac Vernasca Leather',
    paintHex: '#D4D4D8',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Sky Lounge panoramic LED roof, Harman Kardon audio, head-up display, and original factory paint verified.',
    silhouette: 'crossover-suv',
    imageUrl: '/images/cars/bmw-x5.jpg',
    hotspots: createHotspots(
      '114 µm Mineral White metallic · all panels original',
      'B58 3.0L inline-6 cooling & drivetrain verified clean',
      'Full customs clearance receipts on file in Abuja',
      'Cognac leather, Sky Lounge LED roof & HUD tested'
    ),
  },
  {
    id: 'mercedes-c300',
    refCode: 'AAW-C300-21',
    year: 2021,
    make: 'Mercedes-Benz',
    model: 'C300',
    trim: 'AMG Line Sedan',
    category: 'Executive Sedans',
    origin: 'Direct Tokunbo',
    priceNaira: '₦49,500,000',
    priceValueNaira: 49500000,
    mileage: '26,100 mi',
    engine: '2.0L Turbo I4 · 255 hp',
    transmission: '9G-TRONIC 9-Speed',
    drivetrain: 'Rear-Wheel Drive',
    exteriorColor: 'Graphite Grey',
    interiorColor: 'Espresso Brown',
    paintHex: '#3F3F46',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Digital cockpit cluster, Multibeam LED headlamps, clean OBD-II diagnostic report, and immediate Ahmadu Bello Way test drive.',
    silhouette: 'executive-sedan',
    imageUrl: '/images/cars/mercedes-c300.jpg',
    hotspots: createHotspots(
      '113 µm Graphite Grey factory coat · zero bodywork',
      '2.0L Turbo & 9G-TRONIC clean OBD-II scan',
      'Original Nigeria Customs assessment & exit verified',
      'Digital instrument cluster & Multibeam LEDs tested'
    ),
  },
  {
    id: 'toyota-camry-xse',
    refCode: 'AAW-CAMRY-23',
    year: 2023,
    make: 'Toyota',
    model: 'Camry XSE',
    trim: 'V6 Two-Tone Sport',
    category: 'Executive Sedans',
    origin: 'Direct Tokunbo',
    priceNaira: '₦42,000,000',
    priceValueNaira: 42000000,
    mileage: '14,600 mi',
    engine: '3.5L V6 · 301 hp',
    transmission: '8-Speed Direct Shift',
    drivetrain: 'Front-Wheel Drive',
    exteriorColor: 'Celestial Silver / Black Roof',
    interiorColor: 'Cockpit Red Perforated',
    paintHex: '#A1A1AA',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'JBL 9-speaker package, panoramic glass roof, head-up display, and original factory Michelin tires on 19-inch gloss black alloys.',
    silhouette: 'sport-sedan',
    imageUrl: '/images/cars/toyota-camry-xse.jpg',
    hotspots: createHotspots(
      '110 µm Celestial Silver & gloss black factory roof',
      '3.5L V6 & 8-speed shift telemetry 100% fault-free',
      'Full customs clearance & clean US title verified',
      'Cockpit Red leather, JBL audio & Michelin tires'
    ),
  },
  {
    id: 'toyota-land-cruiser-300',
    refCode: 'AAW-LC300-22',
    year: 2022,
    make: 'Toyota',
    model: 'Land Cruiser 300',
    trim: 'ZX Twin-Turbo V6',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦165,000,000',
    priceValueNaira: 165000000,
    mileage: '11,200 mi',
    engine: '3.5L Twin-Turbo V6 · 409 hp',
    transmission: '10-Speed Direct Shift AT',
    drivetrain: 'Full-Time 4WD',
    exteriorColor: 'Precious White Pearl',
    interiorColor: 'Black & Dark Red Leather',
    paintHex: '#E4E4E7',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      'Fingerprint push-start, rear entertainment screens, multi-terrain monitor, and verified Nigeria Customs assessment papers.',
    silhouette: 'boxy-4x4',
    imageUrl: '/images/cars/toyota-land-cruiser.png',
    hotspots: createHotspots(
      '117 µm Precious White Pearl · zero repaint',
      '3.5L Twin-Turbo V6 & 10-speed AT verified clean',
      'Full Nigeria Customs duty & port release matched',
      'Fingerprint start, rear screens & JBL 14-speaker'
    ),
  },
  {
    id: 'toyota-highlander',
    refCode: 'AAW-HIGH-22',
    year: 2022,
    make: 'Toyota',
    model: 'Highlander',
    trim: 'Platinum AWD 3-Row',
    category: 'Luxury SUVs',
    origin: 'Direct Tokunbo',
    priceNaira: '₦64,000,000',
    priceValueNaira: 64000000,
    mileage: '22,700 mi',
    engine: '3.5L V6 · 295 hp',
    transmission: '8-Speed Automatic',
    drivetrain: 'Torque-Vectoring AWD',
    exteriorColor: 'Magnetic Grey Metallic',
    interiorColor: 'Glazed Caramel Leather',
    paintHex: '#52525B',
    lotStatus: 'In Abuja Lot',
    dutyStatus: 'Duty Verified',
    inspectionNote:
      '12.3-inch widescreen display, bird’s-eye view camera, heated/ventilated seats, and clean customs clearance ready for Abuja inspection.',
    silhouette: 'crossover-suv',
    imageUrl: '/images/cars/toyota-highlander.jpg',
    hotspots: createHotspots(
      '111 µm Magnetic Grey original factory panels',
      '3.5L V6 & torque-vectoring AWD diagnostic clean',
      'Verified Tin Can customs clearance & VIN notice',
      'Glazed Caramel leather + 12.3-inch widescreen NAV'
    ),
  },
];

export interface TrustStat {
  metric: string;
  label: string;
  detail: string;
}

export const TRUST_STATS: TrustStat[] = [
  {
    metric: '100%',
    label: 'Duty Verified',
    detail: 'Every tokunbo unit ships with verifiable Nigeria Customs Service C-Number & port release.',
  },
  {
    metric: 'SAME-DAY',
    label: 'Lot Inspection',
    detail: 'Walk in on Ahmadu Bello Way with your mechanic and diagnostic scanner before paying.',
  },
  {
    metric: '36 STATES',
    label: 'Waybill',
    detail: 'Insured flatbed or enclosed carrier dispatch from Central Area Abuja to any state.',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'inspection',
    question: 'Can I bring my mechanic and OBD-II scanner to Ahmadu Bello Way?',
    answer:
      'Yes. Physical transparency is central to how we operate. Every vehicle parked at our Central Area, Abuja lot is open for paint-depth checks, computer diagnostics, suspension inspection, and a supervised test drive before any commitment is made.',
  },
  {
    id: 'customs',
    question: 'How do you verify Nigerian Customs duty and clearance papers?',
    answer:
      'We provide original Nigeria Customs Service assessment notices, e-customs exit documentation, and VIN-matched Bill of Lading records. Buyers are welcome to run independent verification against the VIN and C-Number prior to bank transfer.',
  },
  {
    id: 'trade-in',
    question: 'How does a Car Swap or Trade-In work in Abuja?',
    answer:
      'Submit your current vehicle model, year, and condition notes through our Trade-In desk above or via WhatsApp. We give an initial valuation range, inspect your vehicle in person on Ahmadu Bello Way, and deduct its agreed value directly from your next car.',
  },
  {
    id: 'sourcing',
    question: 'Do you source specific trims or models not currently on the lot?',
    answer:
      'Yes. Through our direct US, Canadian, and European buying channels, we source exact specs (color, trim, mileage ceiling) on order, handle shipping, full customs clearing, and hand over the vehicle ready in Abuja.',
  },
];
