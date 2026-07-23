import { BookingAddon } from '../types';

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'addon-drone',
    name: 'Dokumentasi Drone 4K & Videografer Pro',
    price: 750000,
    priceType: 'per_group',
    description: 'Video cinematic durasi 1-2 menit + seluruh footage video mentah drone 4K aerial',
    iconName: 'Camera'
  },
  {
    id: 'addon-vip-transport',
    name: 'Upgrade Fleet Transport VIP HiAce Luxury',
    price: 500000,
    priceType: 'per_day',
    description: 'Sofa Captain Seat, Smart TV, Sound System Karaoke, Reclining Seat & Usb Port',
    iconName: 'Truck'
  },
  {
    id: 'addon-gala-dinner',
    name: 'Makan Malam Spesial BBQ / Gala Dinner',
    price: 175000,
    priceType: 'per_pax',
    description: 'Menu seafood segar / steak BBQ dengan dekorasi meja cantik & musik latar',
    iconName: 'Utensils'
  },
  {
    id: 'addon-tour-guide-vip',
    name: 'Pemandu Wisata & Liaison Officer Lisensi HPI VIP',
    price: 350000,
    priceType: 'per_day',
    description: 'Guide lokal bersertifikat HPI fluent English/Indonesian ramah keluarga & grup',
    iconName: 'UserCheck'
  },
  {
    id: 'addon-custom-banner',
    name: 'Banner Spanduk Welcome & Kaos Trip Custom',
    price: 85000,
    priceType: 'per_pax',
    description: 'Desain nama rombongan/perusahaan + bahan kaos cotton combed 30s adem',
    iconName: 'Shirt'
  }
];
