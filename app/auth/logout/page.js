'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-surface rounded-2xl shadow-elegant p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-display font-bold mb-4 text-accent">See you soon!</h1>
        <p className="text-muted mb-4">You’ve been signed out. Safe travels until next time.<br />You will be redirected to sign in shortly.</p>
        <div className="mt-8 text-xs text-muted text-center">Handcrafted for your next journey.</div>
      </div>
    </div>
  );
} 