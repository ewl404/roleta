"use client";

import React, { useEffect, useRef, useState } from 'react';
import { WheelSegment } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

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
      // Logic is handled by the parent trigger to set targetAngleRef
      const finalRotation = targetAngleRef.current;
      setRotation(finalRotation);

      const timeout = setTimeout(() => {
        setIsSpinning(false);
        // Calculate which segment won based on the final rotation
        // Normalize rotation to 0-360
        const normalized = (finalRotation % 360);
        // 0 degrees is usually top (depending on CSS), let's assume top is 0.
        // Pointer is at the top (270 degrees in SVG coordinate space if not rotated).
        // Actually, CSS rotation 0 puts the "first" segment starting from top-right if not careful.
        // Let's adjust so 0 rotation = pointer at top.
        const winAngle = (360 - normalized) % 360;
        
        let currentAngle = 0;
        for (const segment of segments) {
          const segmentAngle = (segment.weight / totalWeight) * 360;
          if (winAngle >= currentAngle && winAngle < currentAngle + segmentAngle) {
            onResult(segment);
            break;
          }
          currentAngle += segmentAngle;
        }
      }, 5000); // Match CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [isSpinning, segments, totalWeight, onResult, setIsSpinning, targetAngleRef]);

  const renderSegments = () => {
    let currentAngle = 0;
    return segments.map((segment, index) => {
      const segmentAngle = (segment.weight / totalWeight) * 360;
      const rotate = currentAngle;
      const largeArc = segmentAngle > 180 ? 1 : 0;
      
      // Calculate coordinates for the path
      const radius = 50;
      const x1 = 50 + radius * Math.cos((Math.PI * (rotate - 90)) / 180);
      const y1 = 50 + radius * Math.sin((Math.PI * (rotate - 90)) / 180);
      const x2 = 50 + radius * Math.cos((Math.PI * (rotate + segmentAngle - 90)) / 180);
      const y2 = 50 + radius * Math.sin((Math.PI * (rotate + segmentAngle - 90)) / 180);
      
      const path = `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      currentAngle += segmentAngle;

      const defaultColor = index % 2 === 0 ? '#4A0404' : '#1A0F0D';
      const color = segment.color || defaultColor;

      return (
        <g key={segment.id}>
          <path d={path} fill={color} stroke="#D4AF37" strokeWidth="0.5" />
          <g transform={`rotate(${rotate + segmentAngle / 2 - 90} 50 50)`}>
            <text
              x="85"
              y="50"
              fill="#F5F5DC"
              fontSize="3.5"
              fontWeight="bold"
              fontFamily="Playfair Display"
              textAnchor="middle"
              transform="rotate(90 85 50)"
              className="pointer-events-none select-none"
            >
              {segment.label}
            </text>
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
      lights.push(
        <circle 
          key={i} 
          cx={x} 
          cy={y} 
          r="0.8" 
          fill="#F5F5DC" 
          className={cn("animate-pulse", i % 2 === 0 ? "duration-700" : "duration-1000")}
        />
      );
    }
    return lights;
  };

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full gold-gradient opacity-20 blur-2xl animate-pulse" />
      
      {/* Indicator */}
      <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-30 drop-shadow-xl">
        <div className="w-8 h-10 bg-gold border-2 border-obsidian rounded-b-full relative flex items-center justify-center">
          <div className="w-2 h-2 bg-cream rounded-full" />
        </div>
      </div>

      {/* The Wheel */}
      <div
        ref={wheelRef}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)' : 'none',
        }}
        className="w-full h-full relative z-20"
      >
        <div className="w-full h-full rounded-full wheel-rim overflow-hidden bg-obsidian">
          <svg viewBox="0 0 100 100" className="w-full h-full transform scale-[1.01]">
            {renderSegments()}
            {renderLights()}
            
            {/* Center Hub */}
            <circle cx="50" cy="50" r="10" fill="url(#goldGradient)" stroke="#B8860B" strokeWidth="1" />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F5D76E', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#B8860B', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Center Star Hub */}
            <g transform="translate(45, 45) scale(0.4)">
               <path 
                 d="M25 0 L31 18 L50 18 L35 30 L40 50 L25 38 L10 50 L15 30 L0 18 L19 18 Z" 
                 fill="#1A0F0D"
               />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
