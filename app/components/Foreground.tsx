'use client';

import { motion } from 'framer-motion';
import { Cloud } from './Cloud';
import { OrigamiHeart } from './OrigamiHeart';

export function Foreground() {
  return (
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

      {/* Tim Tiền cảnh: Nghiêng rải rác từ 30 đến 45 độ */}
      <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [-35, -45, -35] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[150px] left-[5%] opacity-90 scale-[0.7]">
        <OrigamiHeart size="2xl" delay={0.2}  />
      </motion.div>

      <motion.div animate={{ y: [0, -15, 0], x: [0, -12, 0], rotate: [45, 35, 45] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[180px] right-[5%] opacity-90 scale-[0.8]">
        <OrigamiHeart size="xl" delay={0.6}  />
      </motion.div>

      <motion.div animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [-40, -30, -40] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[300px] left-[25%] -translate-x-1/2 opacity-80 scale-[0.6]">
        <OrigamiHeart size="xl" delay={0.9}  />
      </motion.div>

      <motion.div animate={{ y: [0, -16, 0], x: [0, -8, 0], rotate: [30, 40, 30] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[330px] right-[3%] opacity-80 scale-[0.7]">
        <OrigamiHeart size="md" delay={0.4}  />
      </motion.div>
      
      <motion.div animate={{ y: [0, -14, 0], x: [0, 15, 0], rotate: [-45, -35, -45] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[250px] right-[36%] opacity-70 scale-[0.6]">
        <OrigamiHeart size="xl" delay={1.5}  />
      </motion.div>
      
      <motion.div animate={{ y: [0, -20, 0], x: [0, -10, 0], rotate: [0, 0, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[200px] right-[50%] opacity-80 scale-[0.9]">
        <OrigamiHeart size="lg" delay={1.8}  />
      </motion.div>
    </div>
  );
}