'use client';

import { useEffect, useState, useMemo } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { Post } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { ArticleCardSkeleton } from '@/components/Skeleton';
import { useSearchParams } from 'next/navigation';
import { calculateReadingTime, formatDate } from '@/lib/utils';
import { Suspense } from 'react';
import { Sidebar } from '@/components/Sidebar';

function ArticlesContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Philosophy', 'Secularism', 'Science', 'News', 'Activism'];

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Featured posts for sidebar
  const featuredPosts = useMemo(() => {
    return posts.slice(0, 5);
  }, [posts]);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        slug: doc.id
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery) || 
        post.excerpt?.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    }

    return filtered;
  }, [posts, activeCategory, searchQuery]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-4">
          <div className="h-12 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg w-1/3" />
          <div className="h-6 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => <ArticleCardSkeleton key={i} />)}
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-space font-black tracking-tighter text-gray-900 dark:text-white mb-4 uppercase">
              {searchQuery ? `Search: ${searchQuery}` : 'All Articles'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 mb-8 font-serif italic">
              {searchQuery 
                ? `Found ${filteredPosts.length} articles matching your search.` 
                : 'Explore our complete archive of essays, opinion pieces, and reports.'}
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[10px] font-outfit font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                      : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800 hover:border-red-600/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link href={`/post/${post.slug}`} className="group h-full flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 transition-all hover:shadow-xl hover:border-red-600/20">
                    <div className="h-56 w-full relative overflow-hidden bg-gray-100 dark:bg-zinc-800">
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
                      {post.category && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-outfit font-black uppercase tracking-widest px-2 py-1 rounded">
                          {post.category}
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center justify-between text-[10px] font-outfit font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-4">
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
                      <h3 className="text-2xl font-space font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight uppercase">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-zinc-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-gray-900 dark:text-zinc-200 font-outfit font-black uppercase tracking-widest text-[10px] mt-auto">
                        Read More <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
              <h3 className="text-2xl font-space font-black uppercase text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-500 dark:text-zinc-400">Try adjusting your search or filters.</p>
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

export default function ArticlesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-4">
          <div className="h-12 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg w-1/3" />
          <div className="h-6 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => <ArticleCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <ArticlesContent />
    </Suspense>
  );
}
