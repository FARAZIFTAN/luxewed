import { useState, useEffect } from 'react';
import Countdown from './Countdown';
import { couple, weddingDate, romanticQuotes } from '../data/wedding';

export default function HeroSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % romanticQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('${couple.bride.photo}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto">
        {/* Names */}
        <div className="mb-6 animate-fade-up">
          <h1 className="font-serif text-5xl sm:text-6xl text-ivory leading-tight">
            Aurora
          </h1>
          <div className="flex items-center justify-center my-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="mx-3 text-gold text-2xl">&</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-ivory leading-tight">
            Alexander
          </h1>
        </div>

        {/* Date */}
        <div className="mb-10 animate-fade-up animate-delay-200">
          <p className="text-ivory/70 text-sm tracking-[0.2em] uppercase mb-2">
            Are Getting Married
          </p>
          <p className="font-serif text-xl text-gold">
            {formatDate(weddingDate)}
          </p>
        </div>

        {/* Quote */}
        <div className="mb-10 h-16 flex items-center justify-center">
          <p
            key={quoteIndex}
            className="text-ivory/60 text-sm italic leading-relaxed max-w-xs animate-blur-reveal px-4"
          >
            {romanticQuotes[quoteIndex]}
          </p>
        </div>

        {/* Countdown */}
        <Countdown />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center pt-2 px-1">
          <div className="w-1 h-2 bg-gold/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
