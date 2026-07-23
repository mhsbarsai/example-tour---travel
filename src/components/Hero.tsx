import React from 'react';
import { Search, MapPin, Users, Calendar, ShieldCheck, Award, Sparkles, Compass, Sliders } from 'lucide-react';
import { TripCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: TripCategory | 'Semua';
  setSelectedCategory: (category: TripCategory | 'Semua') => void;
  onOpenAIPlanner: () => void;
  onSearchSubmit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenAIPlanner,
  onSearchSubmit,
}) => {
  const tripCategories: { id: TripCategory | 'Semua'; label: string; desc: string }[] = [
    { id: 'Semua', label: 'Semua Paket', desc: 'Jelajah Semua' },
    { id: 'Private Trip', label: 'Private Trip', desc: 'Eksklusif & Bebas' },
    { id: 'Family Holiday', label: 'Family Holiday', desc: 'Nyaman & Ceria' },
    { id: 'Outbound Kantor', label: 'Outbound Kantor', desc: 'Teambuilding Pro' },
    { id: 'Open Trip', label: 'Open Trip', desc: 'Hemat & Ramai' },
  ];

  return (
    <div className="relative bg-[#FAF9F6] text-[#1A1A1A] border-b border-[#2D4F3F]/10">
      {/* Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Branding & Geometric Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block text-[#D4A373] font-bold uppercase tracking-[0.3em] text-xs">
              Premium Tourism Agency
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-title leading-[1.1] text-[#2D4F3F]">
              Explore the <br className="hidden sm:inline" />
              Hidden Gems of <br className="hidden sm:inline" />
              <span className="italic font-light text-[#D4A373]">Nusantara.</span>
            </h1>

            <p className="text-stone-600 max-w-xl text-sm sm:text-base leading-relaxed">
              Nikmati perjalanan wisata eksklusif dengan pilihan <strong>Private Trip</strong>, <strong>Family Holiday</strong>, hingga <strong>Outbound Kantor</strong> yang dirancang dengan presisi, kenyamanan kelas atas, dan pelayanan bergaransi resmi.
            </p>

            {/* Geometric Stat Cards */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="h-28 bg-[#2D4F3F]/5 rounded-xl border border-[#2D4F3F]/10 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-2xl font-bold font-serif-title text-[#2D4F3F]">150+</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold mt-1">Destinasi Unik</span>
              </div>
              <div className="h-28 bg-[#2D4F3F]/5 rounded-xl border border-[#2D4F3F]/10 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-2xl font-bold font-serif-title text-[#2D4F3F]">12k+</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold mt-1">Wisatawan Puas</span>
              </div>
              <div className="h-28 bg-[#2D4F3F]/5 rounded-xl border border-[#2D4F3F]/10 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-2xl font-bold font-serif-title text-[#2D4F3F]">4.9/5</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold mt-1">Ulasan Bintang</span>
              </div>
            </div>
          </div>

          {/* Right: Online Search & Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 border border-[#2D4F3F]/15 rounded-2xl shadow-xl shadow-[#2D4F3F]/5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-extrabold text-[#2D4F3F] font-serif-title">Rencanakan Perjalanan Anda</h2>
                  <p className="text-xs text-stone-500 mt-0.5">Pilih kategori &amp; cari destinasi impian</p>
                </div>
                <button
                  onClick={onOpenAIPlanner}
                  className="px-3 py-2 rounded-lg bg-[#FAF9F6] border border-[#2D4F3F]/20 text-[#2D4F3F] hover:bg-[#2D4F3F] hover:text-white transition text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  title="Perencana Trip Interaktif"
                >
                  <Sliders className="w-4 h-4 text-[#D4A373]" />
                  <span className="hidden sm:inline font-bold uppercase tracking-wider text-[11px]">Trip Custom</span>
                </button>
              </div>

              {/* Trip Category Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 scrollbar-none border-b border-stone-200">
                {tripCategories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                        active
                          ? 'bg-[#2D4F3F] text-white shadow-sm'
                          : 'bg-[#FAF9F6] text-stone-600 hover:text-[#2D4F3F] border border-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Input Search Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">
                    Destinasi / Lokasi Impian
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Misal: Labuan Bajo, Bali, Bromo, Jogja..."
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#2D4F3F] focus:ring-1 focus:ring-[#2D4F3F] transition"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') onSearchSubmit();
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={onSearchSubmit}
                  className="w-full py-3.5 bg-[#D4A373] hover:bg-[#c49263] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-lg shadow-[#D4A373]/20 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>CARI PAKET PARIWISATA</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Badges / Guarantees */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#2D4F3F]/10 text-xs">
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#2D4F3F]/10">
            <div className="w-9 h-9 rounded-lg bg-[#2D4F3F]/10 text-[#2D4F3F] flex items-center justify-center font-bold flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#2D4F3F]" />
            </div>
            <div>
              <p className="font-bold text-[#2D4F3F]">100% Bergaransi</p>
              <p className="text-stone-500 text-[11px]">Resmi Kemenparekraf</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#2D4F3F]/10">
            <div className="w-9 h-9 rounded-lg bg-[#2D4F3F]/10 text-[#2D4F3F] flex items-center justify-center font-bold flex-shrink-0">
              <Award className="w-5 h-5 text-[#2D4F3F]" />
            </div>
            <div>
              <p className="font-bold text-[#2D4F3F]">5.000+ Wisatawan</p>
              <p className="text-stone-500 text-[11px]">Pengalaman memuaskan</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#2D4F3F]/10">
            <div className="w-9 h-9 rounded-lg bg-[#2D4F3F]/10 text-[#2D4F3F] flex items-center justify-center font-bold flex-shrink-0">
              <Users className="w-5 h-5 text-[#2D4F3F]" />
            </div>
            <div>
              <p className="font-bold text-[#2D4F3F]">Guide HPI Bersertifikat</p>
              <p className="text-stone-500 text-[11px]">Pemandu lokal profesional</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#2D4F3F]/10">
            <div className="w-9 h-9 rounded-lg bg-[#2D4F3F]/10 text-[#2D4F3F] flex items-center justify-center font-bold flex-shrink-0">
              <Compass className="w-5 h-5 text-[#2D4F3F]" />
            </div>
            <div>
              <p className="font-bold text-[#2D4F3F]">Custom Itinerary</p>
              <p className="text-stone-500 text-[11px]">Fleksibel atur jadwal</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
