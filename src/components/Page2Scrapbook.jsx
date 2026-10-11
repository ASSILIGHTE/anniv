import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { anniversaryData } from '../config/anniversaryData';
import { MemoryModal } from './MemoryModal';

export const Page2Scrapbook = ({ onNextPage, onUserInteract }) => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const memories = anniversaryData.memories;

  return (
    <div className="min-h-screen w-full py-6 sm:py-16 px-3 sm:px-4 md:px-8 romantic-gradient-bg flex flex-col items-center justify-between">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-xl mx-auto mb-8 sm:mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-purple-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Camera className="w-4 h-4 text-purple-600" />
          <span>Album Kenangan Kita</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-purple-950 mb-3 tracking-tight">
          Kisah Indah Tentang Kita
        </h2>
        <p className="text-purple-900/80 text-sm md:text-base font-semibold">
          Klik polaroid mana saja untuk mengenang cerita kita ✨
        </p>
      </motion.div>

      {/* Memory Cards Grid (Staggered polaroids) */}
      <div className="max-w-5xl w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 md:gap-8 mb-10 md:mb-14">
        {memories.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 + 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
            style={{ transform: `rotate(${item.rotation})` }}
            onClick={() => {
              onUserInteract();
              setSelectedMemory(item);
            }}
            className="polaroid-card rounded-lg sm:rounded-xl cursor-pointer group relative flex flex-col justify-between min-w-0"
          >
            {/* Tape Effect on top of Polaroid */}
            <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 w-8 sm:w-16 h-3 sm:h-6 bg-amber-100/70 border border-amber-200/50 transform -rotate-2 shadow-sm z-10 pointer-events-none" />

            {/* Photo Container */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-md sm:rounded-lg overflow-hidden bg-slate-100 mb-2 sm:mb-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-0.5">
                <span className="bg-white/95 text-purple-900 text-[8px] sm:text-xs font-bold px-1 py-0.5 sm:px-3 sm:py-1.5 rounded-full shadow-md flex items-center gap-0.5 sm:gap-1 text-center">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
                  <span className="hidden sm:inline">Lihat Kenangan</span>
                  <span className="sm:hidden">Lihat</span>
                </span>
              </div>
            </div>

            {/* Polaroid Label */}
            <div className="text-center pt-0.5 sm:pt-1">
              <span className="text-[8px] sm:text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-0.5 line-clamp-1">
                {item.tag}
              </span>
              <h3 className="font-serif font-bold text-purple-950 text-[12px] sm:text-base mb-0.5 sm:mb-1 line-clamp-1 leading-tight">
                {item.title}
              </h3>
              <p className="text-[9px] sm:text-xs text-slate-500 italic line-clamp-2 leading-tight">
                "{item.quote}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Subtext */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center max-w-md w-full flex flex-col items-center"
      >
        <p className="text-purple-900 font-serif italic text-base md:text-lg mb-6 flex items-center gap-2">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          <span>Dan ini baru sebagian kecil dari cerita indah kita berdua.</span>
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
        </p>

        {/* Transition Button to Page 3 */}
        <button
          onClick={() => {
            onUserInteract();
            onNextPage();
          }}
          className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/60 cursor-pointer"
        >
          <span>Lanjut ke Surat Cinta 💌</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Lightbox Modal */}
      {selectedMemory && (
        <MemoryModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </div>
  );
};
