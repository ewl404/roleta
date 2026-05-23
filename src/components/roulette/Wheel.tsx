
"use client";

import React, { useEffect, useState } from 'react';
import { WheelSegment } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WheelProps {
  segments: WheelSegment[];
  onResult: (segment: WheelSegment) => void;
  isSpinning: boolean;
  setIsSpinning: (val: boolean) => void;
  targetAngleRef: React.MutableRefObject<number>;
}

export const Wheel: React.FC<WheelProps> = ({ 
  segments, 
  onResult, 
  isSpinning, 
  setIsSpinning,
  targetAngleRef 
}) => {
  const [rotation, setRotation] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSpinning) {
      const finalRotation = targetAngleRef.current;
      setRotation(finalRotation);

      const timeout = setTimeout(() => {
        setIsSpinning(false);
        const normalized = (finalRotation % 360);
        const winAngle = (360 - normalized) % 360;
        
        const segmentAngle = 360 / segments.length;
        const winnerIndex = Math.floor(winAngle / segmentAngle);
        onResult(segments[winnerIndex]);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isSpinning, segments, onResult, setIsSpinning, targetAngleRef]);

  const renderSegments = () => {
    const total = segments.length;
    const cx = 250, cy = 250, r = 240, textR = 145;
    
    return segments.map((segment, i) => {
      // Ângulos em Radianos
      const startAngleRad = (i / total) * 2 * Math.PI - Math.PI / 2;
      const endAngleRad = ((i + 1) / total) * 2 * Math.PI - Math.PI / 2;
      const midAngleRad = (startAngleRad + endAngleRad) / 2;
      
      // midDeg sem o "+ 90" para garantir orientação RADIAL (apontando para fora)
      const midDeg = (midAngleRad * 180) / Math.PI;

      const x1 = cx + r * Math.cos(startAngleRad);
      const y1 = cy + r * Math.sin(startAngleRad);
      const x2 = cx + r * Math.cos(endAngleRad);
      const y2 = cy + r * Math.sin(endAngleRad);
      
      const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
      
      const tx = cx + textR * Math.cos(midAngleRad);
      const ty = cy + textR * Math.sin(midAngleRad);

      const isGrandPrize = segment.label.includes('1.000');
      const isNegative = segment.label.includes('Não foi');
      const isRetry = segment.label.includes('Tentar');

      return (
        <g key={segment.id}>
          <path d={path} fill={segment.color} stroke="#D4A24C" strokeWidth="1.5" />
          <path d={path} fill="url(#centerGradient)" opacity="0.15" />
          
          <g transform={`translate(${tx}, ${ty}) rotate(${midDeg})`}>
            {isGrandPrize ? (
              <>
                <text 
                  textAnchor="middle" 
                  x="0" y="-8" 
                  fill="#2A0A0A" 
                  className="font-cinzel text-[24px] font-black"
                  style={{ filter: 'url(#textShadow)' }}
                >
                  R$ 1.000
                </text>
                <text 
                  textAnchor="middle" 
                  x="0" y="14" 
                  fill="#2A0A0A" 
                  className="font-cinzel text-[9px] font-bold tracking-[0.2em]"
                >
                  GRANDE PRÊMIO
                </text>
              </>
            ) : isNegative ? (
              <>
                <text 
                  textAnchor="middle" 
                  x="0" y="-8" 
                  fill="#A88247"
                  className="font-cinzel text-[15px] font-bold"
                  style={{ filter: 'url(#textShadow)' }}
                >
                  Não foi
                </text>
                <text 
                  textAnchor="middle" 
                  x="0" y="10" 
                  fill="#A88247"
                  className="font-cinzel text-[13px] font-semibold"
                  style={{ filter: 'url(#textShadow)' }}
                >
                  dessa vez
                </text>
              </>
            ) : isRetry ? (
              <>
                <text 
                  textAnchor="middle" 
                  x="0" y="-8" 
                  fill="#F5E6C8"
                  className="font-cinzel text-[15px] font-bold"
                  style={{ filter: 'url(#textShadow)' }}
                >
                  Tentar
                </text>
                <text 
                  textAnchor="middle" 
                  x="0" y="10" 
                  fill="#F5E6C8"
                  className="font-cinzel text-[13px] font-semibold"
                  style={{ filter: 'url(#textShadow)' }}
                >
                  Novamente
                </text>
              </>
            ) : (
              <text 
                textAnchor="middle" 
                dominantBaseline="middle"
                x="0" y="0" 
                fill={segment.textColor || "#F5E6C8"}
                className="font-cinzel text-[24px] font-black tracking-wider"
                style={{ filter: 'url(#textShadow)' }}
              >
                {segment.label}
              </text>
            )}
          </g>
        </g>
      );
    });
  };

  return (
    <div className="relative w-[min(90vw,560px)] h-[min(90vw,560px)] mx-auto flex items-center justify-center">
      <div className="absolute inset-0 rounded-full blur-3xl opacity-60 pointer-events-none" 
           style={{ background: 'radial-gradient(circle at center, rgba(212,162,76,0.55) 0%, rgba(92,10,26,0.35) 40%, transparent 70%)' }} />
      
      <div className="absolute inset-0 rounded-full pointer-events-none z-0" 
           style={{ 
             background: 'linear-gradient(135deg, #F5D37A 0%, #D4A24C 25%, #8B5E1F 50%, #D4A24C 75%, #F5D37A 100%)',
             boxShadow: '0 0 60px rgba(212,162,76,0.5), inset 0 0 30px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.6)'
           }} />

      <div className="absolute inset-[10px] rounded-full bg-[#1A0A0A] pointer-events-none z-[1]" />

      <div className="absolute inset-[16px] rounded-full pointer-events-none z-[2]"
           style={{ 
             background: 'linear-gradient(135deg, #F5D37A 0%, #D4A24C 50%, #8B5E1F 100%)',
             boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
           }} />

      <div className="absolute inset-[16px] rounded-full pointer-events-none z-[3]">
        {mounted && Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const isGold = i % 2 === 0;
          return (
            <div 
              key={i}
              className={cn("absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2", isGold ? "animate-pulse" : "")}
              style={{ 
                left: `${50 + 48 * Math.cos((Math.PI * angle) / 180)}%`,
                top: `${50 + 48 * Math.sin((Math.PI * angle) / 180)}%`,
                backgroundColor: isGold ? "#FFF4D6" : "#5C0A1A",
                boxShadow: isGold ? "0 0 8px #FFD580, 0 0 16px rgba(255,213,128,0.6)" : "0 0 6px rgba(245,230,200,0.4)"
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          width: 'calc(100% - 60px)',
          height: 'calc(100% - 60px)',
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
        }}
        className="absolute rounded-full overflow-hidden z-[4] shadow-[inset_0_0_40px_rgba(0,0,0,0.7)]"
      >
        <svg viewBox="0 0 500 500" className="w-full h-full block">
          <defs>
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B0F1A" />
              <stop offset="100%" stopColor="#0A0203" />
            </radialGradient>
            <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.8)" />
            </filter>
          </defs>
          {renderSegments()}
        </svg>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] pointer-events-none">
        <div className="h-24 w-24 rounded-full flex items-center justify-center" 
             style={{ 
               background: 'linear-gradient(135deg, #F5D37A 0%, #D4A24C 50%, #8B5E1F 100%)',
               boxShadow: '0 0 30px rgba(212,162,76,0.8), inset 0 -4px 12px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,255,255,0.4)'
             }}>
          <div className="h-16 w-16 rounded-full flex items-center justify-center" 
               style={{ 
                 background: 'radial-gradient(circle, #5C0A1A 0%, #1A0203 100%)',
                 boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.6)'
               }}>
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#F5D37A" strokeWidth="1.5">
              <path d="M12 2 L13.5 9 L21 10 L15 14.5 L17 22 L12 18 L7 22 L9 14.5 L3 10 L10.5 9 Z" fill="#F5D37A" opacity="0.95" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-[20] pointer-events-none">
        <svg width="56" height="72" viewBox="0 0 56 72" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
          <defs>
            <linearGradient id="pointerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D37A" />
              <stop offset="50%" stopColor="#D4A24C" />
              <stop offset="100%" stopColor="#8B5E1F" />
            </linearGradient>
          </defs>
          <path d="M28 70 L6 28 Q6 8 28 6 Q50 8 50 28 Z" fill="url(#pointerGrad)" stroke="#3B0F1A" strokeWidth="2" />
          <circle cx="28" cy="24" r="6" fill="#5C0A1A" stroke="#F5D37A" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};
