import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Attendance = 'yes' | 'no' | 'maybe';

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes' as Attendance,
    guestCount: 1,
    wishes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('rsvp').insert({
        name: formData.name,
        attendance: formData.attendance,
        guest_count: formData.guestCount,
        wishes: formData.wishes,
      });

      if (error) throw error;

      setStatus('success');
      setFormData({
        name: '',
        attendance: 'yes',
        guestCount: 1,
        wishes: '',
      });
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const attendanceOptions: { value: Attendance; label: string }[] = [
    { value: 'yes', label: 'Yes, I will attend' },
    { value: 'no', label: 'Sorry, I cannot attend' },
    { value: 'maybe', label: 'Maybe, still considering' },
  ];

  return (
    <section id="rsvp" className="px-4 py-20 bg-black">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fade-up">
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">
          Respond
        </p>
        <h2 className="font-serif text-3xl text-ivory mb-4">
          RSVP
        </h2>
        <p className="text-ivory/60 text-sm max-w-xs mx-auto">
          We would be honored by your presence at our Wedding Ceremony
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-6">
        {/* Name Input */}
        <div className="animate-fade-up animate-delay-100">
          <label className="block text-ivory/60 text-xs uppercase tracking-wider mb-2 px-1">
            Your Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            className="input-luxury"
            required
          />
        </div>

        {/* Attendance Select */}
        <div className="animate-fade-up animate-delay-200">
          <label className="block text-ivory/60 text-xs uppercase tracking-wider mb-2 px-1">
            Attendance
          </label>
          <div className="grid grid-cols-1 gap-3">
            {attendanceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, attendance: option.value })}
                className={`w-full py-4 px-5 rounded-2xl border transition-all duration-300 text-left ${
                  formData.attendance === option.value
                    ? 'bg-gold/10 border-gold/50 text-gold'
                    : 'bg-white/5 border-white/10 text-ivory/70 hover:border-white/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Count */}
        {formData.attendance !== 'no' && (
          <div className="animate-fade-up animate-delay-300">
            <label className="block text-ivory/60 text-xs uppercase tracking-wider mb-2 px-1">
              Number of Guests
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, guestCount: Math.max(1, formData.guestCount - 1) })}
                className="w-14 h-14 rounded-2xl glass-card border border-white/10 flex items-center justify-center text-ivory text-xl"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <span className="font-serif text-3xl text-gold">{formData.guestCount}</span>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, guestCount: Math.min(5, formData.guestCount + 1) })}
                className="w-14 h-14 rounded-2xl glass-card border border-white/10 flex items-center justify-center text-ivory text-xl"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Wishes */}
        <div className="animate-fade-up animate-delay-400">
          <label className="block text-ivory/60 text-xs uppercase tracking-wider mb-2 px-1">
            Your Wishes
          </label>
          <textarea
            value={formData.wishes}
            onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
            placeholder="Write your wishes for the couple..."
            rows={4}
            className="input-luxury resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="animate-fade-up animate-delay-500 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                <span>Send RSVP</span>
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="flex items-center justify-center gap-2 text-green-500 animate-fade-up">
            <Check size={18} />
            <span>RSVP sent successfully!</span>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 text-red-400 animate-fade-up">
            <AlertCircle size={18} />
            <span>Something went wrong. Please try again.</span>
          </div>
        )}
      </form>
    </section>
  );
}
