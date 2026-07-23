import React from 'react';
import { X, Search, Calendar, User, MessageSquare, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { BookingData } from '../types';

interface BookingHistoryModalProps {
  bookings: BookingData[];
  onClose: () => void;
  onDeleteBooking: (id: string) => void;
}

export const BookingHistoryModal: React.FC<BookingHistoryModalProps> = ({
  bookings,
  onClose,
  onDeleteBooking,
}) => {
  const [searchCode, setSearchCode] = React.useState('');

  const filtered = bookings.filter(
    (b) =>
      b.bookingCode.toLowerCase().includes(searchCode.toLowerCase()) ||
      b.packageTitle.toLowerCase().includes(searchCode.toLowerCase()) ||
      b.contactName.toLowerCase().includes(searchCode.toLowerCase())
  );

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateWhatsAppUrl = (b: BookingData) => {
    const text = `Halo Admin Nusantara Explorer,%0A%0ASaya ingin mengecek pesanan:${
      '%0A'
    }📌 Kode Booking: *${b.bookingCode}*${
      '%0A'
    }🏖️ Paket: *${b.packageTitle}*${
      '%0A'
    }📅 Tanggal Berangkat: ${b.startDate}${
      '%0A'
    }👤 Nama Pemesan: ${b.contactName}`;
    return `https://wa.me/6281234567890?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-[#2D4F3F]/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-[#1A1A1A]">
        {/* Header */}
        <div className="p-4 bg-[#2D4F3F] text-white border-b border-[#2D4F3F]/20 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h3 className="text-base font-bold font-serif-title text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4A373]" />
              <span>Daftar &amp; Status Pemesanan Online Saya</span>
            </h3>
            <p className="text-xs text-stone-200">Total {bookings.length} riwayat pemesanan tersimpan di sistem</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 bg-[#FAF9F6] border-b border-stone-200">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari berdasarkan Kode Booking (misal: NUSA-123456) atau Nama..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
            />
          </div>
        </div>

        {/* List Content */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1 bg-[#FAF9F6]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <Clock className="w-10 h-10 mx-auto mb-2 text-stone-400" />
              <p className="text-xs font-bold">Belum Ada Pemesanan Ditemukan</p>
              <p className="text-[11px] text-stone-500 mt-1">Silakan pilih paket tour favorit Anda di halaman utama untuk mulai memesan online.</p>
            </div>
          ) : (
            filtered.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 text-xs shadow-sm"
              >
                <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                  <div>
                    <span className="font-mono font-bold text-[#2D4F3F] bg-[#2D4F3F]/10 px-2 py-0.5 rounded border border-[#2D4F3F]/20 text-[11px]">
                      {booking.bookingCode}
                    </span>
                    <span className="ml-2 text-[11px] text-stone-400">{booking.createdAt}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2D4F3F]/10 text-[#2D4F3F] font-bold uppercase tracking-wider text-[10px]">
                    {booking.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold font-serif-title text-[#2D4F3F] text-base">{booking.packageTitle}</h4>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Kategori: {booking.category} • Berangkat: {booking.startDate}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#FAF9F6] p-2.5 rounded-lg text-stone-700 border border-stone-200">
                  <div>
                    <p className="text-stone-400 text-[10px] uppercase font-bold">Pemesan</p>
                    <p className="font-bold text-[#2D4F3F]">{booking.contactName}</p>
                    <p className="text-[10px] text-stone-500">{booking.contactPhone}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-[10px] uppercase font-bold">Total Bayar</p>
                    <p className="font-bold font-serif-title text-[#2D4F3F] text-base">{formatPrice(booking.grandTotal)}</p>
                    <p className="text-[10px] text-stone-500">{booking.adultsCount + booking.kidsCount} Peserta</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <a
                    href={generateWhatsAppUrl(booking)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[#2D4F3F] hover:text-[#1f372c] font-bold"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>Hubungi CS via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onDeleteBooking(booking.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-stone-100 transition"
                    title="Hapus dari riwayat lokal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
