'use client';
import { motion } from "framer-motion"; 
import { Heart } from "lucide-react"; 

export function DecorationLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 text-rose-300/40"
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <path
            d="M40 70 C20 50, 5 35, 5 20 C5 10, 12 5, 20 5 C28 5, 35 10, 40 18 C45 10, 52 5, 60 5 C68 5, 75 10, 75 20 C75 35, 60 50, 40 70Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      <motion.div
        animate={{ rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-40 right-32 text-pink-300/30"
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="30" r="20" fill="currentColor" opacity="0.6" />
          <ellipse cx="35" cy="50" rx="15" ry="25" fill="currentColor" opacity="0.7" />
          <ellipse cx="50" cy="55" rx="12" ry="22" fill="currentColor" opacity="0.8" />
          <ellipse cx="65" cy="50" rx="15" ry="25" fill="currentColor" opacity="0.7" />
          <circle cx="50" cy="70" r="8" fill="currentColor" opacity="0.5" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-40 text-rose-200/30"
      >
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="25" r="18" fill="currentColor" opacity="0.6" />
          <ellipse cx="32" cy="43" rx="13" ry="22" fill="currentColor" opacity="0.7" />
          <ellipse cx="45" cy="47" rx="11" ry="20" fill="currentColor" opacity="0.8" />
          <ellipse cx="58" cy="43" rx="13" ry="22" fill="currentColor" opacity="0.7" />
          <circle cx="45" cy="62" r="7" fill="currentColor" opacity="0.5" />
        </svg>
      </motion.div>

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        >
          <Heart className="w-4 h-4 text-rose-300 fill-rose-200" />
        </motion.div>
      ))}

      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(251, 207, 232, 0.3)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <motion.div
        className="absolute top-1/3 left-[15%]"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150">
          <motion.path
            d="M 10 75 Q 50 50, 80 75 T 140 75"
            stroke="rgba(251, 207, 232, 0.5)"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-[15%]"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: 1.7 }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150">
          <motion.path
            d="M 10 75 Q 50 100, 80 75 T 140 75"
            stroke="rgba(251, 207, 232, 0.5)"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.7 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
