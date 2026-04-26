'use client';

import { motion } from 'framer-motion';

export default function RootPage() {
  return (
    <main style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'var(--font-poppins)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to FGP C Nagercoil</h1>
        <p style={{ fontSize: '1.2rem' }}>Framer Motion Integrated & Cleanup Complete</p>
      </motion.div>
    </main>
  );
}
