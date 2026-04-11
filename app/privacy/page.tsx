'use client';

import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, Globe, Bell } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'April 10, 2026';

  const sections = [
    {
      title: 'Information We Collect',
      icon: <Eye className="w-6 h-6 text-red-600" />,
      content: `We collect information that you provide directly to us when you create an account, subscribe to our newsletter, or interact with our content. This may include your name, email address, and profile information provided through Google Authentication. We also automatically collect certain technical information, such as your IP address, browser type, and usage patterns on our platform.`
    },
    {
      title: 'How We Use Your Information',
      icon: <Shield className="w-6 h-6 text-red-600" />,
      content: `Your information is used to personalize your experience, provide customer support, and send you updates about Reason Magazine. We use usage data to improve our platform's performance and relevance. We do not sell your personal information to third parties. Your data is primarily used to maintain your account and provide the services you've requested.`
    },
    {
      title: 'Data Security',
      icon: <Lock className="w-6 h-6 text-red-600" />,
      content: `We implement a variety of security measures to maintain the safety of your personal information. We use industry-standard encryption and secure authentication through Firebase (a Google service). However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      title: 'Third-Party Services',
      icon: <Globe className="w-6 h-6 text-red-600" />,
      content: `Reason Magazine uses third-party services like Firebase for authentication and database management. These services have their own privacy policies. We may also use analytics tools to understand how our audience interacts with our content. These tools may use cookies to track your activity across the web.`
    },
    {
      title: 'Your Rights & Choices',
      icon: <FileText className="w-6 h-6 text-red-600" />,
      content: `You have the right to access, update, or delete your personal information at any time through your account settings. You can also unsubscribe from our newsletter using the link provided in every email. If you wish to delete your entire account and associated data, please contact our support team.`
    },
    {
      title: 'Policy Updates',
      icon: <Bell className="w-6 h-6 text-red-600" />,
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.`
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
            Legal Transparency
          </span>
          <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
            Privacy <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Policy</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
            At Reason Magazine, we are committed to protecting your privacy and ensuring your data is handled with the same rational care we apply to our journalism.
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

        {/* Contact Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[2rem] bg-red-600 text-white text-center"
        >
          <h2 className="text-3xl font-space font-bold mb-4 uppercase tracking-tight">Questions about your data?</h2>
          <p className="text-red-100 max-w-2xl mx-auto mb-8">
            If you have any questions or concerns regarding this Privacy Policy or our data practices, please do not hesitate to contact our legal compliance team.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-red-600 px-10 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all active:scale-95 shadow-xl shadow-black/10"
          >
            Contact Legal Team
          </a>
        </motion.div>
      </div>
    </div>
  );
}
