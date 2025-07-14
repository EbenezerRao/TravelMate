'use client';
import React, { useEffect, useState } from 'react';
import CreateItineraryForm from '../../components/CreateItineraryForm';
import ItineraryList from '../../components/ItineraryList';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, setDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';

const sectionStyle =
  'flex items-center gap-2 mb-2 px-4 py-2 bg-yellow text-charcoal rounded-badge font-extrabold text-lg md:text-xl uppercase tracking-widest shadow-badge';

export default function DashboardPage() {
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [favLoading, setFavLoading] = useState(true);
  const [favError, setFavError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setError('Please log in to see your adventures.');
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, 'itineraries'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setMyTrips(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        setError('Could not fetch your trips. Try refreshing or check your connection.');
        setLoading(false);
      }
    );
    (async () => {
      try {
        const allTripsSnap = await getDocs(collection(db, 'itineraries'));
        const allTrips = allTripsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // No debug log
      } catch (e) {
        // No debug log
      }
    })();
    return () => unsub();
  }, [user, authLoading]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setFavError('Please log in to see your favorites.');
      setFavLoading(false);
      return;
    }
    const favCol = collection(db, 'users', user.uid, 'favorites');
    const unsub = onSnapshot(
      favCol,
      async (snapshot) => {
        const favs = await Promise.all(snapshot.docs.map(async favDoc => {
          const itineraryRef = doc(db, 'itineraries', favDoc.id);
          const itinerarySnap = await getDoc(itineraryRef);
          return itinerarySnap.exists() ? { id: favDoc.id, ...itinerarySnap.data(), isFavorite: true } : null;
        }));
        setFavorites(favs.filter(Boolean));
        setFavLoading(false);
      },
      (err) => {
        setFavError('Could not fetch your favorites. Try again soon.');
        setFavLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const handleToggleFavorite = async (itinerary) => {
    const user = auth.currentUser;
    if (!user) return;
    const favRef = doc(db, 'users', user.uid, 'favorites', itinerary.id);

    // Optimistic update
    let wasFavorite = itinerary.isFavorite;
    setFavorites((prev) => {
      if (wasFavorite) {
        return prev.filter(fav => fav.id !== itinerary.id);
      } else {
        return [...prev, { ...itinerary, isFavorite: true }];
      }
    });

    try {
      if (wasFavorite) {
        await deleteDoc(favRef);
      } else {
        await setDoc(favRef, { addedAt: new Date() });
      }
    } catch (err) {
      // Revert optimistic update on error
      setFavorites((prev) => {
        if (wasFavorite) {
          return [...prev, { ...itinerary, isFavorite: true }];
        } else {
          return prev.filter(fav => fav.id !== itinerary.id);
        }
      });
      alert('Could not update favorite. Please try again.');
    }
  };

  const handleRemoveTrip = async (itinerary) => {
    if (!window.confirm(`Are you sure you want to remove the trip "${itinerary.title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'itineraries', itinerary.id));
    } catch (err) {
      alert('Could not remove trip. Please try again.');
    }
  };

  const myTripsWithFavs = myTrips.map(trip => ({
    ...trip,
    isFavorite: !!favorites.find(fav => fav.id === trip.id)
  }));

  const filterItineraries = (list) => {
    if (!search.trim()) return list;
    const q = search.trim().toLowerCase();
    return list.filter(trip =>
      (trip.destinations && trip.destinations.some(dest => dest.toLowerCase().includes(q))) ||
      (trip.activities && trip.activities.some(act => act.toLowerCase().includes(q)))
    );
  };

  return (
    <main className="min-h-screen bg-navy p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-extrabold text-yellow mb-8 uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, Poppins, sans-serif', letterSpacing: '0.12em' }}>
          TravelMate Dashboard <span className="text-3xl">🌍</span>
        </h1>
        {authLoading ? (
          <div className="text-yellow text-center py-8 font-bold">Loading your dashboard...</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 justify-center items-stretch w-full">
          <section className="bg-charcoal rounded-badge shadow-badge p-6 max-w-[500px] w-full mx-auto h-full flex flex-col" id="create">
            <div className={sectionStyle}>🗺️ PLAN A NEW TRIP</div>
            <CreateItineraryForm />
          </section>
          <section className="bg-charcoal rounded-badge shadow-badge p-6 max-w-[500px] w-full mx-auto h-full flex flex-col" id="my-trips">
            <div className={sectionStyle}>🎒 YOUR ADVENTURES</div>
            <input
              type="text"
              placeholder="Search by destination or activity..."
              className="w-full mb-4 p-2 rounded-badge border border-yellow bg-navy text-yellow focus:outline-none focus:ring-2 focus:ring-orange transition font-sans"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {loading ? (
              <div className="text-yellow text-center py-8 font-bold">Fetching your adventures...</div>
            ) : error ? (
              <div className="text-orange text-center py-8 font-bold">Could not fetch your trips. Try refreshing or check your connection.</div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <ItineraryList itineraries={filterItineraries(myTripsWithFavs)} onToggleFavorite={handleToggleFavorite} onRemove={handleRemoveTrip} />
              </motion.div>
            )}
          </section>
          <section className="bg-charcoal rounded-badge shadow-badge p-6 max-w-[500px] w-full mx-auto h-full flex flex-col" id="favorites">
            <div className={sectionStyle}>⭐ SAVED FAVES</div>
            <input
              type="text"
              placeholder="Search by destination or activity..."
              className="w-full mb-4 p-2 rounded-badge border border-yellow bg-navy text-yellow focus:outline-none focus:ring-2 focus:ring-orange transition font-sans"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {favLoading ? (
              <div className="text-yellow text-center py-8 font-bold">Gathering your favorite places...</div>
            ) : favError ? (
              <div className="text-orange text-center py-8 font-bold">{favError}</div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <ItineraryList itineraries={filterItineraries(favorites)} onToggleFavorite={handleToggleFavorite} onRemove={handleRemoveTrip} />
              </motion.div>
            )}
          </section>
        </div>
        )}
        <footer className="mt-12 text-center text-xs text-yellow font-bold tracking-widest">TravelMate &mdash; Backpack, Explore, Repeat!</footer>
      </div>
    </main>
  );
} 