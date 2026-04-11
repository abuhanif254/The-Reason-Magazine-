'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { formatDate } from '@/lib/utils';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  List, 
  Mic, 
  Video, 
  Download, 
  Share2,
  Clock,
  Calendar,
  ChevronRight,
  ExternalLink,
  Headphones,
  X
} from 'lucide-react';
import Image from 'next/image';

interface MediaItem {
  id: string;
  type: 'podcast' | 'video';
  title: string;
  description: string;
  duration: string;
  date: string;
  thumbnail: string;
  audioUrl?: string;
  videoUrl?: string;
  category: string;
  createdAt?: any;
}

const MULTIMEDIA_ITEMS: MediaItem[] = [
  {
    id: '1',
    type: 'podcast',
    title: 'The Future of Secularism in the 21st Century',
    description: 'A deep dive into how secular values are evolving in a digital age and the challenges posed by new religious movements.',
    duration: '45:20',
    date: 'Oct 12, 2025',
    thumbnail: 'https://picsum.photos/seed/podcast1/800/800',
    category: 'Philosophy'
  },
  {
    id: '2',
    type: 'video',
    title: 'Deconstructing the Fine-Tuning Argument',
    description: 'A visual exploration of the cosmological constants and why the "fine-tuning" of the universe doesn\'t imply a tuner.',
    duration: '12:45',
    date: 'Oct 08, 2025',
    thumbnail: 'https://picsum.photos/seed/video1/1280/720',
    category: 'Science'
  },
  {
    id: '3',
    type: 'podcast',
    title: 'Interview: The Psychology of Deconversion',
    description: 'Dr. Sarah Jenkins joins us to discuss the emotional and cognitive process of leaving high-control religious groups.',
    duration: '58:12',
    date: 'Sep 30, 2025',
    thumbnail: 'https://picsum.photos/seed/podcast2/800/800',
    category: 'Psychology'
  },
  {
    id: '4',
    type: 'video',
    title: 'The History of Blasphemy Laws',
    description: 'From ancient Greece to modern-day Pakistan, we trace the history of laws designed to protect the "sacred" from the "profane."',
    duration: '18:30',
    date: 'Sep 22, 2025',
    thumbnail: 'https://picsum.photos/seed/video2/1280/720',
    category: 'History'
  }
];

export default function MultimediaHub() {
  const [multimediaItems, setMultimediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // Simulated progress

  useEffect(() => {
    const q = query(collection(db, 'multimedia'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      
      // Sort by createdAt descending, or fallback to date string
      data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || new Date(a.date || 0).getTime();
        const timeB = b.createdAt?.toMillis?.() || new Date(b.date || 0).getTime();
        return timeB - timeA;
      });

      setMultimediaItems(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'multimedia');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Loading Multimedia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-6 px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              <Headphones className="w-3 h-3" />
              Watch & Listen
            </span>
            <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
              Multimedia <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Hub</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              Explore our curated collection of podcasts, video essays, and interviews. Rationalist insights for your eyes and ears.
            </p>
          </motion.div>
        </div>

        {/* Featured Section */}
        {multimediaItems.length >= 2 && (
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Featured Podcast */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group relative aspect-video rounded-[3rem] overflow-hidden bg-zinc-900"
              >
                <Image 
                  src={multimediaItems[0].thumbnail} 
                  alt="Featured Podcast" 
                  fill 
                  unoptimized
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="p-3 bg-red-600 rounded-2xl text-white">
                      <Mic className="w-6 h-6" />
                    </span>
                    <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-white/60">Featured Podcast</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-space font-black uppercase tracking-tighter text-white mb-6 leading-none">
                    {multimediaItems[0].title}
                  </h2>
                  <button 
                    onClick={() => setActiveItem(multimediaItems[0])}
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 w-fit"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Listen Now
                  </button>
                </div>
              </motion.div>

              {/* Featured Video */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group relative aspect-video rounded-[3rem] overflow-hidden bg-zinc-900"
              >
                <Image 
                  src={multimediaItems[1].thumbnail} 
                  alt="Featured Video" 
                  fill 
                  unoptimized
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="p-3 bg-red-600 rounded-2xl text-white">
                      <Video className="w-6 h-6" />
                    </span>
                    <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-white/60">Featured Video Essay</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-space font-black uppercase tracking-tighter text-white mb-6 leading-none">
                    {multimediaItems[1].title}
                  </h2>
                  <button 
                    onClick={() => setActiveItem(multimediaItems[1])}
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 w-fit"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Watch Now
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Latest Content Grid */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              Latest <span className="text-red-600">Releases.</span>
            </h2>
            <div className="flex gap-2">
              <button className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 text-gray-400 hover:text-red-600 transition-colors">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {multimediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="relative aspect-video">
                  <Image 
                    src={item.thumbnail} 
                    alt={item.title} 
                    fill 
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <button 
                      onClick={() => setActiveItem(item)}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
                    >
                      <Play className="w-6 h-6 text-black fill-current ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-outfit font-black text-white uppercase tracking-widest">
                    {item.duration}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-red-600">
                      {item.type === 'podcast' ? 'Podcast' : 'Video'}
                    </span>
                    <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-space font-black uppercase tracking-tight text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 text-[10px] font-outfit font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date || formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Player (Fixed Bottom) */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-[100]"
            >
              <div className="bg-zinc-900 dark:bg-white rounded-[2.5rem] p-4 md:p-6 shadow-2xl border border-zinc-800 dark:border-zinc-200 flex flex-col md:flex-row items-center gap-6">
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src={activeItem.thumbnail} alt={activeItem.title} fill unoptimized className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-space font-black uppercase tracking-tight text-white dark:text-zinc-950 truncate">
                      {activeItem.title}
                    </h4>
                    <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-500">
                      {activeItem.type === 'podcast' ? 'Podcast' : 'Video'} &bull; {activeItem.duration}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
                  <div className="flex items-center gap-6">
                    <button className="text-zinc-500 hover:text-white dark:hover:text-zinc-950 transition-colors">
                      <SkipBack className="w-5 h-5 fill-current" />
                    </button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/20 hover:scale-110 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                    </button>
                    <button className="text-zinc-500 hover:text-white dark:hover:text-zinc-950 transition-colors">
                      <SkipForward className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  <div className="w-full flex items-center gap-3">
                    <span className="text-[8px] font-outfit font-black text-zinc-500">12:45</span>
                    <div className="flex-grow h-1 bg-zinc-800 dark:bg-zinc-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-red-600"
                      />
                    </div>
                    <span className="text-[8px] font-outfit font-black text-zinc-500">{activeItem.duration}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center justify-end gap-4 w-1/3">
                  <button className="p-3 text-zinc-500 hover:text-white dark:hover:text-zinc-950 transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-zinc-500 hover:text-white dark:hover:text-zinc-950 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-zinc-500 hover:text-white dark:hover:text-zinc-950 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveItem(null)}
                    className="p-3 text-zinc-500 hover:text-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
