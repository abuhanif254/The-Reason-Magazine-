'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const particles = [
    { x: 45, duration: 6.2, delay: 0.5, left: 12, top: 25 },
    { x: -30, duration: 7.5, delay: 1.2, left: 85, top: 15 },
    { x: 20, duration: 5.8, delay: 2.1, left: 45, top: 75 },
    { x: -15, duration: 8.1, delay: 0.8, left: 70, top: 60 },
    { x: 35, duration: 6.9, delay: 1.5, left: 25, top: 85 },
    { x: -40, duration: 7.2, delay: 2.5, left: 15, top: 50 },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-zinc-950 px-4 overflow-hidden">
      <div className="max-w-4xl w-full text-center relative">
        {/* Background Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none"
        >
          <span className="text-[40vw] font-space font-black text-gray-900 dark:text-white leading-none">
            ?
          </span>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-[0.4em] text-red-600 mb-8 px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              <AlertCircle className="w-3 h-3" />
              Error 404: Evidence Not Found
            </span>
            
            <h1 className="text-8xl md:text-[12rem] font-space font-black tracking-tighter text-gray-900 dark:text-white leading-[0.8] mb-8 uppercase">
              Lost<span className="text-red-600">.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              The page you are looking for has vanished into the void of irrationality. It either never existed or has been moved to a more logical location.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="/"
              className="group flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 dark:shadow-white/10"
            >
              <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Return to Base
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-800 px-8 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-xs transition-all hover:border-red-600/50 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 pt-12 border-t border-gray-100 dark:border-zinc-900"
          >
            <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400 mb-6">
              Or try one of these destinations
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {['Articles', 'Editorial Team', 'Contact', 'About'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-bold text-gray-500 dark:text-zinc-500 hover:text-red-600 dark:hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Particles Animation */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-600 rounded-full opacity-20 hidden md:block"
            animate={{
              y: [0, -100, 0],
              x: [0, particle.x, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
