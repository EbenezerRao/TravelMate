import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';

const tripTypeEmojis = {
  adventure: '🏄‍♂️',
  leisure: '🌴',
  work: '💻',
};

export default function ItineraryCard({ itinerary, onToggleFavorite, onRemove, cardBg }) {
  const {
    title,
    destinations = [],
    tripType,
    startDate,
    endDate,
    activities = [],
    image,
    isFavorite,
  } = itinerary;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.04, boxShadow: '0 8px 32px 0 rgba(255,107,53,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${cardBg ? cardBg : 'bg-white'} rounded-2xl shadow-lg p-4 sm:p-6 md:p-7 flex flex-col gap-3 sm:gap-4 md:gap-5 cursor-pointer w-[90vw] max-w-[340px] sm:max-w-[360px] md:max-w-[420px] min-w-[260px] sm:min-w-[320px] mx-auto relative hover:shadow-2xl transition-all duration-300`}
      style={{}}
    >
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
        aria-label="Remove this trip"
        title="Remove this trip"
      >
        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <img
        src={image || DEFAULT_IMAGE}
        alt={title}
        className="rounded-xl w-full h-32 sm:h-40 md:h-48 object-cover shadow-soft mb-2 border-4 border-yellow"
      />
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-yellow font-display mb-1 uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, Poppins, sans-serif', letterSpacing: '0.08em' }}>{title}</h3>
        <button
          className={`text-2xl sm:text-3xl transition ${isFavorite ? 'text-orange' : 'text-yellow'} hover:scale-125 hover:text-orange focus:outline-none`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites: this trip is already in your heart!' : 'Add to favorites: save this trip for later!'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-1">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-badge border-badge border-badge-outline bg-navy text-yellow font-bold text-sm uppercase tracking-widest shadow-badge">
          {tripTypeEmojis[tripType] || '🎒'} {tripType}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-badge border-badge border-yellow bg-charcoal text-yellow font-bold text-sm uppercase tracking-widest shadow-badge">
          📅 {startDate} – {endDate}
        </span>
      </div>
      <div className="text-yellow text-sm mb-1 font-sans">
        <span className="font-bold">Destinations:</span> {destinations && destinations.length > 0
          ? destinations.map((d, i) => <span key={i} className="inline-block mx-1">{d} <span role="img" aria-label="pin">📍</span></span>)
          : <span className="italic text-gray-400">No destinations</span>
        }
      </div>
      <div className="text-yellow text-sm font-sans">
        <span className="font-bold">Activities:</span>
        <ul className="list-none ml-2 flex flex-wrap gap-2 mt-1">
          {activities && activities.length > 0
            ? activities.map((act, idx) => (
                <li key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-badge border-badge border-yellow bg-navy text-yellow font-bold text-xs shadow-badge">
                  <span role="img" aria-label="activity">🎯</span> {act}
                </li>
              ))
            : <li className="italic text-gray-400">No activities</li>
          }
        </ul>
      </div>
    </motion.div>
  );
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 opacity-70">
      <svg width="64" height="64" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#FFD166"/><path d="M20 44c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/><circle cx="32" cy="28" r="6" fill="#FF6B35"/><circle cx="24" cy="24" r="2" fill="#FFD166"/><circle cx="40" cy="24" r="2" fill="#FFD166"/></svg>
      <div className="mt-4 text-yellow text-lg font-sans font-bold">No trips here yet. Start planning and let your adventures fill this space!</div>
    </div>
  );
} 