import React from 'react';
import { Camera, MapPin, Heart, ZoomIn, X, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { DestinationPhoto, TourPackage } from '../types';
import { DESTINATION_PHOTOS } from '../data/destinations';

interface GallerySectionProps {
  onSelectDestinationForPackage?: (locationKeyword: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onSelectDestinationForPackage
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Semua');
  const [activePhoto, setActivePhoto] = React.useState<DestinationPhoto | null>(null);
  const [likesMap, setLikesMap] = React.useState<{ [id: string]: number }>(
    DESTINATION_PHOTOS.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.likes }), {})
  );

  const categories = [
    'Semua',
    'Pantai & Bahari',
    'Gunung & Alam',
    'Budaya & Heritage',
    'Outbound & Teambuilding',
    'Luxury & Resort',
  ];

  const filteredPhotos = DESTINATION_PHOTOS.filter(
    (photo) => selectedCategory === 'Semua' || photo.category === selectedCategory
  );

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="gallery-section" className="py-16 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#2D4F3F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2D4F3F]/10 border border-[#2D4F3F]/15 text-[#2D4F3F] text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Galeri Foto Destinasi Eksotis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#2D4F3F] tracking-tight">
            Potret Keindahan Alam &amp; Wisata Indonesia
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            Intip keindahan destinasi wisata unggulan kami mulai dari pantai pasir muda, deretan pegunungan megah, hingga keseruan outbound kantor.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2D4F3F] text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:text-[#2D4F3F] border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-72 rounded-2xl overflow-hidden bg-white border border-[#2D4F3F]/15 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#2D4F3F]/40 hover:shadow-lg"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category tag */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2D4F3F] text-[10px] font-bold uppercase tracking-wider border border-[#2D4F3F]/10">
                {photo.category}
              </div>

              {/* Zoom overlay icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#2D4F3F] opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <div className="flex items-center gap-1 text-[11px] text-[#D4A373] font-bold mb-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{photo.location}</span>
                </div>
                <h3 className="text-base font-bold font-serif-title text-white line-clamp-1 group-hover:text-[#D4A373] transition-colors">
                  {photo.title}
                </h3>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-[11px] text-stone-200">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4A373]" />
                    {photo.bestSeason}
                  </span>

                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200 font-bold transition"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{likesMap[photo.id] || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md animate-fadeIn">
            <div className="relative max-w-3xl w-full bg-white border border-[#2D4F3F]/15 rounded-2xl overflow-hidden shadow-2xl my-auto text-[#1A1A1A]">
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-80 sm:h-96 overflow-hidden bg-black">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#2D4F3F]/10 text-[#2D4F3F] border border-[#2D4F3F]/15 text-xs font-bold uppercase tracking-wider">
                      {activePhoto.category}
                    </span>
                    <h3 className="text-2xl font-bold font-serif-title text-[#2D4F3F] mt-2">{activePhoto.title}</h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span>{activePhoto.location}</span>
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleLike(activePhoto.id, e)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF9F6] border border-stone-200 text-rose-600 font-bold text-xs"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>{likesMap[activePhoto.id] || 0} Menyukai</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-stone-200">
                  {activePhoto.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-stone-600">
                    <span className="font-bold text-[#2D4F3F]">Waktu Terbaik Berkunjung:</span> {activePhoto.bestSeason}
                  </div>

                  {onSelectDestinationForPackage && (
                    <button
                      onClick={() => {
                        const loc = activePhoto.location.split(',')[0];
                        setActivePhoto(null);
                        onSelectDestinationForPackage(loc);
                      }}
                      className="px-5 py-2.5 bg-[#D4A373] hover:bg-[#c49263] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Cari Paket Ke {activePhoto.title.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
