import React from 'react';
import ItineraryCard, { EmptyState } from './ItineraryCard';
import { motion } from 'framer-motion';

export default function ItineraryList({ itineraries = [], onToggleFavorite, onRemove }) {
  if (!itineraries.length) {
    return <EmptyState />;
  }
  return (
    <motion.div
      className="w-full px-2"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <div className="flex flex-col gap-6 py-4 w-full max-w-6xl mx-auto sm:flex-row sm:overflow-x-auto sm:gap-6 sm:snap-x sm:snap-mandatory md:flex-row md:overflow-x-auto md:gap-6 md:snap-x md:snap-mandatory">
        {itineraries.map((itinerary, idx) => (
          <motion.div
            key={itinerary.id || idx}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
            className="flex justify-center min-w-0 sm:min-w-[320px] md:min-w-[320px] max-w-[420px] snap-center"
          >
            <ItineraryCard
              itinerary={itinerary}
              onToggleFavorite={() => onToggleFavorite(itinerary)}
              onRemove={() => onRemove(itinerary)}
              cardBg="bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-50"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 