'use client';

import { motion } from 'motion/react';
import { User, Mail, Twitter, Linkedin, Globe } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Editor-in-Chief',
    bio: 'A cognitive scientist and secular advocate with over 15 years of experience in rationalist discourse. Sarah leads our editorial vision and long-form investigative pieces.',
    image: 'https://picsum.photos/seed/sarah/400/500',
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'sarah@reasonmag.com'
    }
  },
  {
    name: 'Marcus Thorne',
    role: 'Senior Editor, Philosophy',
    bio: 'Specializing in modern secular ethics and the history of freethought. Marcus brings a rigorous philosophical lens to our monthly features.',
    image: 'https://picsum.photos/seed/marcus/400/500',
    social: {
      twitter: '#',
      globe: '#',
      email: 'marcus@reasonmag.com'
    }
  },
  {
    name: 'Elena Rodriguez',
    role: 'Activism Coordinator',
    bio: 'A veteran organizer for secular rights. Elena manages our activism feed and coordinates with global secular organizations for on-the-ground reporting.',
    image: 'https://picsum.photos/seed/elena/400/500',
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'elena@reasonmag.com'
    }
  },
  {
    name: 'James Wilson',
    role: 'Science Correspondent',
    bio: 'James covers the intersection of scientific discovery and secular values, ensuring our readers stay informed on evidence-based progress.',
    image: 'https://picsum.photos/seed/james/400/500',
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'james@reasonmag.com'
    }
  }
];

export default function EditorialTeamPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-6">
            The Minds Behind Reason
          </span>
          <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
            Editorial <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Team</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
            Our team is comprised of dedicated scholars, activists, and journalists committed to the pursuit of truth through reason, evidence, and secular advocacy.
          </p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-zinc-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="flex gap-4">
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-white hover:text-red-500 transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-white hover:text-red-500 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.globe && (
                      <a href={member.social.globe} className="text-white hover:text-red-500 transition-colors">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.email && (
                      <a href={`mailto:${member.social.email}`} className="text-white hover:text-red-500 transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-space font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-[10px] font-outfit font-black uppercase tracking-widest text-red-600">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-[2rem] p-12 md:p-20 text-center border border-gray-100 dark:border-zinc-800">
          <h2 className="text-4xl font-space font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
            Want to contribute?
          </h2>
          <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
            We are always looking for fresh voices in secular activism and rationalist philosophy. If you have a story to tell or an argument to make, we want to hear from you.
          </p>
          <button className="bg-red-600 text-white px-10 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-600/20">
            Submit a Proposal
          </button>
        </div>
      </section>
    </div>
  );
}
