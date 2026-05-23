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
  const [showPopup, setShowPopup] = useState(false);

  const shuffleCards = useCallback(() => {
    const shuffled = [...INITIAL_RESULTS]
      .sort(() => Math.random() - 0.5)
      .map((res, idx) => ({ ...res, id: idx }));
    setCards(shuffled);
    setRevealedIndex(null);
    setShowPopup(false);
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  const handleCardClick = (index: number) => {
    if (revealedIndex !== null) return;
    setRevealedIndex(index);

    // Se for uma carta vencedora, mostra o popup após a animação de flip (750ms)
    if (!cards[index].isLoser) {
      setTimeout(() => {
        setShowPopup(true);
      }, 750);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 flex flex-col items-center max-w-5xl mx-auto">
      <header className="text-center space-y-4 mb-8 md:mb-12">
        <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-[#D4A24C]/30 bg-[#D4A24C]/5 text-[#D4A24C] text-[10px] uppercase tracking-[0.4em] font-bold backdrop-blur-sm">
          ✦ Mapa da Sorte ✦
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

      <div className="relative w-full max-w-[320px] md:max-w-[400px] mb-8">
        {/* Leve sombra dourada de fundo */}
        <div className="absolute inset-0 bg-[#D4A24C]/10 blur-[80px] rounded-full scale-125 -z-10 pointer-events-none" />
        
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full relative z-10">
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
            
            {/* Se for ganhador e o popup estiver fechado, mostra o botão para ir à roleta */}
            {!cards[revealedIndex].isLoser && !showPopup && (
              <Link href="/roleta">
                <Button className="gold-gradient-border text-black font-cinzel font-bold tracking-widest uppercase text-xs aurora-btn-shadow rounded-full px-7 py-5">
                  Ir para a Roleta <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* RESULT POPUP MODAL */}
      {showPopup && revealedIndex !== null && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-[4px] animate-in fade-in duration-300">
          <div className="relative w-full max-w-[340px] bg-[radial-gradient(ellipse_at_50%_30%,_#3B0F1A_0%,_#0D0103_100%)] border border-[#D4A24C]/60 rounded-[20px] p-8 md:p-9 text-center shadow-[0_0_60px_rgba(212,175,55,0.25),_0_0_120px_rgba(212,175,55,0.1),_inset_0_0_40px_rgba(212,175,55,0.05)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            {/* Brilho dourado nas bordas */}
            <div className="absolute inset-0 rounded-[20px] shadow-[0_0_0_1px_rgba(212,175,55,0.3),_0_0_30px_rgba(212,175,55,0.2)] pointer-events-none" />
            
            {/* Badge Topo */}
            <div className="inline-block px-4 py-1.5 border border-[#D4A24C]/45 rounded-full bg-[#D4A24C]/7 text-[#D4A24C] font-cinzel text-[9px] tracking-[0.35em] uppercase mb-4 md:mb-5">
              • MAPA DA SORTE •
            </div>
            
            {/* Estrelas */}
            <div className="text-[#D4A24C] text-[18px] tracking-[10px] mb-2 md:mb-3">
              ★ ★ ★
            </div>
            
            {/* Título */}
            <p className="font-cinzel text-[11px] tracking-[0.3em] text-[#D4A24C] mb-1.5 uppercase">
              AS CARTAS REVELARAM...
            </p>
            
            {/* Número Grande */}
            <div className="font-cinzel text-[80px] md:text-[96px] font-black text-[#F5D37A] leading-none mb-0 drop-shadow-[0_0_40px_rgba(245,211,122,0.5)]">
              {cards[revealedIndex].value}
            </div>
            
            {/* Label Rodada */}
            <div className="font-cinzel text-[16px] md:text-[18px] font-semibold tracking-[0.35em] text-[#D4A24C] mb-0.5 uppercase">
              {cards[revealedIndex].label}
            </div>
            
            {/* Sublabel */}
            <div className="font-cinzel text-[10px] tracking-[0.4em] text-[#D4A24C]/60 mb-5 uppercase">
              NA ROLETA
            </div>
            
            {/* Divisória */}
            <hr className="w-[60%] mx-auto border-t border-[#D4A24C]/25 mb-5" />
            
            {/* Texto Descritivo */}
            <p className="text-[#F5E6C8]/85 text-[13px] leading-relaxed mb-7 px-2">
              Gire a roleta e descubra seu prêmio.
            </p>
            
            {/* Botão CTA */}
            <Link href="/roleta" className="w-full block">
              <Button className="w-full h-14 rounded-full bg-gradient-to-r from-[#C9922A] via-[#F5D37A] to-[#C9922A] text-[#1A0205] font-cinzel font-bold text-[13px] tracking-[0.2em] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:opacity-90 active:scale-[1.02] transition-all uppercase">
                GIRAR A ROLETA →
              </Button>
            </Link>
          </div>
        </div>
      )}

      <footer className="mt-auto pt-8 text-[#D4A24C]/20 font-cinzel text-[10px] uppercase tracking-[0.3em] text-center w-full">
        Aurora Cartomante · Todos os direitos reservados
      </footer>
    </div>
  );
};