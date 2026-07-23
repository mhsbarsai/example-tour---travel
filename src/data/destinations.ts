import { DestinationPhoto } from '../types';

export const DESTINATION_PHOTOS: DestinationPhoto[] = [
  {
    id: 'dest-padar-island',
    title: 'Pulau Padar - Taman Nasional Komodo',
    location: 'Manggarai Barat, Nusa Tenggara Timur',
    category: 'Gunung & Alam',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    description: 'Pemandangan spektakuler dari puncak bukit Pulau Padar yang memperlihatkan tiga lekukan teluk dengan pasir tiga warna berbeda: putih, merah muda, dan hitam.',
    bestSeason: 'April - November',
    recommendedTripType: ['Private Trip', 'Family Holiday'],
    rating: 4.97,
    likes: 852
  },
  {
    id: 'dest-pink-beach',
    title: 'Pink Beach Komodo',
    location: 'Labuan Bajo, NTT',
    category: 'Pantai & Bahari',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Salah satu dari sedikit pantai berpasir merah muda alami di dunia, dibentuk oleh hancuran serpihan karang merah Organ Pipe Coral.',
    bestSeason: 'Mei - Oktober',
    recommendedTripType: ['Private Trip', 'Open Trip'],
    rating: 4.95,
    likes: 640
  },
  {
    id: 'dest-ubud-rice-terrace',
    title: 'Tegallalang Rice Terrace Ubud',
    location: 'Gianyar, Bali',
    category: 'Gunung & Alam',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Hamparan sawah berundak hijau nan asri dengan sistem irigasi kuno Subak khas Bali yang diakui UNESCO sebagai Warisan Budaya Dunia.',
    bestSeason: 'Maret - September',
    recommendedTripType: ['Family Holiday', 'Private Trip'],
    rating: 4.90,
    likes: 920
  },
  {
    id: 'dest-tanah-lot',
    title: 'Pura Tanah Lot Bali',
    location: 'Tabanan, Bali',
    category: 'Budaya & Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80',
    description: 'Pura laut megah yang berdiri di atas bongkahan batu karang besar di tengah samudera. Tempat terbaik menyaksikan sunset paling romantis di Bali.',
    bestSeason: 'Sepanjang Tahun',
    recommendedTripType: ['Family Holiday', 'Private Trip'],
    rating: 4.88,
    likes: 780
  },
  {
    id: 'dest-cikole-outbound',
    title: 'Hutan Pinus Cikole Lembang',
    location: 'Bandung, Jawa Barat',
    category: 'Outbound & Teambuilding',
    imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    description: 'Kawasan hutan pinus rindang dengan udara sejuk pegunungan Lembang. Arena ideal untuk outbound training, offroad jeep, dan gathering perusahaan.',
    bestSeason: 'Mei - Desember',
    recommendedTripType: ['Outbound Kantor', 'Family Holiday'],
    rating: 4.93,
    likes: 512
  },
  {
    id: 'dest-bromo-sunrise',
    title: 'Sunrise Mount Bromo & Sea of Sand',
    location: 'Probolinggo, Jawa Timur',
    category: 'Gunung & Alam',
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    description: 'Keindahan alam kawah gunung berapi aktif Bromo yang dikelilingi hamparan lautan pasir berbisik dan bukit savana Teletubbies.',
    bestSeason: 'Mei - Oktober',
    recommendedTripType: ['Open Trip', 'Private Trip'],
    rating: 4.96,
    likes: 1240
  },
  {
    id: 'dest-piaynemo-raja-ampat',
    title: 'Piaynemo Karst Islands',
    location: 'Raja Ampat, Papua Barat',
    category: 'Luxury & Resort',
    imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    description: 'Gugusan pulau karang kecil berlatar air laut jernih pirus di Raja Ampat. Ikon keindahan bahari tertinggi di Indonesia.',
    bestSeason: 'Oktober - April',
    recommendedTripType: ['Private Trip', 'Luxury & Resort' as any],
    rating: 4.99,
    likes: 1450
  },
  {
    id: 'dest-prambanan-temple',
    title: 'Candi Prambanan & Ratu Boko',
    location: 'Sleman, DI Yogyakarta',
    category: 'Budaya & Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    description: 'Candi Hindu terbesar di Indonesia berarsitektur tinggi nan indah, menyimpan kisah legenda Roro Jonggrang dan pertunjukan Sendratari Ramayana.',
    bestSeason: 'Sepanjang Tahun',
    recommendedTripType: ['Family Holiday', 'Outbound Kantor'],
    rating: 4.91,
    likes: 830
  }
];
