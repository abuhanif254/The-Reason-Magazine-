'use client';

import { motion } from 'motion/react';
import { Mail, Twitter, Github, Youtube, Instagram, Tag, Star, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  tags: string[];
  featuredPosts: any[];
}

export function Sidebar({ tags, featuredPosts }: SidebarProps) {
  return (
    <aside className="space-y-12">
      {/* 1. Keep in Touch */}
      <section>
        <h3 className="text-[10px] font-outfit font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
          Keep in Touch
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Twitter, color: 'hover:text-sky-500', href: '#' },
            { icon: Youtube, color: 'hover:text-red-600', href: '#' },
            { icon: Instagram, color: 'hover:text-pink-500', href: '#' },
            { icon: Github, color: 'hover:text-gray-900 dark:hover:text-white', href: '#' },
          ].map((social, i) => (
            <Link 
              key={i} 
              href={social.href}
              className={`p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl text-gray-400 transition-all ${social.color} flex items-center justify-center border border-gray-100 dark:border-zinc-800 hover:border-current/20`}
            >
              <social.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Newsletter */}
      <section className="bg-red-600 rounded-2xl p-6 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative z-10">
          <Mail className="w-8 h-8 mb-4 opacity-50" />
          <h4 className="text-xl font-space font-black uppercase leading-tight mb-2">
            The Rationalist Digest
          </h4>
          <p className="text-white/80 text-xs font-medium mb-6">
            Join 50,000+ thinkers receiving our weekly insights.
          </p>
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
            />
            <button className="w-full bg-white text-red-600 font-outfit font-black uppercase tracking-widest text-[10px] py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* 3. Popular Tags */}
      <section>
        <h3 className="text-[10px] font-outfit font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 12).map((tag) => (
            <Link 
              key={tag} 
              href={`/articles?q=${tag}`}
              className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg text-[10px] font-outfit font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-400 hover:border-red-600/50 hover:text-red-600 transition-all"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Must Read */}
      <section>
        <h3 className="text-[10px] font-outfit font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
          Must Read
        </h3>
        <div className="space-y-6">
          {featuredPosts.slice(0, 3).map((post, i) => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="group flex gap-4">
              <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-800">
                {post.coverImage ? (
                  <img src={post.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase">Reason</div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-outfit font-bold uppercase tracking-widest text-red-600 mb-1">
                  {post.category}
                </span>
                <h4 className="text-sm font-space font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Support Us */}
      <section className="bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
        <Heart className="w-6 h-6 text-red-600 mb-4" />
        <h4 className="text-lg font-space font-black uppercase text-gray-900 dark:text-white mb-2">
          Support Reason
        </h4>
        <p className="text-gray-500 dark:text-zinc-500 text-xs font-medium mb-6 leading-relaxed">
          We are a non-profit platform. Your support helps us keep rational discourse free for everyone.
        </p>
        <Link 
          href="/support"
          className="flex items-center justify-between w-full bg-gray-900 dark:bg-white text-white dark:text-black font-outfit font-black uppercase tracking-widest text-[10px] px-4 py-3 rounded-xl hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all group"
        >
          Donate Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </aside>
  );
}
