'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Zap, 
  ShieldCheck, 
  Scale, 
  Globe, 
  ChevronRight,
  Download,
  Share2,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

interface Argument {
  id: string;
  title?: string; // Some might use 'claim' as title
  claim: string;
  rebuttal: string;
  category: string;
  difficulty: string;
  tags?: string[] | string;
}

export default function LogicLab() {
  const [argumentsList, setArgumentsList] = useState<Argument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedArg, setSelectedArg] = useState<Argument | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'logic_lab'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Argument[];
      setArgumentsList(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(argumentsList.map(a => a.category));
    return ['All', ...Array.from(cats)];
  }, [argumentsList]);

  const filteredArgs = useMemo(() => {
    return argumentsList.filter(arg => {
      const title = arg.title || arg.claim;
      const tags = Array.isArray(arg.tags) ? arg.tags : (arg.tags ? String(arg.tags).split(',') : []);
      
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           arg.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || arg.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, argumentsList]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-6 px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              <Zap className="w-3 h-3" />
              The Logic Lab
            </span>
            <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
              Argument <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Archive</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              A systematic, evidence-based repository of common religious claims and their rationalist rebuttals. Arm yourself with logic.
            </p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by argument, claim, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 rounded-2xl text-[10px] font-outfit font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-100 dark:border-zinc-800 hover:border-red-600/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Loading Arguments...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredArgs.map((arg, index) => (
              <motion.div
                key={arg.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedArg(arg)}
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-red-600" />
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-[8px] font-outfit font-black uppercase tracking-widest px-2 py-1 rounded ${
                    arg.difficulty === 'Basic' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    arg.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {arg.difficulty}
                  </span>
                  <span className="text-[8px] font-outfit font-black uppercase tracking-widest text-gray-400">
                    {arg.category}
                  </span>
                </div>

                <h3 className="text-2xl font-space font-black uppercase tracking-tight text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors">
                  {arg.title || 'Untitled Argument'}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-zinc-500 line-clamp-3 mb-8 leading-relaxed italic">
                  &ldquo;{arg.claim}&rdquo;
                </p>

                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(arg.tags) ? arg.tags : (arg.tags ? String(arg.tags).split(',') : [])).map(tag => (
                    <span key={tag} className="text-[9px] font-outfit font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-wider">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedArg && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArg(null)}
                className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left: Claim */}
                  <div className="p-8 md:p-12 bg-gray-50 dark:bg-zinc-950/50">
                    <div className="flex items-center gap-2 text-red-600 mb-8">
                      <Info className="w-5 h-5" />
                      <span className="text-[10px] font-outfit font-black uppercase tracking-widest">The Claim</span>
                    </div>
                    <h2 className="text-3xl font-space font-black uppercase text-gray-900 dark:text-white mb-6 leading-tight">
                      {selectedArg.title || 'Argument Detail'}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-zinc-400 font-serif italic leading-relaxed">
                      &ldquo;{selectedArg.claim}&rdquo;
                    </p>
                  </div>

                  {/* Right: Rebuttal */}
                  <div className="p-8 md:p-12 relative">
                    <button 
                      onClick={() => setSelectedArg(null)}
                      className="absolute top-8 right-8 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <span className="text-[10px] font-outfit font-black uppercase tracking-widest">Close</span>
                    </button>

                    <div className="flex items-center gap-2 text-green-600 mb-8">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-[10px] font-outfit font-black uppercase tracking-widest">The Rebuttal</span>
                    </div>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-lg text-gray-900 dark:text-white font-medium leading-relaxed">
                        {selectedArg.rebuttal}
                      </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                      <div className="flex gap-4">
                        <button className="p-3 bg-gray-50 dark:bg-zinc-950 rounded-xl text-gray-400 hover:text-red-600 transition-colors border border-gray-100 dark:border-zinc-800">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-3 bg-gray-50 dark:bg-zinc-950 rounded-xl text-gray-400 hover:text-red-600 transition-colors border border-gray-100 dark:border-zinc-800">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <Link 
                        href="/articles"
                        className="text-[10px] font-outfit font-black uppercase tracking-widest text-red-600 hover:underline"
                      >
                        Read Full Essay
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredArgs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-2xl font-space font-black uppercase text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-500 dark:text-zinc-400">Try adjusting your search or category filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
