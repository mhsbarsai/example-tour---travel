import React from 'react';
import { Star, Clock, MapPin, Users, CheckCircle2, ArrowRight, Sparkles, SlidersHorizontal, Flame } from 'lucide-react';
import { TourPackage, TripCategory } from '../types';

interface PackageListProps {
  packages: TourPackage[];
  selectedCategory: TripCategory | 'Semua';
  setSelectedCategory: (cat: TripCategory | 'Semua') => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
  searchQuery: string;
}

export const PackageList: React.FC<PackageListProps> = ({
  packages,
  selectedCategory,
  setSelectedCategory,
  onSelectPackage,
  onBookPackage,
  searchQuery,
}) => {
  const [sortBy, setSortBy] = React.useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');

  const categories: (TripCategory | 'Semua')[] = [
    'Semua',
    'Private Trip',
    'Family Holiday',
    'Outbound Kantor',
    'Open Trip',
  ];

  // Filter packages based on category and search query
  const filtered = packages.filter((pkg) => {
    const matchesCategory = selectedCategory === 'Semua' || pkg.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort packages
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_low') return a.pricePerPax - b.pricePerPax;
    if (sortBy === 'price_high') return b.pricePerPax - a.pricePerPax;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="packages-section" className="py-16 bg-[#FAF9F6] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#D4A373] font-bold text-xs uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Katalog Destinasi Pilihan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#2D4F3F] mt-1">
              Paket Wisata &amp; Tour Pariwisata Resmi
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Pilih paket impian Anda dan nikmati pemesanan online instan dengan transparansi penuh tanpa biaya tersembunyi.
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#2D4F3F]/15 text-xs shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2D4F3F]" />
            <span className="text-stone-500 font-medium">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-[#2D4F3F] focus:outline-none cursor-pointer"
            >
              <option value="popular">Paling Populer</option>
              <option value="price_low">Harga Terendah</option>
              <option value="price_high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#2D4F3F]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2D4F3F] text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:text-[#2D4F3F] hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Result Feedback */}
        {searchQuery && (
          <div className="mb-6 p-3.5 rounded-xl bg-white border border-[#2D4F3F]/15 text-xs text-stone-600 flex items-center justify-between shadow-sm">
            <span>
              Menampilkan hasil pencarian untuk &quot;<strong className="text-[#2D4F3F]">{searchQuery}</strong>&quot; ({sorted.length} paket ditemukan)
            </span>
            <button
              onClick={() => setSelectedCategory('Semua')}
              className="text-[#D4A373] hover:underline font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Packages Grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300">
            <MapPin className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#2D4F3F] font-serif-title">Tidak ada paket wisata ditemukan</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              Coba gunakan kata kunci destinasi lain seperti &quot;Bali&quot;, &quot;Labuan Bajo&quot;, atau ubah kategori paket trip Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((pkg) => (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl border border-[#2D4F3F]/15 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2D4F3F]/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  <img
                    src={pkg.featuredImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2D4F3F] border border-[#2D4F3F]/10 text-[10px] font-bold uppercase tracking-wider">
                    <span>{pkg.category}</span>
                  </div>

                  {/* Popular Tag */}
                  {pkg.isPopular && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4A373] text-white text-[10px] font-bold tracking-wider uppercase shadow-md">
                      <Flame className="w-3 h-3 fill-white" />
                      <span>FAVORIT</span>
                    </div>
                  )}

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-stone-800 text-xs font-bold border border-stone-200">
                    <Star className="w-3.5 h-3.5 text-[#D4A373] fill-[#D4A373]" />
                    <span>{pkg.rating}</span>
                    <span className="text-stone-400 text-[10px]">({pkg.reviewCount})</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1 text-stone-500 text-xs mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4A373] flex-shrink-0" />
                      <span className="truncate">{pkg.location}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectPackage(pkg)}
                      className="text-lg font-bold font-serif-title text-[#2D4F3F] group-hover:text-[#D4A373] transition-colors line-clamp-2 cursor-pointer"
                    >
                      {pkg.title}
                    </h3>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-stone-600 my-3">
                      <span className="flex items-center gap-1 bg-[#FAF9F6] px-2.5 py-1 rounded-md border border-stone-200">
                        <Clock className="w-3.5 h-3.5 text-[#2D4F3F]" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1 bg-[#FAF9F6] px-2.5 py-1 rounded-md border border-stone-200">
                        <Users className="w-3.5 h-3.5 text-[#2D4F3F]" />
                        Min. {pkg.minPax} Pax
                      </span>
                    </div>

                    {/* Highlights bullet points */}
                    <ul className="space-y-1.5 text-xs text-stone-500 mb-4">
                      {pkg.highlights.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4F3F] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Mulai Dari</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold font-serif-title text-[#2D4F3F]">
                          {formatPrice(pkg.pricePerPax)}
                        </span>
                        <span className="text-[10px] text-stone-400">/pax</span>
                      </div>
                      {pkg.originalPricePerPax && (
                        <span className="text-[10px] text-stone-400 line-through">
                          {formatPrice(pkg.originalPricePerPax)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="px-3 py-2 rounded-xl bg-[#FAF9F6] hover:bg-stone-200 text-[#2D4F3F] text-xs font-bold uppercase tracking-wider border border-stone-200 transition"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => onBookPackage(pkg)}
                        className="px-3.5 py-2 rounded-xl bg-[#D4A373] hover:bg-[#c49263] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-1"
                      >
                        <span>Pesan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
