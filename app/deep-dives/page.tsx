'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { 
  Layers, 
  ArrowRight, 
  Clock, 
  User, 
  ChevronRight,
  Sparkles,
  Flame,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DeepDive {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  readTime: string;
  image: string;
  accentColor: string;
  parts: number;
}

export default function DeepDivesLanding() {
  const [deepDives, setDeepDives] = useState<DeepDive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'deep_dives'), orderBy('title', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DeepDive[];
      setDeepDives(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'deep_dives');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Loading Deep Dives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-6 px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              <Layers className="w-3 h-3" />
              Special Editorial Series
            </span>
            <h1 className="text-6xl md:text-9xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.8] mb-8">
              Deep <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Dives</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              Immersive, multi-part investigative journalism. We go beyond the headlines to deconstruct the most complex issues of our time.
            </p>
          </motion.div>
        </div>

        {/* Featured Deep Dive */}
        {deepDives.length > 0 && (
          <section className="mb-32">
            <Link href={`/deep-dives/${deepDives[0].slug}`} className="group block relative aspect-[21/9] rounded-[3rem] overflow-hidden bg-zinc-900">
              <Image 
                src={deepDives[0].image} 
                alt={deepDives[0].title} 
                fill 
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-2 bg-red-600 text-white text-[10px] font-outfit font-black uppercase tracking-widest rounded-full">
                    Featured Series
                  </span>
                  <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-white/60">
                    {deepDives[0].parts} Parts &bull; {deepDives[0].readTime} Total
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-space font-black uppercase tracking-tighter text-white mb-6 leading-none max-w-4xl">
                  {deepDives[0].title}
                </h2>
                <p className="text-xl text-white/70 font-medium max-w-2xl mb-10 leading-relaxed">
                  {deepDives[0].subtitle}
                </p>
                <div className="flex items-center gap-3 text-white text-[10px] font-outfit font-black uppercase tracking-widest group-hover:gap-6 transition-all">
                  Begin the Journey <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {deepDives.slice(1).map((dive, index) => (
            <motion.div
              key={dive.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/deep-dives/${dive.slug}`} className="group block">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-8">
                  <Image 
                    src={dive.image} 
                    alt={dive.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-8 left-8">
                    <span className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-gray-900 dark:text-white text-[10px] font-outfit font-black uppercase tracking-widest rounded-full border border-gray-100 dark:border-zinc-800">
                      {dive.parts} Parts
                    </span>
                  </div>
                </div>
                <div className="px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-red-600">Investigative Series</span>
                    <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">{dive.readTime} Read</span>
                  </div>
                  <h3 className="text-3xl font-space font-black uppercase tracking-tight text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors">
                    {dive.title}
                  </h3>
                  <p className="text-gray-500 dark:text-zinc-500 font-medium leading-relaxed mb-6 line-clamp-2">
                    {dive.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">{dive.author}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 bg-gray-50 dark:bg-zinc-900 rounded-[3rem] p-12 md:p-20 border border-gray-100 dark:border-zinc-800 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-12 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-xl shadow-red-600/20">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-8">
            Never Miss a <span className="text-red-600">Deep Dive.</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Get our investigative series delivered straight to your inbox, along with exclusive behind-the-scenes insights from our lead reporters.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-full px-8 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
            />
            <button className="bg-red-600 text-white px-10 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
