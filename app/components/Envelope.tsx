'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EnvelopeProps {
  isOpened: boolean;
  onClick: () => void;
  children?: ReactNode;
}

export function Envelope({ isOpened, onClick, children }: EnvelopeProps) {
  return (
    <motion.div
      onClick={onClick}
      className="relative w-[300px] h-[195px] md:w-[500px] md:h-[325px] lg:w-[700px] lg:h-[455px] cursor-pointer mx-auto"
      style={{ perspective: 1200 }}
      whileHover={!isOpened ? { scale: 1.03 } : {}}
    >
      {/* LỚP 1: Lòng phong bì */}
      <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full z-10 rounded-b-md overflow-hidden">
        <defs>
          <linearGradient id="pocketGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC8D6" />
            <stop offset="100%" stopColor="#FF9EB3" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="400" height="260" fill="url(#pocketGrad)" />
        <motion.rect 
          x="0" y="0" width="400" height="260" fill="#000" 
          animate={{ opacity: isOpened ? 0 : 0.15 }} 
          transition={{ duration: 0.8 }} 
        />
      </svg>

      {/* LỚP 2: TRÁI TIM NẰM TRONG */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {children}
      </div>

      {/* LỚP 3: Mặt trước phong bì */}
      <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full z-30 drop-shadow-md pointer-events-none">
        <polygon points="0,0 200,130 0,260" fill="#fcfcfc" stroke="#f0f0f0" strokeWidth="1" />
        <polygon points="400,0 200,130 400,260" fill="#fcfcfc" stroke="#f0f0f0" strokeWidth="1" />
        <polygon points="0,260 200,130 400,260" fill="#ffffff" stroke="#f0f0f0" strokeWidth="2" />
      </svg>

      {/* LỚP 4: Nắp phong bì 3D */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-40 drop-shadow-sm"
        style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
        animate={{ rotateX: isOpened ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* === MẶT NGOÀI (Trắng + Dấu Sáp) === */}
        <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
          <polygon points="0,0 400,0 200,140" fill="#ffffff" stroke="#f0f0f0" strokeWidth="2" />
          
          {/* Cụm Dấu Sáp Trái Tim (Wax Seal) */}
          <g transform="translate(175, 115)">
            <path d="M25 45 C 25 45, 0 30, 0 15 C 0 5, 15 0, 25 10 C 35 0, 50 5, 50 15 C 50 30, 25 45, 25 45 Z" 
                  fill="#D63A60" 
                  filter="drop-shadow(0 4px 3px rgba(0,0,0,0.3))" 
                  stroke="#B8284A" strokeWidth="1" />
            <path d="M25 40 C 25 40, 5 28, 5 15 C 5 8, 15 4, 25 12 C 35 4, 45 8, 45 15 C 45 28, 25 40, 25 40 Z" 
                  fill="none" stroke="#E65A78" strokeWidth="1.5" />
            <text x="25" y="24" fontFamily="serif" fontSize="12" fill="#FFD1DC" textAnchor="middle" fontStyle="italic" fontWeight="bold">Open</text>
          </g>
        </svg>

        {/* === MẶT TRONG (Gradient hồng) === */}
        {/* SỬA LỖI HỞ NẮP: Dùng rotateY(180deg) thay vì rotateX để giữ nắp luôn dính vào cạnh trên */}
        <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <defs>
            {/* SỬA MÀU NẮP: y1=0 (bản lề) khớp màu với lòng thư, y2=1 (đỉnh sáp) nhạt dần */}
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFC8D6" /> {/* Khớp màu hoàn hảo với lòng phong bì */}
              <stop offset="100%" stopColor="#FFE4EC" /> {/* Nhạt dần về phía dấu sáp */}
            </linearGradient>
          </defs>
          <polygon points="0,0 400,0 200,140" fill="url(#flapGrad)" />
        </svg>
      </motion.div>
    </motion.div>
  );
}