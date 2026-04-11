'use client';

import { motion } from 'motion/react';
import { Mail, CheckCircle2, Shield, Zap, Bell, Users } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-red-600" />,
      title: "Weekly Insights",
      description: "A curated selection of the most thought-provoking essays and reports delivered every Sunday."
    },
    {
      icon: <Bell className="w-6 h-6 text-red-600" />,
      title: "Exclusive Content",
      description: "Access to newsletter-only deep dives and early access to our long-form investigative pieces."
    },
    {
      icon: <Users className="w-6 h-6 text-red-600" />,
      title: "Community Updates",
      description: "Stay informed about upcoming events, debates, and rationalist meetups in your area."
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Privacy First",
      description: "No spam, no third-party tracking. Just pure, high-quality rationalist discourse."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-6 px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              The Rationalist Digest
            </span>
            <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
              Think <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Deeper</span> Every Week.
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed mb-12 max-w-xl">
              Join 50,000+ subscribers who receive our weekly briefing on philosophy, science, and secular values. No noise, just signal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-space font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-red-600 blur-[100px] opacity-10 -z-10" />
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-zinc-800 shadow-2xl shadow-black/5">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-red-600/20">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-space font-black uppercase tracking-tight text-gray-900 dark:text-white mb-4">
                Subscribe Now
              </h2>
              <p className="text-gray-500 dark:text-zinc-400 mb-8 font-medium">
                Enter your email to start your journey into rational inquiry.
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-8 rounded-3xl text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-space font-bold text-green-900 dark:text-green-400 uppercase mb-2">Welcome Aboard!</h3>
                  <p className="text-green-700 dark:text-green-500 text-sm">Check your inbox for a confirmation email. We can&apos;t wait to share our insights with you.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-green-600 font-outfit font-black uppercase tracking-widest text-[10px] hover:underline"
                  >
                    Subscribe another email
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400 ml-4">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-red-600 text-white py-5 rounded-2xl font-outfit font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all active:scale-[0.98] shadow-xl shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Join the Digest'
                    )}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-6 leading-relaxed">
                    By subscribing, you agree to our <a href="/terms" className="underline hover:text-red-600">Terms of Service</a> and <a href="/privacy" className="underline hover:text-red-600">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
