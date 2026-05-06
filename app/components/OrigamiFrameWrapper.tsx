'use client';

import { useEffect, useRef, useState } from 'react';
import { motion , TargetAndTransition} from 'framer-motion';
import { OrigamiHeart } from './OrigamiHeart';

interface OrigamiFrameWrapperProps {
  children: React.ReactNode;
  className?: string;
  // Cho phép chọn style viền: Góc chéo (giống hoa hiện tại) hoặc Đầy đủ 4 góc
  variant?: 'diagonal' | 'all-corners'; 
}

type HeartSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export function OrigamiFrameWrapper({ children, className = '', variant = 'diagonal' }: OrigamiFrameWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<{ main: HeartSize; sub: HeartSize; tiny: HeartSize }>({
    main: 'lg', sub: 'md', tiny: 'sm'
  });

  // Tự động đo kích thước container để scale tim cho phù hợp
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        
        // Logic tự động tính size: Dựa vào chiều rộng của content (thư, ảnh, video)
        if (width < 350) {
          // Điện thoại / Ảnh nhỏ
          setSizes({ main: 'md', sub: 'sm', tiny: 'sm' });
        } else if (width < 650) {
          // Lá thư tiêu chuẩn
          setSizes({ main: 'lg', sub: 'md', tiny: 'sm' });
        } else if (width < 1000) {
          // Khung Video / Màn hình ngang
          setSizes({ main: 'xl', sub: 'lg', tiny: 'md' });
        } else {
          // Siêu to
          setSizes({ main: '2xl', sub: 'xl', tiny: 'lg' });
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation bồng bềnh nhẹ nhàng cho các cụm góc
  const floatAnim = (delay: number, yRange: number[]): TargetAndTransition => ({
    y: yRange,
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
  });

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      
      {/* LỚP DECORATION: Nằm đè lên viền của content */}
      <div className="absolute inset-0 pointer-events-none z-20">
        
        {/* ================= GÓC TRÊN BÊN PHẢI (Top Right Cluster) ================= */}
        {/* Sử dụng translate-x-1/2 và -translate-y-1/2 để tim nằm chính xác trên đường viền */}
        <motion.div animate={floatAnim(0, [0, -8, 0])} className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
          {/* Tim chính (Nằm dưới cùng, to nhất) */}
          <OrigamiHeart size={sizes.main} className="rotate-15" mode="static" hasBorder={true} />
          {/* Tim phụ (Nằm đè lên, xoay ngược lại) */}
          <OrigamiHeart size={sizes.sub} className="-rotate-25 ml-[-20%] mt-[30%]" mode="static" hasBorder={true} delay={0.2} />
          {/* Tim rải rác */}
          <OrigamiHeart size={sizes.tiny} className="rotate-45 ml-[-60%] mt-[10%]" mode="static" hasBorder={true} delay={0.4} />
        </motion.div>

        {/* ================= GÓC DƯỚI BÊN TRÁI (Bottom Left Cluster) ================= */}
        <motion.div animate={floatAnim(1, [0, 8, 0])} className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3">
          <OrigamiHeart size={sizes.main} className="rotate-[-15deg]" mode="static" hasBorder={true} />
          <OrigamiHeart size={sizes.sub} className="rotate-20 ml-[40%] mt-[-20%]" mode="static" hasBorder={true} delay={0.3} />
          <OrigamiHeart size={sizes.tiny} className="rotate-[-30deg] ml-[70%] mt-[-50%]" mode="static" hasBorder={true} delay={0.6} />
        </motion.div>

        {/* ================= CÁC GÓC CÒN LẠI (Chỉ hiện nếu chọn variant="all-corners") ================= */}
        {variant === 'all-corners' && (
          <>
            {/* Góc trên bên trái */}
            <motion.div animate={floatAnim(0.5, [0, -6, 0])} className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4">
              <OrigamiHeart size={sizes.sub} className="rotate-[-10deg]" mode="static" hasBorder={true} />
            </motion.div>

            {/* Góc dưới bên phải */}
            <motion.div animate={floatAnim(1.5, [0, 6, 0])} className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
              <OrigamiHeart size={sizes.sub} className="rotate-15" mode="static" hasBorder={true} />
            </motion.div>
          </>
        )}
      </div>

      {/* LỚP CONTENT CHÍNH: Thư, Ảnh, hoặc Video */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}