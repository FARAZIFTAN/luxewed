import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function WishCard({ wish, index }: { wish: Wish; index: number }) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className="glass-card p-4 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
            <Heart size={14} className="text-gold" />
          </div>
          <span className="text-ivory font-medium text-sm">{wish.name}</span>
        </div>
        <span className="text-ivory/40 text-xs">{formatDate(wish.created_at)}</span>
      </div>

      {/* Message */}
      <p className="text-ivory/70 text-sm leading-relaxed pl-10">
        {wish.message}
      </p>
    </div>
  );
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const { data, error } = await supabase
          .from('wishes')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setWishes(data || []);
      } catch {
        // Use sample wishes if fetch fails
        setWishes([
          {
            id: '1',
            name: 'Emma & John',
            message: 'May your love bloom eternally. Wishing you both a lifetime of happiness!',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Michael',
            message: 'Beautiful couple! May your journey together be filled with love, laughter, and endless adventures.',
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: '3',
            name: 'Sophia',
            message: 'Congratulations on your wedding! Your love story is truly inspiring.',
            created_at: new Date(Date.now() - 172800000).toISOString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishes();
  }, []);

  return (
    <section id="wishes" className="px-4 py-20 bg-gradient-to-b from-black to-black/95">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fade-up">
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">
          Messages
        </p>
        <h2 className="font-serif text-3xl text-ivory">
          Warm Wishes
        </h2>
      </div>

      {/* Wishes List */}
      <div className="max-w-sm mx-auto space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : (
          wishes.map((wish, index) => <WishCard key={wish.id} wish={wish} index={index} />)
        )}
      </div>
    </section>
  );
}
