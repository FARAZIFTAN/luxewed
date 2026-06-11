import { MapPin, Clock, Calendar, Shirt } from 'lucide-react';
import { events, Event } from '../data/wedding';

interface EventCardProps {
  event: Event;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  return (
    <div
      className="luxury-card glass-card gold-border p-6 animate-fade-up"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-gold/70 text-xs uppercase tracking-[0.2em] mb-1">
            {event.type === 'akad' ? 'Sacred Ceremony' : 'Celebration'}
          </p>
          <h3 className="font-serif text-2xl text-ivory">{event.title}</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
          <Calendar size={24} className="text-gold" />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4 mb-6">
        {/* Date */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
            <Calendar size={18} className="text-gold/70" />
          </div>
          <div>
            <p className="text-ivory/80 text-sm">{event.date}</p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
            <Clock size={18} className="text-gold/70" />
          </div>
          <div>
            <p className="text-ivory/80 text-sm">{event.time}</p>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-gold/70" />
          </div>
          <div>
            <p className="text-ivory text-sm font-medium">{event.venue}</p>
            <p className="text-ivory/60 text-sm">{event.address}</p>
          </div>
        </div>

        {/* Dress Code */}
        {event.dressCode && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <Shirt size={18} className="text-gold/70" />
            </div>
            <div>
              <p className="text-ivory/60 text-xs">Dress Code</p>
              <p className="text-ivory/80 text-sm">{event.dressCode}</p>
            </div>
          </div>
        )}
      </div>

      {/* Maps Button */}
      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary w-full flex items-center justify-center gap-2"
      >
        <MapPin size={18} />
        <span>Open in Maps</span>
      </a>
    </div>
  );
}

export default function EventSection() {
  return (
    <section id="event" className="px-4 py-20 bg-black">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fade-up">
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">
          Save The Date
        </p>
        <h2 className="font-serif text-3xl text-ivory">
          Wedding Events
        </h2>
      </div>

      {/* Event Cards */}
      <div className="max-w-sm mx-auto space-y-6">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      {/* Calendar Add */}
      <div className="max-w-sm mx-auto mt-8 text-center animate-fade-up animate-delay-400">
        <button className="inline-flex items-center gap-2 text-gold/60 hover:text-gold transition-colors duration-300 text-sm">
          <Calendar size={16} />
          <span>Add to Calendar</span>
        </button>
      </div>
    </section>
  );
}
