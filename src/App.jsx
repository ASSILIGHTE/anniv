import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleCanvas } from './components/ParticleCanvas';
import { HeartTrail } from './components/HeartTrail';
import { MusicPlayer } from './components/MusicPlayer';

import { Page1Opening } from './components/Page1Opening';
import { Page2Scrapbook } from './components/Page2Scrapbook';
import { Page3LoveLetter } from './components/Page3LoveLetter';
import { Page4GrandFinale } from './components/Page4GrandFinale';

export function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isStarted, setIsStarted] = useState(false);

  const handleUserInteract = () => {
    if (!isStarted) {
      setIsStarted(true);
    }
  };

  const handleNextPage = () => {
    handleUserInteract();
    setCurrentPage((prev) => Math.min(prev + 1, 4));
  };

  const handleReplay = () => {
    handleUserInteract();
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none">
      {/* Background Interactive Particle Canvas */}
      <ParticleCanvas currentPage={currentPage} />

      {/* Cursor Heart Trail & Click Bursts */}
      <HeartTrail />

      {/* Floating Music Player Widget */}
      <MusicPlayer isStarted={isStarted} />


      {/* Page Switching Container with Framer Motion Transitions */}
      <AnimatePresence mode="wait">
        {currentPage === 1 && (
          <motion.div
            key="page1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <Page1Opening
              onNextPage={handleNextPage}
              onUserInteract={handleUserInteract}
            />
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div
            key="page2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <Page2Scrapbook
              onNextPage={handleNextPage}
              onUserInteract={handleUserInteract}
            />
          </motion.div>
        )}

        {currentPage === 3 && (
          <motion.div
            key="page3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <Page3LoveLetter
              onNextPage={handleNextPage}
              onUserInteract={handleUserInteract}
            />
          </motion.div>
        )}

        {currentPage === 4 && (
          <motion.div
            key="page4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Page4GrandFinale
              onReplay={handleReplay}
              onUserInteract={handleUserInteract}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
