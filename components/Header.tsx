'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { LogIn, LogOut, Menu, UserCircle, PenSquare, Sun, Moon, Search, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';

interface NavItem {
  label: string;
  href?: string;
  subItems?: { label: string; href: string; description?: string }[];
}

const NAVIGATION: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Multimedia', href: '/multimedia' },
  { label: 'Deep Dives', href: '/deep-dives' },
  { 
    label: 'Categories', 
    subItems: [
      { label: 'Philosophy', href: '/category/Philosophy', description: 'Rational discourse and logical inquiry.' },
      { label: 'Science', href: '/category/Science', description: 'Evidence-based exploration of the cosmos.' },
      { label: 'Secularism', href: '/category/Secularism', description: 'Advocating for the separation of church and state.' },
      { label: 'Activism', href: '/category/Activism', description: 'Direct action for human rights and reason.' },
      { label: 'News', href: '/category/News', description: 'Latest updates from the secular world.' },
    ] 
  },
  { 
    label: 'Resources', 
    subItems: [
      { label: 'All Articles', href: '/articles', description: 'Browse our complete library of content.' },
      { label: 'Logic Lab', href: '/logic-lab', description: 'Systematic rebuttals to religious claims.' },
      { label: 'Secular Map', href: '/secular-map', description: 'Global status of secularism and rights.' },
      { label: 'Fallacy Finder', href: '/fallacy-finder', description: 'Master the art of logical reasoning.' },
      { label: 'Secular Sanctuary', href: '/secular-sanctuary', description: 'Support for life after religion.' },
      { label: 'RSS Feed', href: '/rss', description: 'Stay updated with our automated feed.' },
      { label: 'Newsletter', href: '/newsletter', description: 'Join our weekly rationalist digest.' },
    ] 
  },
  { 
    label: 'About', 
    subItems: [
      { label: 'Our Mission', href: '/about', description: 'What we stand for and why it matters.' },
      { label: 'Editorial Team', href: '/editorial-team', description: 'Meet the minds behind Reason.' },
      { label: 'Editor Life', href: '/editor-life', description: 'A behind-the-scenes look at our work.' },
      { label: 'Hall of Heretics', href: '/hall-of-heretics', description: 'Tribute to historical rationalists.' },
      { label: 'Contact', href: '/contact', description: 'Get in touch with our editorial office.' },
    ] 
  },
];

export function Header() {
  const { user, profile } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/articles?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Slogan */}
          <div className="flex-shrink-0 flex flex-col justify-center">
            <Link href="/" className="flex flex-col group">
              <span className="font-space text-3xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none">
                Reason<span className="text-red-600 group-hover:animate-pulse">.</span>
              </span>
              <span className="text-[8px] font-outfit font-black uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500 mt-1">
                The Light of Rationality
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" ref={dropdownRef}>
            {NAVIGATION.map((item) => (
              <div key={item.label} className="relative">
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white font-outfit font-bold text-[10px] uppercase tracking-[0.2em] transition-colors relative group py-8"
                  >
                    {item.label}
                    <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                  </Link>
                ) : (
                  <button
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white font-outfit font-bold text-[10px] uppercase tracking-[0.2em] transition-colors relative group py-8 ${activeDropdown === item.label ? 'text-gray-900 dark:text-white' : ''}`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    <span className={`absolute bottom-6 left-0 h-0.5 bg-red-600 transition-all ${activeDropdown === item.label ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </button>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.label && item.subItems && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl p-4 mt-[-10px]"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="space-y-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors group"
                          >
                            <div className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                              {sub.label}
                            </div>
                            {sub.description && (
                              <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-medium mt-1 leading-tight">
                                {sub.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400 transition-colors ml-4"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </nav>

          {/* User Actions & Time */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Real-time Clock */}
            {mounted && (
              <div className="hidden lg:flex flex-col items-end pr-4 mr-2 border-r border-gray-200 dark:border-zinc-800">
                <span className="text-[9px] font-outfit font-black uppercase tracking-widest text-gray-900 dark:text-white">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
                <span className="text-[9px] font-outfit font-bold uppercase tracking-widest text-red-600">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-zinc-800">
                <div className="relative group/user">
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 dark:border-zinc-800" />
                    ) : (
                      <UserCircle className="w-8 h-8 text-gray-400" />
                    )}
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-200">
                    <div className="w-48 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl p-2">
                      {profile?.role === 'admin' && (
                        <Link 
                          href="/admin" 
                          className="flex items-center gap-2 w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-[10px] font-outfit font-black uppercase tracking-widest text-gray-900 dark:text-white transition-colors"
                        >
                          <PenSquare className="w-4 h-4" />
                          Dashboard
                        </Link>
                      )}
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-2 w-full p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-[10px] font-outfit font-black uppercase tracking-widest text-red-600 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleSignIn}
                className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-zinc-200 px-6 py-2.5 rounded-full text-[10px] font-outfit font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-black/10 dark:shadow-white/5"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400 transition-colors"
            >
              {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-0 h-20 bg-white dark:bg-zinc-950 z-50 flex items-center px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-zinc-800"
          >
            <form onSubmit={handleSearch} className="max-w-7xl mx-auto w-full flex items-center gap-4">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                key={searchParams.get('q') || 'search'}
                autoFocus
                type="text"
                defaultValue={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keywords..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-serif text-gray-900 dark:text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Date/Time */}
              {mounted && (
                <div className="flex justify-between items-center pb-6 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-900 dark:text-white">
                    {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-[10px] font-outfit font-bold uppercase tracking-widest text-red-600">
                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </span>
                </div>
              )}
              
              {NAVIGATION.map((item) => (
                <div key={item.label} className="space-y-3">
                  {item.href ? (
                    <Link 
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm font-outfit font-black uppercase tracking-widest text-gray-900 dark:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <div className="text-[10px] font-outfit font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">
                        {item.label}
                      </div>
                      <div className="grid grid-cols-1 gap-2 pl-4">
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-sm font-medium text-gray-600 dark:text-zinc-400 hover:text-red-600 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              <div className="pt-6 border-t border-gray-100 dark:border-zinc-800">
                {user ? (
                  <div className="space-y-4">
                    {profile?.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-sm font-outfit font-black uppercase tracking-widest text-gray-700 dark:text-zinc-300"
                      >
                        <PenSquare className="w-5 h-5" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full text-left text-sm font-outfit font-black uppercase tracking-widest text-red-600"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleSignIn}
                    className="flex items-center gap-2 w-full text-left text-sm font-outfit font-black uppercase tracking-widest text-gray-700 dark:text-zinc-300"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
