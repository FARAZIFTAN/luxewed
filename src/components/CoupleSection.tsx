import { Instagram } from 'lucide-react';
import { couple, Couple } from '../data/wedding';

interface CoupleCardProps {
  person: Couple;
  delay?: number;
}

function CoupleCard({ person, delay = 0 }: CoupleCardProps) {
  return (
    <div
      className="luxury-card glass-card p-1 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-5">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${person.photo}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Gold Border Frame */}
        <div className="absolute inset-2 border border-gold/20 rounded-2xl pointer-events-none" />
      </div>

      {/* Info */}
      <div className="px-4 pb-5 text-center">
        <h3 className="font-serif text-2xl text-ivory mb-1">
          {person.fullName}
        </h3>
        <p className="text-ivory/40 text-xs uppercase tracking-widest mb-4">
          {person.isGroom ? 'The Groom' : 'The Bride'}
        </p>

        {/* Parents */}
        <div className="mb-4">
          <p className="text-ivory/60 text-sm">
            Daughter of
          </p>
          <p className="text-ivory/80 text-sm mt-1">
            {person.parents.father}
          </p>
          <p className="text-ivory/80 text-sm">
            &amp; {person.parents.mother}
          </p>
        </div>

        {/* Social */}
        {person.instagram && (
          <a
            href={`https://instagram.com/${person.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold/70 hover:text-gold transition-colors duration-300"
          >
            <Instagram size={16} />
            <span className="text-sm">{person.instagram}</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function CoupleSection() {
  return (
    <section id="couple" className="px-4 py-20 bg-black">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fade-up">
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">
          The Couple
        </p>
        <h2 className="font-serif text-3xl text-ivory">
          Meet Our Beloved
        </h2>
      </div>

      {/* Couple Cards */}
      <div className="max-w-sm mx-auto space-y-8">
        <CoupleCard person={couple.bride} delay={0} />
        <div className="flex justify-center -my-2">
          <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center z-10 gold-border">
            <span className="text-gold text-2xl">&</span>
          </div>
        </div>
        <CoupleCard person={couple.groom} delay={200} />
      </div>
    </section>
  );
}
