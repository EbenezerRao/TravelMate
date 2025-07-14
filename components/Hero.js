import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-navy rounded-3xl shadow-badge mt-6 sm:mt-8 mb-8 sm:mb-12 overflow-hidden border-badge-outline border-badge neon-bg px-2 xs:px-4 sm:px-8">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full rounded-3xl border-4 border-yellow animate-neon-glow" style={{ boxShadow: '0 0 32px 8px #FFD166, 0 0 64px 16px #FF6B35' }}></div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-2 xs:px-4 sm:px-6 py-10 xs:py-14 sm:py-16">
        <span className="inline-block bg-yellow text-charcoal font-bold px-3 xs:px-4 py-1.5 xs:py-2 rounded-badge text-xs xs:text-sm mb-3 xs:mb-4 tracking-widest shadow-badge uppercase neon-text-glow">GEN Z & SOLO ADVENTURE</span>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-yellow mb-3 xs:mb-4 sm:mb-6 uppercase tracking-widest flex items-center gap-2 neon-text-glow" style={{ fontFamily: 'Space Grotesk, Poppins, sans-serif', letterSpacing: '0.12em', textShadow: '0 0 16px #FFD166, 0 0 32px #FF6B35' }}>
          <span>TravelMate</span> <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl">🎒</span>
        </h1>
        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white mb-6 xs:mb-8 max-w-2xl font-sans neon-text-glow-soft">
          Backpack, explore, repeat! Plan wild, offbeat journeys with bold badges, emoji tags, and a vibe made for thrill-seekers.
        </p>
        <Link href="/auth/register" className="inline-block px-6 xs:px-8 sm:px-10 py-3 xs:py-4 rounded-badge bg-orange text-white font-bold text-base xs:text-lg shadow-badge hover:bg-yellow hover:text-charcoal transition uppercase tracking-widest neon-btn-glow">
          Start Your Adventure
        </Link>
        <div className="mt-6 xs:mt-8 text-xs xs:text-sm text-yellow font-bold tracking-widest neon-text-glow-soft">FOR BACKPACKERS & SOLO EXPLORERS</div>
      </div>
    </section>
  );
} 