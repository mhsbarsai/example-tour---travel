import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PackageList } from './components/PackageList';
import { PackageDetailModal } from './components/PackageDetailModal';
import { BookingWizardModal } from './components/BookingWizardModal';
import { BookingHistoryModal } from './components/BookingHistoryModal';
import { GallerySection } from './components/GallerySection';
import { TestimonialSection } from './components/TestimonialSection';
import { InteractiveTripPlanner } from './components/InteractiveTripPlanner';
import { Footer } from './components/Footer';

import { TourPackage, TripCategory, BookingData } from './types';
import { TOUR_PACKAGES } from './data/packages';
import { MessageSquare, ArrowUp, Sparkles, PhoneCall, ShieldCheck, Award, Sliders } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<string>('packages');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<TripCategory | 'Semua'>('Semua');

  // Modals state
  const [detailModalPackage, setDetailModalPackage] = React.useState<TourPackage | null>(null);
  const [bookingWizardPackage, setBookingWizardPackage] = React.useState<TourPackage | null>(null);
  const [showBookingHistory, setShowBookingHistory] = React.useState<boolean>(false);
  const [showAIPlanner, setShowAIPlanner] = React.useState<boolean>(false);

  // Saved bookings local persistence
  const [savedBookings, setSavedBookings] = React.useState<BookingData[]>(() => {
    try {
      const stored = localStorage.getItem('nusantara_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('nusantara_bookings', JSON.stringify(savedBookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [savedBookings]);

  const handleBookingSuccess = (newBooking: BookingData) => {
    setSavedBookings((prev) => [newBooking, ...prev]);
  };

  const handleDeleteBooking = (id: string) => {
    setSavedBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const scrollToPackages = () => {
    const el = document.getElementById('packages-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'packages') scrollToPackages();
          else if (tab === 'gallery') {
            const el = document.getElementById('gallery-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'testimonials') {
            const el = document.getElementById('testimonials-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        bookingCount={savedBookings.length}
        onOpenBookingHistory={() => setShowBookingHistory(true)}
        onOpenAIPlanner={() => setShowAIPlanner(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOpenAIPlanner={() => setShowAIPlanner(true)}
          onSearchSubmit={() => {
            setActiveTab('packages');
            scrollToPackages();
          }}
        />

        {/* Feature Highlights Banner */}
        <section className="bg-slate-900 border-y border-slate-800/80 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Sistem Pemesanan Terjamin</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Sertifikat penerbitan invoice resmi & proses verifikasi cepat</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Destinasi Terpopuler</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Komodo, Bali, Bromo, Bandung, Jogja, Raja Ampat</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#2D4F3F]/10 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#2D4F3F]/10 border border-[#2D4F3F]/20 text-[#2D4F3F] flex items-center justify-center flex-shrink-0 font-bold">
                  <Sliders className="w-6 h-6 text-[#2D4F3F]" />
                </div>
                <div>
                  <h4 className="font-bold font-serif-title text-[#2D4F3F] text-sm">Trip Kustom Interaktif</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Atur durasi, lokasi, &amp; fasilitas dengan perhitungan harga instan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tour Packages List */}
        <PackageList
          packages={TOUR_PACKAGES}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onSelectPackage={(pkg) => setDetailModalPackage(pkg)}
          onBookPackage={(pkg) => setBookingWizardPackage(pkg)}
          searchQuery={searchQuery}
        />

        {/* Destination Photo Gallery */}
        <GallerySection
          onSelectDestinationForPackage={(locationKeyword) => {
            setSearchQuery(locationKeyword);
            scrollToPackages();
          }}
        />

        {/* Testimonials Feature */}
        <TestimonialSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* MODALS */}
      {/* 1. Package Detail Modal */}
      {detailModalPackage && (
        <PackageDetailModal
          packageData={detailModalPackage}
          onClose={() => setDetailModalPackage(null)}
          onBookNow={(pkg) => {
            setDetailModalPackage(null);
            setBookingWizardPackage(pkg);
          }}
        />
      )}

      {/* 2. Online Booking Wizard Modal */}
      {bookingWizardPackage && (
        <BookingWizardModal
          packageData={bookingWizardPackage}
          onClose={() => setBookingWizardPackage(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* 3. Booking History Modal */}
      {showBookingHistory && (
        <BookingHistoryModal
          bookings={savedBookings}
          onClose={() => setShowBookingHistory(false)}
          onDeleteBooking={handleDeleteBooking}
        />
      )}

      {/* 4. Interactive Custom Trip Planner Modal */}
      {showAIPlanner && (
        <InteractiveTripPlanner
          onClose={() => setShowAIPlanner(false)}
          onSelectPlanForBooking={(customPkg) => {
            setBookingWizardPackage(customPkg);
          }}
        />
      )}

      {/* Floating Fast Contact WhatsApp Button */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Nusantara%20Explorer,%20saya%20ingin%20konsultasi%20paket%20tour"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full shadow-2xl shadow-emerald-500/40 flex items-center gap-2 group transition-all duration-300 hover:scale-105 border-2 border-emerald-300"
        title="Chat WhatsApp CS Live 24/7"
      >
        <MessageSquare className="w-6 h-6 fill-slate-950 text-slate-950" />
        <span className="hidden sm:inline-block text-xs pr-1 font-bold">
          Konsultasi Fast CS
        </span>
      </a>
    </div>
  );
}
