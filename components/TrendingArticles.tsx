'use client';

import Link from 'next/link';
import { Post } from '@/types';
import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDate } from '@/lib/utils';

interface TrendingArticlesProps {
  posts: Post[];
}

export function TrendingArticles({ posts }: TrendingArticlesProps) {
  // Sort by likesCount or just take a slice for demo
  const trending = [...posts].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0)).slice(0, 5);

  if (trending.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="w-5 h-5 text-red-600" />
        <h2 className="text-sm font-outfit font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">
          Trending Now
        </h2>
      </div>
      <div className="space-y-8">
        {trending.map((post, index) => (
          <motion.div 
            key={post.slug}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/post/${post.slug}`} className="group flex gap-4">
              <span className="text-4xl font-space font-black text-gray-100 dark:text-zinc-800 group-hover:text-red-600/20 transition-colors">
                0{index + 1}
              </span>
              <div className="space-y-1">
                <span className="text-[10px] font-outfit font-bold uppercase tracking-widest text-red-600">
                  {post.category}
                </span>
                <h3 className="text-base font-space font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-wider">
                  By {post.authorName} &bull; {formatDate(post.publishedAt, 'MMM d')}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
