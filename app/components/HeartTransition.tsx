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

    // 1. CHIẾN THUẬT LƯỚI ĐỊNH TUYẾN (Tuyệt đối không có góc chết)
    // Chia màn hình thành lưới 6x8 = 48 trái tim. 
    // Các vị trí này được tính toán cố định, chỉ thêm một chút "nhiễu" nhỏ để không bị cứng nhắc.
    const rows = 6;
    const cols = 8;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Chuẩn hóa tọa độ lưới từ -1 đến 1
        const jitterX = (Math.random() - 0.5) * 0.3; // Chút xê dịch nhỏ
        const jitterY = (Math.random() - 0.5) * 0.3;

        const nx = -1 + (c / (cols - 1)) * 2 + jitterX;
        const ny = -1 + (r / (rows - 1)) * 2 + jitterY;

        // Nhân với 60vw/vh để đảm bảo tràn ra khỏi mép màn hình một chút
        const targetX = nx * 60; 
        const targetY = ny * 60; 

        // 2. TOÁN HỌC HƯỚNG TÂM
        // Tính góc của đường bay theo Radian, sau đó đổi sang Độ
        const angleRad = Math.atan2(targetY, targetX);
        const angleDeg = angleRad * (180 / Math.PI);

        // Khóa mũi nhọn hướng vào tâm: Góc bay + 90 độ
        const baseRot = angleDeg + 90;

        // Chỉ sinh ra góc xoay nhẹ (tối đa +/- 15 độ) SAU KHI đã vào vị trí
        const restRot = baseRot + (Math.random() - 0.5) * 30;

        // 3. ĐIỀU TỐC ĐỘ DI CHUYỂN
        // Thời gian bay ra vị trí đích khác nhau một chút (từ 1.2s đến 1.8s) để tạo cảm giác tự nhiên
        const reachTargetTime = 1.2 + Math.random() * 0.6;
        const t1 = reachTargetTime / duration;

        // Logic rơi: Ưu tiên rơi những trái tim ở dưới màn hình trước
        const normalizedY = (60 - targetY) / 120;
        const fallDelay = normalizedY * 0.4 + Math.random() * 0.15;

        const t2 = (3.5 + fallDelay) / duration; // Thời điểm rút lui
        const t3 = (4.5 + fallDelay) / duration; // Chạm đất
        const t4 = (5.0 + fallDelay) / duration; // Nảy lên

        // Kích thước đủ lớn để các mắt lưới giao nhau, che kín 100% diện tích
        const scale = 2.5 + Math.random() * 1.5;

        grid.push({
          x: `${targetX}vw`,
          y: `${targetY}vh`,
          splashX: `${targetX + (Math.random() - 0.5) * 15}vw`,
          baseRot: baseRot,
          restRot: restRot,
          splashRot: (Math.random() - 0.5) * 90,
          scale: scale,
          times: [0, t1, t2, t3, t4, 1]
        });
      }
    }
    return grid;
  }, []); // Đưa vào useMemo để tính toán đúng 1 lần duy nhất

  useEffect(() => {
    // Kịch bản hoàn hảo: Giây thứ 2.0 mọi trái tim đã vào form kín mít.
    // Giữ nguyên trạng thái đến giây 3.5 mới rơi.
    // Gọi onCovered ở giây 2.5 là vô cùng an toàn.
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
            style={{ willChange: 'transform, opacity' }} // Tối ưu GPU
            // Mũi nhọn hướng tâm ngay từ Frame số 0
            initial={{ scale: 0, opacity: 1, x: "0vw", y: "0vh", rotate: path.baseRot }}
            animate={{
              scale:   [0, path.scale, path.scale, path.scale * 0.7, path.scale * 1.5, path.scale * 1.5],
              x:       ["0vw", path.x, path.x, path.x, path.splashX, path.splashX],
              y:       ["0vh", path.y, path.y, "65vh", "55vh", "55vh"],
              
              // TIMELINE XOAY KIỂM SOÁT NGHIÊM NGẶT:
              // Chặng 1 & 2: Bay ra theo đường thẳng, không xoay (path.baseRot)
              // Chặng 3 & 4: Nằm im che màn hình và xoay nhẹ (path.restRot)
              // Chặng 5 & 6: Rơi xuống đất và lộn nhào (path.splashRot)
              rotate:  [path.baseRot, path.baseRot, path.restRot, path.restRot, path.restRot + path.splashRot, path.restRot + path.splashRot],
              
              opacity: [1, 1, 1, 1, 0, 0]
            }}
            transition={{
              duration: 6.5,
              times: path.times,
              ease: "easeInOut"
            }}
          >
            <OrigamiHeart size="4xl" mode="static" noShadow={true} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}