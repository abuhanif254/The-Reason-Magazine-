'use client';

import { motion } from 'motion/react';
import { 
  Coffee, 
  PenTool, 
  MessageSquare, 
  Zap, 
  Globe, 
  Camera, 
  Mic, 
  BookOpen,
  ArrowRight,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EditorLifeClient() {
  const timeline = [
    {
      time: '08:00 AM',
      title: 'The Morning Brief',
      description: 'The day begins with a deep dive into global news cycles, identifying stories that demand a rationalist perspective.',
      icon: <Coffee className="w-5 h-5" />
    },
    {
      time: '10:30 AM',
      title: 'Editorial Pitching',
      description: 'Our team gathers to debate and refine story angles. Only the most evidence-backed ideas make the cut.',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      time: '01:00 PM',
      title: 'Deep Work Session',
      description: 'Hours of focused writing, fact-checking, and data visualization. This is where the core of our journalism happens.',
      icon: <PenTool className="w-5 h-5" />
    },
    {
      time: '04:00 PM',
      title: 'Multimedia Production',
      description: 'Recording podcasts, editing video segments, and preparing interactive graphics for the evening release.',
      icon: <Mic className="w-5 h-5" />
    }
  ];

  const tools = [
    { name: 'Research', icon: <BookOpen className="w-6 h-6" />, desc: 'Access to global academic archives and data sets.' },
    { name: 'Field Gear', icon: <Camera className="w-6 h-6" />, desc: 'Professional equipment for on-the-ground reporting.' },
    { name: 'Network', icon: <Globe className="w-6 h-6" />, desc: 'A worldwide network of secular and scientific experts.' },
    { name: 'Agility', icon: <Zap className="w-6 h-6" />, desc: 'Rapid-response editorial workflows for breaking news.' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
            alt="Editorial Workspace"
            fill
            className="object-cover opacity-40 dark:opacity-20 grayscale"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-zinc-950/50 dark:to-zinc-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[10px] font-outfit font-black uppercase tracking-[0.4em] text-red-600 mb-8 px-6 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              Behind the Bylines
            </span>
            <h1 className="text-7xl md:text-[10rem] font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.8] mb-8">
              Editor <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Life</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-600 dark:text-zinc-400 font-serif italic max-w-3xl mx-auto leading-relaxed">
              &ldquo;The pursuit of truth is a full-time commitment. Explore the daily rhythms, tools, and philosophy that power Reason Magazine.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* A Day in the Life */}
      <section className="py-32 border-t border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-4xl md:text-6xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-12">
                The Daily <span className="text-red-600">Rhythm.</span>
              </h2>
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-gray-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-zinc-800 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-red-600 mb-1 block">
                        {item.time}
                      </span>
                      <h3 className="text-xl font-space font-bold text-gray-900 dark:text-white uppercase mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 dark:text-zinc-500 text-sm leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                alt="Editorial Team Meeting"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-red-600/10 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-32 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-space font-black uppercase tracking-tighter mb-6">
              Our <span className="text-red-600">Toolkit.</span>
            </h2>
            <p className="text-zinc-400 dark:text-zinc-500 max-w-2xl mx-auto font-medium">
              We leverage cutting-edge technology and traditional journalistic rigor to deliver insights that stand the test of time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-zinc-800 dark:bg-gray-50 border border-zinc-700 dark:border-gray-200 hover:border-red-600 transition-all group"
              >
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform">
                  <div className="text-white">{tool.icon}</div>
                </div>
                <h3 className="text-xl font-space font-bold uppercase mb-3">
                  {tool.name}
                </h3>
                <p className="text-zinc-400 dark:text-zinc-500 text-sm leading-relaxed">
                  {tool.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="text-[10px] font-outfit font-black uppercase tracking-[0.4em] text-red-600">
                  The Core Principle
                </span>
                <h2 className="text-5xl md:text-7xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white leading-[0.9]">
                  Radical <br /><span className="text-red-600">Objectivity.</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Our editors are not just writers; they are guardians of the rationalist tradition. Every word is weighed against the evidence, and every argument is tested for logical consistency. We don&apos;t just report the news; we analyze the underlying structures of thought.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden bg-gray-200">
                        <Image
                          src={`https://picsum.photos/seed/editor${i}/100/100`}
                          alt="Editor"
                          width={100}
                          height={100}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">
                    Trusted by <span className="text-gray-900 dark:text-white">50+ contributors</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop" alt="Writing" fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" alt="Digital" fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square rounded-3xl overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Team" fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                    <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" alt="Collaboration" fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-red-600/40">
            <Heart className="w-10 h-10 text-white fill-current" />
          </div>
          <h2 className="text-5xl md:text-7xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-8">
            Inspired to <span className="text-red-600">Contribute?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-zinc-400 mb-12 font-medium leading-relaxed">
            We are always looking for fresh voices in the secular and rationalist community. If you have a story that needs to be told, we want to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/contact"
              className="group flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black px-12 py-5 rounded-full font-outfit font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 dark:shadow-white/10"
            >
              Submit a Pitch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/editorial-team"
              className="text-gray-500 dark:text-zinc-500 font-outfit font-black uppercase tracking-widest text-[10px] hover:text-red-600 transition-colors"
            >
              Meet the Team
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
