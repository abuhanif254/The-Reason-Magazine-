'use client';

import Link from 'next/link';
import { Post } from '@/types';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface EditorsChoiceProps {
  post: Post | null;
}

export function EditorsChoice({ post }: EditorsChoiceProps) {
  if (!post) return null;

  return (
    <section className="my-24">
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <h2 className="text-sm font-outfit font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">
          Editor&apos;s Choice
        </h2>
      </div>
      
      <Link href={`/post/${post.slug}`} className="group block relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 font-space text-4xl font-black uppercase">
            Reason Magazine
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-outfit font-black uppercase tracking-widest rounded mb-6">
              Must Read
            </span>
            <h3 className="text-4xl md:text-6xl font-space font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase group-hover:text-red-500 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-300 text-lg mb-8 line-clamp-2 max-w-xl font-medium italic font-serif">
              &ldquo;{post.excerpt}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-white font-outfit font-black uppercase tracking-widest text-xs">
              Read Full Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </div>
          </motion.div>
        </div>
      </Link>
    </section>
  );
}
