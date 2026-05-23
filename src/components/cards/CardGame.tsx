
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { TarotCard } from './TarotCard';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Sparkles, ArrowRight } from 'lucide-react';
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
  const [isResetting, setIsResetting] = useState(false);

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

  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      shuffleCards();
      setIsResetting(false);
    }, 300);
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 flex flex-col items-center max-w-5xl mx-auto z-10 relative">
      <header className="text-center space-y-4 mb-8 md:mb-12">
        <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] uppercase tracking-[0.4em] font-bold">
          ✦ Sorteios Místicos ✦
        </div>
        
        <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold font-black tracking-tighter text-glow-gold leading-tight">
          Aurora Cartomante
        </h1>
        
        <div className="space-y-2">
          <p className="text-gold/60 font-cinzel text-sm md:text-lg tracking-[0.2em] uppercase">
            — Escolha sua Carta —
          </p>
          <p className="text-cream/60 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            O destino aguarda. Escolha uma carta e descubra quantas rodadas na roleta você ganhou.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-[340px] md:max-w-[600px] mb-8">
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

      <div className="h-20 flex flex-col items-center justify-center gap-4">
        {revealedIndex === null ? (
          <p className="text-gold/40 text-[10px] md:text-xs uppercase tracking-[0.3em] animate-pulse">
            Toque em uma carta para revelar
          </p>
        ) : (
          <div className="flex flex-col md:flex-row gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10 font-cinzel tracking-widest uppercase text-xs"
            >
              <RefreshCcw className="w-4 h-4 mr-2" /> Jogar Novamente
            </Button>
            
            {!cards[revealedIndex].isLoser && (
              <Link href="/roleta">
                <Button className="gold-gradient-border text-obsidian font-cinzel font-bold tracking-widest uppercase text-xs aurora-btn-shadow">
                  Ir para a Roleta <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <footer className="mt-auto pt-8 text-gold/20 text-[10px] uppercase tracking-[0.3em] text-center border-t border-gold/10 w-full">
        Aurora Cartomante · Todos os direitos reservados
      </footer>
    </div>
  );
};
