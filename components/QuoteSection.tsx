'use client';

import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const QUOTES = [
  {
    text: "Science is not only compatible with spirituality; it is a profound source of spirituality.",
    author: "Carl Sagan",
    title: "Astronomer & Rationalist"
  },
  {
    text: "That which can be asserted without evidence, can be dismissed without evidence.",
    author: "Christopher Hitchens",
    title: "Author & Secularist"
  },
  {
    text: "The good thing about science is that it's true whether or not you believe in it.",
    author: "Neil deGrasse Tyson",
    title: "Astrophysicist"
  }
];

export function QuoteSection() {
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  return (
    <section className="my-24 py-24 border-y border-gray-100 dark:border-zinc-800 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <Quote className="w-[400px] h-[400px]" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Quote className="w-12 h-12 text-red-600 mx-auto mb-10 opacity-50" />
          <p className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-10 leading-tight tracking-tight italic">
            &ldquo;{quote.text}&rdquo;
          </p>
          <div className="space-y-1">
            <h4 className="text-sm font-outfit font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white">
              {quote.author}
            </h4>
            <p className="text-[10px] font-outfit font-bold uppercase tracking-widest text-red-600">
              {quote.title}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
