"use client";

import { motion, AnimatePresence } from "framer-motion";

export function HeaderTitle({
  phase,
}: {
  phase: "enter" | "opened" | "reading";
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, top: "8%" }}
        animate={{ opacity: 1, y: 0, top: phase === "reading" ? "-4%" : "8%" }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className={`absolute z-10 w-full flex justify-center pointer-events-none`}
      >
        <svg
          viewBox="0 0 1000 200"
          className="w-[500px] md:w-[750px] lg:w-[950px] overflow-visible"
        >
          <path
            id="curvePath"
            d="M 100,150 Q 500,40 900,150"
            fill="transparent"
          />

          <text
            className="font-serif italic font-bold text-[28px] md:text-[38px]"
            fill="#B8284A"
          >
            <textPath
              xlinkHref="#curvePath"
              startOffset="50%"
              textAnchor="middle"
            >
              ❤️ Happy One Year Anniversary! ❤️
            </textPath>
          </text>

          <text
            x="500"
            y="175"
            textAnchor="middle"
            className="font-serif font-bold text-[24px] md:text-[32px]"
            fill="#D63A60"
          >
            Timw ❤️ Naki
          </text>

          <motion.g
            transform="translate(80, 130) scale(1.3)"
            animate={{ scale: [1.3, 1.6, 1.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#D63A60"
            />
          </motion.g>

          <motion.g
            transform="translate(895, 130) scale(1.3)"
            animate={{ scale: [1.3, 1.6, 1.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#D63A60"
            />
          </motion.g>
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
