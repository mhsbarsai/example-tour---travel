import React from 'react';
import { X, Star, Clock, MapPin, Users, Check, AlertCircle, Calendar, ArrowRight, ShieldCheck, Camera } from 'lucide-react';
import { TourPackage } from '../types';

interface PackageDetailModalProps {
  packageData: TourPackage | null;
  onClose: () => void;
  onBookNow: (pkg: TourPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  packageData,
  onClose,
  onBookNow,
}) => {
  if (!packageData) return null;

  const [activeTab, setActiveTab] = React.useState<'itinerary' | 'includes' | 'gallery'>('itinerary');
  const [selectedImage, setSelectedImage] = React.useState<string>(packageData.featuredImage);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-[#2D4F3F]/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#1A1A1A]">
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 bg-[#2D4F3F] text-white border-b border-[#2D4F3F]/20 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-[#D4A373] border border-white/20 text-xs font-bold uppercase tracking-wider">
              {packageData.category}
            </span>
            <span className="text-xs text-stone-200 hidden sm:inline">• ID: {packageData.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FAF9F6]">
          {/* Main Hero & Gallery Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-3">
              <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                <img
                  src={selectedImage}
                  alt={packageData.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnails */}
              {packageData.galleryImages && packageData.galleryImages.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {packageData.galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${
                        selectedImage === imgUrl ? 'border-[#D4A373] scale-105' : 'border-stone-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Details Sidebar */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-1 text-xs text-stone-500 mb-1 font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>{packageData.location}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-[#2D4F3F] leading-snug">
                  {packageData.title}
                </h2>

                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {packageData.subtitle}
                </p>

                <div className="flex items-center gap-3 my-4 text-xs text-stone-700">
                  <span className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 font-medium">
                    <Clock className="w-4 h-4 text-[#2D4F3F]" />
                    {packageData.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 font-medium">
                    <Users className="w-4 h-4 text-[#2D4F3F]" />
                    Min. {packageData.minPax} Pax
                  </span>
                  <span className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 font-medium">
                    <Star className="w-4 h-4 text-[#D4A373] fill-[#D4A373]" />
                    {packageData.rating}
                  </span>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-semibold uppercase">Harga Paket / Pax</span>
                  {packageData.originalPricePerPax && (
                    <span className="text-xs text-stone-400 line-through">
                      {formatPrice(packageData.originalPricePerPax)}
                    </span>
                  )}
                </div>

                <div className="text-2xl font-bold font-serif-title text-[#2D4F3F]">
                  {formatPrice(packageData.pricePerPax)}
                  <span className="text-xs text-stone-500 font-sans font-normal"> / orang</span>
                </div>

                <p className="text-[11px] text-stone-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D4F3F]" />
                  Termasuk Asuransi Perjalanan &amp; Guide Berlisensi
                </p>

                <button
                  onClick={() => {
                    onClose();
                    onBookNow(packageData);
                  }}
                  className="w-full py-3 px-4 bg-[#D4A373] hover:bg-[#c49263] text-white font-bold uppercase tracking-wider text-xs rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <span>Mulai Pemesanan Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Description & Tab Navigation */}
          <div className="pt-4 border-t border-stone-200 space-y-4">
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
              {packageData.description}
            </p>

            <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'itinerary'
                    ? 'bg-[#2D4F3F] text-white shadow-sm'
                    : 'text-stone-600 hover:text-[#2D4F3F] hover:bg-white'
                }`}
              >
                Rencana Itinerary Hari demi Hari
              </button>
              <button
                onClick={() => setActiveTab('includes')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === 'includes'
                    ? 'bg-[#2D4F3F] text-white shadow-sm'
                    : 'text-stone-600 hover:text-[#2D4F3F] hover:bg-white'
                }`}
              >
                Fasilitas &amp; Layanan
              </button>
            </div>

            {/* Itinerary Tab */}
            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                {packageData.itinerary.map((dayItem) => (
                  <div key={dayItem.day} className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#2D4F3F]/10 text-[#2D4F3F] font-bold text-xs uppercase tracking-wider">
                        Hari ke-{dayItem.day}
                      </span>
                      {dayItem.meals && (
                        <span className="text-[11px] text-[#D4A373] font-bold">
                          🍴 {dayItem.meals}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold font-serif-title text-[#2D4F3F]">{dayItem.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{dayItem.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Includes / Excludes Tab */}
            {activeTab === 'includes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#2D4F3F]/20 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold text-[#2D4F3F] uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#2D4F3F]" />
                    Termasuk Dalam Paket (Included)
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {packageData.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D4F3F] mt-1.5 flex-shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-red-200 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    Tidak Termasuk (Excluded)
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {packageData.excludes.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer sticky bar */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-stone-500 uppercase font-bold">Total Estimasi Pax</span>
            <div className="text-lg font-bold font-serif-title text-[#2D4F3F]">{formatPrice(packageData.pricePerPax)} / pax</div>
          </div>
          <button
            onClick={() => {
              onClose();
              onBookNow(packageData);
            }}
            className="px-6 py-2.5 bg-[#D4A373] hover:bg-[#c49263] text-white font-bold uppercase tracking-wider text-xs rounded-xl transition shadow"
          >
            Lanjut Pemesanan
          </button>
        </div>
      </div>
    </div>
  );
};
