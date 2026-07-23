import React from 'react';
import { Compass, PhoneCall, CalendarCheck, Sparkles, MapPin, Menu, X, Users, MessageSquare, Sliders } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
  onOpenBookingHistory: () => void;
  onOpenAIPlanner: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookingCount,
  onOpenBookingHistory,
  onOpenAIPlanner
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'packages', label: 'Paket Wisata' },
    { id: 'gallery', label: 'Galeri Destinasi' },
    { id: 'testimonials', label: 'Testimoni' },
    { id: 'about', label: 'Tentang Kami' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-stone-800 border-b border-[#2D4F3F]/15 shadow-sm">
      {/* Top Banner Contact Line */}
      <div className="bg-[#2D4F3F] py-2 px-4 text-xs text-stone-200 border-b border-[#2D4F3F]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-stone-200">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Kantor Pusat: Jakarta &amp; Bali, Indonesia</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Layanan CS 24/7 Aktif</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Nusantara%20Explorer,%20saya%20ingin%20bertanya%20mengenai%20paket%20tour"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#D4A373] hover:text-white transition-colors font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Hotline WA: 0812-3456-7890</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('packages')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-sm bg-[#2D4F3F] flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-[#D4A373] animate-spin-slow" />
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-[#2D4F3F] font-serif-title flex items-center gap-1">
              Nusantara <span className="text-[#D4A373]">Explorer</span>
            </div>
            <p className="text-[10px] text-stone-500 tracking-widest uppercase font-bold">
              Premium Travel Agency
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-500">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2 transition-all border-b-2 ${
                  isActive
                    ? 'text-[#2D4F3F] border-[#2D4F3F] font-bold'
                    : 'border-transparent text-stone-500 hover:text-[#2D4F3F]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Interactive Custom Trip Planner Button */}
          <button
            onClick={onOpenAIPlanner}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF9F6] border border-[#2D4F3F]/20 text-[#2D4F3F] hover:bg-[#2D4F3F] hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Rancang Trip Custom</span>
          </button>

          {/* Booking Status / History Button */}
          <button
            onClick={onOpenBookingHistory}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D4F3F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#233f32] shadow-sm transition-all"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Cek Pemesanan</span>
            {bookingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4A373] text-[#2D4F3F] font-extrabold rounded-full text-[10px] flex items-center justify-center border-2 border-white shadow">
                {bookingCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenBookingHistory}
            className="relative p-2 rounded-lg bg-[#FAF9F6] text-[#2D4F3F] border border-[#2D4F3F]/20"
            title="Cek Pemesanan"
          >
            <CalendarCheck className="w-5 h-5 text-[#2D4F3F]" />
            {bookingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4A373] text-[#2D4F3F] font-bold rounded-full text-[9px] flex items-center justify-center">
                {bookingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#FAF9F6] text-[#2D4F3F] border border-[#2D4F3F]/20"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#2D4F3F]/15 px-4 py-4 space-y-3 animate-fadeIn">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#2D4F3F] text-white'
                    : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#2D4F3F]/15 space-y-2">
            <button
              onClick={() => {
                onOpenAIPlanner();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#D4A373] text-white font-bold text-xs uppercase tracking-wider shadow"
            >
              <Sliders className="w-4 h-4" />
              <span>Rancang Trip Interaktif</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
