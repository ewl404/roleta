"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Wheel } from './Wheel';
import { SegmentManager } from './SegmentManager';
import { History } from './History';
import { WheelSegment, SpinResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trophy, Dices } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_SEGMENTS: WheelSegment[] = [
  { id: '1', label: 'R$ 1.000', subLabel: 'GRANDE PRÊMIO', weight: 1, color: '#D4A24C' },
  { id: '2', label: 'Não foi dessa vez', weight: 1, color: '#0F0608' },
  { id: '3', label: 'R$ 50', weight: 1, color: '#5C0A1A' },
  { id: '4', label: 'Tentar Novamente', weight: 1, color: '#3B0F1A' },
  { id: '5', label: 'R$ 200', weight: 1, color: '#5C0A1A' },
  { id: '6', label: 'Não foi dessa vez', weight: 1, color: '#0F0608' },
  { id: '7', label: 'R$ 100', weight: 1, color: '#5C0A1A' },
  { id: '8', label: 'Tentar Novamente', weight: 1, color: '#3B0F1A' },
  { id: '9', label: 'R$ 50', weight: 1, color: '#5C0A1A' },
  { id: '10', label: 'R$ 500', weight: 1, color: '#1A0A0A' },
  { id: '11', label: 'R$ 100', weight: 1, color: '#5C0A1A' },
  { id: '12', label: 'R$ 200', weight: 1, color: '#1A0A0A' },
];

export const RouletteGame = () => {
  const [segments, setSegments] = useState<WheelSegment[]>(DEFAULT_SEGMENTS);
  const [history, setHistory] = useState<SpinResult[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const targetAngleRef = useRef(0);
  const currentRotationRef = useRef(0);
  const { toast } = useToast();

  const handleSpin = useCallback(() => {
    if (isSpinning || segments.length < 2) {
      if (segments.length < 2) {
        toast({ variant: "destructive", title: "Atenção", description: "Adicione pelo menos 2 segmentos para girar." });
      }
      return;
    }

    setWinner(null);
    setIsSpinning(true);

    // Calculate a random target angle (at least 5 full rotations + random offset)
    const extraRotations = 5 + Math.floor(Math.random() * 5);
    const randomOffset = Math.floor(Math.random() * 360);
    const newTarget = currentRotationRef.current + (extraRotations * 360) + randomOffset;
    
    targetAngleRef.current = newTarget;
    currentRotationRef.current = newTarget;
  }, [isSpinning, segments.length, toast]);

  const onResult = useCallback((segment: WheelSegment) => {
    setWinner(segment);
    const newResult: SpinResult = {
      id: Math.random().toString(36).substr(2, 9),
      segmentId: segment.id,
      label: segment.label,
      timestamp: Date.now(),
    };
    setHistory(prev => [newResult, ...prev]);
    toast({
      title: "Vencedor!",
      description: `O segmento selecionado foi: ${segment.label}`,
    });
  }, [toast]);

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center gap-12">
      <header className="text-center space-y-2">
        <h1 className="font-headline text-5xl md:text-7xl gold-text font-black tracking-tighter italic">
          ROLETA PREMIUM
        </h1>
        <p className="text-gold/60 font-medium tracking-widest text-sm uppercase">
          Experimente o luxo da sorte
        </p>
      </header>

      <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Management Panel */}
        <div className="lg:col-span-3 h-full order-2 lg:order-1">
          <SegmentManager segments={segments} setSegments={setSegments} />
        </div>

        {/* Wheel Display */}
        <div className="lg:col-span-6 flex flex-col items-center gap-10 order-1 lg:order-2">
          <div className="relative">
             <Wheel 
              segments={segments} 
              onResult={onResult} 
              isSpinning={isSpinning} 
              setIsSpinning={setIsSpinning}
              targetAngleRef={targetAngleRef}
            />
            
            {winner && !isSpinning && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[40] animate-in fade-in zoom-in duration-500">
                <div className="bg-obsidian/95 backdrop-blur-md border-2 border-gold rounded-2xl p-6 text-center shadow-[0_0_50px_rgba(212,175,55,0.4)] min-w-[200px]">
                  <Trophy className="w-10 h-10 text-gold mx-auto mb-2 animate-bounce" />
                  <p className="text-gold/70 text-sm uppercase tracking-widest mb-1">Resultado</p>
                  <h2 className="text-cream text-3xl font-headline font-bold">{winner.label}</h2>
                  {winner.subLabel && <p className="text-gold/50 text-xs mt-1">{winner.subLabel}</p>}
                </div>
              </div>
            )}
          </div>

          <Button 
            onClick={handleSpin}
            disabled={isSpinning}
            className="w-64 h-20 text-2xl font-headline font-black gold-gradient text-obsidian rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform border-4 border-gold-dark metallic-shadow"
          >
            {isSpinning ? (
              <Dices className="w-8 h-8 animate-spin" />
            ) : (
              "GIRAR AGORA"
            )}
          </Button>
        </div>

        {/* History Panel */}
        <div className="lg:col-span-3 h-[600px] order-3">
          <History history={history} />
        </div>
      </main>

      <footer className="mt-auto pt-12 pb-6 text-gold/30 text-xs text-center border-t border-gold/10 w-full max-w-4xl">
        &copy; 2024 ROLETA PREMIUM STUDIO • DESIGN LUXUOSO & ALGORITMOS PRECISOS
      </footer>
    </div>
  );
};
