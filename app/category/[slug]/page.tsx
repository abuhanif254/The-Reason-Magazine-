'use client';

import { useEffect, useState, useMemo } from 'react';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { Post } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Clock, Tag, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ArticleCardSkeleton } from '@/components/Skeleton';
import { useParams } from 'next/navigation';
import { calculateReadingTime, formatDate } from '@/lib/utils';
import { Sidebar } from '@/components/Sidebar';

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Philosophy': 'Exploring the fundamental nature of knowledge, reality, and existence through a rationalist lens.',
  'Science': 'Evidence-based inquiry into the natural world, debunking pseudoscience and celebrating discovery.',
  'Secularism': 'Advocating for the separation of religion and state and the protection of secular values in public life.',
  'Activism': 'Direct action and grassroots organizing for human rights, free speech, and rationalist causes.',
  'News': 'The latest updates and reports from the global secular and rationalist community.',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('status', '==', 'published'),
      where('category', '==', categoryName),
      orderBy('publishedAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        slug: doc.id
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `posts/category/${categoryName}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [categoryName]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [posts]);

  const featuredPosts = useMemo(() => {
    return posts.slice(0, 5);
  }, [posts]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded w-24" />
          <div className="h-12 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg w-1/3" />
          <div className="h-6 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg w-1/2" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 4, 5].map(i => <ArticleCardSkeleton key={i} />)}
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="h-64 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-2xl" />
            <div className="h-64 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400 mb-6">
        <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 dark:text-white">Category</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-red-600">{categoryName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase leading-[0.8]">
              {categoryName}<span className="text-red-600">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-zinc-400 font-serif italic max-w-2xl leading-relaxed">
              {CATEGORY_DESCRIPTIONS[categoryName] || `In-depth analysis and reporting on ${categoryName.toLowerCase()} from a rationalist perspective.`}
            </p>
          </motion.div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link href={`/post/${post.slug}`} className="group block">
                    <div className="aspect-[16/10] w-full relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 mb-6 border border-gray-100 dark:border-zinc-800 shadow-sm group-hover:shadow-xl group-hover:border-red-600/20 transition-all duration-500">
                      {post.coverImage ? (
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-zinc-800 text-gray-400 font-space font-bold uppercase text-xs">
                          Reason
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-outfit font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 dark:text-zinc-200">{post.authorName || 'Anonymous'}</span>
                          <span>&bull;</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{calculateReadingTime(post.content)} min</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-space font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-tight uppercase">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-red-600 font-outfit font-black uppercase tracking-widest text-[10px] pt-2">
                        Read Full Article <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-gray-50 dark:bg-zinc-900/50 rounded-[2rem] border border-dashed border-gray-200 dark:border-zinc-800">
              <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Tag className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-2xl font-space font-black uppercase text-gray-900 dark:text-white mb-2">No articles yet</h3>
              <p className="text-gray-500 dark:text-zinc-400 max-w-xs mx-auto">We haven&apos;t published any articles in the {categoryName} category yet. Check back soon.</p>
              <Link href="/articles" className="inline-block mt-8 text-red-600 font-outfit font-black uppercase tracking-widest text-[10px] hover:underline">
                Browse all articles
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar tags={allTags} featuredPosts={featuredPosts} />
        </div>
      </div>
    </motion.div>
  );
}
