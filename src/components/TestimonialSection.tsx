import React from 'react';
import { Star, MessageSquare, BadgeCheck, ThumbsUp, PlusCircle, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Testimonial, TripCategory } from '../types';
import { INITIAL_TESTIMONIALS } from '../data/testimonials';

export const TestimonialSection: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [filterCategory, setFilterCategory] = React.useState<string>('Semua');
  const [showReviewModal, setShowReviewModal] = React.useState(false);

  // New Review Form State
  const [authorName, setAuthorName] = React.useState('');
  const [authorRole, setAuthorRole] = React.useState('');
  const [tripCategory, setTripCategory] = React.useState<TripCategory>('Private Trip');
  const [destinationName, setDestinationName] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState('');

  const categories = ['Semua', 'Private Trip', 'Family Holiday', 'Outbound Kantor', 'Open Trip'];

  const filtered = testimonials.filter(
    (t) => filterCategory === 'Semua' || t.category === filterCategory
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment || !destinationName) {
      alert('Mohon isi nama, destinasi trip, dan ulasan Anda.');
      return;
    }

    const newTestimonial: Testimonial = {
      id: `testi-${Date.now()}`,
      authorName,
      authorRole: authorRole || 'Wisatawan Nusantara Explorer',
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=200&q=80`,
      category: tripCategory,
      destinationName,
      rating,
      date: 'Baru Saja',
      comment,
      isVerified: true,
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setShowReviewModal(false);

    // Reset Form
    setAuthorName('');
    setAuthorRole('');
    setDestinationName('');
    setComment('');
  };

  return (
    <section id="testimonials-section" className="py-16 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#2D4F3F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-[#D4A373] font-bold text-xs uppercase tracking-[0.25em] mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Pengalaman &amp; Ulasan Nyata Wisatawan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-[#2D4F3F]">
              Apa Kata Mereka Tentang Layanan Kami?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Testimoni jujur dari ribuan wisatawan yang telah menjelajahi keindahan Indonesia bersama Nusantara Explorer.
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-5 py-2.5 bg-[#D4A373] hover:bg-[#c49263] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm flex items-center gap-2 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Ulasan Saya</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#2D4F3F]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-[#2D4F3F] text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:text-[#2D4F3F] border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-[#2D4F3F]/15 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* User Info Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatarUrl}
                      alt={item.authorName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#D4A373]/40"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-bold font-serif-title text-[#2D4F3F]">{item.authorName}</h4>
                        {item.isVerified && (
                          <span className="flex items-center gap-0.5 text-[10px] text-[#2D4F3F] font-bold uppercase tracking-wider bg-[#2D4F3F]/10 px-2 py-0.5 rounded-full border border-[#2D4F3F]/20">
                            <BadgeCheck className="w-3 h-3 text-[#2D4F3F]" />
                            <span>Terverifikasi</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500">{item.authorRole}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-stone-400">{item.date}</span>
                </div>

                {/* Rating & Trip Title */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-[#D4A373]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating ? 'fill-[#D4A373] text-[#D4A373]' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4F3F] bg-[#FAF9F6] px-2.5 py-1 rounded-md border border-stone-200">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs font-bold text-[#2D4F3F]">
                  📍 {item.destinationName}
                </p>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic bg-[#FAF9F6] p-3.5 rounded-xl border border-stone-200">
                  &quot;{item.comment}&quot;
                </p>
              </div>

              {/* Photo proof if available */}
              {item.photoProofUrl && (
                <div className="pt-2">
                  <div className="relative h-44 rounded-xl overflow-hidden border border-stone-200">
                    <img
                      src={item.photoProofUrl}
                      alt="Bukti Foto Trip"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] text-[#2D4F3F] rounded font-bold uppercase tracking-wider flex items-center gap-1 border border-[#2D4F3F]/10">
                      <ImageIcon className="w-3 h-3 text-[#D4A373]" />
                      <span>Dokumentasi Trip Real</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
            <div className="relative w-full max-w-lg bg-white border border-[#2D4F3F]/15 rounded-2xl shadow-2xl p-6 my-auto text-[#1A1A1A] space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-lg font-bold font-serif-title text-[#2D4F3F] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4A373]" />
                  <span>Tulis Ulasan &amp; Testimoni Trip Anda</span>
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Nama Anda *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Gunawan"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Kategori Trip</label>
                    <select
                      value={tripCategory}
                      onChange={(e) => setTripCategory(e.target.value as TripCategory)}
                      className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                    >
                      <option value="Private Trip">Private Trip</option>
                      <option value="Family Holiday">Family Holiday</option>
                      <option value="Outbound Kantor">Outbound Kantor</option>
                      <option value="Open Trip">Open Trip</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Rating Bintang</label>
                    <div className="flex items-center gap-1 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => setRating(star)}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= rating ? 'text-[#D4A373] fill-[#D4A373]' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Nama Paket / Destinasi Wisata *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sailing Phinisi Komodo 3D2N"
                    value={destinationName}
                    onChange={(e) => setDestinationName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Status / Profesi (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Family Traveler / Manager PT Astra"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Ulasan &amp; Pengalaman Anda *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ceritakan keseruan perjalanan, fasilitas driver, dan pelayanan kami..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4A373] hover:bg-[#c49263] text-white font-bold uppercase tracking-widest text-xs rounded-xl transition shadow-sm"
                >
                  Kirim Ulasan Sekarang
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
