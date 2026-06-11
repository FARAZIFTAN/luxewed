import { useState, useEffect, useRef } from 'react';
import { couple, guestName, weddingDate } from '../data/wedding';

interface OpeningScreenProps {
  onOpen: () => void;
}

export default function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 10}s`,
      size: `${2 + Math.random() * 4}px`,
    }))
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleOpen = () => {
    setIsVisible(false);
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(onOpen, 800);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

        {/* Gold Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gold/30"
            style={{
              left: particle.left,
              bottom: '-10px',
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              animation: `particle ${particle.duration} linear infinite`,
            }}
          />
        ))}

        {/* Shimmer Effect */}
        <div className="absolute inset-0 shimmer-gold opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        {/* Monogram */}
        <div className="animate-scale-in mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-2 border-gold/50 flex items-center justify-center">
              <span className="font-serif text-4xl text-gold">A&A</span>
            </div>
            <div className="absolute inset-0 rounded-full border border-gold/20 gold-glow" />
          </div>
        </div>

        {/* Names */}
        <h1 className="font-serif text-4xl sm:text-5xl text-ivory mb-3 animate-fade-up animate-delay-200">
          Aurora
          <span className="mx-3 text-gold text-2xl">&</span>
          Alexander
        </h1>

        {/* Date */}
        <p className="text-ivory/70 text-sm tracking-[0.3em] uppercase mb-8 animate-fade-up animate-delay-400">
          {formatDate(weddingDate)}
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8 animate-fade-up animate-delay-500" />

        {/* Guest Name */}
        <p className="text-ivory/60 text-base mb-2 animate-fade-up animate-delay-600">
          cordially invites
        </p>
        <p className="font-serif text-2xl text-ivory mb-12 animate-fade-up animate-delay-700">
          {guestName}
        </p>

        {/* Open Button */}
        <button
          onClick={handleOpen}
          className="btn-primary min-w-[200px] animate-fade-up animate-delay-800"
        >
          <span className="relative z-10">Open Invitation</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop preload="auto">
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
