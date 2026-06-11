import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 py-12 bg-black text-center">
      {/* Divider */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-8" />

      {/* Monogram */}
      <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-4">
        <span className="font-serif text-xl text-gold">A&A</span>
      </div>

      {/* Quote */}
      <p className="font-serif text-ivory/80 text-lg italic mb-4 max-w-xs mx-auto">
        "Every love story is beautiful, but ours is my favorite."
      </p>

      {/* Decorative */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-8 h-px bg-gold/30" />
        <Heart size={14} className="text-gold" />
        <div className="w-8 h-px bg-gold/30" />
      </div>

      {/* Copyright */}
      <p className="text-ivory/40 text-xs">
        Aurora & Alexander Wedding
      </p>
      <p className="text-ivory/30 text-xs mt-1">
        September 15, 2026
      </p>

      {/* Made With */}
      <div className="mt-8 text-ivory/30 text-xs">
        <p>Made with love {currentYear}</p>
      </div>
    </footer>
  );
}
