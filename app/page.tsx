'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { Post } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArticleCardSkeleton, FeaturedArticleSkeleton } from '@/components/Skeleton';
import { calculateReadingTime, formatDate } from '@/lib/utils';
import { NewsletterForm } from '@/components/NewsletterForm';
import { HeroSlider } from '@/components/HeroSlider';
import { TrendingArticles } from '@/components/TrendingArticles';
import { EditorsChoice } from '@/components/EditorsChoice';
import { CategorySpotlight } from '@/components/CategorySpotlight';
import { QuoteSection } from '@/components/QuoteSection';
import { ActivismFeed } from '@/components/ActivismFeed';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const categories = ['All', 'Philosophy', 'Secularism', 'Science', 'News', 'Activism'];

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('status', '==', 'published'),
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
      handleFirestoreError(error, OperationType.LIST, 'posts');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') {
      return posts;
    } else {
      return posts.filter(post => post.category === activeCategory);
    }
  }, [posts, activeCategory]);

  const featuredPosts: Post[] = posts.length > 0 ? posts.slice(0, 3) : [
    {
      slug: 'welcome',
      title: 'Welcome to Reason Magazine',
      excerpt: 'The platform for rational discourse and secular advocacy.',
      content: '',
      status: 'published' as const,
      category: 'Philosophy',
      authorId: 'system',
      authorName: 'Editorial Team',
      publishedAt: { toDate: () => new Date() } as any
    },
    {
      slug: 'science',
      title: 'The Power of Scientific Inquiry',
      excerpt: 'Exploring the boundaries of human knowledge through evidence.',
      content: '',
      status: 'published' as const,
      category: 'Science',
      authorId: 'system',
      authorName: 'Editorial Team',
      publishedAt: { toDate: () => new Date() } as any
    },
    {
      slug: 'activism',
      title: 'Secularism in the Modern World',
      excerpt: 'Advocating for the separation of church and state globally.',
      content: '',
      status: 'published' as const,
      category: 'Activism',
      authorId: 'system',
      authorName: 'Editorial Team',
      publishedAt: { toDate: () => new Date() } as any
    }
  ];
  
  const recentPosts = posts.slice(3, 9);
  const editorsChoicePost = posts.length > 9 ? posts[9] : (posts.length > 0 ? posts[0] : null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {loading ? (
        <div ref={heroRef} className="relative space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="h-16 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg w-3/4 mx-auto" />
            <div className="h-6 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg w-full mx-auto" />
          </div>
          <FeaturedArticleSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <ArticleCardSkeleton key={i} />)}
          </div>
        </div>
      ) : (
        <>
          {/* 1. 3D Live Footage Hero Slider */}
          <HeroSlider posts={featuredPosts} />

          {/* 2. Science Spotlight (New Component 1) */}
          <CategorySpotlight posts={posts} category="Science" />

          {/* Category Filter Bar (Secondary) */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-outfit font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 scale-105'
                    : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800 hover:border-red-600/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            {/* 3. Recent Articles (Main Feed) */}
            <div className="lg:col-span-2">
              <h2 className="text-sm font-outfit font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-zinc-800 pb-4">
                {activeCategory === 'All' ? 'Recent Articles' : `${activeCategory} Articles`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.slice(0, 6).map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
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
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-zinc-800 text-gray-400">
                            No Image
                          </div>
                        )}
                        {post.category && (
                          <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-outfit font-bold uppercase tracking-widest px-2 py-1 rounded">
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
                        <h3 className="text-2xl font-space font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-zinc-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-red-600 font-outfit font-black uppercase tracking-wider text-[10px] mt-auto">
                          Read More <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 4. Trending Articles Sidebar (New Component 2) */}
            <div className="lg:col-span-1">
              <TrendingArticles posts={posts} />
            </div>
          </div>

          {/* 5. Rationalist Wisdom Quote (New Component 3) */}
          <QuoteSection />

          {/* 6. Editor's Choice (New Component 4) */}
          <EditorsChoice post={editorsChoicePost} />

          {/* 7. Activism & Events Feed (New Component 5) */}
          <ActivismFeed />

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
              <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">No articles found in this category</h3>
              <p className="text-gray-500 dark:text-zinc-400">Try selecting another category or check back later.</p>
            </div>
          )}
        </>
      )}

      {/* Newsletter Section */}
      <div className="mt-24">
        <NewsletterForm />
      </div>
    </motion.div>
  );
}
