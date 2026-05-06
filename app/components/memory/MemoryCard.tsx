/* eslint-disable react-hooks/purity */
// components/memory/MemoryCard.tsx
"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { Camera, Play } from "lucide-react";

// --- 10. NextImageWithFallback ---
const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export function NextImageWithFallback({
  src,
  alt,
  className,
  ...rest
}: ImageProps) {
  const [didError, setDidError] = useState(false);
  return didError ? (
    <div
      className={`flex items-center justify-center bg-gray-100 ${className}`}
    >
      <img
        src={ERROR_IMG_SRC}
        alt="Error loading image"
        className="w-1/2 h-1/2 opacity-50"
      />
    </div>
  ) : (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setDidError(true)}
      {...rest}
    />
  );
}

// --- 7. MediaLabel ---
function MediaLabel({ type }: { type: "image" | "video" }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      {type === "image" ? (
        <Camera className="w-3 h-3 text-rose-400" />
      ) : (
        <Play className="w-3 h-3 text-rose-400" />
      )}
      <span className="text-xs text-gray-500 uppercase tracking-wider">
        {type === "image" ? "Photo" : "Video"}
      </span>
    </div>
  );
}

// --- 6. MemoryCard ---
export interface MemoryItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  duration?: string;
  position:
    | "left-top"
    | "left-mid"
    | "left-bottom"
    | "right-top"
    | "right-mid"
    | "right-bottom";
}

export function MemoryCard({ item }: { item: MemoryItem }) {
  // Random nhẹ lại góc xoay để nhìn tự nhiên hơn
  const baseRotation = item.position.includes("left") ? -3 : 3;

  return (
    <div
      className="bg-white p-3 rounded-lg shadow-lg"
      style={{ transform: `rotate(${baseRotation}deg)` }}
    >
      <div className="relative w-48 h-56 bg-gray-100 rounded overflow-hidden">
        {item.type === "image" ? (
          <NextImageWithFallback
            src={item.src}
            alt={item.title}
            fill
            className="object-cover"
            sizes="192px"
          />
        ) : (
          <>
            <video
              src={item.src}
              poster={item.thumbnail}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-rose-500 fill-rose-500" />
              </div>
            </div>
            {item.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {item.duration}
              </div>
            )}
          </>
        )}
      </div>
      <MediaLabel type={item.type} />
      <p className="mt-1 text-sm text-gray-700 font-serif italic">
        {item.title}
      </p>
    </div>
  );
}

// --- 5. MemorySlot ---
const slotPositions = {
  "left-top": "top-[10%] left-[10%] rotate-12 z-30",
  "left-mid": "top-[38%] left-[5%] -rotate-3 z-20",
  "left-bottom": "bottom-[6%] left-[15%] rotate-10 z-10",
  "right-top": "top-[8%] right-[12%] -rotate-10 z-10",
  "right-mid": "top-[32%] right-[2%] rotate-8 z-10",
  "right-bottom": "bottom-[10%] right-[10%] -rotate-10 z-10",
};

export function MemorySlot({ item }: { item?: MemoryItem }) {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`absolute  ${slotPositions[item.position]} hidden xl:block`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <MemoryCard item={item} />
      </motion.div>
    </motion.div>
  );
}
