'use client';

import { motion } from 'framer-motion';

interface CloudProps {
  direction?: 1 | -1;
  size: 'sm' | 'md' | 'lg' | 'xl'| '2xl'; // Thêm size xl cho mây bự che chân phong bì
  delay?: number; // Thêm delay để các đám mây không trôi cùng một nhịp
  className?: string;
}

export function Cloud({ direction = 1, size, delay = 0, className = '' }: CloudProps) {
  const sizeMap = {
    sm: 100,
    md: 180,
    lg: 280,
    xl: 500, // Size khổng lồ
    '2xl': 600,
  };

  const width = sizeMap[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      // Kết hợp fade-in ban đầu VÀ hiệu ứng lơ lửng vô tận
      animate={{ 
        opacity: 1,
        y: [0, -15, 0], // Trôi lên rồi trôi xuống
        x: [0, direction * 10, 0] // Lắc nhẹ sang hai bên
      }}
      transition={{
        opacity: { duration: 2, ease: "easeOut", delay: delay },
        y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: delay },
        x: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: delay }
      }}
      className={`absolute ${className}`}
      style={{ filter: 'drop-shadow(0 12px 16px rgba(255, 182, 193, 0.4))' }}
    >
      <svg width={width} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={`innerShadow-${size}`}>
            <feOffset dx="0" dy="3"/>
            <feGaussianBlur stdDeviation="2" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood floodColor="white" floodOpacity="0.6" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>
        </defs>
        <g fill="#FFD1DC" filter={`url(#innerShadow-${size})`}> 
          <circle cx="25" cy="35" r="15" />
          <circle cx="50" cy="25" r="22" />
          <circle cx="75" cy="35" r="16" />
          <rect x="15" y="30" width="68" height="20" rx="10" />
        </g>
      </svg>
    </motion.div>
  );
}