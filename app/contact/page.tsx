'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, Twitter, Youtube, Facebook, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <span className="inline-block text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-6">
            Get In Touch
          </span>
          <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
            Contact <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Us</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
            Have a tip, a question, or a collaboration proposal? Reach out to our editorial office. We value every rational voice in our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {formState === 'success' ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 p-12 rounded-[2rem] text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-space font-bold text-gray-900 dark:text-white mb-4 uppercase">Message Sent!</h2>
                <p className="text-gray-600 dark:text-zinc-400 mb-8">Thank you for reaching out. Our team will review your message and get back to you shortly.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="text-green-600 font-outfit font-black uppercase tracking-widest text-xs hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl px-6 py-4 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="Christopher Hitchens"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl px-6 py-4 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="chris@reason.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">Subject</label>
                  <select className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl px-6 py-4 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all text-gray-900 dark:text-white appearance-none">
                    <option>Editorial Inquiry</option>
                    <option>Activism Tip</option>
                    <option>Technical Support</option>
                    <option>Advertising & Sponsorship</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">Message</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl px-6 py-4 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all text-gray-900 dark:text-white resize-none"
                    placeholder="How can we help you promote reason today?"
                  />
                </div>
                <button 
                  disabled={formState === 'submitting'}
                  className="w-full bg-red-600 text-white py-5 rounded-xl font-outfit font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-red-600/20 flex items-center justify-center gap-3"
                >
                  {formState === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-space font-bold text-gray-900 dark:text-white uppercase">Email Us</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                  General: mohammadbitullah@gmail.com <br />
                  Editorial: mohammadbitullah@gmail.com <br />
                  Press: https://abu-hanif-mia.vercel.app
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-space font-bold text-gray-900 dark:text-white uppercase">Visit Us</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                 The Reason Magazine <br />
                  Chiknirchar, Karshakriyail, 2300 Kishoreganj Sadar<br />
                  Dhaka, Bangladesh 
                 
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-space font-bold text-gray-900 dark:text-white uppercase">Call Us</h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                  Office: +8801724010261<br />
                Bangladesh (BST/UTC+6): 15:00 - 00:00 (3 PM - 12 AM) 
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-zinc-800">
                  <Twitter className="w-6 h-6 text-red-600" />
                </div>

                <h3 className="text-lg font-space font-bold text-gray-900 dark:text-white uppercase">Follow Us</h3>
<div className="flex gap-4">
  <a href="https://x.com/MohammadBitull1" target="_blank" rel="noopener noreferrer">
    <Twitter className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
  </a>
  <a href="https://youtube.com/@mohammadbitullah?si=lu-5OJ-DvM6XQWkT" target="_blank" rel="noopener noreferrer">
    <Youtube className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
  </a>
  <a href="https://web.facebook.com/bitulla" target="_blank" rel="noopener noreferrer">
    <Facebook className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
  </a>
  <a href="https://www.instagram.com/bitullah_aj" target="_blank" rel="noopener noreferrer">
    <Instagram className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
  </a>
</div>
                {/* <h3 className="text-lg font-space font-bold text-gray-900 dark:text-white uppercase">Follow Us</h3>
                <div className="flex gap-4">
                  <Twitter  className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                  <Youtube className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" /> */}
                {/* </div> */}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video w-full bg-gray-100 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-zinc-800 relative group">
              <img 
                src="https://picsum.photos/seed/map/1200/800?blur=2" 
                alt="Office Location" 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-zinc-950 px-8 py-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="font-outfit font-black uppercase tracking-widest text-[10px] text-gray-900 dark:text-white">2300 Kishoreganj Sadar, Dhaka</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
