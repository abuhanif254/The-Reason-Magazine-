'use client';

import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase"
        >
          About Reason Magazine
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto"
        >
          We are a platform dedicated to the promotion of secularism, rational thought, and evidence-based discourse.
        </motion.p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="prose prose-lg md:prose-xl prose-gray dark:prose-invert mx-auto prose-headings:font-serif prose-headings:font-bold prose-a:text-red-600"
      >
        <h2>Our Mission</h2>
        <p>
          Reason Magazine was founded with a clear purpose: to provide a professional, high-quality platform for atheism activism and secular advocacy. In a world increasingly dominated by misinformation and dogma, we believe that critical thinking and the scientific method are our best tools for understanding reality and improving the human condition.
        </p>
        
        <h2>What We Do</h2>
        <p>
          We publish essays, opinion pieces, investigative reports, and reviews that challenge religious privilege, defend the separation of church and state, and explore the philosophical underpinnings of a secular worldview.
        </p>
        
        <h2>Join the Conversation</h2>
        <p>
          We welcome contributions from writers, thinkers, and activists who share our commitment to reason. If you are interested in writing for us, please create an account and reach out to our editorial team.
        </p>
      </motion.div>
    </motion.div>
  );
}
