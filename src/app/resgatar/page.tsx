
'use client';

import React, { useState, useEffect } from 'react';
import { Cinzel, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function ResgatarPage() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [pix, setPix] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 11);
    if (v.length >= 7) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length >= 3) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    setTelefone(v);
  };

  const isFormValid = nome.trim() !== '' && telefone.length >= 14 && pix.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <main className={cn(
      "relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-x-hidden selection:bg-[#D4A24C]/30 selection:text-[#2A1205]",
      cinzel.variable,
      inter.variable
    )}>
      {/* Background with Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-absolute"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=1200&q=80')`,
          backgroundAttachment: 'fixed'
        }}
      />
      <div 
        className="fixed inset-0 z-1" 
        style={{
          background: 'linear-gradient(180deg, rgba(255,245,230,0.55) 0%, rgba(245,230,210,0.45) 40%, rgba(240,220,200,0.55) 70%, rgba(230,210,185,0.65) 100%)'
        }}
      />

      <div className="relative z-10 w-full max-w-[290px] flex flex-col items-center animate-in fade-in duration-700">
        
        {/* Header */}
        <header className="text-center mb-4 max-w-[290px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B48C3C]/45 bg-white/70 text-[#7A5010] backdrop-blur-md mb-4">
            <span className="w-1 h-1 rounded-full bg-[#C49A28] animate-pulse" />
            <span className="font-cinzel text-[9px] tracking-[0.3em] uppercase font-bold">Aurora Cartomante</span>
            <span className="w-1 h-1 rounded-full bg-[#C49A28] animate-pulse [animation-delay:1s]" />
          </div>
          
          <h1 className="font-cinzel text-xl font-black text-[#2A1205] tracking-tight mb-0.5 drop-shadow-[0_2px_12px_rgba(255,245,230,0.8)]">
            Resgatar Prêmio
          </h1>
          <div className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-[#8B5E1F] mb-2">
            — R$ 1.000,00 —
          </div>
          <p className="font-inter text-[12px] leading-relaxed text-[#4A2E0A]/85">
            Preencha seus dados para receber via <strong className="text-[#C49A28]">PIX</strong>.
          </p>
        </header>

        {/* Card do Formulário */}
        <div className="w-full bg-[#FFF2F8]/96 rounded-2xl shadow-[0_16px_48px_rgba(100,60,10,0.18),_0_4px_16px_rgba(100,60,10,0.1)] border border-[#C49A28]/20 overflow-hidden animate-in slide-in-from-bottom-7 duration-500">
          <div className="h-1 w-full bg-gradient-to-r from-[#F5D37A] via-[#C49A28] to-[#8B5E1F]" />
          
          <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2.5">
            <div className="space-y-1">
              <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Nome completo</label>
              <input 
                type="text" 
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full h-10 rounded-xl px-3 text-[12px] bg-[#FEFAF4] border-1.5 border-[#E8D5A8] text-[#2A1205] focus:border-[#C49A28] focus:ring-3 focus:ring-[#C49A28]/15 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Telefone</label>
              <input 
                type="tel" 
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={handleTelefoneChange}
                className="w-full h-10 rounded-xl px-3 text-[12px] bg-[#FEFAF4] border-1.5 border-[#E8D5A8] text-[#2A1205] focus:border-[#C49A28] focus:ring-3 focus:ring-[#C49A28]/15 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Chave PIX</label>
              <input 
                type="text" 
                placeholder="CPF, e-mail ou aleatória"
                value={pix}
                onChange={(e) => setPix(e.target.value)}
                className="w-full h-10 rounded-xl px-3 text-[12px] bg-[#FEFAF4] border-1.5 border-[#E8D5A8] text-[#2A1205] focus:border-[#C49A28] focus:ring-3 focus:ring-[#C49A28]/15 outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl p-3 bg-gradient-to-br from-[#FFF8EC] to-[#FFF3DC] border-1.5 border-[#E8C86A] mt-1">
              <div>
                <div className="font-cinzel text-[9px] tracking-[0.25em] uppercase text-[#8B5E1F]">Valor a receber</div>
                <div className="font-cinzel text-xl font-black text-[#2A1205]">R$ 1.000,00</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5D37A] to-[#C49A28] flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2A1205" strokeWidth="2.5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <button 
              type="submit"
              disabled={!isFormValid || isSubmitting || isSuccess}
              className={cn(
                "w-full h-12 rounded-xl mt-2 font-cinzel text-[12px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95",
                isSuccess 
                  ? "bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white cursor-default"
                  : isFormValid 
                    ? "bg-gradient-to-r from-[#C49A28] to-[#8B5E1F] text-[#FFF8EC] hover:scale-[1.02] shadow-[#C49A28]/40"
                    : "bg-[#D0B882] text-[#FFF8EC]/60 cursor-not-allowed opacity-60"
              )}
            >
              {isSubmitting ? 'Processando...' : isSuccess ? '✓ Solicitação enviada!' : 'Receber PIX · R$ 1.000,00'}
            </button>
          </form>
        </div>

        {/* Segurança */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C49A28]/20 bg-white/65 text-[#7A5010] backdrop-blur-md text-[10px] font-medium">
          <Lock className="w-3.5 h-3.5" />
          Transferência segura via PIX · Banco Central do Brasil
        </div>

        <footer className="mt-8 text-[10px] tracking-[0.2em] uppercase text-[#643C0A]/45 text-center">
          Todos os direitos reservados
        </footer>
      </div>

      <style jsx global>{`
        body {
          background-color: #1A0205;
        }
        .border-1.5 {
          border-width: 1.5px;
        }
      `}</style>
    </main>
  );
}
