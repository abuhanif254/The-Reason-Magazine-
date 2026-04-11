'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Share2, 
  Bookmark, 
  ChevronDown,
  Quote,
  Zap,
  Shield,
  Eye
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function DeepDiveArticle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div ref={containerRef} className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Immersive Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/deepdive1/1920/1080" 
            alt="Hero Image" 
            fill 
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: textY }}
          >
            <Link 
              href="/deep-dives"
              className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-[0.4em] text-red-500 mb-12 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Series
            </Link>
            <h1 className="text-6xl md:text-[10rem] font-space font-black tracking-tighter text-white uppercase leading-[0.8] mb-12">
              Digital <br /> <span className="text-transparent border-text" style={{ WebkitTextStroke: '2px white' }}>Theocracy</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 font-medium max-w-3xl mx-auto leading-tight mb-16">
              How algorithms are reviving ancient dogmas in the 21st century.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <User className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-outfit font-black uppercase tracking-widest">Written By</p>
                  <p className="text-sm font-bold text-white">Elena Vance</p>
                </div>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div className="text-left">
                <p className="text-[10px] font-outfit font-black uppercase tracking-widest">Reading Time</p>
                <p className="text-sm font-bold text-white">12 Minutes (Part 1)</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-32">
        <div className="prose prose-xl dark:prose-invert max-w-none">
          <p className="lead text-3xl font-serif italic text-gray-900 dark:text-white mb-16 leading-relaxed">
            In the silicon valleys of the world, a new kind of faith is being coded. It doesn&apos;t require cathedrals or incense, but it demands the same absolute devotion as the inquisitions of old.
          </p>

          <h2 className="text-5xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-8 mt-24">
            The Algorithm as <span className="text-red-600">Deity.</span>
          </h2>
          
          <p>
            For decades, we believed that the internet would be the ultimate tool of secularization. We thought that access to the sum total of human knowledge would act as a universal solvent for religious dogma. We were wrong. Instead of dissolving old faiths, the digital landscape has provided the perfect petri dish for their evolution.
          </p>

          <div className="my-20 p-12 bg-gray-50 dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-zinc-800 relative overflow-hidden">
            <Quote className="absolute top-8 right-8 w-24 h-24 text-red-600/5 -rotate-12" />
            <p className="text-2xl font-serif italic text-gray-900 dark:text-white leading-relaxed relative z-10">
              &ldquo;The echo chamber is the modern confessional booth. It doesn&apos;t just amplify your voice; it validates your sins and provides a community of the righteous to punish the heretic.&rdquo;
            </p>
            <p className="mt-8 text-[10px] font-outfit font-black uppercase tracking-widest text-red-600">
              &mdash; From the Digital Inquisition Report, 2024
            </p>
          </div>

          <p>
            Algorithms are designed to maximize engagement, and nothing engages the human brain quite like moral outrage and tribal belonging. By feeding us content that reinforces our existing biases, these systems are inadvertently recreating the psychological structures of fundamentalist religion.
          </p>

          <h3 className="text-3xl font-space font-black uppercase tracking-tight text-gray-900 dark:text-white mb-6 mt-16">
            The New Blasphemy
          </h3>
          <p>
            In this new digital theocracy, blasphemy has been rebranded as &quot;harm.&quot; While protecting individuals from genuine abuse is a secular necessity, the definition of harm has expanded to include any idea that challenges the sacred cows of the digital tribe.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
            <div className="p-8 bg-zinc-900 text-white rounded-[2rem]">
              <Zap className="w-8 h-8 text-red-600 mb-6" />
              <h4 className="text-xl font-space font-black uppercase mb-4">Instant Excommunication</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The speed of digital mobs allows for social exile at a scale and velocity that would make the medieval church envious.
              </p>
            </div>
            <div className="p-8 bg-zinc-900 text-white rounded-[2rem]">
              <Shield className="w-8 h-8 text-red-600 mb-6" />
              <h4 className="text-xl font-space font-black uppercase mb-4">The Sacred Filter</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Content moderation, while necessary, often evolves into a form of digital index librorum prohibitorum.
              </p>
            </div>
          </div>

          <p>
            The challenge for the modern rationalist is to navigate this landscape without falling into the same tribal traps. We must defend the right to be wrong, the right to offend, and the right to follow the evidence wherever it leads—even if it leads us out of the digital garden.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-32 pt-12 border-t border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-zinc-900 rounded-full text-[10px] font-outfit font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400 hover:text-red-600 transition-colors">
              <Share2 className="w-4 h-4" /> Share Series
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-zinc-900 rounded-full text-[10px] font-outfit font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400 hover:text-red-600 transition-colors">
              <Bookmark className="w-4 h-4" /> Save for Later
            </button>
          </div>
          <Link 
            href="/deep-dives"
            className="flex items-center gap-3 bg-red-600 text-white px-10 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
          >
            Continue to Part 2 <ChevronDown className="w-4 h-4 -rotate-90" />
          </Link>
        </div>
      </article>

      {/* Reading Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[60]"
      />
    </div>
  );
}
