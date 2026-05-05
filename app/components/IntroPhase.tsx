'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud } from './Cloud';
import { OrigamiHeart } from './OrigamiHeart';
import { Envelope } from './Envelope';

export default function IntroPhase() {
  const [phase, setPhase] = useState<'enter' | 'opened' | 'reading'>('enter');

  const handleOpenEnvelope = () => {
    if (phase !== 'enter') return;
    setPhase('opened');
    setTimeout(() => setPhase('reading'), 2500);
  };

  return (
    <div className="relative w-full h-screen bg-romance-bg overflow-hidden flex items-center justify-center">
      
      {/* ================= HẬU CẢNH (Z-0) ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Tim nhỏ lơ lửng phía trên */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[10%] left-[20%] opacity-50 scale-50">
          <OrigamiHeart size="sm" delay={0} />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[15%] right-[25%] opacity-50 scale-[0.6]">
          <OrigamiHeart size="sm" delay={0.5} />
        </motion.div>

        {/* Mây hậu cảnh phía sau thư */}
        <Cloud size="md" className="top-[10%] left-[5%]" delay={0.2} />
        <Cloud size="sm" className="top-[20%] right-[10%]" direction={-1} delay={0.5} />
        <Cloud size="lg" className="bottom-[40%] right-[20%]" delay={0.8} />
      </div>

      {/* ================= TRUNG CẢNH: PHONG BÌ (Z-20) ================= */}
      <AnimatePresence>
        {phase !== 'reading' && (
          <motion.div
            key="envelope-container"
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '50vh', opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 40, duration: 1.5 }}
            className="absolute z-20 flex items-center justify-center w-full h-full"
          >
            <Envelope isOpened={phase === 'opened'} onClick={handleOpenEnvelope}>
              {phase === 'opened' && (
                <>
                  {[...Array(15)].map((_, i) => (
                    <OrigamiHeart key={i} size={i % 3 === 0 ? 'lg' : i % 2 === 0 ? 'md' : 'sm'} delay={i * 0.05} />
                  ))}
                </>
              )}
            </Envelope>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'reading' && (
          <motion.div
            key="main-letter"
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 45 }}
            className="relative z-20 w-[90%] md:w-[600px] h-[80vh] bg-[url('/image_62d9e8.jpg')] bg-cover bg-center bg-no-repeat shadow-2xl flex flex-col items-center justify-center p-10"
          >
            <h1 className="text-3xl md:text-5xl font-serif text-[#4A3F3F] mb-6">1 Year of Us</h1>
            <p className="text-lg text-[#4A3F3F]/80 text-center font-serif leading-relaxed">
              Kỷ niệm 1 năm của chúng mình...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TIỀN CẢNH (Z-50) ================= */}
      <div className="absolute inset-0 z-50 pointer-events-none flex items-end">
        {/* Đẩy các đám mây khổng lồ xuống sâu hơn (-bottom-25% đến -bottom-30%) để không chắn tâm phong bì */}
        <Cloud size="2xl" className="-bottom-[10%] -left-[10%]" delay={1} />
        <Cloud size="2xl" className="-bottom-[5%] left-[20%]" delay={0.3} direction={-1} />
        <Cloud size="xl" className="bottom-[4%] -right-[10%]" delay={0.6} />
        <Cloud size="xl" className="-bottom-[3%] right-[12%]" delay={0.6} />
        <Cloud size="2xl" className="-bottom-[10%] -right-[5%]" delay={0.6} />
        <Cloud size="2xl" className="-bottom-[10%] -left-[0%]" delay={0.6} />
        <Cloud size="2xl" className="-bottom-[3%] left-[12%]" delay={0.6} />
        <Cloud size="2xl" className="-bottom-[12%] left-[24%]" delay={0.6} />
      </div>

    </div>
  );
}