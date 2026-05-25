
"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Wheel } from './Wheel';
import { WheelSegment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Star, Trophy, RefreshCcw, Wallet, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const AURORA_SEGMENTS: WheelSegment[] = [
  { id: '1', label: 'R$ 1.000 (GRANDE PRÊMIO)', weight: 1, color: '#D4A24C' },
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

interface RouletteGameProps {
  variant?: 'default' | 'whatsapp';
}

export const RouletteGame = ({ variant = 'default' }: RouletteGameProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const [spinCount, setSpinCount] = useState(0);
  const targetAngleRef = useRef(0);
  const currentRotationRef = useRef(0);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setWinner(null);
    setIsSpinning(true);

    let targetSegmentIndex;
    if (spinCount === 0) {
      targetSegmentIndex = 3;
    } else if (spinCount === 1) {
      targetSegmentIndex = 0;
    } else {
      targetSegmentIndex = Math.floor(Math.random() * AURORA_SEGMENTS.length);
    }

    setSpinCount(prev => prev + 1);

    const extraRotations = 10;
    const segmentAngle = 360 / AURORA_SEGMENTS.length;
    const targetSegmentAngle = (targetSegmentIndex * segmentAngle) + (segmentAngle / 2);
    
    const newTarget = currentRotationRef.current + (extraRotations * 360) + (360 - (currentRotationRef.current % 360)) + (360 - targetSegmentAngle);
    
    targetAngleRef.current = newTarget;
    currentRotationRef.current = newTarget;
  }, [isSpinning, spinCount]);

  const onResult = useCallback((segment: WheelSegment) => {
    setWinner(segment);
  }, []);

  return (
    <div className="min-h-screen py-6 md:py-10 px-4 flex flex-col items-center gap-2 md:gap-4 max-w-4xl mx-auto">
      <header className="text-center space-y-2 md:space-y-3 max-w-3xl w-full z-10">
        <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] uppercase tracking-[0.4em] font-bold">
          <span className="w-1 h-1 rounded-full bg-gold shadow-[0_0_5px_#D4A24C]" />
          Mapa da Sorte
          <span className="w-1 h-1 rounded-full bg-gold shadow-[0_0_5px_#D4A24C]" />
        </div>
        
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold font-black tracking-tighter text-glow-gold leading-tight">
          GIRE A ROLETA E TENTE A SORTE!
        </h1>
      </header>

      <div className="flex flex-col items-center gap-6 md:gap-10 w-full mt-4 md:mt-8">
        <Wheel 
          segments={AURORA_SEGMENTS} 
          onResult={onResult} 
          isSpinning={isSpinning} 
          setIsSpinning={setIsSpinning}
          targetAngleRef={targetAngleRef}
        />

        <Button 
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full max-w-[320px] h-14 md:h-16 text-lg font-cinzel font-black gold-gradient-border text-obsidian rounded-full aurora-btn-shadow hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border-2 border-gold/50"
        >
          Girar Roleta
        </Button>

        <div className="w-full max-w-md p-[1.5px] rounded-2xl gold-gradient-border shadow-2xl">
          <div className="bg-gradient-to-br from-[#1A0203]/95 to-[#3B0F1A]/95 backdrop-blur-md rounded-[15px] p-6 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-gold/50 text-[10px] uppercase tracking-[0.3em] font-bold">Grande Prêmio</div>
              <div className="font-cinzel text-3xl md:text-4xl text-gold font-black">R$ 1.000,00</div>
            </div>
            <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <Star className="w-8 h-8 text-[#1A0203] fill-[#1A0203]" />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-6 py-4 text-gold/20 text-[10px] uppercase tracking-[0.3em] text-center border-t border-gold/10 w-full">
        Todos os direitos reservados
      </footer>

      {winner && !isSpinning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop animate-in fade-in duration-500">
          <div className="w-full max-w-sm p-[2px] rounded-3xl gold-gradient-border shadow-[0_0_100px_rgba(212,175,55,0.3)]">
            <div className="bg-[#1A0203] rounded-[22px] p-10 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 mx-auto flex items-center justify-center">
                <Trophy className="w-10 h-10 text-gold animate-bounce" />
              </div>
              <div className="space-y-2">
                <p className="text-gold/50 text-xs uppercase tracking-[0.3em]">O resultado foi</p>
                <h2 className="font-cinzel text-3xl md:text-4xl text-gold font-black leading-tight">
                  {winner.label.split('(')[0]}
                </h2>
                {winner.label.includes('(') && (
                  <p className="text-gold text-sm font-bold tracking-widest">GRANDE PRÊMIO</p>
                )}
              </div>
              
              {winner.label.includes('1.000') ? (
                variant === 'whatsapp' ? (
                  <div className="space-y-4 w-full">
                    <p className="text-[#F5E6C8]/80 text-[13px] leading-relaxed px-2">
                      Entre no grupo e descubra como participar da chance de ganhar R$ 1.000
                    </p>
                    <Link href="https://whatsapp.com/channel/0029Vb7RuvI05MUhbdxUc11E" target="_blank" className="w-full block">
                      <Button className="w-full h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-cinzel font-black text-[14px] tracking-[0.2em] shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all uppercase border-none">
                        <MessageCircle className="w-5 h-5 mr-2" /> Entrar no Grupo
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/resgatar" className="w-full">
                    <Button className="w-full h-14 rounded-full gold-gradient-border text-obsidian font-cinzel font-bold text-[13px] tracking-[0.2em] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all uppercase">
                      <Wallet className="w-5 h-5 mr-2" /> Resgatar prêmio
                    </Button>
                  </Link>
                )
              ) : (
                <Button 
                  onClick={() => setWinner(null)}
                  className="w-full h-14 rounded-full gold-gradient-border text-obsidian font-cinzel font-bold text-[13px] tracking-[0.2em] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all uppercase"
                >
                  <RefreshCcw className="w-5 h-5 mr-2" /> Jogar Novamente
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
