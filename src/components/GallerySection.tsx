import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, GalleryImage } from '../data/wedding';

function MasonryGrid({ images, onImageClick }: { images: GalleryImage[]; onImageClick: (index: number) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((image, index) => {
        const isWide = index % 4 === 0;
        return (
          <button
            key={image.id}
            onClick={() => onImageClick(index)}
            className={`relative overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02] ${
              isWide ? 'col-span-2 aspect-[4/3]' : 'aspect-[3/4]'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${image.src}')` }}
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
          </button>
        );
      })}
    </div>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[currentIndex];

  const handleSwipe = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;

    const handleTouchEnd = (e: TouchEvent) => {
      const endTouch = e.changedTouches[0];
      const diff = startX - endTouch.clientX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          onNext();
        } else {
          onPrev();
        }
      }

      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center"
      >
        <X size={24} className="text-ivory" />
      </button>

      {/* Navigation */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center"
      >
        <ChevronLeft size={24} className="text-ivory" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center"
      >
        <ChevronRight size={24} className="text-ivory" />
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-lg px-16 py-20"
        onTouchStart={handleSwipe}
      >
        <div
          className="w-full aspect-[3/4] bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url('${image.src}')` }}
        />
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <span className="text-ivory/60 text-sm">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const handleClose = () => setIsLightboxOpen(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="px-4 py-20 bg-gradient-to-b from-black/95 to-black">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fade-up">
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">
          Our Moments
        </p>
        <h2 className="font-serif text-3xl text-ivory">
          Photo Gallery
        </h2>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-sm mx-auto">
        <MasonryGrid images={galleryImages} onImageClick={handleImageClick} />
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          images={galleryImages}
          currentIndex={currentIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
