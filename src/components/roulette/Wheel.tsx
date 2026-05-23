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
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const totalWeight = segments.reduce((acc, s) => acc + s.weight, 0);
  
  useEffect(() => {
    if (isSpinning) {
      const finalRotation = targetAngleRef.current;
      setRotation(finalRotation);

      const timeout = setTimeout(() => {
        setIsSpinning(false);
        const normalized = (finalRotation % 360);
        //Pointer is at the top (CSS rotation 0)
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
      
      const radius = 48;
      const x1 = 50 + radius * Math.cos((Math.PI * (rotate - 90)) / 180);
      const y1 = 50 + radius * Math.sin((Math.PI * (rotate - 90)) / 180);
      const x2 = 50 + radius * Math.cos((Math.PI * (rotate + segmentAngle - 90)) / 180);
      const y2 = 50 + radius * Math.sin((Math.PI * (rotate + segmentAngle - 90)) / 180);
      
      const path = `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      currentAngle += segmentAngle;

      const color = segment.color || (index % 2 === 0 ? '#5C0A1A' : '#1A0A0A');
      const textColor = segment.color === '#D4A24C' ? '#2A0A0A' : '#F5E6C8';

      return (
        <g key={segment.id}>
          <path d={path} fill={color} stroke="#D4A24C" strokeWidth="0.3" />
          <path d={path} fill="url(#centerOverlay)" opacity="0.15" />
          <g transform={`rotate(${rotate + segmentAngle / 2 - 90} 50 50)`}>
            <text
              x="78"
              y="50"
              fill={textColor}
              fontSize={segment.label.length > 10 ? "2.5" : "3.2"}
              fontWeight="900"
              fontFamily="Playfair Display"
              textAnchor="middle"
              transform={`rotate(90 78 50)`}
              className="pointer-events-none select-none"
              style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.8))' }}
            >
              {segment.label}
            </text>
            {segment.subLabel && (
              <text
                x="85"
                y="50"
                fill={textColor}
                fontSize="1.2"
                fontWeight="700"
                fontFamily="Inter"
                textAnchor="middle"
                transform={`rotate(90 85 50)`}
                className="pointer-events-none select-none"
                opacity="0.8"
                style={{ letterSpacing: '0.1em' }}
              >
                {segment.subLabel.toUpperCase()}
              </text>
            )}
          </g>
        </g>
      );
    });
  };

  const renderLights = () => {
    const lights = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = (i * 360) / count;
      const r = 47.5;
      const x = 50 + r * Math.cos((Math.PI * angle) / 180);
      const y = 50 + r * Math.sin((Math.PI * angle) / 180);
      const isGold = i % 2 === 0;
      lights.push(
        <circle 
          key={i} 
          cx={x} 
          cy={y} 
          r="0.8" 
          fill={isGold ? "#FFF4D6" : "#5C0A1A"} 
          className={cn("animate-pulse", i % 2 === 0 ? "duration-700" : "duration-1000")}
          style={{ filter: isGold ? 'drop-shadow(0 0 2px #FFD580)' : 'none' }}
        />
      );
    }
    return lights;
  };

  return (
    <div className="relative w-full max-w-[560px] aspect-square mx-auto">
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
      <div className="absolute inset-[10px] rounded-full bg-[#1A0A0A] pointer-events-none z-1" />

      {/* Pointer (Indicator) */}
      <div className="absolute left-1/2 -top-4 -translate-x-1/2 z-50 pointer-events-none">
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

      {/* The Spinning Wheel */}
      <div
        ref={wheelRef}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)' : 'none',
        }}
        className="absolute inset-[16px] z-20"
      >
        <div className="w-full h-full rounded-full overflow-hidden" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.7)' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <defs>
              <radialGradient id="centerOverlay" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3B0F1A" />
                <stop offset="100%" stopColor="#0A0203" />
              </radialGradient>
              <linearGradient id="hubGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D37A" />
                <stop offset="50%" stopColor="#D4A24C" />
                <stop offset="100%" stopColor="#8B5E1F" />
              </linearGradient>
            </defs>
            
            {renderSegments()}
            {renderLights()}
          </svg>
        </div>
      </div>

      {/* Center Hub (Non-spinning) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
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
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
              <path d="M12 2 L13.5 9 L21 10 L15 14.5 L17 22 L12 18 L7 22 L9 14.5 L3 10 L10.5 9 Z" fill="#F5D37A" opacity="0.95" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
