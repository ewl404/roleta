
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface TarotCardProps {
  value: string;
  label: string;
  isLoser: boolean;
  isRevealed: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export const TarotCard: React.FC<TarotCardProps> = ({
  value,
  label,
  isLoser,
  isRevealed,
  isDisabled,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "relative aspect-[2/3] w-full cursor-pointer transition-all duration-500 preserve-3d group",
        isRevealed && "rotate-y-180",
        isDisabled && "opacity-40 pointer-events-none scale-95",
        !isRevealed && !isDisabled && "hover:scale-105 hover:-translate-y-1 active:scale-95"
      )}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      {/* CARD BACK */}
      <div className="absolute inset-0 backface-hidden z-10 shadow-2xl">
        <svg viewBox="0 0 200 300" className="w-full h-full rounded-xl overflow-hidden shadow-inner">
          <defs>
            <radialGradient id="cardBackGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B0F1A" />
              <stop offset="100%" stopColor="#0A0203" />
            </radialGradient>
            <filter id="glowGold">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Background and Border */}
          <rect width="200" height="300" fill="url(#cardBackGrad)" />
          <rect x="8" y="8" width="184" height="284" rx="12" fill="none" stroke="#D4A24C" strokeWidth="2" opacity="0.8" />
          <rect x="14" y="14" width="172" height="272" rx="8" fill="none" stroke="#D4A24C" strokeWidth="1" opacity="0.4" />
          
          {/* Astral Mandala Symbol */}
          <g opacity="0.2" transform="translate(100, 150)">
            <circle r="40" fill="none" stroke="#D4A24C" strokeWidth="0.5" />
            <circle r="30" fill="none" stroke="#D4A24C" strokeWidth="0.5" />
            <circle r="20" fill="none" stroke="#D4A24C" strokeWidth="0.5" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={i} 
                x1="0" y1="-50" x2="0" y2="-60" 
                transform={`rotate(${i * 30})`} 
                stroke="#D4A24C" strokeWidth="0.5" 
              />
            ))}
          </g>

          {/* Corner Ornaments */}
          <path d="M20 40 L20 20 L40 20" fill="none" stroke="#D4A24C" strokeWidth="1.5" opacity="0.6" />
          <path d="M160 20 L180 20 L180 40" fill="none" stroke="#D4A24C" strokeWidth="1.5" opacity="0.6" />
          <path d="M20 260 L20 280 L40 280" fill="none" stroke="#D4A24C" strokeWidth="1.5" opacity="0.6" />
          <path d="M160 280 L180 280 L180 260" fill="none" stroke="#D4A24C" strokeWidth="1.5" opacity="0.6" />
          
          {/* Dots in corners */}
          <circle cx="20" cy="20" r="2" fill="#D4A24C" opacity="0.8" />
          <circle cx="180" cy="20" r="2" fill="#D4A24C" opacity="0.8" />
          <circle cx="20" cy="280" r="2" fill="#D4A24C" opacity="0.8" />
          <circle cx="180" cy="280" r="2" fill="#D4A24C" opacity="0.8" />

          {/* Decoration tops/bottoms */}
          <g transform="translate(100, 35)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#D4A24C" strokeWidth="1" opacity="0.4" />
            <rect x="-4" y="-4" width="8" height="8" transform="rotate(45)" fill="#D4A24C" opacity="0.6" />
          </g>
          <g transform="translate(100, 265)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#D4A24C" strokeWidth="1" opacity="0.4" />
            <rect x="-4" y="-4" width="8" height="8" transform="rotate(45)" fill="#D4A24C" opacity="0.6" />
          </g>

          {/* Hover Glow */}
          <rect width="200" height="300" fill="url(#cardBackGrad)" className="opacity-0 group-hover:opacity-10 transition-opacity" />
        </svg>
      </div>

      {/* CARD FRONT */}
      <div className="absolute inset-0 rotate-y-180 backface-hidden z-20">
        <svg viewBox="0 0 200 300" className="w-full h-full rounded-xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          <rect width="200" height="300" fill="url(#cardBackGrad)" />
          
          {/* Glowing Center */}
          <ellipse cx="100" cy="150" rx="60" ry="100" fill="url(#glowRad)" opacity="0.1" />
          <defs>
            <radialGradient id="glowRad">
              <stop offset="0%" stopColor="#F5D37A" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Borders */}
          <rect x="8" y="8" width="184" height="284" rx="12" fill="none" stroke="#F5D37A" strokeWidth="2" opacity="0.7" />
          
          {/* Decorative Lines */}
          <line x1="40" y1="72" x2="160" y2="72" stroke="#D4A24C" strokeWidth="0.5" opacity="0.5" />
          <line x1="40" y1="228" x2="160" y2="228" stroke="#D4A24C" strokeWidth="0.5" opacity="0.5" />

          {/* Stars */}
          <g transform="translate(100, 45)">
            <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#F5D37A" filter="url(#glowGold)" />
            <path d="M-25 -2 L-23 0 L-25 2 L-27 0 Z" fill="#D4A24C" transform="translate(0, 2)" />
            <path d="M25 -2 L27 0 L25 2 L23 0 Z" fill="#D4A24C" transform="translate(0, 2)" />
          </g>
          <g transform="translate(100, 255)">
            <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#F5D37A" />
            <path d="M-25 -2 L-23 0 L-25 2 L-27 0 Z" fill="#D4A24C" transform="translate(0, 2)" />
            <path d="M25 -2 L27 0 L25 2 L23 0 Z" fill="#D4A24C" transform="translate(0, 2)" />
          </g>

          {/* Content */}
          <g transform="translate(100, 150)">
            {isLoser ? (
              <>
                <text 
                  textAnchor="middle" 
                  y="-10" 
                  fill="#F5D37A" 
                  className="font-cinzel text-[60px] font-black"
                  filter="url(#glowGold)"
                >
                  ✕
                </text>
                <text 
                  textAnchor="middle" 
                  y="40" 
                  fill="#D4A24C" 
                  className="font-cinzel text-[10px] font-bold tracking-[0.2em]"
                >
                  TENTE NOVAMENTE
                </text>
                <text 
                  textAnchor="middle" 
                  y="55" 
                  fill="#D4A24C" 
                  className="font-cinzel text-[8px] opacity-60"
                >
                  Pegue outra carta
                </text>
              </>
            ) : (
              <>
                <text 
                  textAnchor="middle" 
                  y="10" 
                  fill="#F5D37A" 
                  className="font-cinzel text-[100px] font-black"
                  filter="url(#glowGold)"
                >
                  {value}
                </text>
                <text 
                  textAnchor="middle" 
                  y="50" 
                  fill="#D4A24C" 
                  className="font-cinzel text-[14px] font-bold tracking-[0.4em]"
                >
                  {label}
                </text>
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};
