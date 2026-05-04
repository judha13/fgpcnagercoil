'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const days = [
  {
    day: "Day 5",
    title: "The River of Life",
    verse: "He who believes in Me, out of his heart will flow rivers of living water. - John 7:38",
    desc: "A refreshing encounter with the Holy Spirit and the joy of salvation.",
    image: "/images/sequence1/ezgif-frame-001.jpg",
    activities: ["Water Games", "Salvation Call", "Praise Dance"],
    icon: "fa-water"
  },
  {
    day: "Day 6",
    title: "The Grand Finale",
    verse: "I am with you always, even to the end of the age. - Matthew 28:20",
    desc: "Celebrating our victories and commissioning our young explorers for the future.",
    image: "/images/sequence1/ezgif-frame-001.jpg",
    activities: ["Final Program", "Awarding Badges", "VBS Exam"],
    icon: "fa-trophy"
  }
];

export default function ThemeChapter3() {
  return (
    <section className="relative z-10 h-full flex items-center justify-center py-4">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-amber-500/80 text-[10px] uppercase tracking-[0.4em] font-black mb-2 block">Our VBS Journey</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Chapter Three: <span className="text-amber-400">The Victory</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {days.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative bg-emerald-950/40 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-emerald-500/10 hover:border-amber-500/30 transition-all duration-500 flex flex-col sm:flex-row h-full max-h-[300px]"
            >
              {/* Compact Side Image */}
              <div className="relative w-full sm:w-1/3 h-32 sm:h-auto overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-3 left-3 bg-amber-500 text-emerald-950 font-black px-3 py-1 rounded-xl text-[10px] uppercase tracking-widest">
                  {item.day}
                </div>
              </div>
              
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2 group-hover:text-amber-200 transition-colors">
                  <i className={`fas ${item.icon} text-amber-500 text-base`}></i>
                  {item.title}
                </h3>
                <p className="text-amber-200/60 italic text-[11px] mb-3 leading-tight line-clamp-1">{item.verse}</p>
                <p className="text-emerald-100/50 text-xs leading-relaxed mb-4 line-clamp-2">{item.desc}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {item.activities.map(act => (
                    <span key={act} className="bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/70 px-2 py-0.5 rounded-md text-[10px] font-bold">
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-amber-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
