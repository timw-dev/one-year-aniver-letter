'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { OrigamiHeart } from './OrigamiHeart';
import { useState, useEffect } from 'react';

export function MainLetter({ step, setStep }: {step: number, setStep: (value: number) => void }) {
  const [showText, setShowText] = useState(false);

  // Kích hoạt chữ hiện ra sau khi lá thư đã bay lên được 1.5 giây
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => setShowText(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <AnimatePresence>
      {step === 3 && (
        <motion.div
          key="main-letter"
          initial={{ y: '20vh', opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 40, delay: 0.2 }}
          className="relative z-20 w-[95%] md:w-[700px] lg:w-[800px] h-[85vh] mt-12 flex flex-col items-center justify-center"
        >
          <div className="absolute -top-24 md:-top-32 left-0 w-full flex justify-center items-end z-[-1] pointer-events-none">
            {/* Tim bên trái */}
            <motion.div animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -translate-x-20 md:-translate-x-32 bottom-[-40px]">
              <OrigamiHeart size="3xl" delay={0.2} mode="float" />
            </motion.div>
            
            {/* Tim khổng lồ chúa ở giữa */}
            <motion.div animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
              <OrigamiHeart size="4xl" delay={0} mode="float" />
            </motion.div>
            
            {/* Tim bên phải */}
            <motion.div animate={{ y: [0, 12, 0], rotate: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute translate-x-20 md:translate-x-36 bottom-[-20px]">
              <OrigamiHeart size="2xl" delay={0.4} mode="float"/>
            </motion.div>
          </div>

          <div className="w-full h-full bg-[url('assets/letter.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-10 relative">
            <AnimatePresence>
              {showText && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="text-center"
                >
                  <h1 className="text-4xl md:text-6xl font-serif text-[#4A3F3F] mb-6">1 Year of Us</h1>
                  <p className="text-xl text-[#4A3F3F]/80 font-serif leading-relaxed">
                    Kỷ niệm 1 năm của chúng mình...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}