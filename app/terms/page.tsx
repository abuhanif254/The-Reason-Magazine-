'use client';

import { motion } from 'motion/react';
import { Scale, UserCheck, Copyright, AlertTriangle, Ban, Gavel, HelpCircle } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = 'April 10, 2026';

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: <UserCheck className="w-6 h-6 text-red-600" />,
      content: `By accessing or using Reason Magazine, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.`
    },
    {
      title: 'User Conduct & Discourse',
      icon: <Scale className="w-6 h-6 text-red-600" />,
      content: `Reason Magazine is a platform for rational discourse. We expect users to engage in evidence-based discussion. While we encourage critical thinking and the challenging of ideas, we strictly prohibit hate speech, harassment, or the promotion of violence. We reserve the right to remove any content that violates these principles of civil discourse.`
    },
    {
      title: 'Intellectual Property',
      icon: <Copyright className="w-6 h-6 text-red-600" />,
      content: `The content published on Reason Magazine, including articles, graphics, and logos, is the property of Reason Magazine or its content creators and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from this content without express written permission from the editorial office.`
    },
    {
      title: 'Account Responsibility',
      icon: <Ban className="w-6 h-6 text-red-600" />,
      content: `If you create an account on our platform, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify Reason Magazine of any unauthorized uses of your account or any other breaches of security.`
    },
    {
      title: 'Limitation of Liability',
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      content: `In no event shall Reason Magazine or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Reason Magazine&apos;s website, even if we have been notified orally or in writing of the possibility of such damage.`
    },
    {
      title: 'Governing Law',
      icon: <Gavel className="w-6 h-6 text-red-600" />,
      content: `These terms and conditions are governed by and construed in accordance with international law and the laws of the United Kingdom, and you irrevocably submit to the exclusive jurisdiction of the courts in that location for any disputes arising out of these terms.`
    }
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
            Legal Framework
          </span>
          <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
            Terms of <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Service</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
            Please read these terms carefully before using our platform. They outline the rules and regulations for the use of Reason Magazine&apos;s digital services.
          </p>
          <div className="mt-8 flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">
            <span>Last Updated:</span>
            <span className="text-gray-900 dark:text-white">{lastUpdated}</span>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4 p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-red-600/20 transition-all group"
            >
              <div className="w-12 h-12 bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-zinc-800 group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <h2 className="text-2xl font-space font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                {section.title}
              </h2>
              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-sm">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Support Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[2rem] bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-center border border-zinc-800 dark:border-zinc-200"
        >
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-space font-bold mb-4 uppercase tracking-tight">Need Clarification?</h2>
          <p className="text-zinc-400 dark:text-zinc-500 max-w-2xl mx-auto mb-8">
            If you have any questions regarding our Terms of Service or need further explanation of your rights and responsibilities, our support team is here to help.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-600/20"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
