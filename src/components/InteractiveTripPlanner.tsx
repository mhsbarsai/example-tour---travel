import React from 'react';
import { Sliders, X, MapPin, Calendar, Users, DollarSign, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, MessageSquare, Check, Plus, Minus, Compass } from 'lucide-react';
import { TripCategory, TourPackage } from '../types';

interface InteractiveTripPlannerProps {
  onClose: () => void;
  onSelectPlanForBooking: (customPackage: TourPackage) => void;
}

export const InteractiveTripPlanner: React.FC<InteractiveTripPlannerProps> = ({
  onClose,
  onSelectPlanForBooking,
}) => {
  const [destination, setDestination] = React.useState('Bali & Labuan Bajo');
  const [category, setCategory] = React.useState<TripCategory>('Private Trip');
  const [durationDays, setDurationDays] = React.useState(3);
  const [pax, setPax] = React.useState(4);
  const [budgetLevel, setBudgetLevel] = React.useState<'Hemat' | 'Standard' | 'Luxury'>('Standard');
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([
    'Dokumentasi Foto & Drone',
    'Mobil AC Private Fleet'
  ]);

  const popularDestinations = [
    'Bali & Labuan Bajo',
    'Raja Ampat & Sorong',
    'Gunung Bromo & Malang',
    'Yogyakarta & Borobudur',
    'Bandung & Lembang',
    'Danau Toba & Samosir'
  ];

  const availableAddons = [
    { id: 'Dokumentasi Foto & Drone', label: '📸 Foto & Drone Pro', pricePerPax: 150000 },
    { id: 'Mobil AC Private Fleet', label: '🚘 Mobil Private Fleet', pricePerPax: 100000 },
    { id: 'Seafood & Gala Dinner', label: '🍽️ Seafood Gala Dinner', pricePerPax: 200000 },
    { id: 'Guide Lokal HPI', label: '🤠 Guide HPI Berlisensi', pricePerPax: 75000 },
    { id: 'Upgrade Hotel Bintang 5', label: '🏨 Resort Bintang 5 VIP', pricePerPax: 450000 },
    { id: 'Asuransi Perjalanan Ekstra', label: '🛡️ Asuransi Jiwa & Trip', pricePerPax: 50000 }
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Real-time calculation math
  const calculatePrice = () => {
    let basePricePerDay = 750000;
    if (budgetLevel === 'Hemat') basePricePerDay = 550000;
    if (budgetLevel === 'Luxury') basePricePerDay = 1450000;

    let multiplier = 1.0;
    if (category === 'Private Trip') multiplier = 1.2;
    if (category === 'Outbound Kantor') multiplier = 0.95;
    if (category === 'Open Trip') multiplier = 0.85;

    let addonTotalPerPax = selectedAddons.reduce((sum, addonId) => {
      const match = availableAddons.find((a) => a.id === addonId);
      return sum + (match ? match.pricePerPax : 0);
    }, 0);

    let pricePerPax = Math.round((basePricePerDay * durationDays * multiplier) + addonTotalPerPax);
    
    // Group discount
    let discountPercent = 0;
    if (pax >= 10) discountPercent = 0.15;
    else if (pax >= 5) discountPercent = 0.08;

    let finalPricePerPax = Math.round(pricePerPax * (1 - discountPercent));
    let grandTotal = finalPricePerPax * pax;

    return {
      finalPricePerPax,
      grandTotal,
      discountPercent,
    };
  };

  const { finalPricePerPax, grandTotal, discountPercent } = calculatePrice();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Dynamically generate day by day preview
  const generateDynamicItinerary = () => {
    const daysArr = [];
    const dest = destination || 'Destinasi Impian';
    for (let i = 1; i <= durationDays; i++) {
      if (i === 1) {
        daysArr.push({
          day: 1,
          title: `Penjemputan & Orientasi Wisata ${dest}`,
          description: `Penjemputan peserta di titik kumpul, check-in akomodasi pilihan, dilanjutkan dengan wisata kuliner khas dan penikmatan sunset di spot estetik.`,
          meals: 'Makan Siang & Makan Malam'
        });
      } else if (i === durationDays) {
        daysArr.push({
          day: durationDays,
          title: `Belanja Oleh-Oleh & Transfer Kembali`,
          description: `Sarapan di hotel, eksplorasi pusat kerajinan & pusat souvenir khas ${dest}, kumpul foto rombongan, dan pengantaran kembali ke bandara/stasiun.`,
          meals: 'Sarapan Pagi'
        });
      } else {
        daysArr.push({
          day: i,
          title: `Eksplorasi Objek Wisata Ikonik Hari ke-${i}`,
          description: `Kunjungan ke spot alam ikonik & cagar budaya di ${dest}, sesi foto eksklusif, santap siang khas lokal, serta aktivitas rekreasi interaktif bersama rombongan.`,
          meals: 'Sarapan, Makan Siang & Malam'
        });
      }
    }
    return daysArr;
  };

  const dynamicItinerary = generateDynamicItinerary();

  const handleCreateCustomPackage = () => {
    const customPkg: TourPackage = {
      id: `custom-interactive-${Date.now()}`,
      title: `Custom ${category}: ${destination}`,
      subtitle: `Rancangan trip interaktif kustom untuk ${pax} orang (${durationDays} Hari) kelas ${budgetLevel}.`,
      category,
      location: destination,
      duration: `${durationDays} Hari ${durationDays - 1} Malam`,
      durationDays,
      minPax: pax,
      pricePerPax: finalPricePerPax,
      rating: 5.0,
      reviewCount: 1,
      featuredImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80'
      ],
      description: `Paket wisata dirancang kustom secara interaktif sesuai permintaan dengan fasilitas ${selectedAddons.join(', ')}.`,
      highlights: [
        `Durasi Fleksibel ${durationDays} Hari`,
        `Kelas Akomodasi ${budgetLevel}`,
        ...selectedAddons
      ],
      itinerary: dynamicItinerary,
      includes: [
        `Akomodasi Hotel Standar ${budgetLevel}`,
        'Transportasi AC Private Dedicated Fleet',
        ' Driver & BBM Sesuai Rencana',
        ...selectedAddons
      ],
      excludes: ['Tiket Pesawat / Kereta Api Utama', 'Pengeluaran Pribadi di Luar Program'],
      popularAddons: selectedAddons,
    };

    onSelectPlanForBooking(customPkg);
    onClose();
  };

  const generateWhatsAppUrl = () => {
    const text = `Halo Nusantara Explorer! Saya baru saja menggunakan *Kustom Perencana Trip Interaktif* di website:
- Destinasi: ${destination}
- Kategori: ${category}
- Durasi: ${durationDays} Hari
- Jumlah Peserta: ${pax} Pax
- Kelas Budget: ${budgetLevel}
- Add-ons: ${selectedAddons.join(', ') || 'Tanpa Addons'}
- Estimasi Biaya / Pax: ${formatPrice(finalPricePerPax)}

Saya ingin diskusi lebih lanjut dan mengajukan penawaran resmi. Terimakasih!`;

    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-[#2D4F3F]/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#1A1A1A]">
        {/* Header Bar */}
        <div className="p-4 bg-[#2D4F3F] text-white border-b border-[#2D4F3F]/20 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#D4A373] font-bold border border-white/20">
              <Sliders className="w-5 h-5 text-[#D4A373]" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-title text-white flex items-center gap-2">
                <span>Perencana Trip Interaktif</span>
                <span className="px-2 py-0.5 rounded-full bg-[#D4A373] text-white text-[10px] font-extrabold uppercase tracking-widest">Instant</span>
              </h3>
              <p className="text-[11px] text-stone-200">Kustomisasi lokasi, durasi, jumlah rombongan, dan fasilitas secara langsung</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 bg-[#FAF9F6]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* 1. Destination Selection */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 shadow-sm">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4F3F] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4A373]" />
                  <span>Pilih Destinasi Wisata</span>
                </label>
                
                {/* Popular Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {popularDestinations.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => setDestination(dest)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        destination === dest
                          ? 'bg-[#2D4F3F] text-white font-bold shadow-sm'
                          : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>

                {/* Custom Input */}
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Atau ketik lokasi lain (contoh: Belitung, Sumba...)"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                />
              </div>

              {/* 2. Category & Budget Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Selector */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2.5 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4F3F]">
                    Kategori Perjalanan
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['Private Trip', 'Family Holiday', 'Outbound Kantor', 'Open Trip'] as TripCategory[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`p-2 rounded-lg text-center text-xs font-bold transition ${
                          category === cat
                            ? 'bg-[#2D4F3F] text-white shadow-sm'
                            : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Class */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2.5 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4F3F]">
                    Kelas Akomodasi
                  </label>
                  <div className="space-y-1.5">
                    {(['Hemat', 'Standard', 'Luxury'] as const).map((b) => (
                      <button
                        key={b}
                        onClick={() => setBudgetLevel(b)}
                        className={`w-full py-2 px-3 rounded-lg text-left text-xs font-bold flex items-center justify-between transition ${
                          budgetLevel === b
                            ? 'bg-[#D4A373] text-white shadow-sm'
                            : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        <span>{b === 'Hemat' ? '💚 Kelas Hemat' : b === 'Standard' ? '⭐ Standard & Nyaman' : '👑 Luxury VIP 5 Stars'}</span>
                        {budgetLevel === b && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Duration & Pax Counter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Duration */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center justify-between">
                    <span>Durasi Trip</span>
                    <span className="text-[#2D4F3F] font-extrabold">{durationDays} Hari ({durationDays - 1} Malam)</span>
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={durationDays}
                      onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)}
                      className="w-full accent-[#2D4F3F]"
                    />
                    <button
                      onClick={() => setDurationDays(durationDays + 1)}
                      className="p-2 rounded-lg bg-[#2D4F3F] text-white hover:bg-[#233f32] font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pax Count */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center justify-between">
                    <span>Jumlah Peserta</span>
                    <span className="text-[#2D4F3F] font-extrabold">{pax} Orang</span>
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setPax(Math.max(1, pax - 1))}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={pax}
                      onChange={(e) => setPax(parseInt(e.target.value) || 1)}
                      className="w-full accent-[#2D4F3F]"
                    />
                    <button
                      onClick={() => setPax(pax + 1)}
                      className="p-2 rounded-lg bg-[#2D4F3F] text-white hover:bg-[#233f32] font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Interactive Addons Selection */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 shadow-sm">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4F3F]">
                  Fasilitas &amp; Layanan Tambahan (Add-ons)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableAddons.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#2D4F3F]/10 border-[#2D4F3F] text-[#2D4F3F] font-bold'
                            : 'bg-[#FAF9F6] border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span>{addon.label}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-[#2D4F3F] border-[#2D4F3F] text-white' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Summary & Action Column */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Dynamic Live Cost Summary Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#2D4F3F]/20 space-y-4 shadow-md sticky top-20">
                <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373]">Kalkulator Real-time</span>
                    <h4 className="text-base font-bold font-serif-title text-[#2D4F3F]">Estimasi Biaya Paket</h4>
                  </div>
                  <Compass className="w-5 h-5 text-[#D4A373]" />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Destinasi &amp; Kategori:</span>
                    <span className="font-bold text-stone-900">{destination} ({category})</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Durasi &amp; Peserta:</span>
                    <span className="font-bold text-stone-900">{durationDays} Hari, {pax} Pax</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Kelas Budget:</span>
                    <span className="font-bold text-stone-900">{budgetLevel}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="p-2 rounded-lg bg-[#2D4F3F]/10 text-[#2D4F3F] font-bold text-[11px] flex items-center justify-between">
                      <span>✨ Diskon Grup ({discountPercent * 100}% Potongan)</span>
                      <span>Teraplikasi</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Harga Estimasi Per Pax</span>
                    <div className="text-2xl font-bold font-serif-title text-[#2D4F3F] leading-tight">
                      {formatPrice(finalPricePerPax)}
                      <span className="text-xs font-sans text-stone-500 font-normal"> / orang</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-stone-600 text-xs pt-1">
                    <span>Total Rombongan ({pax} Pax):</span>
                    <span className="font-extrabold text-[#2D4F3F] text-sm">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Day-by-Day Preview Accordion/List */}
                <div className="pt-3 border-t border-stone-200 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#2D4F3F]">Preview Itinerary Otomatis</h5>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {dynamicItinerary.map((day) => (
                      <div key={day.day} className="bg-[#FAF9F6] p-2.5 rounded-lg border border-stone-200 text-xs">
                        <span className="font-bold text-[#2D4F3F] text-[11px] block">Hari {day.day}: {day.title}</span>
                        <p className="text-[10px] text-stone-600 mt-0.5 line-clamp-2">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleCreateCustomPackage}
                    className="w-full py-3.5 px-4 bg-[#2D4F3F] hover:bg-[#233f32] text-white font-bold uppercase tracking-wider text-xs rounded-xl transition shadow flex items-center justify-center gap-2"
                  >
                    <span>Lanjut Pemesanan Paket Kustom Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 bg-[#FAF9F6] hover:bg-stone-100 text-[#2D4F3F] font-bold uppercase tracking-wider text-[11px] rounded-xl border border-[#2D4F3F]/30 transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#D4A373]" />
                    <span>Diskusi Rincian via WhatsApp CS</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
