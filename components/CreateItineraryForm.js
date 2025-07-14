import React, { useState } from 'react';
import { auth, db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';

const tripTypes = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'leisure', label: 'Leisure' },
  { value: 'work', label: 'Work' },
];

function Spinner() {
  return (
    <span className="inline-block w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin align-middle mr-2"></span>
  );
}

export default function CreateItineraryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [destinations, setDestinations] = useState(['']);
  const [tripType, setTripType] = useState('adventure');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activities, setActivities] = useState(['']);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDestinationChange = (idx, value) => {
    const updated = [...destinations];
    updated[idx] = value;
    setDestinations(updated);
  };
  const addDestination = () => setDestinations([...destinations, '']);
  const removeDestination = idx => setDestinations(destinations.filter((_, i) => i !== idx));

  const handleActivityChange = (idx, value) => {
    const updated = [...activities];
    updated[idx] = value;
    setActivities(updated);
  };
  const addActivity = () => setActivities([...activities, '']);
  const removeActivity = idx => setActivities(activities.filter((_, i) => i !== idx));

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      let imageUrl = '';
      if (image) {
        try {
          console.log('Uploading image:', image.name, image.size, image.type);
          const storageRef = ref(storage, `itinerary-images/${Date.now()}-${image.name}`);
          await uploadBytes(storageRef, image);
          console.log('Image uploaded, fetching download URL...');
          imageUrl = await getDownloadURL(storageRef);
          console.log('Image URL:', imageUrl);
        } catch (uploadErr) {
          console.error('Image upload failed:', uploadErr);
          setError('Image upload failed. Please try a different image or check your connection.');
          setLoading(false);
          return;
        }
      }
      const user = auth.currentUser;
      if (!user) throw new Error('Please log in to save your trip.');
      await addDoc(collection(db, 'itineraries'), {
        userId: user.uid,
        title,
        destinations: destinations.filter(Boolean),
        tripType,
        startDate,
        endDate,
        activities: activities.filter(Boolean),
        image: imageUrl,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTitle('');
      setDestinations(['']);
      setTripType('adventure');
      setStartDate('');
      setEndDate('');
      setActivities(['']);
      setImage(null);
      setImagePreview(null);
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error('Trip save failed:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      <div className="text-muted text-sm mb-2">Dream big! The more details you add, the more memorable your adventure will be.</div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">Trip saved! Bon voyage! 🎉</div>}
      <div>
        <label className="block text-accent font-semibold mb-1">Trip Title</label>
        <input
          type="text"
          className="w-full p-3 rounded-xl border border-muted bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          placeholder="e.g. Exploring the Amalfi Coast"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-accent font-semibold mb-1">Destinations</label>
        {destinations.map((dest, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 p-3 rounded-xl border border-muted bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
              placeholder="e.g. Positano"
              value={dest}
              onChange={e => handleDestinationChange(idx, e.target.value)}
              required
            />
            {destinations.length > 1 && (
              <button type="button" onClick={() => removeDestination(idx)} className="px-3 py-1 rounded-xl bg-muted text-white hover:bg-accent transition" aria-label="Remove destination">-</button>
            )}
            {idx === destinations.length - 1 && (
              <button type="button" onClick={addDestination} className="px-3 py-1 rounded-xl bg-accent text-white hover:bg-highlight transition" aria-label="Add destination">+</button>
            )}
          </div>
        ))}
      </div>
      <div>
        <label className="block text-accent font-semibold mb-1">Trip Type</label>
        <select
          className="w-full p-3 rounded-xl border border-muted bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          value={tripType}
          onChange={e => setTripType(e.target.value)}
        >
          {tripTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-accent font-semibold mb-1">Start Date</label>
          <input
            type="date"
            className="w-full p-3 rounded-xl border border-muted bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-accent font-semibold mb-1">End Date</label>
          <input
            type="date"
            className="w-full p-3 rounded-xl border border-muted bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-accent font-semibold mb-1">Activities</label>
        {activities.map((act, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 p-3 rounded-xl border border-muted bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
              placeholder="e.g. Sunset boat tour"
              value={act}
              onChange={e => handleActivityChange(idx, e.target.value)}
              required
            />
            {activities.length > 1 && (
              <button type="button" onClick={() => removeActivity(idx)} className="px-3 py-1 rounded-xl bg-muted text-white hover:bg-accent transition" aria-label="Remove activity">-</button>
            )}
            {idx === activities.length - 1 && (
              <button type="button" onClick={addActivity} className="px-3 py-1 rounded-xl bg-accent text-white hover:bg-highlight transition" aria-label="Add activity">+</button>
            )}
          </div>
        ))}
      </div>
      <div>
        <label className="block text-accent font-semibold mb-1">Trip Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full p-3 rounded-xl border border-muted bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-4 rounded-2xl shadow-soft w-full max-h-64 object-cover" />
        )}
      </div>
      <motion.button
        type="submit"
        className="w-full py-3 rounded-2xl bg-accent text-white font-semibold shadow-soft hover:bg-highlight transition text-lg flex items-center justify-center"
        disabled={loading}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        {loading ? <Spinner /> : null}
        {loading ? 'Saving...' : 'Save Trip'}
      </motion.button>
    </form>
  );
} 