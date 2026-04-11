'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { 
  Quote, 
  Book, 
  History, 
  ExternalLink, 
  X, 
  ChevronRight, 
  Search,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Heretic {
  id: string;
  name: string;
  era: 'Ancient' | 'Enlightenment' | 'Modern';
  dates: string;
  title: string;
  bio: string;
  quote: string;
  image: string;
  legacy: string;
}

export default function HallOfHeretics() {
  const [heretics, setHeretics] = useState<Heretic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHeretic, setSelectedHeretic] = useState<Heretic | null>(null);
  const [activeEra, setActiveEra] = useState<string>('All');

  useEffect(() => {
    const q = query(collection(db, 'heretics'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Heretic[];
      setHeretics(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'heretics');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const eras = ['All', 'Ancient', 'Enlightenment', 'Modern'];

  const filteredHeretics = activeEra === 'All' 
    ? heretics 
    : heretics.filter(h => h.era === activeEra);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Loading Pantheon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-[0.4em] text-red-600 mb-6 px-6 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              <History className="w-3 h-3" />
              The Pantheon of Reason
            </span>
            <h1 className="text-7xl md:text-9xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.8] mb-8">
              Hall of <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Heretics</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto">
              A tribute to the thinkers, rebels, and martyrs who dared to challenge the sacred and prioritize evidence over dogma.
            </p>
          </motion.div>
        </div>

        {/* Era Filter */}
        <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setActiveEra(era)}
              className={`px-8 py-3 rounded-full text-[10px] font-outfit font-black uppercase tracking-widest transition-all ${
                activeEra === era
                  ? 'bg-red-600 text-white shadow-xl shadow-red-600/20'
                  : 'bg-gray-50 dark:bg-zinc-900 text-gray-500 hover:text-red-600 border border-gray-100 dark:border-zinc-800'
              }`}
            >
              {era}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredHeretics.map((heretic, index) => (
              <motion.div
                key={heretic.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedHeretic(heretic)}
                className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900"
              >
                <Image
                  src={heretic.image}
                  alt={heretic.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-red-500 mb-2">
                    {heretic.era} &bull; {heretic.dates}
                  </span>
                  <h3 className="text-3xl font-space font-black uppercase text-white mb-2 leading-none">
                    {heretic.name}
                  </h3>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-6">
                    {heretic.title}
                  </p>
                  <div className="flex items-center gap-2 text-white text-[10px] font-outfit font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    Explore Legacy <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedHeretic && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedHeretic(null)}
                className="absolute inset-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="relative w-full max-w-6xl bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Modal Image */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                  <Image
                    src={selectedHeretic.image}
                    alt={selectedHeretic.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-red-600/10 mix-blend-multiply" />
                </div>

                {/* Modal Content */}
                <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto max-h-[70vh] md:max-h-none">
                  <button 
                    onClick={() => setSelectedHeretic(null)}
                    className="absolute top-8 right-8 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="mb-12">
                    <span className="text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-4 block">
                      {selectedHeretic.era} Era &bull; {selectedHeretic.dates}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white leading-none mb-4">
                      {selectedHeretic.name}
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-widest">
                      {selectedHeretic.title}
                    </p>
                  </div>

                  <div className="space-y-12">
                    <section>
                      <div className="flex items-center gap-3 text-gray-900 dark:text-white mb-4">
                        <Quote className="w-5 h-5 text-red-600" />
                        <h4 className="text-xs font-outfit font-black uppercase tracking-widest">Famous Words</h4>
                      </div>
                      <p className="text-2xl md:text-3xl font-serif italic text-gray-900 dark:text-white leading-relaxed">
                        &ldquo;{selectedHeretic.quote}&rdquo;
                      </p>
                    </section>

                    <section>
                      <div className="flex items-center gap-3 text-gray-900 dark:text-white mb-4">
                        <Book className="w-5 h-5 text-red-600" />
                        <h4 className="text-xs font-outfit font-black uppercase tracking-widest">The Story</h4>
                      </div>
                      <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                        {selectedHeretic.bio}
                      </p>
                    </section>

                    <section className="bg-gray-50 dark:bg-zinc-950 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center gap-3 text-gray-900 dark:text-white mb-4">
                        <Sparkles className="w-5 h-5 text-red-600" />
                        <h4 className="text-xs font-outfit font-black uppercase tracking-widest">The Legacy</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                        {selectedHeretic.legacy}
                      </p>
                    </section>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800">
                    <Link 
                      href="/articles"
                      className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-widest text-red-600 hover:underline"
                    >
                      Read Related Essays <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredHeretics.length === 0 && (
          <div className="text-center py-32">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-space font-black uppercase text-gray-400">No heretics found</h3>
          </div>
        )}
      </div>
    </div>
  );
}
