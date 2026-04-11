'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { Post } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Clock, UserCircle, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { Skeleton } from '@/components/Skeleton';
import { calculateReadingTime, formatDate } from '@/lib/utils';
import { LikeButton } from '@/components/LikeButton';
import { CommentSection } from '@/components/CommentSection';
import { SocialShare } from '@/components/SocialShare';

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const unsubscribe = onSnapshot(doc(db, 'posts', slug), (docSnap) => {
      if (docSnap.exists()) {
        setPost({ ...docSnap.data(), slug: docSnap.id } as Post);
      } else {
        setError('Post not found');
      }
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `posts/${slug}`);
      setError('Failed to load post');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Reason Magazine`;
    }
  }, [post]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="flex justify-center gap-6 py-4 border-y border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-10 w-px" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl" />
        <div className="space-y-4 max-w-3xl mx-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
        <p className="text-gray-600 dark:text-zinc-400">The article you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <header className="mb-12 text-center">
        {post.category && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4"
          >
            <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded shadow-lg">
              {post.category}
            </span>
          </motion.div>
        )}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
        >
          {post.title}
        </motion.h1>
        
        {post.excerpt && (
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-zinc-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {post.excerpt}
          </motion.p>
        )}

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-zinc-400 border-t border-b border-gray-100 dark:border-zinc-800 py-4"
        >
          <div className="flex items-center gap-3">
            {post.authorPhoto ? (
              <img src={post.authorPhoto} alt={post.authorName} className="w-10 h-10 rounded-full" />
            ) : (
              <UserCircle className="w-10 h-10 text-gray-400" />
            )}
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-zinc-200">{post.authorName || 'Anonymous'}</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Author</div>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              {formatDate(post.publishedAt, 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              {calculateReadingTime(post.content)} min read
            </div>
          </div>
        </motion.div>
      </header>

      {post.coverImage && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16 rounded-2xl overflow-hidden shadow-sm"
        >
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-auto max-h-[600px] object-cover"
          />
        </motion.div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="prose prose-lg md:prose-xl prose-gray dark:prose-invert mx-auto prose-headings:font-serif prose-headings:font-bold prose-a:text-red-600 hover:prose-a:text-red-700 mb-16"
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </motion.div>

      {/* Engagement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-3xl mx-auto space-y-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 py-12 border-t border-gray-100 dark:border-zinc-800">
          <LikeButton postId={post.slug} initialLikes={post.likesCount} />
          <SocialShare 
            url={typeof window !== 'undefined' ? window.location.href : ''} 
            title={post.title} 
          />
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/articles?q=${encodeURIComponent(tag)}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 rounded-full text-sm hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="pt-12 border-t border-gray-100 dark:border-zinc-800">
          <CommentSection postId={post.slug} />
        </div>
      </motion.div>
    </motion.article>
  );
}
