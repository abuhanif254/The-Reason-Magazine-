'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Calendar,
  MoreVertical,
  ChevronRight,
  Video,
  BookOpen,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const CHART_DATA = [
  { name: 'Mon', views: 4000, users: 2400 },
  { name: 'Tue', views: 3000, users: 1398 },
  { name: 'Wed', views: 2000, users: 9800 },
  { name: 'Thu', views: 2780, users: 3908 },
  { name: 'Fri', views: 1890, users: 4800 },
  { name: 'Sat', views: 2390, users: 3800 },
  { name: 'Sun', views: 3490, users: 4300 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Articles', value: '...', change: '', trend: 'up', icon: FileText },
    { label: 'Published Articles', value: '...', change: '', trend: 'up', icon: BookOpen },
    { label: 'Multimedia Items', value: '...', change: '', trend: 'up', icon: Video },
    { label: 'Logic Lab Entries', value: '...', change: '', trend: 'up', icon: Zap },
  ]);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch posts
        const postsSnapshot = await getDocs(collection(db, 'posts'));
        const totalPosts = postsSnapshot.size;
        const publishedPosts = postsSnapshot.docs.filter(doc => doc.data().status === 'published').length;

        // Fetch multimedia
        const multimediaSnapshot = await getDocs(collection(db, 'multimedia'));
        const totalMultimedia = multimediaSnapshot.size;

        // Fetch logic lab
        const logicLabSnapshot = await getDocs(collection(db, 'logic_lab'));
        const totalLogicLab = logicLabSnapshot.size;

        setStats([
          { label: 'Total Articles', value: totalPosts.toString(), change: '', trend: 'up', icon: FileText },
          { label: 'Published Articles', value: publishedPosts.toString(), change: '', trend: 'up', icon: BookOpen },
          { label: 'Multimedia Items', value: totalMultimedia.toString(), change: '', trend: 'up', icon: Video },
          { label: 'Logic Lab Entries', value: totalLogicLab.toString(), change: '', trend: 'up', icon: Zap },
        ]);

        // Fetch recent articles
        const recentQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(5));
        const recentSnapshot = await getDocs(recentQuery);
        const recent = recentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentArticles(recent);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-space font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            Dashboard <span className="text-red-600">Overview.</span>
          </h1>
          <p className="text-xs font-outfit font-bold uppercase tracking-widest text-zinc-400 mt-1">
            Welcome back, Admin. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:border-red-600 transition-all">
            Download Report
          </button>
          <button className="px-6 py-3 bg-red-600 text-white rounded-xl text-[10px] font-outfit font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20">
            Create New Article
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl text-red-600">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xs font-outfit font-black uppercase tracking-widest text-zinc-400 mb-1">{stat.label}</h3>
            <p className="text-3xl font-space font-black text-zinc-900 dark:text-white">
              {loading ? <span className="animate-pulse">...</span> : stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white">Traffic Analysis</h2>
            <select className="bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl text-[10px] font-outfit font-black uppercase tracking-widest px-4 py-2 focus:ring-red-600">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    border: 'none', 
                    borderRadius: '12px',
                    fontSize: '10px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <h2 className="text-xl font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-8">Recent Activity</h2>
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : recentArticles.length === 0 ? (
              <p className="text-center text-zinc-500 text-sm">No recent articles found.</p>
            ) : (
              recentArticles.map((article, i) => (
                <div key={article.id || i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-red-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-space font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-red-600 transition-colors truncate max-w-[150px]">
                        {article.title}
                      </h4>
                      <p className="text-[10px] font-outfit font-bold uppercase tracking-widest text-zinc-400">
                        {article.authorName || 'Anonymous'} &bull; {formatDate(article.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[8px] font-outfit font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                      article.status === 'published' 
                        ? 'bg-green-50 text-green-600 dark:bg-green-900/10' 
                        : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                    }`}>
                      {article.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link href="/admin/articles" className="w-full mt-8 py-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-400 hover:border-red-600 hover:text-red-600 transition-all flex items-center justify-center gap-2">
            View All Articles <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
