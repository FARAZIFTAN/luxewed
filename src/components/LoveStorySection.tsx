import { loveStories, Story } from '../data/wedding';

interface StoryCardProps {
  story: Story;
  index: number;
}

function StoryCard({ story, index }: StoryCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className="luxury-card glass-card p-1 mb-8 animate-fade-up"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-5">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${story.photo}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Date Badge */}
        <div
          className={`absolute top-4 ${isEven ? 'left-4' : 'right-4'} glass-card px-4 py-2 gold-border`}
        >
          <span className="text-gold text-sm font-medium">{story.date}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-5">
        <h3 className="font-serif text-xl text-ivory mb-2">{story.title}</h3>
        <p className="text-ivory/60 text-sm leading-relaxed">
          {story.description}
        </p>
      </div>

      {/* Decorative Element */}
      <div className="flex justify-center pb-4">
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>
    </div>
  );
}

export default function LoveStorySection() {
  return (
    <section id="story" className="px-4 py-20 bg-gradient-to-b from-black to-black/95">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fade-up">
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">
          Our Journey
        </p>
        <h2 className="font-serif text-3xl text-ivory">
          Love Story
        </h2>
      </div>

      {/* Stories */}
      <div className="max-w-sm mx-auto">
        {/* Decorative Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/50 to-gold/30" />

          <div className="space-y-8">
            {loveStories.map((story, index) => (
              <div key={story.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-20 z-10">
                  <div className="w-4 h-4 rounded-full bg-gold border-2 border-black" />
                </div>

                <StoryCard story={story} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
