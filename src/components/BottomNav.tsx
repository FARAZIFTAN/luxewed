import { useState, useEffect } from 'react';
import { Home, Heart, BookOpen, Calendar, Camera, Send } from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: <Home size={22} />, label: 'Home' },
  { id: 'couple', icon: <Heart size={22} />, label: 'Couple' },
  { id: 'story', icon: <BookOpen size={22} />, label: 'Story' },
  { id: 'event', icon: <Calendar size={22} />, label: 'Event' },
  { id: 'gallery', icon: <Camera size={22} />, label: 'Gallery' },
  { id: 'rsvp', icon: <Send size={22} />, label: 'RSVP' },
];

interface BottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 safe-bottom ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Desktop Container */}
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div className="glass-nav rounded-3xl p-2 flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'text-gold'
                    : 'text-ivory/50 hover:text-ivory'
                }`}
              >
                {/* Active Background */}
                {isActive && (
                  <div className="absolute inset-0 bg-gold/10 rounded-2xl" />
                )}

                {/* Icon */}
                <span className="relative z-10">{item.icon}</span>

                {/* Label */}
                <span className="text-[10px] mt-1 tracking-wide">
                  {item.label}
                </span>

                {/* Active Dot */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
