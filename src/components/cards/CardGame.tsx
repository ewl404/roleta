
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { TarotCard } from './TarotCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

type CardResult = {
  id: number;
  value: string;
  label: string;
  isLoser: boolean;
};

const INITIAL_RESULTS: Omit<CardResult, 'id'>[] = [
  { value: '1', label: 'RODADA', isLoser: false },
  { value: '2', label: 'RODADAS', isLoser: false },
  { value: '3', label: 'RODADAS', isLoser: false },
  { value: '4', label: 'RODADAS', isLoser: false },
  { value: '5', label: 'RODADAS', isLoser: false },
  { value: '✕', label: 'TENTE NOVAMENTE', isLoser: true },
];

export const CardGame = () => {
  const [cards, setCards] = useState<CardResult[]>([]);
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  const shuffleCards = useCallback(() => {
    const shuffled = [...INITIAL_RESULTS]
      .sort(() => Math.random() - 0.5)
      .map((res, idx) => ({ ...res, id: idx }));
    setCards(shuffled);
    setRevealedIndex(null);
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  const handleCardClick = (index: number) => {
    if (revealedIndex !== null) return;
    setRevealedIndex(index);
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 flex flex-col items-center max-w-5xl mx-auto">
      <header className="text-center space-y-4 mb-8 md:mb-12">
        <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-[#D4A24C]/30 bg-[#D4A24C]/5 text-[#D4A24C] text-[10px] uppercase tracking-[0.4em] font-bold backdrop-blur-sm">
          ✦ Sorteios Místicos ✦
        </div>
        
        <h1 className="font-cinzel text-3xl md:text-5xl text-[#F5D37A] font-black tracking-tighter text-glow-gold leading-tight drop-shadow-[0_0_10px_rgba(245,211,122,0.5)]">
          Aurora Cartomante
        </h1>
        
        <div className="space-y-3">
          <p className="text-[#D4A24C] font-cinzel text-[11px] tracking-[0.45em] uppercase">
            — ESCOLHA SUA CARTA —
          </p>
          <p className="text-[#F5E6C8] text-[13px] max-w-[300px] mx-auto leading-relaxed">
            O destino aguarda. Escolha <span className="font-bold text-[#F5D37A]">uma carta</span> e descubra quantas rodadas na roleta você ganhou.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-[320px] md:max-w-[400px] mb-8">
        {cards.map((card, idx) => (
          <TarotCard
            key={card.id}
            value={card.value}
            label={card.label}
            isLoser={card.isLoser}
            isRevealed={revealedIndex === idx}
            isDisabled={revealedIndex !== null && revealedIndex !== idx}
            onClick={() => handleCardClick(idx)}
          />
        ))}
      </div>

      <div className="h-24 flex flex-col items-center justify-center gap-4">
        {revealedIndex === null ? (
          <p className="text-[#D4A24C]/50 font-cinzel text-[10px] uppercase tracking-[0.25em] animate-pulse">
            TOQUE EM UMA CARTA PARA REVELAR
          </p>
        ) : (
          <div className="flex flex-col md:flex-row gap-3 animate-in fade-in duration-500 slide-in-from-bottom-2">
            <Button
              onClick={shuffleCards}
              variant="outline"
              className="border-[#D4A24C]/50 bg-[#D4A24C]/10 text-[#F5D37A] hover:bg-[#D4A24C]/20 font-cinzel tracking-widest uppercase text-xs rounded-full px-7 py-5"
            >
              ✦ Jogar Novamente ✦
            </Button>
            
            {!cards[revealedIndex].isLoser && (
              <Link href="/roleta">
                <Button className="gold-gradient-border text-black font-cinzel font-bold tracking-widest uppercase text-xs aurora-btn-shadow rounded-full px-7 py-5">
                  Ir para a Roleta <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <footer className="mt-auto pt-8 text-[#D4A24C]/20 font-cinzel text-[10px] uppercase tracking-[0.3em] text-center w-full">
        Aurora Cartomante · Todos os direitos reservados
      </footer>
    </div>
  );
};
