'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Search,
  Video,
  Brain,
  Map,
  History,
  HeartHandshake,
  Zap,
  Layers,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Articles', href: '/admin/articles', icon: FileText },
  { label: 'Multimedia', href: '/admin/multimedia', icon: Video },
  { label: 'Logic Lab', href: '/admin/logic-lab', icon: Brain },
  { label: 'Secular Map', href: '/admin/secular-map', icon: Map },
  { label: 'Hall of Heretics', href: '/admin/heretics', icon: History },
  { label: 'Secular Sanctuary', href: '/admin/sanctuary', icon: HeartHandshake },
  { label: 'Fallacy Finder', href: '/admin/fallacies', icon: Zap },
  { label: 'Deep Dives', href: '/admin/deep-dives', icon: Layers },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      router.replace('/');
    }
  }, [user, profile, loading, router]);

  if (loading || !user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Verifying Credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2 group overflow-hidden">
            <span className="font-space text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase shrink-0">
              R<span className="text-red-600">.</span>
            </span>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-space text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase truncate"
              >
                Reason
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-grow py-6 px-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'group-hover:text-red-600'}`} />
                {isSidebarOpen && (
                  <span className="text-[10px] font-outfit font-black uppercase tracking-widest truncate">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-all"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span className="text-[10px] font-outfit font-black uppercase tracking-widest">Admin Control Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700">
              <Search className="w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="bg-transparent border-none focus:ring-0 text-xs text-zinc-900 dark:text-white w-40"
              />
            </div>
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white dark:border-zinc-900" />
            </button>
            <div className="w-px h-8 bg-zinc-200 dark:border-zinc-800 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                  {profile?.displayName || 'Admin'}
                </p>
                <p className="text-[8px] font-outfit font-bold uppercase tracking-widest text-red-600">Super Admin</p>
              </div>
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt="Admin" className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-black">
                  {profile?.displayName?.[0] || 'A'}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-zinc-900 z-[70] lg:hidden flex flex-col"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-space text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
                  Reason<span className="text-red-600">.</span>
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-500">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-grow py-6 px-4 space-y-2">
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        isActive 
                          ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' 
                          : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-outfit font-black uppercase tracking-widest">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
                <button className="flex items-center gap-4 w-full p-4 rounded-2xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                  <LogOut className="w-6 h-6" />
                  <span className="text-xs font-outfit font-black uppercase tracking-widest">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
