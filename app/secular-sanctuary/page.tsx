'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { 
  Heart, 
  Search, 
  MapPin, 
  Phone, 
  Globe, 
  Shield, 
  Users, 
  Scale, 
  ExternalLink,
  ChevronRight,
  MessageCircle,
  LifeBuoy
} from 'lucide-react';
import Link from 'next/link';

interface Resource {
  id: string;
  name: string;
  category: 'Legal Aid' | 'Psychological Support' | 'Community' | 'Emergency';
  region: 'Global' | 'North America' | 'Europe' | 'Middle East' | 'Asia' | 'Africa';
  description: string;
  website: string;
  contact?: string;
  tags: string[];
}

export default function SecularSanctuary() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeRegion, setActiveRegion] = useState<string>('All');

  useEffect(() => {
    const q = query(collection(db, 'sanctuary'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          tags: typeof d.tags === 'string' ? d.tags.split(',').map((t: string) => t.trim()) : (d.tags || [])
        };
      }) as Resource[];
      setResources(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'sanctuary');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = ['All', 'Legal Aid', 'Psychological Support', 'Community', 'Emergency'];
  const regions = ['All', 'Global', 'North America', 'Europe', 'Middle East', 'Asia', 'Africa'];

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
      const matchesRegion = activeRegion === 'All' || res.region === activeRegion;
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [resources, searchQuery, activeCategory, activeRegion]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Loading Sanctuary...</p>
        </div>
      </div>
    );
  }

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
              <LifeBuoy className="w-3 h-3" />
              The Secular Sanctuary
            </span>
            <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
              Support <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Hub</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              A curated directory of professional resources, legal aid, and communities for those navigating life after religion. You are not alone.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources, tags, or organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-gray-900 dark:text-white appearance-none focus:outline-none focus:border-red-600 transition-all cursor-pointer"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat} (Category)</option>)}
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={activeRegion}
              onChange={(e) => setActiveRegion(e.target.value)}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-gray-900 dark:text-white appearance-none focus:outline-none focus:border-red-600 transition-all cursor-pointer"
            >
              {regions.map(reg => <option key={reg} value={reg}>{reg} (Region)</option>)}
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredResources.map((res, index) => (
              <motion.div
                key={res.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-2xl text-red-600">
                    {res.category === 'Legal Aid' && <Scale className="w-6 h-6" />}
                    {res.category === 'Psychological Support' && <Heart className="w-6 h-6" />}
                    {res.category === 'Community' && <Users className="w-6 h-6" />}
                    {res.category === 'Emergency' && <Shield className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {res.region}
                  </span>
                </div>

                <h3 className="text-2xl font-space font-black uppercase tracking-tight text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors">
                  {res.name}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed mb-8 flex-grow">
                  {res.description}
                </p>

                <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
                  {res.contact && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-zinc-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-xs font-medium">{res.contact}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <a 
                      href={res.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-widest text-red-600 hover:underline"
                    >
                      Visit Website <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="flex gap-2">
                      {res.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[8px] font-outfit font-bold text-gray-400 uppercase tracking-tighter">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-zinc-900 dark:bg-white rounded-[3rem] p-8 md:p-16 text-white dark:text-zinc-950 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-space font-black uppercase tracking-tighter mb-6">
                In Immediate <span className="text-red-600">Danger?</span>
              </h2>
              <p className="text-zinc-400 dark:text-zinc-500 text-lg leading-relaxed mb-8">
                If you are facing physical threats or are in an emergency situation, please contact local authorities or reach out to Secular Rescue immediately.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://secular-rescue.org"
                  className="bg-red-600 text-white px-8 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
                >
                  Contact Secular Rescue
                </a>
                <Link 
                  href="/contact"
                  className="bg-zinc-800 dark:bg-gray-100 text-white dark:text-zinc-950 px-8 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:bg-zinc-700 dark:hover:bg-gray-200"
                >
                  Message Our Team
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-64 h-64 bg-zinc-800 dark:bg-gray-50 rounded-[3rem] flex items-center justify-center border border-zinc-700 dark:border-gray-200">
                <Shield className="w-32 h-32 text-red-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community Callout */}
        <div className="mt-32 text-center max-w-2xl mx-auto">
          <MessageCircle className="w-12 h-12 text-red-600 mx-auto mb-8" />
          <h3 className="text-3xl font-space font-black uppercase text-gray-900 dark:text-white mb-6">Missing a Resource?</h3>
          <p className="text-gray-600 dark:text-zinc-400 mb-10 leading-relaxed">
            Our directory is constantly growing. If you know of a professional organization or community that should be listed here, please let us know.
          </p>
          <Link 
            href="/contact"
            className="text-[10px] font-outfit font-black uppercase tracking-widest text-red-600 hover:underline"
          >
            Suggest a Resource
          </Link>
        </div>
      </div>
    </div>
  );
}
