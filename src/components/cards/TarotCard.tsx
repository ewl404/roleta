
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
        "relative aspect-[2/3] w-full cursor-pointer transition-all duration-500 group",
        isRevealed && "[transform:rotateY(180deg)]",
        isDisabled && "opacity-35 pointer-events-none grayscale-[0.5]",
        !isRevealed && !isDisabled && "hover:scale-[1.06] hover:-translate-y-1 active:scale-95"
      )}
      onClick={onClick}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* CARD BACK */}
      <div className="absolute inset-0 [backface-visibility:hidden] z-10">
        <svg viewBox="0 0 200 300" className="w-full h-full rounded-[10px] overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.6)]">
          <defs>
            <radialGradient id="cardBackGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B0F1A" />
              <stop offset="100%" stopColor="#0A0203" />
            </radialGradient>
          </defs>
          
          <rect width="200" height="300" fill="url(#cardBackGrad)" />
          
          {/* Borders */}
          <rect x="8" y="8" width="184" height="284" rx="12" fill="none" stroke="#D4A24C" strokeWidth="1" opacity="0.55" />
          <rect x="14" y="14" width="172" height="272" rx="8" fill="none" stroke="#D4A24C" strokeWidth="0.5" opacity="0.3" />
          
          {/* Mandala Symbol */}
          <g opacity="0.4" transform="translate(100, 150)">
            <circle r="72" fill="none" stroke="#D4A24C" strokeWidth="0.5" opacity="0.3" />
            <circle r="52" fill="none" stroke="#D4A24C" strokeWidth="0.5" opacity="0.5" />
            <circle r="32" fill="none" stroke="#D4A24C" strokeWidth="0.5" opacity="0.7" />
            <circle r="10" fill="none" stroke="#D4A24C" strokeWidth="1" />
            
            {/* Radial Lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={i} 
                x1="0" y1="0" x2="0" y2="-80" 
                transform={`rotate(${i * 30})`} 
                stroke="#D4A24C" strokeWidth="0.5" opacity="0.4"
              />
            ))}
            
            {/* Orbital Ellipses */}
            {Array.from({ length: 6 }).map((_, i) => (
              <ellipse 
                key={i}
                rx="85" ry="35"
                fill="none" stroke="#D4A24C" strokeWidth="0.3"
                transform={`rotate(${i * 60})`}
                opacity="0.2"
              />
            ))}
            
            {/* Central Point */}
            <circle r="3" fill="#D4A24C" opacity="0.8" />
          </g>

          {/* Corner Ornaments */}
          {[
            { t: 'translate(24, 28)', r: 0 },
            { t: 'translate(176, 28)', r: 90 },
            { t: 'translate(176, 272)', r: 180 },
            { t: 'translate(24, 272)', r: 270 }
          ].map((orn, i) => (
            <g key={i} transform={orn.t + ` rotate(${orn.r})`}>
              <path d="M 0 10 L 0 0 L 10 0" fill="none" stroke="#D4A24C" strokeWidth="1" />
              <circle r="2" fill="#D4A24C" />
            </g>
          ))}
          
          {/* Top/Bottom Decoration */}
          <g transform="translate(100, 36)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#D4A24C" strokeWidth="0.5" />
            <polygon points="0,-4 6,0 0,4 -6,0" fill="#D4A24C" />
            <circle cx="-40" cy="0" r="1.5" fill="#D4A24C" opacity="0.5" />
            <circle cx="40" cy="0" r="1.5" fill="#D4A24C" opacity="0.5" />
          </g>
          <g transform="translate(100, 264)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#D4A24C" strokeWidth="0.5" />
            <polygon points="0,-4 6,0 0,4 -6,0" fill="#D4A24C" />
            <circle cx="-40" cy="0" r="1.5" fill="#D4A24C" opacity="0.5" />
            <circle cx="40" cy="0" r="1.5" fill="#D4A24C" opacity="0.5" />
          </g>

          {/* Hover Glow */}
          <rect 
            width="200" height="300" 
            fill="url(#hoverGrad)" 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          />
          <defs>
            <radialGradient id="hoverGrad" cx="50%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#F5D37A" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* CARD FRONT */}
      <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] z-20">
        <svg viewBox="0 0 200 300" className="w-full h-full rounded-[10px] overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          <defs>
            <filter id="goldGlow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <radialGradient id="frontGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#3B0F1A" />
              <stop offset="100%" stopColor="#0A0203" />
            </radialGradient>
          </defs>
          
          <rect width="200" height="300" fill="url(#frontGrad)" />
          
          {/* Brilhos centrais */}
          <ellipse cx="100" cy="120" rx="55" ry="55" fill="#D4A24C" opacity="0.07" />
          <ellipse cx="100" cy="120" rx="35" ry="35" fill="#F5D37A" opacity="0.08" />

          {/* Borders */}
          <rect x="8" y="8" width="184" height="284" rx="12" fill="none" stroke="#D4A24C" strokeWidth="1.2" opacity="0.7" />
          <rect x="14" y="14" width="172" height="272" rx="6" fill="none" stroke="#D4A24C" strokeWidth="0.5" opacity="0.35" />
          
          {/* Linhas decorativas */}
          <line x1="36" y1="72" x2="164" y2="72" stroke="#D4A24C" strokeWidth="0.5" opacity="0.6" />
          <line x1="36" y1="228" x2="164" y2="228" stroke="#D4A24C" strokeWidth="0.5" opacity="0.6" />

          {/* Estrelas Topo */}
          <g transform="translate(100, 52)">
            <path d="M0,-9 L2.5,-3 L9,-3 L4,1.5 L6,9 L0,5.5 L-6,9 L-4,1.5 L-9,-3 L-2.5,-3 Z" fill="#F5D37A" opacity="0.9" />
            <path d="M0,-7 L2,-2 L7,-2 L3,1 L5,7 L0,4 L-5,7 L-3,1 L-7,-2 L-2,-2 Z" fill="#D4A24C" opacity="0.5" transform="translate(-20, 0)" />
            <path d="M0,-7 L2,-2 L7,-2 L3,1 L5,7 L0,4 L-5,7 L-3,1 L-7,-2 L-2,-2 Z" fill="#D4A24C" opacity="0.5" transform="translate(20, 0)" />
          </g>

          {/* Estrelas Rodapé */}
          <g transform="translate(100, 248)">
            <path d="M0,-9 L2.5,-3 L9,-3 L4,1.5 L6,9 L0,5.5 L-6,9 L-4,1.5 L-9,-3 L-2.5,-3 Z" fill="#F5D37A" opacity="0.9" />
            <path d="M0,-7 L2,-2 L7,-2 L3,1 L5,7 L0,4 L-5,7 L-3,1 L-7,-2 L-2,-2 Z" fill="#D4A24C" opacity="0.5" transform="translate(-20, 0)" />
            <path d="M0,-7 L2,-2 L7,-2 L3,1 L5,7 L0,4 L-5,7 L-3,1 L-7,-2 L-2,-2 Z" fill="#D4A24C" opacity="0.5" transform="translate(20, 0)" />
          </g>

          {/* Conteúdo Central */}
          {isLoser ? (
            <g>
              <circle cx="100" cy="140" r="40" fill="none" stroke="#8B2020" strokeWidth="2" opacity="0.6" />
              <line x1="75" y1="115" x2="125" y2="165" stroke="#8B2020" strokeWidth="8" strokeLinecap="round" />
              <line x1="125" y1="115" x2="75" y2="165" stroke="#8B2020" strokeWidth="8" strokeLinecap="round" />
              <text x="100" y="215" textAnchor="middle" fill="#D4A24C" className="font-cinzel" style={{ fontSize: '11px', letterSpacing: '2px' }}>TENTE NOVAMENTE</text>
              <text x="100" y="232" textAnchor="middle" fill="#F5E6C8" opacity="0.7" style={{ fontSize: '10px' }}>Pegue outra carta</text>
            </g>
          ) : (
            <g>
              <text 
                x="100" y="162" 
                textAnchor="middle" 
                fill="#F5D37A" 
                filter="url(#goldGlow)"
                className="font-cinzel"
                style={{ fontSize: '100px', fontWeight: '900' }}
              >
                {value}
              </text>
              <text 
                x="100" y="200" 
                textAnchor="middle" 
                fill="#D4A24C" 
                className="font-cinzel"
                style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '4px' }}
              >
                {label}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
