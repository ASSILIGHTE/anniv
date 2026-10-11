import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import { playHeartPop } from '../utils/audioFX';

export const MemoryModal = ({ memory, onClose }) => {
  const [doubleClickHearts, setDoubleClickHearts] = useState([]);

  if (!memory) return null;

  const handlePhotoDoubleClick = (e) => {
    playHeartPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Math.random(),
      x,
      y,
      angle: (i / 8) * Math.PI * 2,
      distance: Math.random() * 60 + 40
    }));

    setDoubleClickHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setDoubleClickHearts([]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Polaroid Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 max-w-lg w-full bg-white p-5 md:p-7 rounded-2xl shadow-2xl border border-pink-200 flex flex-col items-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tag badge */}
          <div className="mb-3 px-4 py-1 rounded-full bg-pink-50 border border-pink-200 text-rose-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span>{memory.tag}</span>
          </div>

          {/* Expanded Polaroid Image container */}
          <div
            onDoubleClick={handlePhotoDoubleClick}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-inner cursor-pointer group bg-slate-100 mb-5 select-none"
            title="Klik 2x foto untuk ledakan cinta!"
          >
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-xs flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Klik 2x foto untuk kejutan romantis!
              </span>
            </div>

            {/* Double click heart explosion particles */}
            {doubleClickHearts.map((h) => (
              <span
                key={h.id}
                className="absolute text-2xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ping-once"
                style={{
                  left: `${h.x + Math.cos(h.angle) * h.distance}px`,
                  top: `${h.y + Math.sin(h.angle) * h.distance}px`,
                  transition: 'all 0.6s ease-out'
                }}
              >
                💖
              </span>
            ))}
          </div>

          {/* Narrative Caption */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-2xl font-serif font-bold text-rose-950 mb-2">
              {memory.title}
            </h3>
            <p className="text-pink-600 font-medium text-sm mb-3 italic">
              "{memory.quote}"
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              {memory.description}
            </p>

            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-500">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>{memory.date}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
