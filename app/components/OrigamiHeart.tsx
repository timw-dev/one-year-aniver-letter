/* eslint-disable react-hooks/purity */
'use client';

import { motion, Variants } from 'framer-motion';

interface OrigamiHeartProps {
  size: 'sm' | 'md' | 'lg';
  className?: string;
  delay?: number;
  isBurst?: boolean; // Thêm cờ này để phân biệt tim nổ và tim tĩnh
}

export function OrigamiHeart({ size, className = '', delay = 0, isBurst = true }: OrigamiHeartProps) {
  const sizeMap = {
    sm: 45,
    md: 70,
    lg: 110,
  };

  const width = sizeMap[size];

  // Animation nổ tung ra từ phong bì rồi biến mất
  const burstVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { 
      opacity: [0, 1, 1, 0], 
      scale: 1, y: -120, x: (Math.random() - 0.5) * 100, rotate: (Math.random() - 0.5) * 45,
      transition: { duration: 3, delay: delay, ease: "easeOut" }
    }
  };

  // Animation tĩnh dùng để trang trí quanh đám mây (Không bị biến mất)
  const floatVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, scale: 1, 
      transition: { duration: 1.5, delay: delay } 
    }
  };

  return (
    <motion.div
      variants={isBurst ? burstVariants : floatVariants}
      initial="hidden"
      animate="visible"
      className={`absolute ${className}`}
    >
      <svg width={width} height={width} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g style={{ filter: 'drop-shadow(0 6px 6px rgba(200,50,80,0.15))' }}>
          <polygon points="5,40 25,15 50,35 15,55" fill="#FF9EB3" />
          <polygon points="15,55 50,35 50,90" fill="#FF728F" />
          <polygon points="95,40 75,15 50,35 85,55" fill="#F05A7E" />
          <polygon points="85,55 50,35 50,90" fill="#D63A60" />
        </g>
      </svg>
    </motion.div>
  );
}