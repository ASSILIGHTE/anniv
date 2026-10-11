import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Crown, Stars } from 'lucide-react';
import { anniversaryData } from '../config/anniversaryData';
import { playHeartPop } from '../utils/audioFX';

export const Page1Opening = ({ onNextPage, onUserInteract }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [avatarHearts, setAvatarHearts] = useState([]);

  const texts = anniversaryData.openingTyping;

  // Sequential typing animation logic
  useEffect(() => {
    let timeoutId;
    let charIndex = 0;
    const currentFullText = texts[typingIndex];

    setDisplayedText('');

    const typeChar = () => {
      if (charIndex <= currentFullText.length) {
        setDisplayedText(currentFullText.slice(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(typeChar, 75);
      } else {
        // Pause after full line typed
        if (typingIndex < texts.length - 1) {
          timeoutId = setTimeout(() => {
            setTypingIndex((prev) => prev + 1);
          }, 1300);
        } else {
          setIsTypingComplete(true);
        }
      }
    };

    timeoutId = setTimeout(typeChar, 350);

    return () => clearTimeout(timeoutId);
  }, [typingIndex]);

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    onUserInteract();
    playHeartPop();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 60,
      y: y - Math.random() * 40,
      emoji: ['😘', '💖', '💕', '🥰', '✨'][i % 5]
    }));

    setAvatarHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setAvatarHearts((prev) => prev.slice(5));
    }, 900);
  };

  const handleStartStory = (e) => {
    onUserInteract();
    setIsZooming(true);

    setTimeout(() => {
      onNextPage();
    }, 700);
  };

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden romantic-gradient-bg transition-all duration-700 ${
        isZooming ? 'scale-110 opacity-0 blur-md' : 'scale-100 opacity-100'
      }`}
    >
      {/* Decorative Soft Dreamy Clouds in Background */}
      <div className="absolute top-12 left-8 w-56 h-56 bg-white/50 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-8 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl pointer-events-none animate-float-medium" />

      {/* Floating Kawaii Stickers in Outer Space */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 md:left-24 bg-purple-100/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-300 shadow-md text-purple-900 text-xs font-bold flex items-center gap-1.5 pointer-events-none z-10"
      >
        <span>✨ Edisi Spesial Anniversary</span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6], rotate: [4, -4, 4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 md:right-24 bg-amber-100/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-300 shadow-md text-amber-900 text-xs font-bold flex items-center gap-1.5 pointer-events-none z-10"
      >
        <span>💕 Dibuat Penuh Cinta Untukmu</span>
      </motion.div>

      {/* Central Interactive WAH Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 max-w-lg w-full text-center p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-white/80 backdrop-blur-xl bg-white/75 flex flex-col items-center overflow-visible"
      >
        {/* Ribbon Bow Decoration on Card Top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white px-5 py-1 rounded-full shadow-md text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5 border border-white">
          <Crown className="w-3.5 h-3.5 text-amber-200 fill-amber-200 animate-bounce" />
          <span>Kejutan Anniversary Spesial</span>
        </div>

        {/* Featured Romantic Couple Photo Avatar */}
        <div className="relative mb-6 mt-2 group cursor-pointer" onClick={handleAvatarClick} title="Klik foto untuk cinta! 😘">
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full p-2 bg-gradient-to-tr from-purple-500 via-pink-400 to-amber-300 shadow-xl relative flex items-center justify-center animate-pulse-glow"
          >
            <div className="w-full h-full rounded-full bg-purple-50 overflow-hidden flex items-center justify-center border-2 border-white shadow-inner">
              <img
                src={anniversaryData.openingPhoto}
                alt="Kenangan Manis Kita"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Sparkle Icons around Avatar */}
          <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-amber-400 animate-spin-slow pointer-events-none" />
          <Heart className="absolute -bottom-1 -left-2 w-6 h-6 text-pink-500 fill-pink-500 animate-bounce pointer-events-none" />
          <Stars className="absolute top-1/2 -right-4 w-5 h-5 text-purple-400 animate-pulse pointer-events-none" />
        </div>

        {/* Click avatar heart pop floating elements */}
        {avatarHearts.map((h) => (
          <span
            key={h.id}
            className="absolute text-3xl pointer-events-none animate-ping-once transition-all z-30"
            style={{ left: `${h.x}px`, top: `${h.y}px` }}
          >
            {h.emoji}
          </span>
        ))}

        {/* Dynamic Typewriter Heading Box */}
        <div className="h-28 md:h-32 flex flex-col items-center justify-center mb-6">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-700 bg-purple-100/90 px-3 py-1 rounded-full mb-2">
            ✨ Hai, sayang... ✨
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-fuchsia-900 to-rose-900 tracking-tight leading-tight drop-shadow-sm">
            {displayedText}
            <span className="inline-block w-1.5 h-7 bg-purple-500 ml-1 animate-pulse rounded-full" />
          </h1>

          {typingIndex >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-purple-800 text-sm md:text-base font-semibold mt-2 flex items-center gap-1.5"
            >
              <span>Sebuah cerita cinta yang spesial untukmu</span>
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500 inline animate-pulse" />
            </motion.p>
          )}
        </div>

        {/* Start Our Story WAH Button */}
        <AnimatePresence>
          {isTypingComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 35px rgba(168, 85, 247, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartStory}
              className="relative group px-9 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white font-bold text-lg shadow-xl flex items-center gap-3 transition-all duration-300 animate-float-medium border-2 border-white/60 cursor-pointer"
            >
              {/* Shimmer light effect isolated inside clipped span */}
              <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </span>

              <span className="relative z-10 flex items-center gap-2">
                <span>Mulai Cerita Kita</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform text-xl">→</span>
              </span>

              {/* Floating heart badge cleanly popping out on top corner */}
              <span className="absolute -top-3 -right-3 bg-amber-300 text-purple-950 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-lg border border-white animate-bounce z-20 whitespace-nowrap">
                💖 MULAI
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

