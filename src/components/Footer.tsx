import React from 'react';
import { Compass, MapPin, PhoneCall, Mail, ShieldCheck, Award, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      q: 'Bagaimana cara pemesanan tour secara online di Nusantara Explorer?',
      a: 'Pilih paket wisata yang Anda inginkan, tentukan tanggal keberangkatan dan jumlah peserta, tambahkan add-ons jika ada, lalu isi data kontak. Anda akan mendapatkan kode booking instan dan invoice yang dapat dikonfirmasi via WhatsApp atau metode pembayaran digital.',
    },
    {
      q: 'Apakah bisa memesan Private Trip dengan jadwal tanggal sendiri?',
      a: 'Sangat bisa! Seluruh Paket Private Trip dan Family Holiday di Nusantara Explorer bersifat fleksibel. Anda bebas menentukan tanggal berangkat, lokasi penjemputan, serta penyesuaian objek wisata.',
    },
    {
      q: 'Apakah Nusantara Explorer melayani Outbound Kantor skala besar?',
      a: 'Ya, kami berpengalaman menangani Outbound Gathering & Capacity Building Perusahaan mulai dari 20 hingga 500+ peserta. Dilengkapi dengan master facilitator bersertifikat, spanduk custom, kaos, serta acara gala dinner.',
    },
    {
      q: 'Bagaimana sistem pembayaran & kepastian kuota trip?',
      a: 'Setelah melakukan pemesanan online, Anda dapat melakukan DP (Down Payment) sebesar 30% untuk mengamankan kuota, armada, hotel, dan tiket masuk. Pelunasan dapat dilakukan H-3 sebelum keberangkatan.',
    },
  ];

  return (
    <footer className="bg-[#2D4F3F] text-stone-200 border-t border-[#2D4F3F]/20 text-xs">
      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D4A373] font-bold uppercase tracking-widest text-[10px] mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan Sering Diajukan (FAQ)</span>
          </div>
          <h3 className="text-2xl font-bold font-serif-title text-white">Informasi Penting Sebelum Memesan Trip</h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-white flex items-center justify-between gap-3 hover:text-[#D4A373] transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#D4A373]" /> : <ChevronDown className="w-4 h-4 text-stone-300" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-stone-200 leading-relaxed border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center text-white font-bold border border-white/20">
              <Compass className="w-5 h-5 text-[#D4A373]" />
            </div>
            <div>
              <span className="text-xl font-extrabold font-serif-title text-white">Nusantara <span className="text-[#D4A373]">Explorer</span></span>
              <p className="text-[10px] text-stone-300 uppercase tracking-widest font-bold">Premium Travel Agency</p>
            </div>
          </div>

          <p className="text-stone-300 leading-relaxed max-w-sm">
            Nusantara Explorer adalah penyedia jasa agen perjalanan tur pariwisata terpercaya di Indonesia. Menyelenggarakan Private Trip, Family Holiday, Outbound Kantor, dan Open Trip secara profesional dengan garansi kepuasan.
          </p>

          <div className="flex items-center gap-3 pt-2 text-[11px] text-stone-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>Anggota Resmi ASITA</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 font-medium">
              <Award className="w-4 h-4 text-[#D4A373]" />
              <span>Lisensi Kemenparekraf</span>
            </div>
          </div>
        </div>

        {/* Office & Contact */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs font-serif-title">Kantor Operasional</h4>

          <ul className="space-y-2.5 text-stone-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Kantor Jakarta:</strong> Jl. Sudirman Central Business District (SCBD) No. 45, Jakarta Selatan.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Kantor Operational Bali:</strong> Jl. Sunset Road No. 88, Kuta, Badung, Bali.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
              <span>Hotline WhatsApp: 0812-3456-7890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
              <span>Email: cs@nusantaraexplorer.co.id</span>
            </li>
          </ul>
        </div>

        {/* Categories Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs font-serif-title">Kategori Layanan</h4>
          <ul className="space-y-2 text-stone-300">
            <li><a href="#packages-section" className="hover:text-[#D4A373] transition">Private Trip Exclusive</a></li>
            <li><a href="#packages-section" className="hover:text-[#D4A373] transition">Family Holiday Package</a></li>
            <li><a href="#packages-section" className="hover:text-[#D4A373] transition">Corporate Outbound Gathering</a></li>
            <li><a href="#packages-section" className="hover:text-[#D4A373] transition">Open Trip Hemat</a></li>
            <li><a href="#gallery-section" className="hover:text-[#D4A373] transition">Galeri Destinasi Pariwisata</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1f372c] border-t border-white/10 py-4 px-4 text-center text-stone-400 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 PT Nusantara Explorer Pariwisata Indonesia. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="text-stone-300 font-medium">Sistem Pemesanan Online Tour &amp; Travel Resmi</p>
        </div>
      </div>
    </footer>
  );
};
