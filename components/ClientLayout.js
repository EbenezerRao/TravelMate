"use client";
import Navbar from './Navbar';
import { ToastProvider } from './ToastContainer';

export default function ClientLayout({ children }) {
  return (
    <ToastProvider>
      <Navbar />
      {children}
    </ToastProvider>
  );
} 