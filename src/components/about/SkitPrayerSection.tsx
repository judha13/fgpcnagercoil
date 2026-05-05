'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const cards = [
  {
    title: "Skit",
    desc: "Creative drama bringing Bible stories alive daily.",
    image: "/images/about/skit.jpg",
    icon: "fa-theater-masks"
  },
  {
    title: "Prayer",
    desc: "Children connecting with God through heartfelt prayer.",
    image: "/images/about/prayer.webp",
    icon: "fa-hands-praying"
  }
];

export default function SkitPrayerSection() {
  return (
    <section className="relative z-10 h-full flex items-center overflow-hidden py-10">
      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {cards.map((card, cIdx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: cIdx * 0.2 }}
              className="group relative bg-emerald-950/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-emerald-500/10 hover:border-amber-500/30 transition-all duration-700 hover:shadow-[0_0_50px_rgba(245,158,11,0.1)]"
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                <Image 
                  src={card.image} 
                  alt={card.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-amber-500 text-emerald-950 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                  >
                    <i className="fas fa-play text-xl ml-1"></i>
                  </motion.div>
                </div>

                {/* Badge Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-emerald-950/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-xl group-hover:border-amber-500/40 transition-colors duration-500">
                  <i className={`fas ${card.icon} text-amber-400 text-lg`}></i>
                </div>
              </div>

              <div className="p-8 pt-6">
                <div className="flex items-center gap-3 mb-3">
                   <div className="h-px w-8 bg-amber-500/50" />
                   <span className="text-amber-500/80 text-[10px] uppercase tracking-[0.3em] font-bold">Highlight</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-amber-100 transition-colors duration-500">{card.title}</h3>
                <p className="text-emerald-100/60 text-sm leading-relaxed mb-4">{card.desc}</p>
                
                <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest cursor-pointer group/link">
                  Watch Highlights 
                  <i className="fas fa-arrow-right text-[10px] group-hover/link:translate-x-1 transition-transform"></i>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
