'use client';

import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const subRef = doc(db, 'newsletter_subscriptions', email.toLowerCase());
      await setDoc(subRef, {
        email: email.toLowerCase(),
        subscribedAt: serverTimestamp(),
        status: 'active'
      });
      setStatus('success');
      setMessage('Thank you for subscribing to Reason Magazine!');
      setEmail('');
    } catch (error) {
      console.error('Newsletter Error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <section className="bg-red-600 dark:bg-red-700 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-4 tracking-tighter uppercase">
            Join the Rationalist Front
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto font-medium">
            Get the weekly digest of secular philosophy, scientific inquiry, and rationalist activism delivered straight to your inbox.
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center gap-4"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
                <p className="text-white text-xl font-serif font-bold">{message}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-red-100 underline hover:text-white transition-colors text-sm"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-300" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-red-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-white text-red-600 rounded-xl font-black uppercase tracking-tighter hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-white font-bold bg-black/20 py-2 px-4 rounded-lg inline-block"
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
