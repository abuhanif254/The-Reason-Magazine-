'use client';

import { Twitter, Facebook, Link as LinkIcon, Share2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const [showCopied, setShowCopied] = useState(false);

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-black hover:text-white',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'Reddit',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.752c1.824.07 3.48.632 4.674 1.488.308-.362.765-.598 1.28-.598.92 0 1.667.747 1.667 1.666 0 .616-.336 1.15-.833 1.434.03.222.046.445.046.67 0 2.921-3.425 5.3-7.65 5.3-4.225 0-7.65-2.379-7.65-5.3 0-.225.015-.448.046-.67-.497-.284-.833-.818-.833-1.434 0-.92.747-1.666 1.667-1.666.515 0 .972.236 1.28.598 1.194-.856 2.85-1.418 4.674-1.488l.896-4.195c.03-.143.174-.238.319-.203l3.127.658c.012-.475.404-.857.888-.857zm-8.461 7.13c-.822 0-1.49.667-1.49 1.49s.668 1.49 1.49 1.49c.822 0 1.49-.667 1.49-1.49s-.668-1.49-1.49-1.49zm6.902 0c-.822 0-1.49.667-1.49 1.49s.668 1.49 1.49 1.49c.822 0 1.49-.667 1.49-1.49s-.668-1.49-1.49-1.49zm-2.454 4.144c-.06 0-.118.021-.165.059-1.02.813-2.861.813-3.882 0-.048-.038-.105-.059-.165-.059-.144 0-.261.117-.261.261 0 .064.024.124.064.17.447.447 1.291.811 2.277.811s1.83-.364 2.277-.811c.04-.046.064-.106.064-.17 0-.144-.117-.261-.261-.261z" />
        </svg>
      ),
      href: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#FF4500] hover:text-white',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 flex items-center gap-2">
        <Share2 className="w-3 h-3" />
        Share this article
      </h4>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full text-sm font-medium text-gray-700 dark:text-zinc-300 transition-all ${link.color}`}
          >
            {link.icon}
            {link.name}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full text-sm font-medium text-gray-700 dark:text-zinc-300 transition-all hover:bg-gray-50 dark:hover:bg-zinc-800 relative"
        >
          <LinkIcon className="w-4 h-4" />
          Copy Link
          <AnimatePresence>
            {showCopied && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap"
              >
                Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
