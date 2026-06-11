export interface Couple {
  name: string;
  fullName: string;
  parents: {
    father: string;
    mother: string;
  };
  photo: string;
  instagram?: string;
  isGroom: boolean;
}

export interface Story {
  id: string;
  date: string;
  title: string;
  description: string;
  photo: string;
}

export interface Event {
  id: string;
  type: 'akad' | 'reception';
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  dressCode?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface RSVP {
  id?: string;
  name: string;
  attendance: 'yes' | 'no' | 'maybe';
  guestCount: number;
  wishes: string;
  createdAt?: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface GiftOption {
  id: string;
  type: 'bank' | 'ewallet' | 'address';
  title: string;
  accountName: string;
  accountNumber: string;
  bankName?: string;
  qrCode?: string;
  address?: string;
}

export const weddingDate = new Date('2026-09-15T10:00:00');

export const couple: { bride: Couple; groom: Couple } = {
  bride: {
    name: 'Aurora',
    fullName: 'Aurora Elizabeth Anderson',
    parents: {
      father: 'Mr. James Anderson',
      mother: 'Mrs. Sarah Anderson',
    },
    photo: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=800',
    instagram: '@aurora.elizabeth',
    isGroom: false,
  },
  groom: {
    name: 'Alexander',
    fullName: 'Alexander Michael Laurent',
    parents: {
      father: 'Mr. Michael Laurent',
      mother: 'Mrs. Christine Laurent',
    },
    photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800',
    instagram: '@alex.laurent',
    isGroom: true,
  },
};

export const guestName = 'Dear Guest';

export const loveStories: Story[] = [
  {
    id: 'story-1',
    date: 'March 2021',
    title: 'Our First Meeting',
    description: 'It was a warm afternoon at a friend\'s gathering when our eyes first met. Little did we know, that simple introduction would be the beginning of our forever.',
    photo: 'https://images.pexels.com/photos/2657463/pexels-photo-2657463.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'story-2',
    date: 'December 2022',
    title: 'The Proposal',
    description: 'Under a starlit sky in Paris, with the Eiffel Tower glittering in the background, he knelt on one knee and asked the question that would change everything.',
    photo: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'story-3',
    date: 'September 2026',
    title: 'Forever Begins',
    description: 'Surrounded by the ones we love most, we will exchange our vows and begin this beautiful journey together as husband and wife.',
    photo: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const events: Event[] = [
  {
    id: 'event-akad',
    type: 'akad',
    title: 'Akad Nikah',
    date: 'September 15, 2026',
    time: '10:00 AM - 12:00 PM',
    venue: 'The Grand Ballroom',
    address: 'The Ritz-Carlton, 5star Avenue, Jakarta',
    mapsUrl: 'https://maps.google.com/?q=The+Ritz+Carlton+Jakarta',
    dressCode: 'Formal / Pastel Colors',
  },
  {
    id: 'event-reception',
    type: 'reception',
    title: 'Wedding Reception',
    date: 'September 15, 2026',
    time: '6:00 PM - 10:00 PM',
    venue: 'Crystal Garden',
    address: 'The Ritz-Carlton, 5star Avenue, Jakarta',
    mapsUrl: 'https://maps.google.com/?q=The+Ritz+Carlton+Jakarta',
    dressCode: 'Black Tie / Gold Accents',
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: 'gallery-1',
    src: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Couple portrait',
    width: 800,
    height: 1200,
  },
  {
    id: 'gallery-2',
    src: 'https://images.pexels.com/photos/2657463/pexels-photo-2657463.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Romantic moment',
    width: 800,
    height: 1067,
  },
  {
    id: 'gallery-3',
    src: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Engagement',
    width: 800,
    height: 800,
  },
  {
    id: 'gallery-4',
    src: 'https://images.pexels.com/photos/3014857/pexels-photo-3014857.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Together',
    width: 800,
    height: 1200,
  },
  {
    id: 'gallery-5',
    src: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Love story',
    width: 800,
    height: 600,
  },
  {
    id: 'gallery-6',
    src: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Couple walking',
    width: 800,
    height: 1333,
  },
];

export const giftOptions: GiftOption[] = [
  {
    id: 'gift-bank',
    type: 'bank',
    title: 'Bank Transfer',
    accountName: 'Aurora E. Anderson',
    accountNumber: '1234 5678 9012',
    bankName: 'Bank Central Asia',
  },
  {
    id: 'gift-ewallet',
    type: 'ewallet',
    title: 'E-Wallet',
    accountName: 'Alexander Laurent',
    accountNumber: '0812 3456 7890',
    bankName: 'GoPay / OVO / DANA',
  },
  {
    id: 'gift-address',
    type: 'address',
    title: 'Send Gift',
    accountName: 'Aurora & Alexander',
    accountNumber: '',
    address: 'Jl. Luxury Avenue No. 88, Jakarta Selatan 12345',
  },
];

export const romanticQuotes = [
  '"In all the world, there is no heart for me like yours."',
  '"Love is composed of a single soul inhabiting two bodies."',
  '"Forever is a long time, but I wouldn\'t mind spending it by your side."',
];
