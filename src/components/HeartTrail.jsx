import React, { useEffect, useState } from 'react';
import { playHeartPop } from '../utils/audioFX';

export const HeartTrail = () => {
  const [trails, setTrails] = useState([]);
  const [clickHearts, setClickHearts] = useState([]);

  useEffect(() => {
    let lastTime = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 60) return;
      lastTime = now;

      const emojis = ['💖', '✨', '🌸', '💕', '⭐'];
      const newHeart = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 14 + 10,
        rotation: (Math.random() - 0.5) * 50,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      };

      setTrails((prev) => [...prev.slice(-16), newHeart]);
    };

    const handleClick = (e) => {
      playHeartPop();

      // Create rich explosion burst of 8 interactive particles
      const count = 8;
      const emojis = ['❤️', '💖', '✨', '🌸', '💕', '💗', '🌟', '💞'];
      const newBurst = Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5);
        const speed = Math.random() * 90 + 40;
        return {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 30, // upward bias
          size: Math.random() * 18 + 14,
          emoji: emojis[i % emojis.length],
          rotation: (Math.random() - 0.5) * 60
        };
      });

      setClickHearts((prev) => [...prev.slice(-30), ...newBurst]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const interval = setInterval(() => {
      setTrails((prev) => prev.filter((t) => Date.now() - t.id < 600));
      setClickHearts((prev) => prev.filter((h) => Date.now() - h.id < 900));
    }, 150);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Mouse Trail Particles */}
      {trails.map((t) => (
        <span
          key={t.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 opacity-85 scale-110 pointer-events-none"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            fontSize: `${t.size}px`,
            transform: `translate(-50%, -50%) rotate(${t.rotation}deg)`
          }}
        >
          {t.emoji}
        </span>
      ))}

      {/* Click Burst Particles */}
      {clickHearts.map((h) => (
        <span
          key={h.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out pointer-events-none drop-shadow-md"
          style={{
            left: `${h.x + h.vx}px`,
            top: `${h.y + h.vy}px`,
            fontSize: `${h.size}px`,
            transform: `translate(-50%, -50%) rotate(${h.rotation}deg)`
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

