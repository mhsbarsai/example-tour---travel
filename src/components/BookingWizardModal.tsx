import React from 'react';
import { X, Calendar, Users, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, CreditCard, QrCode, MessageSquare, Download, Check, Sparkles, Building, FileText } from 'lucide-react';
import { TourPackage, BookingData, BookingAddon } from '../types';
import { BOOKING_ADDONS } from '../data/addons';

interface BookingWizardModalProps {
  packageData: TourPackage | null;
  onClose: () => void;
  onBookingSuccess: (newBooking: BookingData) => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  packageData,
  onClose,
  onBookingSuccess,
}) => {
  if (!packageData) return null;

  const [step, setStep] = React.useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [startDate, setStartDate] = React.useState<string>(
    new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );
  const [adultsCount, setAdultsCount] = React.useState<number>(Math.max(2, packageData.minPax));
  const [kidsCount, setKidsCount] = React.useState<number>(0);
  const [infantsCount, setInfantsCount] = React.useState<number>(0);

  // Selected Addons
  const [selectedAddonIds, setSelectedAddonIds] = React.useState<string[]>([]);

  // Contact State
  const [contactName, setContactName] = React.useState<string>('');
  const [contactPhone, setContactPhone] = React.useState<string>('');
  const [contactEmail, setContactEmail] = React.useState<string>('');
  const [pickupLocation, setPickupLocation] = React.useState<string>('Bandara / Stasiun Kedatangan');
  const [specialRequests, setSpecialRequests] = React.useState<string>('');

  // Payment Choice
  const [paymentMethod, setPaymentMethod] = React.useState<'whatsapp' | 'qris' | 'bank_transfer' | 'credit_card'>('qris');

  // Completed Booking Result
  const [createdBooking, setCreatedBooking] = React.useState<BookingData | null>(null);

  // Price Calculation Math
  const totalPax = adultsCount + kidsCount; // Infants usually free or zero rate
  const paxPriceSubtotal = totalPax * packageData.pricePerPax;

  const selectedAddonsObj = BOOKING_ADDONS.filter((addon) => selectedAddonIds.includes(addon.id));
  
  const calculateAddonTotal = () => {
    let sum = 0;
    selectedAddonsObj.forEach((addon) => {
      if (addon.priceType === 'per_pax') {
        sum += addon.price * totalPax;
      } else if (addon.priceType === 'per_day') {
        sum += addon.price * packageData.durationDays;
      } else {
        // per_group
        sum += addon.price;
      }
    });
    return sum;
  };

  const addonTotal = calculateAddonTotal();
  const rawTotal = paxPriceSubtotal + addonTotal;

  // Group Discount: 5% off if >= 6 pax, 10% off if >= 15 pax
  let discountPercent = 0;
  if (totalPax >= 15) discountPercent = 0.10;
  else if (totalPax >= 6) discountPercent = 0.05;

  const discountAmount = Math.round(paxPriceSubtotal * discountPercent);
  const grandTotal = Math.max(0, rawTotal - discountAmount);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddonIds.includes(addonId)) {
      setSelectedAddonIds(selectedAddonIds.filter((id) => id !== addonId));
    } else {
      setSelectedAddonIds([...selectedAddonIds, addonId]);
    }
  };

  const handleCompleteBooking = () => {
    const bookingCode = `NUSA-${Date.now().toString().slice(-6)}`;
    const newBooking: BookingData = {
      id: `booking-${Date.now()}`,
      bookingCode,
      packageId: packageData.id,
      packageTitle: packageData.title,
      category: packageData.category,
      startDate,
      durationDays: packageData.durationDays,
      adultsCount,
      kidsCount,
      infantsCount,
      contactName,
      contactPhone,
      contactEmail,
      pickupLocation,
      specialRequests,
      selectedAddons: selectedAddonsObj.map((a) => ({
        id: a.id,
        name: a.name,
        price: a.price,
        priceType: a.priceType,
      })),
      subtotal: paxPriceSubtotal,
      addonTotal,
      discount: discountAmount,
      grandTotal,
      paymentMethod,
      status: 'Terkonfirmasi',
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    setCreatedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep(5);
  };

  const generateWhatsAppUrl = (b: BookingData) => {
    const text = `Halo Admin Nusantara Explorer,%0A%0ASaya ingin mengonfirmasi pemesanan tour:${
      '%0A'
    }📌 Kode Booking: *${b.bookingCode}*${
      '%0A'
    }🏖️ Paket: *${b.packageTitle}* (${b.category})${
      '%0A'
    }📅 Tanggal Berangkat: ${b.startDate}${
      '%0A'
    }👥 Jumlah Peserta: ${b.adultsCount} Dewasa, ${b.kidsCount} Anak${
      '%0A'
    }👤 Nama Pemesan: ${b.contactName}${
      '%0A'
    }📞 No HP/WA: ${b.contactPhone}${
      '%0A'
    }💵 Total Pembayaran: *${formatPrice(b.grandTotal)}*${
      '%0A'
    }%0AMohon petunjuk langkah pembayaran selanjutnya. Terima kasih!`;

    return `https://wa.me/6281234567890?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-[#2D4F3F]/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#1A1A1A]">
        {/* Top Header & Wizard Stepper Bar */}
        <div className="p-4 bg-[#2D4F3F] text-white border-b border-[#2D4F3F]/20 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h3 className="text-base font-bold font-serif-title text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>Pemesanan Online: {packageData.title}</span>
            </h3>
            <p className="text-xs text-stone-200">Langkah {step} dari 4: {
              step === 1 ? 'Jadwal & Peserta' :
              step === 2 ? 'Layanan Tambahan (Add-ons)' :
              step === 3 ? 'Data Kontak Pemesan' :
              step === 4 ? 'Ringkasan & Pembayaran' : 'Voucher Konfirmasi'
            }</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-200 h-1.5">
          <div
            className="bg-[#D4A373] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 bg-[#FAF9F6]">
          {/* STEP 1: Schedule & Participants */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4A373]" />
                  <span>Pilih Tanggal Keberangkatan Trip</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                />
                <p className="text-[11px] text-stone-500 mt-2">
                  *Durasi trip adalah <strong>{packageData.duration}</strong>. Jadwal fleksibel dapat disesuaikan kembali dengan customer service.
                </p>
              </div>

              {/* Pax Selectors */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D4A373]" />
                  <span>Jumlah Peserta / Rombongan</span>
                </h4>

                {/* Adults */}
                <div className="flex items-center justify-between p-3 bg-[#FAF9F6] rounded-xl border border-stone-200">
                  <div>
                    <p className="text-sm font-bold text-[#2D4F3F]">Dewasa (Usia &gt; 12 Thn)</p>
                    <p className="text-xs text-[#D4A373] font-bold">{formatPrice(packageData.pricePerPax)} / pax</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center border border-stone-200"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-[#2D4F3F]">{adultsCount}</span>
                    <button
                      type="button"
                      onClick={() => setAdultsCount(adultsCount + 1)}
                      className="w-8 h-8 rounded-lg bg-[#2D4F3F] hover:bg-[#233f32] text-white font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Kids */}
                <div className="flex items-center justify-between p-3 bg-[#FAF9F6] rounded-xl border border-stone-200">
                  <div>
                    <p className="text-sm font-bold text-[#2D4F3F]">Anak-anak (Usia 3 - 11 Thn)</p>
                    <p className="text-xs text-[#D4A373] font-bold">{formatPrice(packageData.pricePerPax)} / pax</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setKidsCount(Math.max(0, kidsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center border border-stone-200"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-[#2D4F3F]">{kidsCount}</span>
                    <button
                      type="button"
                      onClick={() => setKidsCount(kidsCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center border border-stone-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between p-3 bg-[#FAF9F6] rounded-xl border border-stone-200">
                  <div>
                    <p className="text-sm font-bold text-[#2D4F3F]">Bayi (Usia &lt; 2 Thn)</p>
                    <p className="text-xs text-[#2D4F3F] font-bold">Gratis (Tanpa Bed &amp; Tiket)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setInfantsCount(Math.max(0, infantsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center border border-stone-200"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-[#2D4F3F]">{infantsCount}</span>
                    <button
                      type="button"
                      onClick={() => setInfantsCount(infantsCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center border border-stone-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pax Minimum Check */}
                {totalPax < packageData.minPax && (
                  <p className="text-xs text-[#2D4F3F] bg-[#2D4F3F]/10 p-2.5 rounded-lg border border-[#2D4F3F]/20 font-medium">
                    ⚠️ Minimal peserta untuk paket ini adalah <strong>{packageData.minPax} orang</strong>.
                  </p>
                )}

                {/* Group Discount Badge Notice */}
                {discountPercent > 0 && (
                  <div className="p-3 rounded-xl bg-[#2D4F3F]/10 border border-[#2D4F3F]/20 text-[#2D4F3F] text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                    <span>Selamat! Rombongan Anda memenuhi syarat diskon khusus grup ({discountPercent * 100}% Potongan Harga).</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Addons & Upgrades */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs text-stone-600 shadow-sm">
                Pilih fasilitas dan dokumentasi tambahan untuk melengkapi kenyamanan perjalanan liburan Anda (opsional).
              </div>

              <div className="space-y-3">
                {BOOKING_ADDONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3.5 shadow-sm ${
                        isChecked
                          ? 'bg-[#2D4F3F]/10 border-[#2D4F3F] text-stone-900'
                          : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded mt-0.5 border flex items-center justify-center flex-shrink-0 transition ${
                        isChecked ? 'bg-[#2D4F3F] border-[#2D4F3F] text-white font-bold' : 'border-stone-300'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold font-serif-title text-[#2D4F3F]">{addon.name}</h4>
                          <span className="text-xs font-bold text-[#2D4F3F]">
                            +{formatPrice(addon.price)} <span className="text-[10px] text-stone-500 font-normal">/{addon.priceType === 'per_pax' ? 'pax' : addon.priceType === 'per_day' ? 'hari' : 'grup'}</span>
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1">{addon.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Contact & Passenger Information */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4A373]" />
                  <span>Informasi Kontak Penanggung Jawab Rombongan</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Nama Lengkap Pemesan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Nomor WhatsApp / HP *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Email Aktif *</label>
                    <input
                      type="email"
                      required
                      placeholder="Contoh: budi@gmail.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Titik Lokasi Penjemputan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Bandara Ngurah Rai Bali / Hotel Hyatt Sanur"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Catatan / Permintaan Khusus (Opsional)</label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Makanan halal, butuh kursi roda untuk lansia, request spanduk ucapan ultah"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-[#2D4F3F]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Payment Choice */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Order Breakdown Card */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-[#2D4F3F] uppercase tracking-wider">
                  Rincian Biaya Pemesanan
                </h4>

                <div className="space-y-2 text-xs divide-y divide-stone-200">
                  <div className="flex justify-between pt-2">
                    <span className="text-stone-600">Paket: {packageData.title} ({totalPax} Pax)</span>
                    <span className="font-bold text-stone-900">{formatPrice(paxPriceSubtotal)}</span>
                  </div>

                  {selectedAddonsObj.length > 0 && (
                    <div className="flex justify-between pt-2">
                      <span className="text-stone-600">Add-ons ({selectedAddonsObj.length} Item)</span>
                      <span className="font-bold text-stone-900">+{formatPrice(addonTotal)}</span>
                    </div>
                  )}

                  {discountAmount > 0 && (
                    <div className="flex justify-between pt-2 text-[#2D4F3F]">
                      <span className="font-bold">Diskon Rombongan ({discountPercent * 100}%)</span>
                      <span className="font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 text-sm font-bold text-stone-900">
                    <span>Total Pembayaran (Grand Total)</span>
                    <span className="text-[#2D4F3F] text-lg font-serif-title">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                  Pilih Metode Pembayaran / Konfirmasi
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                      paymentMethod === 'qris'
                        ? 'bg-[#2D4F3F]/10 border-[#2D4F3F] text-stone-900 font-bold'
                        : 'bg-[#FAF9F6] border-stone-200 text-stone-700'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#2D4F3F] flex-shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-[#2D4F3F]">QRIS Instant (All e-Wallet / Bank)</p>
                      <p className="text-[10px] text-stone-500">Gopay, OVO, Dana, ShopeePay, BCA</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                      paymentMethod === 'bank_transfer'
                        ? 'bg-[#2D4F3F]/10 border-[#2D4F3F] text-stone-900 font-bold'
                        : 'bg-[#FAF9F6] border-stone-200 text-stone-700'
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#2D4F3F] flex-shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-[#2D4F3F]">Virtual Account / Transfer Bank</p>
                      <p className="text-[10px] text-stone-500">BCA, Mandiri, BRI, BNI</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                      paymentMethod === 'whatsapp'
                        ? 'bg-[#2D4F3F]/10 border-[#2D4F3F] text-stone-900 font-bold'
                        : 'bg-[#FAF9F6] border-stone-200 text-stone-700'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 text-[#2D4F3F] flex-shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-[#2D4F3F]">Konfirmasi Langsung WhatsApp</p>
                      <p className="text-[10px] text-stone-500">Diskusi invoice &amp; pelunasan via CS</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                      paymentMethod === 'credit_card'
                        ? 'bg-[#2D4F3F]/10 border-[#2D4F3F] text-stone-900 font-bold'
                        : 'bg-[#FAF9F6] border-stone-200 text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#2D4F3F] flex-shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-[#2D4F3F]">Kartu Kredit / Cicilan 0%</p>
                      <p className="text-[10px] text-stone-500">Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Digital Voucher / Confirmation Receipt */}
          {step === 5 && createdBooking && (
            <div className="space-y-6 animate-fadeIn">
              {/* Success Badge Banner */}
              <div className="text-center p-6 bg-white rounded-2xl border border-[#2D4F3F]/20 shadow-sm">
                <div className="w-12 h-12 bg-[#2D4F3F] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold font-serif-title text-[#2D4F3F]">Pemesanan Online Berhasil!</h3>
                <p className="text-xs text-stone-600 mt-1">
                  Voucher digital dan tanda terima resmi telah diterbitkan.
                </p>
                <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-[#FAF9F6] border border-stone-200 text-[#2D4F3F] font-mono text-sm font-bold tracking-wider">
                  KODE BOOKING: {createdBooking.bookingCode}
                </div>
              </div>

              {/* Digital Voucher Receipt */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4 text-xs shadow-sm">
                <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                  <div>
                    <h4 className="font-bold font-serif-title text-[#2D4F3F] text-base">{createdBooking.packageTitle}</h4>
                    <span className="text-[#D4A373] text-[11px] font-bold uppercase tracking-wider">{createdBooking.category}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#2D4F3F]/10 text-[#2D4F3F] font-bold text-[11px]">
                    STATUS: {createdBooking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-stone-700">
                  <div>
                    <p className="text-stone-400 text-[10px] uppercase font-bold">Pemesan</p>
                    <p className="font-bold text-[#2D4F3F]">{createdBooking.contactName}</p>
                    <p>{createdBooking.contactPhone}</p>
                  </div>

                  <div>
                    <p className="text-stone-400 text-[10px] uppercase font-bold">Jadwal Trip</p>
                    <p className="font-bold text-[#2D4F3F]">{createdBooking.startDate}</p>
                    <p>{createdBooking.durationDays} Hari ({createdBooking.adultsCount} Dewasa, {createdBooking.kidsCount} Anak)</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold">
                  <span>Total Tagihan:</span>
                  <span className="text-[#2D4F3F] font-serif-title text-xl">{formatPrice(createdBooking.grandTotal)}</span>
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={generateWhatsAppUrl(createdBooking)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 bg-[#2D4F3F] hover:bg-[#233f32] text-white font-bold uppercase tracking-wider text-xs rounded-xl transition flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4A373]" />
                  <span>Kirim Detail Ke WhatsApp CS</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto py-3 px-6 bg-white hover:bg-stone-100 text-stone-700 font-bold uppercase tracking-wider text-xs rounded-xl transition border border-stone-200"
                >
                  Tutup &amp; Simpan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Nav Bar Controls */}
        {step < 5 && (
          <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            ) : (
              <span className="text-xs text-stone-500 font-medium">Minimal {packageData.minPax} Pax</span>
            )}

            {step < 4 ? (
              <button
                onClick={() => {
                  if (step === 3 && (!contactName || !contactPhone || !contactEmail)) {
                    alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Email Anda.');
                    return;
                  }
                  setStep((step + 1) as any);
                }}
                className="px-6 py-2.5 bg-[#D4A373] hover:bg-[#c49263] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center gap-1.5"
              >
                <span>Lanjut Step {step + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCompleteBooking}
                className="px-6 py-2.5 bg-[#2D4F3F] hover:bg-[#233f32] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                <span>Konfirmasi Pemesanan</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
