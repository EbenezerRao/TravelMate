// Handcrafted layout for your travel adventures
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import { ToastProvider } from '../components/ToastContainer';
import ClientLayout from '../components/ClientLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TravelMate – Backpack, Explore, Repeat!",
  description: "TravelMate: The bold, fun itinerary planner for backpackers, thrill-seekers, and solo adventurers. Plan offbeat, emoji-filled journeys!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
