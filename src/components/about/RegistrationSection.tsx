'use client';

import { motion } from 'framer-motion';

export default function RegistrationSection() {
  return (
    <section className="relative z-10 bg-emerald-950 py-24 overflow-hidden">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1 
          }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-900/40 px-4 py-2 rounded-full border border-amber-600/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-amber-300 text-[10px] font-black uppercase tracking-[0.2em]">New for 2026</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Online Viewer <span className="text-amber-400">Registration</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-emerald-950/40 backdrop-blur-xl rounded-[3rem] border border-emerald-500/10 p-8 md:p-16 relative overflow-hidden group hover:border-amber-500/20 transition-all duration-700 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/5 blur-[80px] group-hover:bg-amber-500/10 transition-all duration-700" />
          
          <p className="text-emerald-100/70 text-lg md:text-xl leading-relaxed mb-12 text-center font-medium">
            Join the VBS family from anywhere! Our <span className="text-amber-400 font-bold">Online Viewer Registration</span> is designed for families who want to experience the Fragrance of Christ from home.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {[
              { icon: "fa-music", text: "Daily song list shared via WhatsApp" },
              { icon: "fa-book-bible", text: "Class book portion & study materials" },
              { icon: "fa-file-lines", text: "Exam questions for each session" },
              { icon: "fa-video", text: "Share your kids' VBS moments with us" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-5 p-5 bg-emerald-900/20 rounded-[2rem] border border-emerald-500/5 hover:border-amber-500/20 transition-all duration-500"
              >
                <div className="w-12 h-12 min-w-[48px] bg-emerald-950 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:border-amber-500/40 shadow-lg">
                  <i className={`fas ${item.icon} text-amber-400 text-lg`}></i>
                </div>
                <p className="text-emerald-100/60 text-sm font-semibold leading-tight">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Register Button */}
          <div className="text-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-amber-600 to-amber-400 text-emerald-950 font-black text-lg md:text-xl rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.3)] border-b-4 border-amber-800 transition-all"
            >
              REGISTER AS VIEWER
            </motion.button>
          </div>

          {/* Contact Details */}
          <div className="pt-8 border-t border-emerald-500/10">
            <p className="text-emerald-500/40 text-[10px] uppercase tracking-[0.4em] text-center mb-6 font-black">
              Assistance & Support
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {[
                "+91 94884 84745",
                "+91 94425 18001",
                "+91 99439 54899"
              ].map((num, i) => (
                <a
                  key={i}
                  href={`tel:${num.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-emerald-100/40 hover:text-amber-400 transition-all duration-300"
                >
                  <div className="w-6 h-6 bg-emerald-500/5 rounded-full flex items-center justify-center">
                     <i className="fas fa-phone-alt text-[10px]"></i>
                  </div>
                  <span className="font-bold text-xs tracking-wider">{num}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
