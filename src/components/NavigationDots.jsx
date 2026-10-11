import React from 'react';
import { Heart, Camera, Mail, Gift } from 'lucide-react';

export const NavigationDots = ({ currentPage, onSelectPage }) => {
  const pages = [
    { id: 1, label: 'Hey, Kamu...', icon: Heart },
    { id: 2, label: 'Cerita Kita', icon: Camera },
    { id: 3, label: 'Surat Cinta', icon: Mail },
    { id: 4, label: 'Kejutan Akhir', icon: Gift }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 md:gap-3 bg-white/75 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200/80 shadow-romantic transition-all hover:bg-white/90">
        {pages.map((page) => {
          const Icon = page.icon;
          const isActive = currentPage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md scale-105'
                  : 'text-pink-700/70 hover:text-pink-900 hover:bg-pink-100/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'animate-bounce-short' : ''}`} />
              <span className={`${isActive ? 'inline-block' : 'hidden md:inline-block'}`}>
                {page.label}
              </span>

              {/* Tooltip on mobile */}
              <span className="md:hidden absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none transition-opacity whitespace-nowrap">
                {page.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
