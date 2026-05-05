'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const days = [
  {
    day: "Day 3",
    title: "The Wise Owl",
    verse: "If any of you lacks wisdom, let him ask of God. - James 1:5",
    desc: "Seeking divine wisdom to navigate the twists and turns of our jungle path.",
    image: "/images/theme/day3.png",
    activities: ["Puppet Show", "Bible Verse Study", "Wisdom Craft"],
    icon: "fa-feather"
  },
  {
    day: "Day 4",
    title: "Strength in the Storm",
    verse: "God is our refuge and strength, a very present help in trouble. - Psalm 46:1",
    desc: "Learning to trust God's protection during the wild storms of life.",
    image: "/images/theme/day4.png",
    activities: ["Team Song", "Group Exam", "Shield Badge"],
    icon: "fa-shield-alt"
  }
];

export default function ThemeChapter2() {
  return (
    <section className="relative z-10 h-full flex items-center justify-center py-12 md:py-4">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-emerald-400/80 text-[10px] uppercase tracking-[0.4em] font-black mb-2 block">Our VBS Journey</span>
          <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight">Chapter Two: <span className="text-emerald-400">The Growth</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {days.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.03, y: -10 }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                scale: { type: "spring", stiffness: 400, damping: 25 },
                y: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="group relative bg-emerald-950/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 flex flex-col sm:flex-row h-full min-h-[280px] md:min-h-[320px]"
            >
              {/* Compact Side Image */}
              <div className="relative w-full sm:w-2/5 h-32 md:h-auto overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4 bg-emerald-500 text-white font-black px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-widest shadow-xl">
                  {item.day}
                </div>
              </div>
              
              <div className="p-5 md:p-8 flex-1 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-black text-white mb-2 md:mb-3 flex items-center gap-3 group-hover:text-emerald-200 transition-colors">
                  <i className={`fas ${item.icon} text-emerald-400 text-xl`}></i>
                  {item.title}
                </h3>
                <p className="text-emerald-200/60 italic text-xs mb-4 leading-tight">{item.verse}</p>
                <p className="text-emerald-100/50 text-sm leading-relaxed mb-6">{item.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {item.activities.map(act => (
                    <span key={act} className="bg-amber-500/5 border border-amber-500/10 text-amber-400/70 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
