'use client';

import { Megaphone, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const EVENTS = [
  {
    title: "Global Secular Humanist Convention",
    date: "Oct 15, 2026",
    location: "London, UK",
    type: "Conference"
  },
  {
    title: "Rationalist March for Science",
    date: "Nov 02, 2026",
    location: "Washington D.C., USA",
    type: "Protest"
  },
  {
    title: "Secularism in Education Workshop",
    date: "Nov 20, 2026",
    location: "Online",
    type: "Workshop"
  }
];

export function ActivismFeed() {
  return (
    <section className="my-24">
      <div className="flex items-center gap-2 mb-8">
        <Megaphone className="w-5 h-5 text-red-600" />
        <h2 className="text-sm font-outfit font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">
          Activism & Events
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EVENTS.map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 hover:border-red-600/30 transition-all group"
          >
            <span className="inline-block px-2 py-1 bg-red-600/10 text-red-600 text-[10px] font-outfit font-bold uppercase tracking-widest rounded mb-4">
              {event.type}
            </span>
            <h3 className="text-xl font-space font-bold text-gray-900 dark:text-white mb-6 group-hover:text-red-600 transition-colors">
              {event.title}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-outfit font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500">
                <Calendar className="w-3 h-3" />
                {event.date}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-outfit font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500">
                <MapPin className="w-3 h-3" />
                {event.location}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
