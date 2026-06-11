import { useState, useRef, useEffect } from 'react';
import { Music, Music2, Navigation } from 'lucide-react';

interface FloatingElementsProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function FloatingElements({ audioRef }: FloatingElementsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-40 w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Music2 size={20} className="text-gold animate-pulse" />
        ) : (
          <Music size={20} className="text-ivory/70" />
        )}
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-4 z-30 w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <Navigation size={20} className="text-ivory/70 -rotate-90" />
      </button>

      {/* Floating RSVP Button */}
      <button
        onClick={scrollToRSVP}
        className="fixed bottom-24 left-4 z-30 btn-primary py-3 px-5 text-sm font-medium flex items-center gap-2 rounded-full shadow-lg"
      >
        <Navigation size={16} className="rotate-90" />
        <span>RSVP</span>
      </button>
    </>
  );
}
