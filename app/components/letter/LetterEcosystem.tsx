/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryItem } from "@/app/components/memory/MemoryCard";
import { OrigamiHeart } from "@/app/components/OrigamiHeart";

// 1. CẬP NHẬT GIAO DIỆN DATA
export interface LetterPageData {
  greeting?: string;
  paragraphs: string[];
  signature?: string[];
  moreText?: string;
  memories: MemoryItem[];
}

interface LetterPageProps {
  data: LetterPageData;
  isFirstPage: boolean;
  onNextPage: () => void;
  totalPages: number;
  currentIndex: number;
}

// === COMPONENT: MỘT TRANG THƯ (GIỮ NGUYÊN 100% CODE CỦA BẠN) ===
function LetterPage({
  data,
  isFirstPage,
  onNextPage,
  totalPages,
  currentIndex,
}: LetterPageProps) {
  const [showText, setShowText] = useState(!isFirstPage);

  useEffect(() => {
    if (isFirstPage) {
      const timer = setTimeout(() => setShowText(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isFirstPage]);

  return (
    <div
      onClick={onNextPage}
      className="relative z-20 w-[60vw] max-w-[650px] aspect-[1/1.414] flex flex-col items-center justify-center cursor-pointer group"
    >
      <div
        className="w-full h-full p-15 pl-16 pr-10 bg-[length:100%_100%] bg-center bg-no-repeat flex flex-col items-center justify-center relative group-hover:-translate-y-1 transition-transform duration-300"
        style={{ backgroundImage: "url('/imgs/letter.png')" }}
      >
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full flex flex-col pt-24 pb-20 px-10 md:px-14 rotate-1"
            >
              {/* VÙNG THÂN BÀI */}
              <div className="flex-1 overflow-y-auto text-[#4A3F3F] font-serif leading-relaxed text-base md:text-lg custom-scrollbar text-left">
                {data.greeting && (
                  <p className="font-medium text-lg mb-6 italic whitespace-pre-wrap">
                    {data.greeting}
                  </p>
                )}

                <div className="space-y-2">
                  {data.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="indent-6 text-justify italic text-md whitespace-pre-wrap"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* CHỮ KÝ */}
              {data.signature && (
                <div className="mt-6 flex-shrink-0 text-right pr-4">
                  <p className="text-md font-serif text-rose-800 italic whitespace-pre-wrap">
                    {data.signature?.[0]}
                  </p>
                  <p className="text-md font-serif text-rose-800 italic whitespace-pre-wrap">
                    {data.signature?.[1]}
                    <span className="line-through">{data.signature?.[2]}</span>
                  </p>
                </div>
              )}
              {data.moreText && (
                <div className="mt-6 flex-shrink-0 text-right pr-4">
                  <p className="text-sm font-serif text-rose-800 italic">
                    {data.moreText}
                  </p>
                </div>
              )}

              {/* Lời nhắn lật trang ở trang cuối cùng sẽ đổi text */}
              <p className="absolute bottom-6 right-1/2 translate-x-1/2 text-xs text-[#4A3F3F]/50 italic font-serif opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {currentIndex === totalPages - 1
                  ? "Bấm để xem điều bất ngờ :3"
                  : "Bấm để qua trang mới nè :3"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// === COMPONENT: BỘ ĐIỀU KHIỂN LẬT TRANG (ĐÃ CẬP NHẬT LOGIC ENDING) ===
export function PageFlipContainer({
  pages,
  onPageChange,
}: {
  pages: LetterPageData[];
  onPageChange: (idx: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnded, setIsEnded] = useState(false); // <-- STATE QUẢN LÝ MÀN HÌNH KẾT THÚC

  const handleNextPage = () => {
    // Nếu đang ở trang cuối cùng -> Hiện màn hình kết thúc
    if (currentIndex === pages.length - 1) {
      setIsEnded(true);
    } else {
      // Nếu chưa phải trang cuối -> Chuyển trang bình thường
      const next = currentIndex + 1;
      setCurrentIndex(next);
      onPageChange(next);
    }
  };

  // Hàm xử lý nút "Xem lại từ đầu"
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn việc click xuyên xuống dưới
    setIsEnded(false);
    setCurrentIndex(0);
    onPageChange(0);
  };
  const handleFail = () => {
    alert(
      "Khụ khụ, chắc là hổng iu rùi... Nhưng mà anh hong thích đấy nên là chọn lại đi :3",
    );
  };

  return (
    <div className="relative z-30 flex items-center justify-center w-full h-full">
      <AnimatePresence mode="wait">
        {!isEnded ? (
          // ================= ĐANG ĐỌC THƯ =================
          <motion.div
            key={`page-${currentIndex}`} // Sửa key để Framer Motion nhận diện đúng trang
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: 15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <LetterPage
              data={pages[currentIndex]}
              isFirstPage={currentIndex === 0}
              onNextPage={handleNextPage}
              totalPages={pages.length}
              currentIndex={currentIndex}
            />
          </motion.div>
        ) : (
          // ================= MÀN HÌNH "HẾC ÙIII" =================
          <motion.div
            key="end-screen"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative z-20 w-[90vw] max-w-[400px] aspect-square flex flex-col items-center justify-center text-center p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50"
          >
            {/* Trái tim rung động */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mb-4"
            >
              <OrigamiHeart
                size="xl"
                mode="static"
                hasBorder={true}
                className="relative"
              />
            </motion.div>

            <h2 className="text-4xl font-serif text-rose-800 mb-4">
              Hếc ùiii :3
            </h2>

            <p className="text-[#4A3F3F]/80 font-serif italic mb-8 leading-relaxed">
              "Thư thì đọc xong rồi, nhưng tình yêu của anh dành cho em thì lúc
              nào cũng như mới hé hé hé :3"
            </p>

            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-rose-400 text-white rounded-full font-serif text-sm hover:bg-rose-500 hover:scale-105 transition-all shadow-md active:scale-95 mb-2"
            >
              Yêu thì bấm zo đọc lại nà ↻
            </button>
            <button
              onClick={handleFail}
              className="px-6 py-3 bg-white text-rose-400 rounded-full font-serif text-sm hover:bg-rose-500 hover:scale-105 transition-all shadow-md active:scale-95"
            >
              {"Hong iu thì bấm zo đây :<"}
            </button>

            <p className="mt-6 text-[10px] text-gray-400 font-serif uppercase tracking-widest">
              Happy 1st Anniversary
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
