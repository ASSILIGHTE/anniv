import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, RotateCcw, Clock } from 'lucide-react';
import { anniversaryData } from '../config/anniversaryData';
import { playSurpriseSound } from '../utils/audioFX';

export const Page4GrandFinale = ({ onReplay, onUserInteract }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const finale = anniversaryData.finale;

  // Live relationship timer calculator
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryData.startDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenGift = () => {
    onUserInteract();
    playSurpriseSound();
    setIsShaking(true);

    // Trigger confetti cannon
    setTimeout(() => {
      setIsShaking(false);
      setIsOpen(true);

      // Multi-wave romantic confetti burst
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(confettiInterval);
        }
        const particleCount = 50 * (timeLeft / duration);

        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.5) },
          colors: ['#f472b6', '#fb7185', '#e11d48', '#fef08a', '#ffffff']
        });
      }, 250);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full py-16 px-4 finale-gradient-bg text-white flex flex-col items-center justify-between relative overflow-hidden">
      {/* Background Star Bokeh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Main Interactive Gift Box / Finale Content */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center my-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED GIFT BOX SCENE */
            <motion.div
              key="gift-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="mb-6">
                <span className="text-pink-300 text-sm font-semibold tracking-wider uppercase block mb-1">
                  {finale.teaserTitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                  {finale.teaserSub}
                </h2>
              </div>

              {/* 3D Gift Box Visual */}
              <motion.div
                animate={
                  isShaking
                    ? {
                      rotate: [-5, 5, -5, 5, 0],
                      scale: [1, 1.1, 0.95, 1.05],
                      transition: { duration: 1 }
                    }
                    : { y: [0, -10, 0] }
                }
                transition={!isShaking ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
                onClick={handleOpenGift}
                className="relative w-44 h-44 md:w-52 md:h-52 cursor-pointer group mb-8 flex items-center justify-center"
              >
                {/* Gift Box Base */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-rose-700 via-pink-600 to-rose-500 shadow-2xl border-2 border-rose-300/40 p-4 flex items-center justify-center group-hover:shadow-glow-pink transition-shadow">
                  {/* Ribbon cross vertical */}
                  <div className="absolute inset-y-0 w-10 bg-amber-300/90 shadow-inner" />
                  {/* Ribbon cross horizontal */}
                  <div className="absolute inset-x-0 h-10 bg-amber-300/90 shadow-inner" />

                  {/* Gift Icon center */}
                  <Gift className="w-16 h-16 text-white z-10 drop-shadow-md group-hover:scale-110 transition-transform" />
                </div>

                {/* Gift Box Lid Ribbon Bow */}
                <div className="absolute -top-4 w-20 h-10 bg-amber-300 rounded-full shadow-lg z-20 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <Heart className="w-6 h-6 text-rose-700 fill-rose-700" />
                </div>
              </motion.div>

              {/* Action Button */}
              <button
                onClick={handleOpenGift}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold text-lg shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{finale.buttonText}</span>
              </button>
            </motion.div>
          ) : (
            /* REVEALED GRAND FINALE CARD */
            <motion.div
              key="finale-card"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="glass-panel-dark p-6 sm:p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center w-full"
            >
              {/* Photo Trio — Left, Center, Right */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-6">
                {/* Left Side Photo */}
                <motion.div
                  initial={{ opacity: 0, x: -20, rotate: -12 }}
                  animate={{ opacity: 1, x: 0, rotate: -6 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-16 h-24 sm:w-24 sm:h-32 md:w-28 md:h-36 rounded-xl overflow-hidden shadow-xl border-2 border-white/30 flex-shrink-0 transform hover:rotate-0 hover:scale-105 transition-all duration-500"
                >
                  <img
                    src={anniversaryData.galleryPhotos[2]}
                    alt="Kenangan kiri"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Center Main Photo */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full p-1.5 sm:p-2 bg-gradient-to-tr from-amber-300 via-pink-500 to-rose-600 shadow-2xl flex-shrink-0">
                  <img
                    src={finale.surprisePhoto}
                    alt="Anniversary surprise"
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                  />
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 text-amber-300 animate-bounce" />
                  <Heart className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 fill-rose-500 text-rose-500 animate-pulse" />
                </div>

                {/* Right Side Photo */}
                <motion.div
                  initial={{ opacity: 0, x: 20, rotate: 12 }}
                  animate={{ opacity: 1, x: 0, rotate: 6 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-16 h-24 sm:w-24 sm:h-32 md:w-28 md:h-36 rounded-xl overflow-hidden shadow-xl border-2 border-white/30 flex-shrink-0 transform hover:rotate-0 hover:scale-105 transition-all duration-500"
                >
                  <img
                    src="/photos/photo5.jpeg"
                    alt="Kenangan kanan"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-amber-200 mb-3 tracking-tight">
                {finale.mainHeading}
              </h1>

              <p className="text-pink-200 text-sm sm:text-base md:text-lg font-medium mb-6">
                "{finale.subheading}"
              </p>

              {/* Animated Message Sequence */}
              <div className="space-y-2 mb-8 text-base sm:text-lg md:text-xl font-serif italic text-amber-100/90">
                {finale.animatedMessages.map((msg, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.8 + 0.5 }}
                  >
                    {msg}
                  </motion.p>
                ))}
              </div>

              {/* Live Love Counter */}
              <div className="bg-white/10 backdrop-blur-md px-4 sm:px-6 py-4 rounded-2xl border border-white/10 mb-8 w-full max-w-md">
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-200 uppercase tracking-widest font-extrabold mb-2">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Bersama Selama</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white">
                      {timeTogether.days}
                    </span>
                    <span className="block text-[10px] text-pink-200 font-semibold uppercase">Hari</span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white">
                      {timeTogether.hours}
                    </span>
                    <span className="block text-[10px] text-pink-200 font-semibold uppercase">Jam</span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white">
                      {timeTogether.minutes}
                    </span>
                    <span className="block text-[10px] text-pink-200 font-semibold uppercase">Menit</span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white">
                      {timeTogether.seconds}
                    </span>
                    <span className="block text-[10px] text-pink-200 font-semibold uppercase">Detik</span>
                  </div>
                </div>

                <p className="text-xs text-amber-200 font-serif italic mt-3">
                  {finale.counterTag}
                </p>
              </div>

              {/* Replay Button */}
              <button
                onClick={() => {
                  onUserInteract();
                  onReplay();
                }}
                className="px-7 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-medium text-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{finale.replayButton}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
