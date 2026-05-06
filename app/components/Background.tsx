"use client";

import { motion } from "framer-motion";
import { Cloud } from "./Cloud";
import { OrigamiHeart } from "./OrigamiHeart";

interface BackgroundProps {
  step?: number;
}

export function Background({ step = 0 }: BackgroundProps) {
  // Khi step >= 3 (đang đọc thư), mây sẽ mờ đi chỉ còn 10% hoặc mất hẳn (0)
  const isReading = step >= 3;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Wrap toàn bộ mây vào một motion.div để điều khiển chung */}
      <motion.div
        animate={{ opacity: isReading ? 0 : 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <Cloud size="lg" className="top-[5%] left-[2%]" delay={0.2} />
        <Cloud
          size="xl"
          className="top-[10%] right-[2%]"
          direction={-1}
          delay={0.6}
        />
        <Cloud size="sm" className="top-[5%] left-[45%]" delay={1.5} />

        <Cloud
          size="xl"
          className="top-[35%] -left-[5%]"
          delay={1.2}
          direction={-1}
        />
        <Cloud size="lg" className="bottom-[40%] right-[8%]" delay={0.8} />
        <Cloud
          size="md"
          className="top-[45%] right-[25%]"
          delay={1.5}
          direction={-1}
        />
      </motion.div>

      {/* Tim Hậu cảnh: Có thể giữ lại lờ mờ hoặc ẩn đi cùng mây */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
          rotate: [-30, -40, -30],
          opacity: isReading ? 0.2 : 0.7,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[12%] left-[12%] scale-[0.5]"
      >
        <OrigamiHeart size="sm" delay={0} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          rotate: [35, 45, 35],
          opacity: isReading ? 0.2 : 0.7,
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] right-[15%] scale-[0.6]"
      >
        <OrigamiHeart size="md" delay={0.5} />
      </motion.div>

      <motion.div
        animate={{
          scale: [0.4, 0.45, 0.4],
          rotate: [-45, -35, -45],
          opacity: isReading ? 0 : [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] left-[8%] pointer-events-none"
      >
        <OrigamiHeart size="sm" delay={1} />
      </motion.div>
    </div>
  );
}
