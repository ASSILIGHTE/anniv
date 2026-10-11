import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { anniversaryData } from '../config/anniversaryData';

export const MusicPlayer = ({ isStarted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Attempt play on first user interaction or when story starts
  useEffect(() => {
    if (isStarted && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser prevented autoplay, user can click manually
          setIsPlaying(false);
        });
    }
  }, [isStarted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio play error:', err));
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={anniversaryData.musicTrack}
        loop
        preload="auto"
      />

      {/* Music Control Expandable Bar */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-pink-200 shadow-romantic px-3.5 py-2 rounded-full transition-all duration-300 hover:bg-white/90">
          {/* Main Floating Trigger Button */}
          <button
            onClick={togglePlay}
            aria-label="Toggle Music"
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <span className="animate-pulse">♫</span>
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}

            {/* Pulsing rings when music is active */}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full border-2 border-pink-400/50 animate-ping pointer-events-none" />
            )}
          </button>

          {/* Equalizer Wave visualizer when playing */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-4 px-1" title="Playing Love Story Music">
              <span className="w-1 bg-pink-500 rounded-full eq-bar" />
              <span className="w-1 bg-rose-400 rounded-full eq-bar" />
              <span className="w-1 bg-pink-600 rounded-full eq-bar" />
            </div>
          )}

          {/* Mute / Volume toggle button */}
          <button
            onClick={toggleMute}
            aria-label="Mute sound"
            className="text-pink-700 hover:text-pink-900 transition-colors p-1"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
