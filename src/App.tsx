import { useState, useRef, useEffect, useCallback } from 'react';
import OpeningScreen from './components/OpeningScreen';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import LoveStorySection from './components/LoveStorySection';
import EventSection from './components/EventSection';
import GallerySection from './components/GallerySection';
import RSVPSection from './components/RSVPSection';
import WishesSection from './components/WishesSection';
import GiftSection from './components/GiftSection';
import BottomNav from './components/BottomNav';
import FloatingElements from './components/FloatingElements';
import Footer from './components/Footer';

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenInvitation = useCallback(() => {
    setIsInvitationOpen(true);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (!isInvitationOpen) return;

    const sections = ['home', 'couple', 'story', 'event', 'gallery', 'rsvp'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInvitationOpen]);

  // Create audio element for background music
  useEffect(() => {
    audioRef.current = document.querySelector('audio');
  }, []);

  if (!isInvitationOpen) {
    return <OpeningScreen onOpen={handleOpenInvitation} />;
  }

  return (
    <div className="min-h-screen bg-black text-ivory">
      {/* Main Content */}
      <main className="pb-24">
        <div id="home">
          <HeroSection />
        </div>
        <CoupleSection />
        <LoveStorySection />
        <EventSection />
        <GallerySection />
        <RSVPSection />
        <WishesSection />
        <GiftSection />
        <Footer />
      </main>

      {/* Floating Elements */}
      <FloatingElements audioRef={audioRef} />

      {/* Bottom Navigation */}
      <BottomNav activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
