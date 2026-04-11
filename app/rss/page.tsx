'use client';

import { motion } from 'motion/react';
import { Rss, Copy, ExternalLink, Info, Terminal, Globe, Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function RSSPage() {
  const [copied, setCopied] = useState(false);
  const rssUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/rss` : '/api/rss';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rssUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    { name: 'Feedly', url: `https://feedly.com/i/subscription/feed/${rssUrl}` },
    { name: 'Inoreader', url: `https://www.inoreader.com/?add_feed=${rssUrl}` },
    { name: 'Old Reader', url: `https://theoldreader.com/feeds/subscribe?url=${rssUrl}` }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <span className="inline-block text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-6">
            Syndication
          </span>
          <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
            RSS <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Feeds</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
            Take control of your information diet. Subscribe to our official RSS feed to receive the latest rationalist insights directly in your favorite news reader.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed Section */}
          <div className="lg:col-span-2 space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-zinc-800"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
                  <Rss className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-space font-black uppercase tracking-tight text-gray-900 dark:text-white">Main Feed</h2>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-widest">All published articles</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative flex items-center gap-4 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 overflow-hidden">
                  <code className="flex-grow text-sm font-mono text-gray-600 dark:text-zinc-400 truncate">
                    {rssUrl}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="flex-shrink-0 flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy URL'}
                  </button>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-red-600/50 transition-all group"
                  >
                    <span className="text-xs font-outfit font-black uppercase tracking-widest text-gray-900 dark:text-white">
                      {platform.name}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </a>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-space font-bold text-gray-900 dark:text-white uppercase tracking-tight">What is RSS?</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                  RSS (Really Simple Syndication) is a web feed that allows users and applications to access updates to websites in a standardized, computer-readable format. It enables you to keep track of many different websites in a single news aggregator.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-space font-bold text-gray-900 dark:text-white uppercase tracking-tight">Technical Spec</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                  Our feed follows the RSS 2.0 specification. It includes full article excerpts, publication dates, author metadata, and high-resolution cover image references for a rich reading experience.
                </p>
              </div>
            </motion.section>
          </div>

          {/* Sidebar / FAQ */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-zinc-900 dark:bg-white rounded-[2rem] p-8 text-white dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200"
            >
              <Globe className="w-10 h-10 text-red-600 mb-6" />
              <h3 className="text-2xl font-space font-black uppercase tracking-tight mb-4">Open Web</h3>
              <p className="text-zinc-400 dark:text-zinc-500 text-sm leading-relaxed mb-8">
                We believe in an open, decentralized web. RSS allows you to bypass algorithmic timelines and corporate gatekeepers.
              </p>
              <Link 
                href="/about"
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all"
              >
                Our Mission
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800"
            >
              <h4 className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400 mb-6">Common Questions</h4>
              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-space font-bold text-gray-900 dark:text-white uppercase mb-2">Is it free?</h5>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 leading-relaxed">Yes, our RSS feeds are completely free to use for personal and non-commercial purposes.</p>
                </div>
                <div>
                  <h5 className="text-sm font-space font-bold text-gray-900 dark:text-white uppercase mb-2">How often is it updated?</h5>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 leading-relaxed">The feed updates instantly whenever a new article is published on our platform.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
