'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Envelope } from './Envelope';
import { Background } from './Background';
import { Foreground } from './Foreground';
import { HeaderTitle } from './HeaderTitle';
import { MainLetter } from './MainLetter';
import { HeartTransition } from './HeartTransition';

export default function IntroPhase() {
  // QUẢN LÝ GLOBAL STATE
  const [step, setStep] = useState<number>(0);

  const handleOpenEnvelope = () => {
    if (step !== 0) return;
    
    // Bước 1: Mở nắp phong bì
    setStep(1);
    
    // Bước 2: Chờ nắp mở xong (1s), bung hiệu ứng Tim che màn hình
    setTimeout(() => {
      setStep(2);
    }, 1000);
  };

  const handleScreenCovered = () => {
    // Được gọi bởi HeartTransition khi màn hình đã ĐEN ĐẶC (ĐỎ ĐẶC) toàn tim.
    // Bước 3: Đánh dấu để ẩn phong bì, hiện lá thư
    setStep(3);
  };

  return (
    <div className="relative w-full h-screen bg-romance-bg overflow-hidden flex items-center justify-center">
      
      {/* Background mây ở xa luôn giữ nguyên */}
      <Background />
      
      {/* Title cong phía trên */}
      <HeaderTitle phase={step >= 3 ? 'reading' : 'enter'} />

      {/* ================= TRUNG CẢNH 1: PHONG BÌ (Chỉ hiện ở step 0, 1, 2) ================= */}
      {step < 3 && (
        <div className="absolute z-20 flex items-center justify-center w-full h-full">
          <Envelope isOpened={step >= 1} onClick={handleOpenEnvelope} />
        </div>
      )}

      {/* ================= HIỆU ỨNG CHE MÀN HÌNH (Kích hoạt ở step 2) ================= */}
      {step >= 2 && step < 4 && ( // Giữ transition 1 lúc rồi unmount nếu cần
        <HeartTransition onCovered={handleScreenCovered} />
      )}

      {/* ================= TRUNG CẢNH 2: LÁ THƯ (Hiện ra từ step 3 trở đi) ================= */}
      {/* Khi step 3 bắt đầu, màn hình đang bị che bởi tim, nên sự xuất hiện của lá thư này sẽ không bị thô */}
      <AnimatePresence>
        {step >= 3 && (
          <MainLetter step={step} setStep={setStep} />
        )}
      </AnimatePresence>

      {/* ================= TIỀN CẢNH: MÂY ĐÁY ================= */}
      {/* Ẩn mây đáy đi khi đang đọc thư để đỡ rối, hoặc giữ nguyên tùy bạn. Tạm thời tôi cho nó ẩn mượt đi ở step 3 */}
      <AnimatePresence>
        {step < 3 && (
          <div className="transition-opacity duration-1000 opacity-100">
            <Foreground />
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}