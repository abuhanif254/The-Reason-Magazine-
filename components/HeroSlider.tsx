'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/types';

interface HeroSliderProps {
  posts: Post[];
}

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

export function HeroSlider({ posts }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Specific thematic slides as requested
  const thematicSlides = useMemo(() => [
    {
      title: "Reason Over Superstition",
      excerpt: "Advocating for a world guided by evidence, logic, and the pursuit of secular truth.",
      category: "Atheism & Reason",
      // Earth rotating - Pexels CDN (SD version for maximum compatibility)
      video: "https://videos.pexels.com/video-files/1851190/1851190-sd_640_360_25fps.mp4",
      poster: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/category/Philosophy"
    },
    {
      title: "The Frontiers of Science",
      excerpt: "Exploring the cosmos and our place in it through the lens of scientific inquiry.",
      category: "Science & Discovery",
      // Mars/Planet - Pexels CDN (SD version for maximum compatibility)
      video: "https://videos.pexels.com/video-files/2759484/2759484-sd_640_360_30fps.mp4",
      poster: "https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/category/Science"
    },
    {
      title: "The Secular Future",
      excerpt: "Building a society based on human rights, empathy, and rational governance.",
      category: "Activism",
      // Galaxy/Space - Pexels CDN (SD version for maximum compatibility)
      video: "https://videos.pexels.com/video-files/853889/853889-sd_640_360_25fps.mp4",
      poster: "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/category/Activism"
    }
  ], []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % thematicSlides.length);
  }, [thematicSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + thematicSlides.length) % thematicSlides.length);
  }, [thematicSlides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlide = thematicSlides[currentIndex];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden rounded-3xl mb-24 group bg-zinc-950">
      <div className="absolute inset-0 z-0 bg-zinc-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <video
              key={currentSlide.video}
              src={currentSlide.video}
              poster={currentSlide.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover scale-105"
              style={{ filter: 'brightness(0.8)' }}
              onPlay={() => console.log('Video playing:', currentSlide.title)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-[1]" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block text-red-500 font-outfit font-bold uppercase tracking-[0.4em] text-xs mb-6 px-3 py-1 bg-red-500/10 backdrop-blur-sm rounded border border-red-500/20">
                {currentSlide.category}
              </span>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-space font-black tracking-tighter text-white leading-[0.9] mb-8 uppercase">
                <TypewriterText text={currentSlide.title} />
              </h1>

              <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mb-10 leading-relaxed italic font-serif">
                &ldquo;{currentSlide.excerpt}&rdquo;
              </p>

              <div className="flex items-center gap-6">
                <Link 
                  href={currentSlide.link}
                  className="group flex items-center gap-3 px-10 py-5 bg-white text-black font-outfit font-black uppercase tracking-tighter rounded-full hover:bg-red-600 hover:text-white transition-all hover:scale-105 shadow-2xl"
                >
                  Explore Truth
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <div className="hidden md:flex items-center gap-4 text-white/50 font-outfit text-xs uppercase tracking-widest">
                  <span className="w-12 h-[1px] bg-white/20"></span>
                  <span>{currentIndex + 1} / {thematicSlides.length}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-4">
        <button
          onClick={() => {
            prevSlide();
            setIsAutoPlaying(false);
          }}
          className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
          }}
          className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
          className="h-full bg-red-600"
        />
      </div>
    </section>
  );
}
