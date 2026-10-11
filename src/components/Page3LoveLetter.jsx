import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { anniversaryData } from '../config/anniversaryData';
import { playEnvelopeSound } from '../utils/audioFX';

export const Page3LoveLetter = ({ onNextPage, onUserInteract }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);

  const letterData = anniversaryData.loveLetter;
  const paragraphs = letterData.paragraphs;

  const handleOpenLetter = () => {
    onUserInteract();
    playEnvelopeSound();
    setIsOpeningAnim(true);

    // Multistage animation sequence
    setTimeout(() => {
      setIsOpen(true);
      setIsOpeningAnim(false);
    }, 1200);
  };

  // Typewriter effect for letter paragraphs line by line
  useEffect(() => {
    if (!isOpen) return;

    if (currentLineIdx < paragraphs.length) {
      const fullLine = paragraphs[currentLineIdx];
      if (currentCharIdx < fullLine.length) {
        const timer = setTimeout(() => {
          setTypedLines((prev) => {
            const copy = [...prev];
            copy[currentLineIdx] = fullLine.slice(0, currentCharIdx + 1);
            return copy;
          });
          setCurrentCharIdx((prev) => prev + 1);
        }, 35);
        return () => clearTimeout(timer);
      } else {
        // Line finished typing, wait before starting next line
        const timer = setTimeout(() => {
          setCurrentLineIdx((prev) => prev + 1);
          setCurrentCharIdx(0);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, currentLineIdx, currentCharIdx, paragraphs]);

  return (
    <div className="min-h-screen w-full py-12 px-4 romantic-gradient-bg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background dreamy particles glow when letter is open */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
        </div>
      )}

      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4 text-purple-600" />
          <span>Surat Cinta Spesial</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-purple-950">
          {letterData.subtitle}
        </h2>
      </motion.div>

      {/* Interactive Envelope / Unfolded Letter */}
      <div className="relative max-w-xl w-full flex flex-col items-center z-10">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE SCENE */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={
                isOpeningAnim
                  ? {
                      rotate: [-2, 2, -2, 2, 0],
                      scale: [1, 1.05, 0.98, 1.02],
                      transition: { duration: 1.2 }
                    }
                  : { scale: 1, opacity: 1 }
              }
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="relative w-full max-w-md aspect-[1.5/1] bg-gradient-to-tr from-purple-200 via-pink-100 to-amber-50 rounded-2xl shadow-2xl border border-purple-300/80 p-6 flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
              onClick={handleOpenLetter}
            >
              {/* Envelope Triangular Flap Visual */}
              <div
                className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-purple-300 to-pink-200 origin-top transition-transform duration-700 shadow-md ${
                  isOpeningAnim ? '-rotate-x-180' : ''
                }`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              {/* Wax Seal Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-20 w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-amber-100 shadow-xl border-2 border-amber-200 flex flex-col items-center justify-center animate-pulse-glow cursor-pointer"
              >
                <Heart className="w-8 h-8 fill-amber-100 text-amber-100 mb-0.5" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Buka</span>
              </motion.button>

              <p className="mt-8 font-serif italic text-purple-900 font-semibold text-lg z-10">
                Klik untuk membuka isi hatiku 💌
              </p>
            </motion.div>
          ) : (
            /* OPENED LETTER SHEET */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full letter-paper p-6 md:p-10 rounded-2xl shadow-2xl border border-purple-200/80 text-left flex flex-col justify-between"
            >
              {/* Sparkle & Heart Floating Animations */}
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-amber-400 animate-spin-slow" />
              <Heart className="absolute top-4 left-4 w-5 h-5 fill-pink-400 text-pink-400 animate-bounce" />

              {/* Letter Paragraphs (Typewritten) */}
              <div className="space-y-4 mb-8 font-script text-2xl md:text-3xl text-purple-950 leading-snug">
                {paragraphs.map((_, idx) => (
                  <p key={idx} className="min-h-[2.2rem]">
                    {typedLines[idx] || ''}
                    {currentLineIdx === idx && (
                      <span className="inline-block w-0.5 h-6 bg-purple-600 ml-1 animate-pulse" />
                    )}
                  </p>
                ))}
              </div>

              {/* Romantic Couple Polaroid Photo attached to bottom of letter */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: currentLineIdx >= paragraphs.length - 1 ? 1 : 0, y: 0 }}
                transition={{ duration: 0.8 }}
                className="pt-4 border-t border-purple-200/60 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-polaroid border-2 border-white transform -rotate-3">
                    <img
                      src={letterData.photo}
                      alt="Kenangan bersama"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-purple-950 text-sm block">
                      Happy Anniversary ❤️
                    </span>
                    <span className="text-xs text-purple-700 font-semibold">
                      {letterData.sender}
                    </span>
                  </div>
                </div>

                {/* Continue to Final Surprise Button */}
                <button
                  onClick={() => {
                    onUserInteract();
                    onNextPage();
                  }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white text-sm font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer border border-white/60"
                >
                  <span>Satu Kejutan Terakhir 🎁</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
