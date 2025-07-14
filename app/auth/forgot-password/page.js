'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/components/ToastContainer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSent(true);
      showSuccess('Password reset email sent! Check your inbox.');
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        default:
          errorMessage = 'Failed to send reset email. Please try again.';
      }
      
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">CHECK YOUR EMAIL</h1>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <span className="font-semibold">{email}</span>
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Click the link in your email to reset your password. The link will expire in 1 hour.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-700 font-medium transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">FORGOT PASSWORD?</h1>
            <p className="text-gray-600">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-navy-500 focus:ring-2 focus:ring-navy-200 transition-all duration-200 bg-white"
                  placeholder="Enter your email"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  SENDING...
                </>
              ) : (
                'SEND RESET LINK'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <Link href="/auth/login" className="text-navy-600 hover:text-navy-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 