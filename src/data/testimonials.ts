import { Testimonial } from '../types';

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    authorName: 'Hendra Setiawan',
    authorRole: 'HR Division Head - PT Telkom Indonesia',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    category: 'Outbound Kantor',
    destinationName: 'Corporate Outbound Gathering Bandung (85 Pax)',
    rating: 5,
    date: '14 Juni 2026',
    comment: 'Luar biasa! Acara tahunan gathering kantor kami berjalan sangat sukses dan tepat waktu. Fasilitator gamenya sangat energik, jeep offroadnya memicu adrenalin, dan gala dinner malamnya berkesan sekali bagi seluruh karyawan. Tim Nusantara Explorer highly recommended!',
    photoProofUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    isVerified: true
  },
  {
    id: 'testi-2',
    authorName: 'dr. Ratna Pertiwi & Keluarga',
    authorRole: 'Family Trip (7 Anggota Keluarga)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    category: 'Family Holiday',
    destinationName: 'Bali Family Paradise & Ubud Villa',
    rating: 5,
    date: '28 Mei 2026',
    comment: 'Kami membawa anak-anak dan orang tua yang sudah sepuh. Driver Mas Ketut sangat sabar, mobil HiAce sangat bersih dan dingin. Anak-anak sangat gembira di Bali Safari dan makan malam seafood Jimbaran sunsetnya romantis. Pasti akan pesan lagi untuk liburan berikutnya!',
    photoProofUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    isVerified: true
  },
  {
    id: 'testi-3',
    authorName: 'Bagas & Anisa',
    authorRole: 'Private Honeymoon Trip',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    category: 'Private Trip',
    destinationName: 'Sailing Phinisi VIP Labuan Bajo',
    rating: 5,
    date: '02 Juli 2026',
    comment: 'Pengalaman honeymoon yang tak terlupakan! Menginap di kapal Phinisi dengan pelayanan kelas bintang lima. Makanan chefnya enak-enak banget, spot foto dronenya estetik luar biasa, dan bisa berenang sama Manta Ray. Terima kasih tim tour leader yang melayani dengan tulus.',
    photoProofUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    isVerified: true
  },
  {
    id: 'testi-4',
    authorName: 'Rizky Firmansyah',
    authorRole: 'Solo Traveler - Open Trip',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    category: 'Open Trip',
    destinationName: 'Bromo Sunrise & Malang Heritage',
    rating: 5,
    date: '10 Juli 2026',
    comment: 'Meskipun berangkat sendiri, di Open Trip ini dapat teman-teman baru yang sangat asyik! Tour leadernya pro banget ngarahin gaya pas di Pasir Berbisik Bromo. Jeepnya datang tepat waktu. Worth every penny!',
    isVerified: true
  }
];
