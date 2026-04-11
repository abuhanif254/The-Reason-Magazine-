import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white py-12 mt-20 border-t border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-space text-3xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
                Reason<span className="text-red-500">.</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed max-w-md font-medium">
              A professional platform dedicated to atheism activism, secularism, and rational thought. We provide a space for critical thinking and evidence-based discourse.
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] font-outfit font-black uppercase tracking-[0.2em] mb-6 text-gray-500 dark:text-zinc-500">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">Home</Link></li>
              <li><Link href="/articles" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">Articles</Link></li>
              <li><Link href="/rss" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">RSS Feed</Link></li>
              <li><Link href="/newsletter" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">Newsletter</Link></li>
              <li><Link href="/about" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">About Us</Link></li>
              <li><Link href="/editorial-team" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">Editorial Team</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] font-outfit font-black uppercase tracking-[0.2em] mb-6 text-gray-500 dark:text-zinc-500">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white text-sm font-medium transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} Reason Magazine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
