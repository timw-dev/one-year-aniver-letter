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
        <Cloud size="lg" className="top-[5%] left-[2%]" delay={0.2} />
        <Cloud size="xl" className="top-[10%] right-[2%]" direction={-1} delay={0.6} />
        <Cloud size="sm" className="top-[5%] left-[45%]" delay={1.5} /> 
        
        <Cloud size="xl" className="top-[35%] -left-[5%]" delay={1.2} direction={-1} />
        <Cloud size="lg" className="bottom-[40%] right-[8%]" delay={0.8} />
        <Cloud size="md" className="top-[45%] right-[25%]" delay={1.5} direction={-1} />

        {/* Tim lơ lửng trang trí (Dùng isBurst={false} để nó không biến mất) */}
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[12%] left-[12%] opacity-70 scale-[0.5]">
          <OrigamiHeart size="sm" delay={0} isBurst={false} />
        </motion.div>
        
        <motion.div animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[18%] right-[15%] opacity-70 scale-[0.6]">
          <OrigamiHeart size="md" delay={0.5} isBurst={false} />
        </motion.div>

        <motion.div animate={{ scale: [0.4, 0.45, 0.4], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[35%] left-[8%] pointer-events-none">
          <OrigamiHeart size="sm" delay={1} isBurst={false} />
        </motion.div>
      </div>

      {/* ================= DÒNG CHỮ VÒM CONG (Z-10) ================= */}
      <AnimatePresence>
        {phase !== 'reading' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="absolute top-[8%] md:top-[2%] z-10 w-full flex justify-center pointer-events-none"
          >
            {/* Viewbox to hơn (800) để không bị cắt chữ. Chiều rộng thực tế lg:w-[800px] */}
            <svg viewBox="0 0 800 200" className="w-[450px] md:w-[650px] lg:w-[800px] overflow-visible">
              {/* Đường cong phẳng hơn (Q có tọa độ y=60 thay vì 20 như cũ) */}
              <path id="curvePath" d="M 100,150 Q 400,40 700,150" fill="transparent" />
              
              {/* Chữ cong, màu đậm hơn (#B8284A) */}
              <text className="font-serif italic font-bold text-[28px] md:text-[38px]" fill="#B8284A">
                <textPath xlinkHref="#curvePath" startOffset="50%" textAnchor="middle">
                  Happy One Year Anniversary!
                </textPath>
              </text>
              
              {/* Dòng chữ Timw <3 Naki ở giữa bên dưới */}
              <text x="400" y="175" textAnchor="middle" className="font-serif font-bold text-[24px] md:text-[32px]" fill="#D63A60">
                Timw ❤️ Naki
              </text>
              
              {/* Tim nhỏ chấm 2 đầu */}
              <motion.circle cx="60" cy="150" r="5" fill="#D63A60" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
              <motion.circle cx="740" cy="150" r="5" fill="#D63A60" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

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
                  {[...Array(20)].map((_, i) => (
                    // Truyền isBurst={true} để tim bay ra từ thư
                    <OrigamiHeart key={i} size={i % 3 === 0 ? 'lg' : i % 2 === 0 ? 'md' : 'sm'} delay={i * 0.05} isBurst={true} />
                  ))}
                </>
              )}
            </Envelope>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= LÁ THƯ CHÍNH ================= */}
      <AnimatePresence>
        {phase === 'reading' && (
          <motion.div
            key="main-letter"
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 45 }}
            className="relative z-20 w-[95%] md:w-[700px] lg:w-[800px] h-[85vh] bg-[url('/image_62d9e8.jpg')] bg-cover bg-center bg-no-repeat shadow-2xl flex flex-col items-center justify-center p-10"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-[#4A3F3F] mb-6">1 Year of Us</h1>
            <p className="text-xl text-[#4A3F3F]/80 text-center font-serif leading-relaxed">
              Kỷ niệm 1 năm của chúng mình...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TIỀN CẢNH (BIỂN MÂY ĐÁY) ================= */}
      <div className="absolute inset-x-0 bottom-0 z-50 pointer-events-none h-0">
        <Cloud size="xl" className="absolute bottom-[-30px] left-[-5%]" delay={0.2} />
        <Cloud size="2xl" className="absolute bottom-[-20px] left-[-20%]" delay={0.5} direction={-1} />
        <Cloud size="2xl" className="absolute bottom-[-50px] left-[10%]" delay={0.5} direction={-1} />
        <Cloud size="xl" className="absolute bottom-[-20px] left-[40%] max-xl:hidden" delay={0.8} />
        <Cloud size="2xl" className="absolute bottom-[-60px] right-[10%] max-xl:hidden" delay={0.4} direction={-1} />
        <Cloud size="2xl" className="absolute bottom-[-30px] right-[-24%]" delay={0.7} />

        <Cloud size="2xl" className="absolute bottom-[-100px] left-[-15%]" delay={0.3} />
        <Cloud size="2xl" className="absolute bottom-[-150px] left-[25%]" delay={0.9} direction={-1} />
        <Cloud size="2xl" className="absolute bottom-[-120px] right-[-12%]" delay={0.1} />
        
        <Cloud size="xl" className="absolute bottom-[-180px] left-1/2 -translate-x-1/2" delay={0.6} />
      </div>

    </div>
  );
}