'use client';

import { motion, Variants } from 'framer-motion';

interface OrigamiHeartProps {
  size: 'sm' | 'md' | 'lg';
  className?: string;
  delay?: number;
}

export function OrigamiHeart({ size, className = '', delay = 0 }: OrigamiHeartProps) {
  // Tăng gấp đôi kích thước trái tim
  const sizeMap = {
    sm: 45,
    md: 70,
    lg: 110,
  };

  const width = sizeMap[size];

  const burstVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      y: 20 
    },
    visible: { 
      opacity: [0, 1, 1, 0], 
      scale: 1,
      y: -120, // Bay cao hơn
      x: (Math.random() - 0.5) * 100, // Lan rộng hơn
      rotate: (Math.random() - 0.5) * 45,
      transition: { 
        duration: 3, // Kéo dài thời gian bay chậm lại một chút
        delay: delay,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      variants={burstVariants}
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