'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Image as ImageIcon, 
  Tag, 
  Layers, 
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/components/AuthProvider';

const CATEGORIES = ["Philosophy", "Secularism", "Science", "News", "Activism"];

export default function EditArticle() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Philosophy',
    status: 'draft' as 'draft' | 'published',
    tags: '',
    publishedAt: null as any
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u0980-\u09FF-]/g, '') // Allow alphanumeric, spaces, hyphens, and Bengali characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'posts', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            excerpt: data.excerpt || '',
            content: data.content || '',
            coverImage: data.coverImage || '',
            category: data.category || 'Philosophy',
            status: data.status || 'draft',
            tags: (data.tags || []).join(', '),
            publishedAt: data.publishedAt || null
          });
        } else {
          setError('Article not found.');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || !id) return;

    setSaving(true);
    setError(null);

    try {
      const postData: any = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
        updatedAt: serverTimestamp()
      };

      // If publishing for the first time, set publishedAt
      if (formData.status === 'published' && !formData.publishedAt) {
        postData.publishedAt = Timestamp.now();
      }

      await updateDoc(doc(db, 'posts', id as string), postData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating article:', err);
      setError('Failed to update article. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Loading Article Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/articles"
            className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-space font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
              Edit <span className="text-red-600">Article.</span>
            </h1>
            <p className="text-xs font-outfit font-bold uppercase tracking-widest text-zinc-400 mt-1">
              Refine and update your published content.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:border-red-600 transition-all"
          >
            Preview
          </button>
          <button 
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-[2rem] flex items-center gap-4 text-green-700 dark:text-green-400"
          >
            <CheckCircle2 className="w-6 h-6" />
            <p className="text-sm font-bold font-space uppercase">Changes saved successfully!</p>
          </motion.div>
        )}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-[2rem] flex items-center gap-4 text-red-700 dark:text-red-400"
          >
            <AlertCircle className="w-6 h-6" />
            <p className="text-sm font-bold font-space uppercase">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">Article Title</label>
              <input 
                type="text" 
                required
                placeholder="Enter title..."
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-2xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">Slug (URL)</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">/articles/</span>
                <input 
                  type="text" 
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl pl-24 pr-6 py-4 text-xs font-mono text-zinc-600 dark:text-zinc-400 focus:outline-none focus:border-red-600 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">Content (Markdown)</label>
              <textarea 
                required
                rows={15}
                placeholder="Write your article content here..."
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] px-8 py-6 text-lg font-serif leading-relaxed text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-8">
            <h3 className="text-lg font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-600" />
              Publishing
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-all"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-zinc-50 dark:border-zinc-800">
              <h3 className="text-lg font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-red-600" />
                Media
              </h3>
              <div className="space-y-2">
                <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">Cover Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-xs font-mono text-zinc-600 dark:text-zinc-400 focus:outline-none focus:border-red-600 transition-all"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-zinc-50 dark:border-zinc-800">
              <h3 className="text-lg font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-red-600" />
                Metadata
              </h3>
              <div className="space-y-2">
                <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">Excerpt</label>
                <textarea 
                  rows={3}
                  placeholder="Summary..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400 focus:outline-none focus:border-red-600 transition-all resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 ml-2">Tags (Comma separated)</label>
                <input 
                  type="text" 
                  placeholder="tags..."
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400 focus:outline-none focus:border-red-600 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
