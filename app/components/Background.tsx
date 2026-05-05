'use client';

import { motion } from 'framer-motion';
import { Cloud } from './Cloud';
import { OrigamiHeart } from './OrigamiHeart';

export function Background() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Cloud size="lg" className="top-[5%] left-[2%]" delay={0.2} />
      <Cloud size="xl" className="top-[10%] right-[2%]" direction={-1} delay={0.6} />
      <Cloud size="sm" className="top-[5%] left-[45%]" delay={1.5} /> 
      
      <Cloud size="xl" className="top-[35%] -left-[5%]" delay={1.2} direction={-1} />
      <Cloud size="lg" className="bottom-[40%] right-[8%]" delay={0.8} />
      <Cloud size="md" className="top-[45%] right-[25%]" delay={1.5} direction={-1} />

      {/* Tim Hậu cảnh: Đã set độ nghiêng cố định 30-45 độ trái/phải */}
      <motion.div animate={{ y: [0, -15, 0], x: [0, 8, 0], rotate: [-30, -40, -30] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[12%] left-[12%] opacity-70 scale-[0.5]">
        <OrigamiHeart size="sm" delay={0} isBurst={false} />
      </motion.div>
      
      <motion.div animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [35, 45, 35] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[18%] right-[15%] opacity-70 scale-[0.6]">
        <OrigamiHeart size="md" delay={0.5} isBurst={false} />
      </motion.div>

      <motion.div animate={{ scale: [0.4, 0.45, 0.4], opacity: [0.5, 0.8, 0.5], rotate: [-45, -35, -45] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[35%] left-[8%] pointer-events-none">
        <OrigamiHeart size="sm" delay={1} isBurst={false} />
      </motion.div>
    </div>
  );
}