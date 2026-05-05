/* eslint-disable react-hooks/purity */
'use client';

import { motion, Variants } from 'framer-motion';

interface OrigamiHeartProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
  delay?: number;
  mode?: 'burst' | 'float' | 'static';
  noShadow?: boolean; 
  hasBorder?: boolean; 
}

export function OrigamiHeart({ 
  size, 
  className = '', 
  delay = 0, 
  mode = 'static', 
  noShadow = false,
  hasBorder = false 
}: OrigamiHeartProps) {
  const sizeMap = { sm: 45, md: 70, lg: 110, xl: 160, '2xl': 220, '3xl': 300, '4xl': 420 };
  const width = sizeMap[size];

  return (
    <motion.div
      initial={mode !== 'static' ? "hidden" : false}
      animate={mode !== 'static' ? "visible" : false}
      className={`absolute ${className}`}
    >
      <svg width={width} height={width} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g style={{ filter: noShadow ? 'none' : 'drop-shadow(0 6px 6px rgba(200,50,80,0.15))' }}>
          {/* Viền mờ, mỏng và tinh tế hơn rất nhiều để không gây rối mắt */}
          <g 
            stroke={hasBorder ? "rgba(255, 255, 255, 0.3)" : "none"} 
            strokeWidth={hasBorder ? "0.8" : "0"} 
            strokeLinejoin="round"
          >
            <polygon points="5,40 25,15 50,35 15,55" fill="#FF9EB3" />
            <polygon points="15,55 50,35 50,90" fill="#FF728F" />
            <polygon points="95,40 75,15 50,35 85,55" fill="#F05A7E" />
            <polygon points="85,55 50,35 50,90" fill="#D63A60" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}