'use client';

import Link from 'next/link';
import { Post } from '@/types';
import { Microscope, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CategorySpotlightProps {
  posts: Post[];
  category: string;
}

export function CategorySpotlight({ posts, category }: CategorySpotlightProps) {
  const filteredPosts = posts.filter(p => p.category === category).slice(0, 4);

  if (filteredPosts.length === 0) return null;

  return (
    <section className="my-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Microscope className="w-5 h-5 text-red-600" />
          <h2 className="text-sm font-outfit font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">
            {category} Spotlight
          </h2>
        </div>
        <Link href={`/category/${category}`} className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1">
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/post/${post.slug}`} className="group block space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 relative">
                {post.coverImage ? (
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-space font-bold uppercase text-xs">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <h3 className="text-lg font-space font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-tight uppercase">
                {post.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
