'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

const user = {
  displayName: 'Jane Doe',
  email: 'jane@example.com',
};
const isLoggedIn = !!user;

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-charcoal shadow-badge py-3 sm:py-4 px-2 xs:px-4 sm:px-6 md:px-8 flex items-center justify-between rounded-b-badge relative" style={{ paddingLeft: 'max(env(safe-area-inset-left), 0.5rem)', paddingRight: 'max(env(safe-area-inset-right), 0.5rem)' }}>
      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
        <Link href="/" className="text-xl xs:text-2xl sm:text-3xl font-display font-extrabold tracking-widest text-orange uppercase" style={{ fontFamily: 'Space Grotesk, Poppins, sans-serif', letterSpacing: '0.15em' }}>
          TravelMate
        </Link>
        <div className="hidden md:flex gap-2 xs:gap-4 sm:gap-6 ml-1 xs:ml-2 sm:ml-8">
          <Link href="/dashboard" className="text-yellow hover:text-orange transition font-bold text-sm xs:text-base sm:text-lg flex items-center gap-1 px-1 xs:px-2 py-1 rounded-md">🏠 <span>DASHBOARD</span></Link>
          <Link href="/dashboard#create" className="text-yellow hover:text-orange transition font-bold text-sm xs:text-base sm:text-lg flex items-center gap-1 px-1 xs:px-2 py-1 rounded-md">🗺️ <span>PLAN</span></Link>
          <Link href="/dashboard#my-trips" className="text-yellow hover:text-orange transition font-bold text-sm xs:text-base sm:text-lg flex items-center gap-1 px-1 xs:px-2 py-1 rounded-md">🎒 <span>TRIPS</span></Link>
          <Link href="/dashboard#favorites" className="text-yellow hover:text-orange transition font-bold text-sm xs:text-base sm:text-lg flex items-center gap-1 px-1 xs:px-2 py-1 rounded-md">⭐ <span>FAVES</span></Link>
        </div>
      </div>
      <div className="flex items-center gap-1 xs:gap-2 sm:gap-4">
        <button
          className="md:hidden inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-yellow text-charcoal shadow-badge-glow hover:bg-orange hover:text-white transition focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-5 h-5 xs:w-7 xs:h-7" />
        </button>
        <button
          className="inline-flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-orange text-white font-display text-base xs:text-lg font-bold shadow-badge-glow transition-transform group-hover:scale-105 cursor-pointer select-none focus:outline-none"
          aria-label="User menu"
          onClick={() => router.push(isLoggedIn ? '/auth/logout' : '/auth/login')}
        >
          <User className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
        </button>
        {!isLoggedIn && (
          <Link href="/auth/login" className="rounded-full bg-orange text-white px-2 py-1 xs:px-3 xs:py-2 sm:px-4 sm:py-2 font-semibold shadow-badge hover:bg-yellow hover:text-charcoal transition text-xs xs:text-sm sm:text-base">Login</Link>
        )}
      </div>
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-charcoal rounded-xl shadow-badge p-3 xs:p-5 flex flex-col gap-2 xs:gap-3 z-50 min-w-[180px] xs:min-w-[200px] border border-yellow animate-fade-in md:hidden" style={{ paddingLeft: 'max(env(safe-area-inset-left), 0.5rem)', paddingRight: 'max(env(safe-area-inset-right), 0.5rem)' }}>
          <Link href="/dashboard" className="text-yellow hover:text-orange transition font-bold text-base xs:text-lg flex items-center gap-2 px-2 xs:px-3 py-2 xs:py-3 rounded-lg" onClick={() => setMenuOpen(false)}>🏠 DASHBOARD</Link>
          <Link href="/dashboard#create" className="text-yellow hover:text-orange transition font-bold text-base xs:text-lg flex items-center gap-2 px-2 xs:px-3 py-2 xs:py-3 rounded-lg" onClick={() => setMenuOpen(false)}>🗺️ PLAN</Link>
          <Link href="/dashboard#my-trips" className="text-yellow hover:text-orange transition font-bold text-base xs:text-lg flex items-center gap-2 px-2 xs:px-3 py-2 xs:py-3 rounded-lg" onClick={() => setMenuOpen(false)}>🎒 TRIPS</Link>
          <Link href="/dashboard#favorites" className="text-yellow hover:text-orange transition font-bold text-base xs:text-lg flex items-center gap-2 px-2 xs:px-3 py-2 xs:py-3 rounded-lg" onClick={() => setMenuOpen(false)}>⭐ FAVES</Link>
        </div>
      )}
      <span className="hidden md:inline text-xs text-yellow ml-2 xs:ml-4 sm:ml-6 font-bold tracking-widest">FOR BACKPACKERS & SOLO EXPLORERS</span>
    </nav>
  );
} 