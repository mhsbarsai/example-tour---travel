import { TourPackage } from '../types';

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-labuan-bajo-phinisi',
    title: 'Sailing Phinisi VIP Komodo & Island Hopping',
    subtitle: 'Sensasi Menginap di Kapal Phinisi Mewah Mengelilingi Taman Nasional Komodo',
    category: 'Private Trip',
    location: 'Labuan Bajo, Nusa Tenggara Timur',
    duration: '3 Hari 2 Malam',
    durationDays: 3,
    minPax: 2,
    pricePerPax: 4250000,
    originalPricePerPax: 4800000,
    rating: 4.95,
    reviewCount: 142,
    featuredImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589553460732-58ef7a71fbb5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nikmati keindahan gugusan pulau komodo secara privat bersama pasangan atau keluarga di atas kapal Phinisi ber-AC dengan fasilitas full-board, chef pribadi, dan pemandu penyelam berpengalaman.',
    highlights: [
      'Trekking Sunrise di Pulau Padar dengan pemandangan 3 pantai spektakuler',
      'Berjumpa langsung Komodo di Pulau Rinca / Komodo dengan Ranger resmi',
      'Snorkeling bersama Manta Ray di Manta Point & Coral Garden',
      'Bersantai di Pink Beach yang magis & unik',
      'Sunset romantic dinner di deck kapal Phinisi'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Penjemputan Bandara - Pulau Kelor - Pulau Rinca - Kalong Island',
        description: 'Tiba di Bandara Komodo, penjemputan VIP ke Pelabuhan. Boarding Kapal Phinisi, makan siang disajikan chef. Trekking ringan Pulau Kelor untuk view foto panoramik. Lanjut ke Pulau Rinca melihat hewan Komodo. Sore hari menyaksikan ribuan kelelawar Kalong terbang saat sunset.',
        meals: 'Makan Siang, Makan Malam'
      },
      {
        day: 2,
        title: 'Pulau Padar Sunrise - Pink Beach - Manta Point - Taka Makassar',
        description: 'Morning trekking jam 05.00 ke puncak Pulau Padar menikmati sunrise. Sarapan di deck kapal. Mengunjungi Pink Beach untuk snorkeling & foto estetik. Lanjut snorkeling bersama Manta Ray di Manta Point dan bersantai di pulau pasir timbul Taka Makassar.',
        meals: 'Sarapan, Makan Siang, Makan Malam'
      },
      {
        day: 3,
        title: 'Kanawa Island - Souvenir Centre - Drop Bandara',
        description: 'Sarapan di kapal, nikmati keindahan terumbu karang Kanawa Island. Kembali ke darat Labuan Bajo, belanja oleh-oleh khas NTT, lalu antar menuju Bandara Komodo.',
        meals: 'Sarapan, Makan Siang'
      }
    ],
    includes: [
      'Sewa Kapal Phinisi AC Private/Semi-Private',
      'Kabin AC dengan kamar mandi dalam & perlengkapan mandi',
      'Makan 3x sehari racikan Chef Lokal + Free Flow Kopi/Teh/Mineral',
      'Alat Snorkeling Lengkap & Pelampung Safety',
      'Tour Guide & Dokumentasi Kamera DSLR + GoPro',
      'Penjemputan & Pengantaran Bandara Komodo'
    ],
    excludes: [
      'Tiket Pesawat menuju/dari Labuan Bajo',
      'Tiket Masuk TN Komodo & Ranger Fee',
      'Pengeluaran pribadi & Tipping crew/guide'
    ],
    popularAddons: ['Dokumentasi Drone 4K', 'Makan Malam Seafood VIP D’Kala Bajo', 'Upgrade Kabin Master Suite'],
    isPopular: true
  },
  {
    id: 'pkg-family-bali-ubud-beach',
    title: 'Bali Family Paradise & Cultural Safari',
    subtitle: 'Liburan Keluarga Seru & Nyaman Meliputi Ubud, Kintamani, & Sunset Seminyak',
    category: 'Family Holiday',
    location: 'Bali (Ubud, Kintamani, Nusa Dua)',
    duration: '4 Hari 3 Malam',
    durationDays: 4,
    minPax: 4,
    pricePerPax: 2850000,
    originalPricePerPax: 3200000,
    rating: 4.90,
    reviewCount: 218,
    featuredImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Paket dirancang khusus untuk kenyamanan anak-anak dan orang tua. Menampilkan perpaduan wisata alam Ubud yang segar, interaksi hewan di Bali Safari, kebudayaan khas Bali, dan kuliner pantai Jimbaran.',
    highlights: [
      'Penginapan Villa Keluarga Private Pool di Ubud & Resort Pantai',
      'Tiket Masuk Bali Safari & Marine Park (Safari Journey)',
      'Makan Siang View Gunung Batur Kintamani',
      'Ayunan Hutan Rice Terrace Tegallalang',
      'Seafood Sunset Dinner Pantai Jimbaran'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Penjemputan Bandara Ngurah Rai - Check-in Villa Ubud - Dinner',
        description: 'Penyambutan ramah dengan kalungan bunga khas Bali. Antar menuju Villa Private Pool di Ubud. Istirahat sejenak, malam hari makan malam di Bebek Tepi Sawah Ubud.',
        meals: 'Makan Malam'
      },
      {
        day: 2,
        title: 'Tegallalang Rice Terrace - Kintamani Volcano - Alas Harak Coffee Plantation',
        description: 'Jalan santai mengelilingi sawah berundak Tegallalang. Santap makan siang bufet di Kintamani berlatar pemandangan Gunung dan Danau Batur. Dilanjutkan cicipi kopi luwak khas Bali.',
        meals: 'Sarapan, Makan Siang, Makan Malam'
      },
      {
        day: 3,
        title: 'Bali Safari & Marine Park - Pura Tanah Lot - Sunset Jimbaran',
        description: 'Pengalaman seru berkeliling naik bus safari melihat hewan eksotis dunia. Lanjut ke Pura Tanah Lot yang ikonik. Ditutup candle-light dinner seafood segar di pinggir Pantai Jimbaran.',
        meals: 'Sarapan, Makan Siang, Makan Malam'
      },
      {
        day: 4,
        title: 'Belanja Souvenir Krisna - Drop Bandara',
        description: 'Sarapan pagi, waktu luang berenang di villa. Check-out dan belanja oleh-oleh pie susu & pie kelapa khas Bali di Krisna Oleh-Oleh. Pengantaran ke Bandara.',
        meals: 'Sarapan'
      }
    ],
    includes: [
      'Mobil Private HiAce / Innova AC + Driver Ramah & BBM',
      'Akomodasi 2 Malam Villa Ubud + 1 Malam Resort Seminyak',
      'Tiket Masuk Seluruh Objek Wisata & Bali Safari',
      'Makan Sesuai Program Termasuk Seafood Jimbaran',
      'Fotografer Keluarga & Banner Sambutan Trip'
    ],
    excludes: [
      'Tiket Pesawat PP Bali',
      'Pengeluaran Pribadi & Wahana Tambahan Outside Package'
    ],
    popularAddons: ['Rafting Sungai Ayung Ubud', 'Sewa Pakaian Adat Bali untuk Foto Keluarga', 'Sewa Stroller / Car Seat Anak'],
    isPopular: true
  },
  {
    id: 'pkg-corporate-outbound-bandung',
    title: 'Corporate Outbound Gathering & Team Building Bandung',
    subtitle: 'Program Capacity Building & Teambuilding Seru untuk Karyawan Perusahaan',
    category: 'Outbound Kantor',
    location: 'Lembang & Cikole, Bandung, Jawa Barat',
    duration: '2 Hari 1 Malam',
    durationDays: 2,
    minPax: 20,
    pricePerPax: 1450000,
    originalPricePerPax: 1750000,
    rating: 4.98,
    reviewCount: 89,
    featuredImage: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Solusi lengkap kegiatan gathering kantor, employee bonding, dan outbound training berlatar sejuk hutan pinus Cikole Lembang. Dipandu master game berpengalaman dengan game fun & penuh makna kerja sama.',
    highlights: [
      'Fun Games & Fun Team Building Games dengan Master Facilitator',
      'Offroad Jeep Land Rover Lembang menyusuri trek berlumpur',
      'Gala Dinner Malam Kebersamaan + Barbeque & Live Music / Akustik',
      'Flying Fox & Paintball War Game di Hutan Pinus',
      'Akomodasi Hotel / Resort Konferensi Bintang 4'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Penjemputan - Welcome Drink - Fun Games Team Building - Gala Dinner',
        description: 'Penjemputan bus pariwisata di Jakarta/Bandung. Tiba di lokasi outbound Cikole, welcome drink & snack. Sesi Fun Ice Breaking & Teambuilding Games. Check-in hotel. Malam hari Gala Dinner Perusahaan, pembagian doorprize, live musik, dan kembang api.',
        meals: 'Snack, Makan Siang, Makan Malam BBQ'
      },
      {
        day: 2,
        title: 'Offroad Jeep Adventure - Belanja Kartika Sari - Kembali ke Jakarta',
        description: 'Sarapan pagi. Petualangan ekstrem Jeep Land Rover menyusuri hutan pinus & Sukawana. Makan siang Sunda tradisional. Belanja buah tangan di Kartika Sari / Primarasa, lalu perjalanan kembali ke lokasi asal.',
        meals: 'Sarapan, Makan Siang'
      }
    ],
    includes: [
      'Bus Pariwisata Executive AC Premium (Jakarta - Bandung PP)',
      'Menginap 1 Malam Hotel Bintang 4 / Resort Lembang',
      'Master Facilitator, Facilitator Assistant & Paramedis',
      'Peralatan Games Outbound & Sound System Outdoor',
      'Jeep Offroad Land Rover + Driver Experienced',
      'Gala Dinner + Sound System + Live Acoustic Band',
      'Kaos Outbound Custom Logo Perusahaan & Spanduk Banner'
    ],
    excludes: [
      'Hadiah Doorprize Internal',
      'Pengeluaran Pribadi Karyawan'
    ],
    popularAddons: ['Paintball Battle Game', 'Rafting Palayangan Pangalengan', 'Dokumentasi Video Cinematic Highlight & Videografer Drone'],
    isPopular: true
  },
  {
    id: 'pkg-open-trip-bromo-malang',
    title: 'Exotic Bromo Sunrise & Malang Heritage Experience',
    subtitle: 'Jelajah Negeri Di Atas Awan, Pasir Berbisik, & Kota Bunga Malang',
    category: 'Open Trip',
    location: 'Probolinggo, Bromo, & Malang, Jawa Timur',
    duration: '3 Hari 2 Malam',
    durationDays: 3,
    minPax: 1,
    pricePerPax: 1350000,
    originalPricePerPax: 1600000,
    rating: 4.88,
    reviewCount: 310,
    featuredImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609863530660-1282643a6d71?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Terbuka untuk siapa saja! Pilihan tepat bagi solo traveler, pasangan, atau grup kecil yang ingin menikmati pesona Gunung Bromo tanpa mahal. Bergabung dengan wisatawan menyenangkan dari berbagai daerah.',
    highlights: [
      'Hunting Golden Sunrise dari Penanjakan 1 / King Kong Hill',
      'Naik Jeep 4x4 menyusuri Lautan Pasir Berbisik & Kawah Bromo',
      'Spot Foto Bukit Teletubbies / Padang Savana Bromo',
      'Petik Apel Sepuasnya langsung di Perkebunan Batu Malang',
      'Wisata Kuliner Bakso Presiden & Kampung Warna-Warni Jidi'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Meeting Point Stasiun / Bandara Malang/Surabaya - Transit Rest Area',
        description: 'Penjemputan di Stasiun Malang / Surabaya jam 22.00 WIB. Perjalanan darat menuju area transit Bromo di Sukapura / Tosari.',
        meals: 'Snack Malam'
      },
      {
        day: 2,
        title: 'Bromo Midnight Tour - Kawah - Lautan Pasir - Batu Malang',
        description: 'Pukul 03.00 naik Jeep 4x4 menuju Sunrise Point. Saksikan panorama kawah Bromo berlatar Gunung Semeru. Eksplorasi Kawah Bromo, Pura Luhur Poten, Pasir Berbisik, dan Bukit Teletubbies. Siang hari perjalanan menuju hotel Batu Malang untuk istirahat & kuliner malam.',
        meals: 'Makan Pagi, Makan Siang, Makan Malam'
      },
      {
        day: 3,
        title: 'Petik Apel Malang - Pusat Oleh-Oleh - Drop Stasiun/Bandara',
        description: 'Sarapan di hotel. Pengalaman memetik apel segar langsung dari pohonnya. Belanja oleh-oleh strudel & keripik buah khas Malang, pengantaran ke titik akhir.',
        meals: 'Sarapan, Makan Siang'
      }
    ],
    includes: [
      'Transportasi AC dari Meeting Point Malang / Surabaya',
      'Sewa Jeep 4x4 Bromo Berpengalaman',
      'Akomodasi 1 Malam Hotel Bintang 3 Batu Malang',
      'Tiket Masuk Bromo & Agrowisata Petik Apel',
      'Tour Leader Friendly & Dokumentasi Foto Group'
    ],
    excludes: [
      'Sewa Kuda di Bromo (Opsional)',
      'Pengeluaran Pribadi'
    ],
    popularAddons: ['Sewa Jaket Tebal Bromo', 'Dokumentasi Foto Professional DSLR', 'Upgrade Kamar Hotel Private Single'],
    isPopular: true
  },
  {
    id: 'pkg-jogja-heritage-adventure',
    title: 'Wonderful Jogja Culture, Lava Tour & Beach Rafting',
    subtitle: 'Nostalgia Jogja dengan Perpaduan Candi Megah, Merapi Jeep, & Cave Tubing',
    category: 'Family Holiday',
    location: 'Yogyakarta & Magelang',
    duration: '3 Hari 2 Malam',
    durationDays: 3,
    minPax: 3,
    pricePerPax: 2150000,
    originalPricePerPax: 2450000,
    rating: 4.92,
    reviewCount: 176,
    featuredImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609863530660-1282643a6d71?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Menyusuri keindahan Kota Istimewa Yogyakarta. Mulai dari keajaiban Candi Borobudur/Prambanan, petualangan Jeep Lava Tour Merapi, hingga petualangan menyusuri sungai bawah tanah Gua Pindul.',
    highlights: [
      'Kunjungan Candi Prambanan & Sunset Ratu Boko',
      'Jeep Lava Tour Gunung Merapi (Museum Sisa Harta & Bunker Kaliadem)',
      'Cave Tubing Menyusuri Sungai Bawah Tanah Gua Pindul',
      'Sunset Santai Pantai Timang / Pantai Pengilon',
      'Wisata Kuliner Gudeg Yu Djum & Makan Malam Raminten'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Penjemputan Stasiun/Bandara YIA - Keraton - Tamansari - Prambanan',
        description: 'Penjemputan oleh tim guide. Mengunjungi Istana Keraton Yogyakarta & Tamansari Water Castle. Makan siang kuliner Gudeg legendaris. Sore hari menikmati keindahan Candi Prambanan.',
        meals: 'Makan Siang, Makan Malam'
      },
      {
        day: 2,
        title: 'Lava Tour Merapi - Cave Tubing Gua Pindul - Sunset Obelix Hills',
        description: 'Sarapan pagi. Petualangan seru naik Jeep terbuka menelusuri jejak eropsi Merapi. Lanjut ke Gunungkidul untuk cave tubing Gua Pindul. Menutup hari dengan pemandangan pemandangan kota Jogja dari Obelix Hills.',
        meals: 'Sarapan, Makan Siang, Makan Malam'
      },
      {
        day: 3,
        title: 'Belanja Malioboro & Bakpia Pathok - Pengantaran',
        description: 'Sarapan dan check-out. Berbelanja pernak-pernik khas Malioboro dan Bakpia Pathok hangat langsung dari pabriknya. Pengantaran ke Stasiun Tugu / Bandara YIA.',
        meals: 'Sarapan, Makan Siang'
      }
    ],
    includes: [
      'Mobil Private AC + Driver & BBM',
      'Akomodasi Hotel Bintang 4 di Pusat Kota Jogja (Malioboro area)',
      'Jeep Merapi + Peralatan Safety Cave Tubing Gua Pindul',
      'Tiket Masuk Seluruh Destinasi Wisata',
      'Makan Sesuai Program & Pemandu Wisata'
    ],
    excludes: [
      'Tiket Kereta Api / Pesawat ke Jogja',
      'Pengeluaran Pribadi'
    ],
    popularAddons: ['Sewa Sepeda Ontel Kotagede', 'Pertunjukan Sendratari Ramayana Prambanan', 'Gondola Pantai Timang'],
    isPopular: false
  },
  {
    id: 'pkg-raja-ampat-luxury',
    title: 'Raja Ampat Ultimate Marine & Wayag Expedition',
    subtitle: 'Menjelajahi Surga Tersembunyi Dunia dengan Karst Mewah & Kehidupan Laut Menakjubkan',
    category: 'Private Trip',
    location: 'Sorong & Raja Ampat, Papua Barat',
    duration: '5 Hari 4 Malam',
    durationDays: 5,
    minPax: 2,
    pricePerPax: 8900000,
    originalPricePerPax: 9800000,
    rating: 4.99,
    reviewCount: 64,
    featuredImage: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Petualangan sekali seumur hidup menuju kepulauan karst tercantik di planet bumi. Menginap di Water Villa eksklusif berlatar laut biru jernih kristal.',
    highlights: [
      'Pendakian Puncak Bukit Karst Wayag & Piaynemo yang Ikonik',
      'Berenang Bersama Hiu Jinak di Pantai Yeben & Arborek',
      'Snorkeling di Cape Kri dengan keanekaragaman hayati laut tertinggi',
      'Menginap di Eco Resort Water Bungalow di atas laut',
      'Melihat Burung Cendrawasih Menari di Hutan Waisai'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Sorong - Kapal Cepat Waisai - Check-in Water Resort',
        description: 'Tiba di Bandara Deo Sorong pagi hari. Penjemputan ke Pelabuhan Sorong, naik VIP Express Bahari menuju Waisai Raja Ampat. Check-in Resort Overwater, santai menikmati laguna.',
        meals: 'Makan Siang, Makan Malam'
      },
      {
        day: 2,
        title: 'Eksplorasi Piaynemo - Telaga Bintang - Desa Arborek',
        description: 'Trekking ke puncak Piaynemo menikmati pemandangan gugusan pulau karst. Lanjut ke Telaga Bintang (laguna berbentuk bintang alami). Berkeliling Desa Wisata Arborek & snorkeling bersama ikan ramah.',
        meals: 'Sarapan, Makan Siang, Makan Malam'
      },
      {
        day: 3,
        title: 'Wayag Expedition - Ikon Raja Ampat - Hiu Yeben',
        description: 'Keberangkatan pagi menuju kepulauan Wayag. Pendakian Puncak Wayag 1 & 2. Nikmati pantai pasir putih bersih dan berenang bersama anak hiu di pesisir.',
        meals: 'Sarapan, Makan Siang, Makan Malam'
      },
      {
        day: 4,
        title: 'Pasir Timbul - Cape Kri - Sawinggrai - Kembali ke Sorong',
        description: 'Singgah di pulau pasir timbul di tengah laut, dilanjutkan snorkeling spektakuler Cape Kri. Sore hari naik kapal cepat kembali ke Sorong, check-in hotel Sorong.',
        meals: 'Sarapan, Makan Siang, Makan Malam'
      },
      {
        day: 5,
        title: 'Drop Bandara Deo Sorong',
        description: 'Sarapan pagi di hotel, persiapan check-out dan antar menuju Bandara Sorong.',
        meals: 'Sarapan'
      }
    ],
    includes: [
      'Kapal Cepat Speedboat Private / VIP Ferry',
      'Menginap 3 Malam Water Resort Raja Ampat + 1 Malam Hotel Sorong',
      'PIN Kartu Jasa Lingkungan Raja Ampat (KJL)',
      'Makan Fullboard Fresh Seafood & Chef Local',
      'Peralatan Snorkeling Lengkap + Guide Penyelam',
      'Dokumentasi Kamera Under Water GoPro & Drone'
    ],
    excludes: [
      'Tiket Pesawat menuju/dari Sorong (SOQ)',
      'Pengeluaran Pribadi'
    ],
    popularAddons: ['Sewa Alat Diving Complete set + Dive Master', 'Upgrade Overwater Suite Villa'],
    isPopular: false
  }
];
