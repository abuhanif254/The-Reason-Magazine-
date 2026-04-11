'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';

interface Post {
  id: string;
  slug: string;
  title: string;
  authorName: string;
  status: 'draft' | 'published';
  category: string;
  publishedAt: string;
  likesCount: number;
}

export default function AdminArticles() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[];
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        setPosts(posts.filter(p => p.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-space font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            Article <span className="text-red-600">Management.</span>
          </h1>
          <p className="text-xs font-outfit font-bold uppercase tracking-widest text-zinc-400 mt-1">
            Manage your editorial content and publishing workflow.
          </p>
        </div>
        <Link 
          href="/admin/articles/new"
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search by title or author..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 focus:outline-none focus:border-red-600 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <button className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-red-600 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <th className="px-8 py-6 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">Article</th>
                <th className="px-8 py-6 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">Author</th>
                <th className="px-8 py-6 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">Category</th>
                <th className="px-8 py-6 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">Date</th>
                <th className="px-8 py-6 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">Loading Articles...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <FileText className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                    <p className="text-lg font-space font-black uppercase text-zinc-400">No articles found</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-red-600 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate max-w-[200px]">
                            {post.title}
                          </h4>
                          <p className="text-[10px] font-outfit font-bold text-zinc-400 truncate">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{post.authorName}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-outfit font-black uppercase tracking-widest ${
                        post.status === 'published' 
                          ? 'bg-green-50 text-green-600 dark:bg-green-900/10' 
                          : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                      }`}>
                        {post.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {post.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">{post.category}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs text-zinc-500 dark:text-zinc-500">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/articles/${post.slug}`}
                          target="_blank"
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/articles/${post.id}/edit`}
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400">
            Showing {filteredPosts.length} of {posts.length} articles
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
