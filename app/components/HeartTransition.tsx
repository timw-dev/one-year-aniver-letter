/* eslint-disable react-hooks/purity */
'use client';

import { motion } from 'framer-motion';
import { OrigamiHeart } from './OrigamiHeart';
import { useEffect, useMemo } from 'react';

interface HeartTransitionProps {
  onCovered: () => void;
}

export function HeartTransition({ onCovered }: HeartTransitionProps) {
  const paths = useMemo(() => {
    const grid = [];
    const duration = 6.5;
    const numHearts = 40; // Giảm xuống 40 để bớt ngộp, không gian thoáng hơn
    
    const goldenAngle = 137.5 * (Math.PI / 180);

    for (let i = 0; i < numHearts; i++) {
      const normalizedIndex = i / numHearts; 
      
      const radiusVw = Math.sqrt(normalizedIndex) * 75; 
      const radiusVh = Math.sqrt(normalizedIndex) * 90; 
      
      const angle = i * goldenAngle;
      const targetX = Math.cos(angle) * radiusVw;
      const targetY = Math.sin(angle) * radiusVh;

      const angleDeg = angle * (180 / Math.PI);
      const baseRot = angleDeg + 90; 
      const restRot = baseRot + (Math.random() - 0.5) * 20; // Xoay ít đi cho ngăn nắp

      // KÍCH THƯỚC ĐƯỢC CHIA LÀM 2 GIAI ĐOẠN
      // 1. Lúc bay: Nhỏ nhắn, rõ hình trái tim (Scale từ 0.4 đến 0.9)
      const flyScale = 0.4 + (normalizedIndex * 0.5); 
      // 2. Lúc che: Phình to ra lấp đầy khoảng trống (Scale từ 1.8 đến 4.0)
      const coverScale = 1.8 + (normalizedIndex * 2.2); 
      
      const fireDelay = normalizedIndex * 0.5; // Rút ngắn delay bắn để ra đồng đều hơn
      
      // TIMELINE CHÍNH XÁC
      const tStart = fireDelay / duration;
      const tFly = (fireDelay + 0.8) / duration; // Mất 0.8s để bay ra vị trí đích
      const tCover = 2.2 / duration; // Mất thêm thời gian từ tFly đến tCover để phình to

      const normalizedY = (90 - targetY) / 180;
      const fallDelay = normalizedY * 0.4 + Math.random() * 0.15;
      
      const tFall = (3.5 + fallDelay) / duration;
      const tGround = (4.5 + fallDelay) / duration;
      const tBounce = (5.0 + fallDelay) / duration;

      grid.push({
        x: targetX,
        y: targetY,
        baseRot: baseRot,
        restRot: restRot,
        splashRot: (Math.random() - 0.5) * 60,
        flyScale: flyScale,
        coverScale: coverScale,
        times: [tStart, tFly, tCover, tFall, tGround, tBounce]
      });
    }
    return grid;
  }, []);

  useEffect(() => {
    // Mọi thứ hoàn toàn đóng băng và che kín ở 2.5s
    const timer = setTimeout(() => {
      onCovered();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onCovered]);

  return (
    <div className="absolute inset-0 z-[100] pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center">
        {paths.map((path, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ willChange: 'transform, opacity' }}
            initial={{ scale: 0, opacity: 0, x: "0vw", y: "0vh", rotate: path.baseRot }}
            animate={{
              // LOGIC MỚI: 0 -> Hiện rõ trái tim nhỏ -> Zoom to che màn hình -> Rơi
              scale:   [0, path.flyScale, path.coverScale, path.coverScale * 0.9, path.coverScale * 1.3, path.coverScale * 1.3],
              
              // Bay ra đích (tFly) -> Đứng im zoom to -> Rơi xuống
              x:       ["0vw", `${path.x}vw`, `${path.x}vw`, `${path.x}vw`, `${path.x + (Math.random()-0.5)*15}vw`, `${path.x + (Math.random()-0.5)*25}vw`],
              y:       ["0vh", `${path.y}vh`, `${path.y}vh`, `${path.y}vh`, "65vh", "55vh"],
              
              rotate:  [path.baseRot, path.baseRot, path.restRot, path.restRot, path.restRot + path.splashRot, path.restRot + path.splashRot],
              opacity: [0, 1, 1, 1, 1, 0] 
            }}
            transition={{
              duration: 6.5,
              times: path.times,
              // Tạo cảm giác bay ra nhẹ nhàng, zoom lên uyển chuyển
              ease: ["easeOut", "easeInOut", "easeInOut", "easeIn", "easeOut"] 
            }}
          >
            <OrigamiHeart size="4xl" mode="static" noShadow={true} hasBorder={true} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}