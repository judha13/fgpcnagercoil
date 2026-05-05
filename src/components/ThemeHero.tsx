'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import FaithDanceSection from './about/FaithDanceSection';
import ScripturePuppetSection from './about/ScripturePuppetSection';
import SkitPrayerSection from './about/SkitPrayerSection';
import ThemeChapter1 from './theme/ThemeChapter1';
import ThemeChapter2 from './theme/ThemeChapter2';
import ThemeChapter3 from './theme/ThemeChapter3';
import ImageSequence from './ImageSequence';

export default function ThemeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeId, setActiveId] = useState('vbs2026');

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // Adjusted thresholds: intro (0.1) + main relative progress
    if (latest < 0.22) { // 0.1 + (0.12 * 0.9)
      if (activeId !== 'vbs2026') setActiveId('vbs2026');
    } else if (latest < 0.73) { // 0.1 + (0.7 * 0.9)
      if (activeId !== 'highlights') setActiveId('highlights');
    } else {
      if (activeId !== 'theme') setActiveId('theme');
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Timeline splitting: 0-0.1 for Intro, 0.1-1.0 for Main content
  const introProgress = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const mainProgress = useTransform(smoothProgress, [0.1, 1], [0, 1]);

  const introOpacity = useTransform(smoothProgress, [0, 0.08, 0.1], [1, 1, 0]);

  // Parallax and Global Travel for background - using mainProgress

  // Hero Section (Shifted to start after intro)
  const heroOpacity = useTransform(mainProgress, [0, 0.05, 0.08, 0.12], [0, 1, 1, 0]);
  const heroScale = useTransform(mainProgress, [0, 0.12], [1, 0.8]);

  // Highlights Sequential Reveals - using mainProgress
  const highlight1Opacity = useTransform(mainProgress, [0.12, 0.18, 0.28, 0.34], [0, 1, 1, 0]);
  const highlight1Y = useTransform(mainProgress, [0.12, 0.18, 0.28, 0.34], [50, 0, 0, -50]);
  const highlight1Scale = useTransform(mainProgress, [0.12, 0.18, 0.28, 0.34], [0.9, 1, 1, 1.1]);

  const highlight2Opacity = useTransform(mainProgress, [0.34, 0.4, 0.5, 0.56], [0, 1, 1, 0]);
  const highlight2Y = useTransform(mainProgress, [0.34, 0.4, 0.5, 0.56], [50, 0, 0, -50]);
  const highlight2Scale = useTransform(mainProgress, [0.34, 0.4, 0.5, 0.56], [0.9, 1, 1, 1.1]);

  const highlight3Opacity = useTransform(mainProgress, [0.56, 0.62, 0.7, 0.76], [0, 1, 1, 0]);
  const highlight3Y = useTransform(mainProgress, [0.56, 0.62, 0.7, 0.76], [50, 0, 0, -50]);
  const highlight3Scale = useTransform(mainProgress, [0.56, 0.62, 0.7, 0.76], [0.9, 1, 1, 1.1]);

  // Theme Chapters Sequential Reveals - using mainProgress
  const theme1Opacity = useTransform(mainProgress, [0.70, 0.75, 0.80, 0.85], [0, 1, 1, 0]);
  const theme1X = useTransform(mainProgress, [0.70, 0.75, 0.80, 0.85], [-100, 0, 0, 100]);

  const theme2Opacity = useTransform(mainProgress, [0.85, 0.90, 0.95, 0.98], [0, 1, 1, 0]);
  const theme2X = useTransform(mainProgress, [0.85, 0.90, 0.95, 0.98], [100, 0, 0, -100]);

  const theme3Opacity = useTransform(mainProgress, [0.98, 1.0], [0, 1]);
  const theme3Y = useTransform(mainProgress, [0.98, 1.0], [100, 0]);
  const theme3Rotate = useTransform(mainProgress, [0.98, 1.0], [5, 0]);

  // Background Opacities - using mainProgress
  const bg1Opacity = useTransform(mainProgress, [0, 0.05, 0.7, 0.8], [0, 1, 1, 0]); // Image Sequence Base (Fades in after intro)

  return (
    <div id="theme-hero-container" ref={containerRef} className="relative h-[1000vh] bg-emerald-950">
      {/* Dynamic Background Layers */}
      <div className="fixed inset-0 z-0 h-screen overflow-hidden">
        {/* Layer 0: Intro Image Sequence */}
        <motion.div style={{ opacity: introOpacity }} className="absolute inset-0">
          <ImageSequence
            progress={introProgress}
            frameCount={79}
            directory={isMounted && window.innerWidth < 768 ? "/images/mobile/sequence_1" : "/images/desktop/sequence_1"}
            prefix="frame_"
            extension="jpg"
            digits={4}
          />
        </motion.div>

        {/* Layer 1: Image Sequence Journey (Main) */}
        <motion.div style={{ opacity: bg1Opacity }} className="absolute inset-0">
          <ImageSequence
            progress={mainProgress}
            frameCount={120}
            directory={isMounted && window.innerWidth < 768 ? "/images/mobile/sequence_2" : "/images/desktop/sequence_2"}
            prefix="frame_"
            extension="jpg"
            digits={4}
          />
        </motion.div>
        {/* Subtle Blur & Overlay Layer */}
        {/* <div className="absolute inset-0 backdrop-blur-[1px] bg-emerald-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-transparent to-emerald-950/80 pointer-events-none" /> */}
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {isMounted && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-200/30 rounded-full blur-[1px]"
            initial={{ x: (i * 7) % 100 + '%', y: (i * 13) % 100 + '%' }}
            animate={{ y: [null, '-40px', '40px'], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + i % 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Sticky Content Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-20 overflow-hidden">


        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-40 text-center px-6 flex flex-col items-center justify-center h-full"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-amber-900/70 backdrop-blur-xl px-3 py-1 rounded-full border border-amber-500/30 text-amber-100 font-semibold text-xs shadow-lg flex items-center gap-1.5">
              <i className="fas fa-calendar-alt text-amber-400 text-[10px]"></i><span>MAY 25 - 29</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-amber-400/60"></div>
            <div className="bg-amber-900/70 backdrop-blur-xl px-3 py-1 rounded-full border border-amber-500/30 text-amber-100 font-semibold text-xs shadow-lg flex items-center gap-1.5">
              <i className="fas fa-clock text-amber-400 text-[10px]"></i><span>9 AM - 1 PM</span>
            </div>
          </div>
          <div className="relative w-[380px] h-[160px] md:w-[900px] md:h-[360px]">
            <Image src="/images/jungle/logo.png" alt="VBS" fill className="object-contain brightness-110 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white mb-1 tracking-widest font-serif italic -mt-2">FRAGRANCE</h1>
          <p className="text-amber-200/70 text-xs md:text-sm mb-4 italic tracking-wide">VBS 2026 — FGPC Nagercoil</p>
          {/*
          <motion.button onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-2.5 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold text-sm md:text-base rounded-full border-b-2 border-emerald-800 shadow-lg">REGISTER NOW</motion.button>
*/}
        </motion.div>


        {/* Global Cinematic Content Reveal */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Highlights */}
          <div id="highlights" className="absolute inset-0">
            <motion.div style={{ opacity: highlight1Opacity, y: highlight1Y, scale: highlight1Scale }} className="absolute inset-0 flex items-center justify-center pointer-events-auto"><FaithDanceSection /></motion.div>
            <motion.div style={{ opacity: highlight2Opacity, y: highlight2Y, scale: highlight2Scale }} className="absolute inset-0 flex items-center justify-center pointer-events-auto"><ScripturePuppetSection /></motion.div>
            <motion.div style={{ opacity: highlight3Opacity, y: highlight3Y, scale: highlight3Scale }} className="absolute inset-0 flex items-center justify-center pointer-events-auto"><SkitPrayerSection /></motion.div>
          </div>
          {/* Journey Chapters */}
          <div id="theme" className="absolute inset-0">
            <motion.div style={{ opacity: theme1Opacity, x: theme1X }} className="absolute inset-0 flex items-center justify-center pointer-events-auto"><ThemeChapter1 /></motion.div>
            <motion.div style={{ opacity: theme2Opacity, x: theme2X }} className="absolute inset-0 flex items-center justify-center pointer-events-auto"><ThemeChapter2 /></motion.div>
            <motion.div style={{ opacity: theme3Opacity, y: theme3Y, rotate: theme3Rotate }} className="absolute inset-0 flex items-center justify-center pointer-events-auto"><ThemeChapter3 /></motion.div>
          </div>
        </div>

      </div>

      {/* Visual Indicator - Unified Bottom Right Pill */}
      <div className="fixed bottom-6 right-6 flex flex-row gap-4 z-50 bg-emerald-950/40 backdrop-blur-xl p-3 rounded-full border border-emerald-500/10 shadow-2xl">
        {[
          { id: 'vbs2026', label: 'vbs 2026' },
          { id: 'highlights', label: 'highlights' },
          { id: 'theme', label: 'theme' }
        ].map((item, i) => (
          <ScrollIndicator key={i} label={item.label} targetId={item.id} isActive={activeId === item.id} />
        ))}
      </div>
    </div>
  );
}

function ScrollIndicator({ label, targetId, isActive }: { label: string; targetId: string; isActive: boolean; }) {
  const scrollToSection = () => {
    const container = document.getElementById('theme-hero-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + rect.top;
    const totalHeight = container.offsetHeight;

    let targetProgress = 0;
    if (targetId === 'vbs2026') targetProgress = 0.11; // After intro
    if (targetId === 'highlights') targetProgress = 0.27; // 0.1 + (0.18 * 0.9) approx 0.262
    if (targetId === 'theme') targetProgress = 0.82;      // 0.1 + (0.80 * 0.9) approx 0.82

    const targetScroll = absoluteTop + (targetProgress * (totalHeight - window.innerHeight));

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };
  return (
    <div className="group flex items-center justify-end gap-4 cursor-pointer" onClick={scrollToSection}>
      <motion.span initial={false} animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10, display: isActive ? 'block' : 'none' }} className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-400 group-hover:opacity-100 transition-all duration-300" style={{ display: isActive ? 'block' : undefined }}>{label}</motion.span>
      {!isActive && <span className="absolute right-8 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap">{label}</span>}
      <motion.div animate={{ scale: isActive ? 1.5 : 1, backgroundColor: isActive ? "rgba(251,191,36,1)" : "rgba(255,255,255,0.3)", borderColor: isActive ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.2)" }} className="w-2.5 h-2.5 rounded-full border shadow-sm" />
    </div>
  );
}
