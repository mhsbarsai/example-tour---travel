export type TripCategory = 'Private Trip' | 'Family Holiday' | 'Outbound Kantor' | 'Open Trip';

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  category: TripCategory;
  location: string;
  duration: string; // e.g. "3 Hari 2 Malam"
  durationDays: number;
  minPax: number;
  pricePerPax: number;
  originalPricePerPax?: number;
  rating: number;
  reviewCount: number;
  featuredImage: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals?: string; // e.g. "Sarapan, Makan Siang, Makan Malam"
  }[];
  includes: string[];
  excludes: string[];
  popularAddons?: string[];
  isPopular?: boolean;
}

export interface DestinationPhoto {
  id: string;
  title: string;
  location: string;
  category: 'Pantai & Bahari' | 'Gunung & Alam' | 'Budaya & Heritage' | 'Outbound & Teambuilding' | 'Luxury & Resort';
  imageUrl: string;
  description: string;
  bestSeason: string;
  recommendedTripType: TripCategory[];
  rating: number;
  likes: number;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string; // e.g. "Family Traveler (6 Orang)" or "HR Manager PT Telkom Indonesia"
  avatarUrl: string;
  category: TripCategory;
  destinationName: string;
  rating: number;
  date: string;
  comment: string;
  photoProofUrl?: string;
  isVerified: boolean;
}

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
  priceType: 'per_pax' | 'per_group' | 'per_day';
  description: string;
  iconName: string;
}

export interface BookingData {
  id: string;
  bookingCode: string;
  packageId: string;
  packageTitle: string;
  category: TripCategory;
  startDate: string;
  durationDays: number;
  adultsCount: number;
  kidsCount: number;
  infantsCount: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  pickupLocation: string;
  specialRequests?: string;
  selectedAddons: {
    id: string;
    name: string;
    price: number;
    priceType: 'per_pax' | 'per_group' | 'per_day';
  }[];
  subtotal: number;
  addonTotal: number;
  discount: number;
  grandTotal: number;
  paymentMethod: 'whatsapp' | 'qris' | 'bank_transfer' | 'credit_card';
  status: 'Menunggu Pembayaran' | 'Terkonfirmasi' | 'Selesai';
  createdAt: string;
}

export interface AITripPlan {
  title: string;
  summary: string;
  highlights: string[];
  dayByDayItinerary: {
    day: number;
    title: string;
    activities: string;
  }[];
  estimatedPricePerPax: string;
  recommendedAddons: string[];
  tips: string;
}
