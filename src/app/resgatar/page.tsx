
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
      "relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-x-hidden selection:bg-[#D4A24C]/30 selection:text-[#1A0205]",
      cinzel.variable,
      inter.variable
    )}>
      {/* Background - Deep Mystical Gradient */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          background: 'radial-gradient(circle at center, #2E0810 0%, #1A0205 100%)'
        }}
      />
      
      {/* Decorative center glow */}
      <div 
        className="fixed inset-0 z-1 pointer-events-none opacity-30" 
        style={{
          background: 'radial-gradient(circle at 50% 30%, #D4A24C 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 w-full max-w-[320px] flex flex-col items-center animate-in fade-in duration-700">
        
        {/* Header */}
        <header className="text-center mb-6 max-w-[290px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A24C]/45 bg-[#1A0205]/60 text-[#F5D37A] backdrop-blur-md mb-4">
            <span className="w-1 h-1 rounded-full bg-[#F5D37A] animate-pulse" />
            <span className="font-cinzel text-[9px] tracking-[0.3em] uppercase font-bold">Aurora Cartomante</span>
            <span className="w-1 h-1 rounded-full bg-[#F5D37A] animate-pulse [animation-delay:1s]" />
          </div>
          
          <h1 className="font-cinzel text-2xl font-black text-[#F5D37A] tracking-tight mb-0.5 drop-shadow-[0_0_15px_rgba(245,211,122,0.4)]">
            Resgatar Prêmio
          </h1>
          <div className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-[#D4A24C] mb-2">
            — R$ 1.000,00 —
          </div>
          <p className="font-inter text-[12px] leading-relaxed text-[#F5E6C8]/80">
            Preencha seus dados para receber via <strong className="text-[#F5D37A]">PIX</strong>.
          </p>
        </header>

        {/* Card do Formulário */}
        <div className="w-full bg-[#FEFAF4] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_30px_rgba(212,162,76,0.1)] border border-[#D4A24C]/20 overflow-hidden animate-in slide-in-from-bottom-7 duration-500">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F5D37A] via-[#D4A24C] to-[#8B5E1F]" />
          
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3.5">
            <div className="space-y-1.5">
              <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Nome completo</label>
              <input 
                type="text" 
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onInput={() => isSuccess && setIsSuccess(false)}
                className="w-full h-11 rounded-xl px-4 text-[13px] bg-white border-1.5 border-[#E8D5A8] text-[#2A1205] focus:border-[#D4A24C] focus:ring-4 focus:ring-[#D4A24C]/10 outline-none transition-all placeholder:text-[#2A1205]/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Telefone</label>
              <input 
                type="tel" 
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={handleTelefoneChange}
                onInput={() => isSuccess && setIsSuccess(false)}
                className="w-full h-11 rounded-xl px-4 text-[13px] bg-white border-1.5 border-[#E8D5A8] text-[#2A1205] focus:border-[#D4A24C] focus:ring-4 focus:ring-[#D4A24C]/10 outline-none transition-all placeholder:text-[#2A1205]/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Chave PIX</label>
              <input 
                type="text" 
                placeholder="CPF, e-mail ou aleatória"
                value={pix}
                onChange={(e) => setPix(e.target.value)}
                onInput={() => isSuccess && setIsSuccess(false)}
                className="w-full h-11 rounded-xl px-4 text-[13px] bg-white border-1.5 border-[#E8D5A8] text-[#2A1205] focus:border-[#D4A24C] focus:ring-4 focus:ring-[#D4A24C]/10 outline-none transition-all placeholder:text-[#2A1205]/30"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl p-3.5 bg-gradient-to-br from-[#FFF8EC] to-[#FFF3DC] border-1.5 border-[#E8C86A] mt-1.5">
              <div>
                <div className="font-cinzel text-[9px] tracking-[0.25em] uppercase text-[#8B5E1F]">Valor a receber</div>
                <div className="font-cinzel text-xl font-black text-[#2A1205]">R$ 1.000,00</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5D37A] to-[#D4A24C] flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2A1205" strokeWidth="2.5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <button 
              type="submit"
              disabled={!isFormValid || isSubmitting || isSuccess}
              className={cn(
                "w-full h-13 rounded-xl mt-2 font-cinzel text-[13px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95",
                isSuccess 
                  ? "bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white cursor-default"
                  : isFormValid 
                    ? "bg-gradient-to-r from-[#D4A24C] to-[#8B5E1F] text-[#FFF8EC] hover:scale-[1.01] shadow-[#D4A24C]/30"
                    : "bg-[#D0B882] text-[#FFF8EC]/60 cursor-not-allowed opacity-60"
              )}
            >
              {isSubmitting ? 'Processando...' : isSuccess ? '✓ Solicitação enviada!' : 'Receber PIX · R$ 1.000,00'}
            </button>
          </form>
        </div>

        {/* Segurança */}
        <div className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#D4A24C]/20 bg-[#1A0205]/40 text-[#D4A24C] backdrop-blur-md text-[10px] font-medium">
          <Lock className="w-3.5 h-3.5" />
          Transferência segura via PIX · Banco Central do Brasil
        </div>

        <footer className="mt-10 text-[10px] tracking-[0.25em] uppercase text-[#F5E6C8]/30 text-center">
          Todos os direitos reservados
        </footer>
      </div>

      <style jsx global>{`
        .border-1.5 {
          border-width: 1.5px;
        }
        .h-13 {
          height: 3.25rem;
        }
      `}</style>
    </main>
  );
}
