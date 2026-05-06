'use client';

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

interface MusicMiniPlayerProps {
  songSrc: string; // Truyền trực tiếp đường dẫn file mp3
  title: string;
  artist: string;
  forcePlay?: boolean;
}

export function MusicMiniPlayer({ songSrc = '/music/perfect.mp3', title, artist, forcePlay = false }: MusicMiniPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // FIX: Chỉ tự động phát khi forcePlay vừa chuyển sang true (lúc mở phong bì)
  useEffect(() => {
    if (forcePlay && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Yêu cầu tương tác trước khi phát:", err));
    }
  }, [forcePlay]); // Chỉ phụ thuộc vào forcePlay, không phụ thuộc isPlaying

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage || 0);
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-3 w-[320px] border border-white/40"
    >
      {/* THÊM THUỘC TÍNH loop ĐỂ AUTO REPLAY */}
      <audio ref={audioRef} src={songSrc} loop />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg">🎵</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>
          <p className="text-xs text-gray-500 truncate">{artist}</p>
        </div>
        
        <button 
          onClick={togglePlay} 
          className="w-8 h-8 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white fill-white" />
          ) : (
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          )}
        </button>
      </div>

      <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-200" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </motion.div>
  );
}