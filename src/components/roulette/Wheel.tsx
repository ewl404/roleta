"use client";

import React, { useEffect, useRef, useState } from 'react';
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
  const totalWeight = segments.reduce((acc, s) => acc + s.weight, 0);
  
  useEffect(() => {
    if (isSpinning) {
      const finalRotation = targetAngleRef.current;
      setRotation(finalRotation);

      const timeout = setTimeout(() => {
        setIsSpinning(false);
        const normalized = (finalRotation % 360);
        // O ponteiro está no topo (ângulo 0/360)
        // Calculamos qual segmento está no topo após a rotação
        const winAngle = (360 - (normalized % 360)) % 360;
        
        let currentAngle = 0;
        for (const segment of segments) {
          const segmentAngle = (segment.weight / totalWeight) * 360;
          if (winAngle >= currentAngle && winAngle < currentAngle + segmentAngle) {
            onResult(segment);
            break;
          }
          currentAngle += segmentAngle;
        }
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isSpinning, segments, totalWeight, onResult, setIsSpinning, targetAngleRef]);

  const renderSegments = () => {
    let currentAngle = 0;
    return segments.map((segment, index) => {
      const segmentAngle = (segment.weight / totalWeight) * 360;
      const rotate = currentAngle;
      const largeArc = segmentAngle > 180 ? 1 : 0;
      
      const radius = 240;
      const cx = 250;
      const cy = 250;
      
      const x1 = cx + radius * Math.cos((Math.PI * (rotate - 90)) / 180);
      const y1 = cy + radius * Math.sin((Math.PI * (rotate - 90)) / 180);
      const x2 = cx + radius * Math.cos((Math.PI * (rotate + segmentAngle - 90)) / 180);
      const y2 = cy + radius * Math.sin((Math.PI * (rotate + segmentAngle - 90)) / 180);
      
      const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      currentAngle += segmentAngle;

      const color = segment.color || (index % 2 === 0 ? '#5C0A1A' : '#1A0A0A');
      const textColor = (segment.label.includes('1.000') || segment.label.includes('500')) ? '#D4A24C' : '#F5E6C8';

      return (
        <g key={segment.id}>
          <path d={path} fill={color} stroke="#D4A24C" strokeWidth="1.5" />
          <path d={path} fill="url(#centerOverlay)" opacity="0.15" />
          <g transform={`rotate(${rotate + segmentAngle / 2 - 90} 250 250)`}>
            <text
              x="380"
              y="250"
              fill={textColor}
              fontSize={segment.label.length > 10 ? "16" : "24"}
              fontWeight="900"
              fontFamily="Playfair Display"
              textAnchor="middle"
              transform={`rotate(90 380 250)`}
              className="pointer-events-none select-none"
              style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.8))' }}
            >
              {segment.label}
            </text>
            {segment.subLabel && (
              <text
                x="415"
                y="250"
                fill={textColor}
                fontSize="9"
                fontWeight="700"
                fontFamily="Inter"
                textAnchor="middle"
                transform={`rotate(90 415 250)`}
                className="pointer-events-none select-none"
                opacity="0.9"
                style={{ letterSpacing: '0.2em' }}
              >
                {segment.subLabel.toUpperCase()}
              </text>
            )}
          </g>
          {/* Decorative dots at the edge */}
          <g transform={`rotate(${rotate + segmentAngle / 2} 250 250)`}>
             <circle cx="250" cy="35" r="3" fill="#F5D37A" opacity="0.9" />
             <circle cx="250" cy="35" r="6" fill="#F5D37A" opacity="0.25" />
          </g>
        </g>
      );
    });
  };

  return (
    <div className="relative w-[min(90vw,560px)] h-[min(90vw,560px)] mx-auto flex items-center justify-center">
      {/* Outer Glow Ambient */}
      <div className="absolute inset-0 rounded-full blur-3xl opacity-60 pointer-events-none" 
           style={{ background: 'radial-gradient(circle at center, rgba(212,162,76,0.55) 0%, rgba(92,10,26,0.35) 40%, transparent 70%)' }} />
      
      {/* Outer Golden Rim */}
      <div className="absolute inset-0 rounded-full pointer-events-none z-0" 
           style={{ 
             background: 'linear-gradient(135deg, #F5D37A 0%, #D4A24C 25%, #8B5E1F 50%, #D4A24C 75%, #F5D37A 100%)',
             boxShadow: '0 0 60px rgba(212,162,76,0.5), inset 0 0 30px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.6)'
           }} />

      {/* Inner Black Border */}
      <div className="absolute inset-[10px] rounded-full bg-[#1A0A0A] pointer-events-none z-[1]" />

      {/* Golden Inner Rim */}
      <div className="absolute inset-[16px] rounded-full pointer-events-none z-[2]"
           style={{ 
             background: 'linear-gradient(135deg, #F5D37A 0%, #D4A24C 50%, #8B5E1F 100%)',
             boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
           }} />

      {/* Decorative Lights (Rim Dots) */}
      <div className="absolute inset-[16px] rounded-full pointer-events-none z-[3]">
        {Array.from({ length: 24 }).map((_, i) => {
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

      {/* The Spinning Wheel */}
      <div
        style={{
          width: 'calc(100% - 60px)',
          height: 'calc(100% - 60px)',
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)' : 'none',
        }}
        className="absolute rounded-full overflow-hidden z-[4] shadow-[inset_0_0_40px_rgba(0,0,0,0.7)]"
      >
        <svg viewBox="0 0 500 500" className="w-full h-full block">
          <defs>
            <radialGradient id="centerOverlay" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B0F1A" />
              <stop offset="100%" stopColor="#0A0203" />
            </radialGradient>
          </defs>
          {renderSegments()}
        </svg>
      </div>

      {/* Center Hub (Non-spinning) */}
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

      {/* Pointer (Indicator) */}
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
