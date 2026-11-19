export interface BuyerReview {
  id: string;
  buyerName: string;
  buyerRole: string;
  location: string;
  vehiclePurchased: string;
  serviceType: 'Physical Inspection' | 'Trade-In / Swap' | 'Direct Tokunbo' | 'Nationwide Waybill';
  rating: number;
  dateLabel: string;
  quote: string;
}

export const SAMPLE_REVIEWS: BuyerReview[] = [
  {
    id: 'rev-1',
    buyerName: 'Ibrahim Musa D.',
    buyerRole: 'Private Buyer',
    location: 'Maitama, Abuja',
    vehiclePurchased: '2022 Lexus RX 350 F-Sport',
    serviceType: 'Physical Inspection',
    rating: 5,
    dateLabel: 'October 2026',
    quote:
      'Brought my diagnostic technician straight to Ahmadu Bello Way with an OBD-II scanner and paint-depth gauge. Every panel read original factory thickness and the Nigeria Customs C-Number verified cleanly before we transferred.',
  },
  {
    id: 'rev-2',
    buyerName: 'Chidinma Okafor',
    buyerRole: 'Corporate Fleet Lead',
    location: 'Wuse II, Abuja',
    vehiclePurchased: '2022 Toyota Land Cruiser Prado TX-L',
    serviceType: 'Trade-In / Swap',
    rating: 5,
    dateLabel: 'September 2026',
    quote:
      'Swapped two company SUVs into a clean-title Prado without wasting weeks on classified calls. Their Central Area team completed the physical appraisal in under an hour and gave a fair, transparent top-up figure.',
  },
  {
    id: 'rev-3',
    buyerName: 'Engr. Tunde Adeyemi',
    buyerRole: 'Principal Consultant',
    location: 'Victoria Island, Lagos',
    vehiclePurchased: '2021 Mercedes-Benz GLE 450 4MATIC',
    serviceType: 'Nationwide Waybill',
    rating: 5,
    dateLabel: 'August 2026',
    quote:
      'Handled the entire inspection over live WhatsApp video walkaround from Lagos, verified the VIN and port exit papers, and received the GLE via enclosed flatbed delivery in 48 hours exactly as shown.',
  },
  {
    id: 'rev-4',
    buyerName: 'Sadiq Bello K.',
    buyerRole: 'Legal Practitioner',
    location: 'Asokoro, Abuja',
    vehiclePurchased: '2021 Mercedes-Benz C300 AMG Line',
    serviceType: 'Direct Tokunbo',
    rating: 5,
    dateLabel: 'July 2026',
    quote:
      'Zero broker run-around or inflated lot markup. The mileage on the cluster matched the US Carfax history, both original keys were handed over, and the deal desk stayed responsive from first WhatsApp message to registration.',
  },
  {
    id: 'rev-5',
    buyerName: 'Dr. Amaka Nwosu',
    buyerRole: 'Medical Director',
    location: 'Garki, Abuja',
    vehiclePurchased: '2023 Toyota Camry XSE V6',
    serviceType: 'Physical Inspection',
    rating: 5,
    dateLabel: 'June 2026',
    quote:
      'Cleanest interior and underbody I inspected in Abuja after checking four different lots. Having the full customs duty folder ready on the desk saved days of back-and-forth.',
  },
  {
    id: 'rev-6',
    buyerName: 'Kabiru Danjuma',
    buyerRole: 'Energy Executive',
    location: 'GRA, Port Harcourt',
    vehiclePurchased: '2021 Lexus GX 460 Luxury',
    serviceType: 'Nationwide Waybill',
    rating: 5,
    dateLabel: 'May 2026',
    quote:
      'My Abuja representative inspected the GX 460 on Ahmadu Bello Way at 10 AM and we settled by afternoon. Waybill dispatch to Port Harcourt arrived intact with all original customs clearance documents.',
  },
];
