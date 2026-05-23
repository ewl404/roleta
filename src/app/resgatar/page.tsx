'use client';

import React, { useState, useEffect } from 'react';
import { Cinzel, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Lock, CreditCard, CheckCircle2, AlertCircle, UserPlus, Wallet2, MessageSquare } from 'lucide-react';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

type FlowStep = 'form' | 'processing' | 'blocked' | 'steps';

const PROCESSING_STEPS = [
  "Inicializando conexão segura SSL/TLS...",
  "Conectando ao servidor do Banco Central...",
  "Autenticando credenciais do sistema PIX...",
  "Verificando titularidade da chave PIX...",
  "Aguardando resposta da instituição bancária...",
  "Processando solicitação de transferência R$ 1.000,00...",
  "Consultando limite diário de transferência...",
  "Sincronizando com o sistema bancário...",
  "Aguardando confirmação do banco destino...",
  "Finalizando operação..."
];

export default function ResgatarPage() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [pix, setPix] = useState('');
  const [flowStep, setFlowStep] = useState<FlowStep>('form');
  const [currentProcessStep, setCurrentProcessStep] = useState(0);
  const [progress, setProgress] = useState(0);

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
    setFlowStep('processing');
  };

  useEffect(() => {
    if (flowStep === 'processing') {
      const stepInterval = setInterval(() => {
        setCurrentProcessStep(prev => {
          if (prev < PROCESSING_STEPS.length - 1) return prev + 1;
          clearInterval(stepInterval);
          return prev;
        });
      }, 450);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 100) return prev + 1;
          clearInterval(progressInterval);
          return prev;
        });
      }, 45);

      const timeout = setTimeout(() => {
        setFlowStep('blocked');
      }, 5000);

      return () => {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }
  }, [flowStep]);

  return (
    <main className={cn(
      "relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-x-hidden selection:bg-[#D4A24C]/30 selection:text-[#1A0205]",
      cinzel.variable,
      inter.variable
    )}>
      <div 
        className="fixed inset-0 z-0" 
        style={{
          background: 'radial-gradient(circle at center, #2E0810 0%, #1A0205 100%)'
        }}
      />
      
      <div 
        className="fixed inset-0 z-1 pointer-events-none opacity-30" 
        style={{
          background: 'radial-gradient(circle at 50% 30%, #D4A24C 0%, transparent 70%)'
        }}
      />

      {flowStep === 'form' && (
        <div className="relative z-10 w-full max-w-[320px] flex flex-col items-center animate-in fade-in duration-700">
          <header className="text-center mb-6 max-w-[290px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A24C]/45 bg-[#FEFAF4]/60 text-[#7A5010] backdrop-blur-md mb-4">
              <span className="w-1 h-1 rounded-full bg-[#C49A28] animate-pulse" />
              <span className="font-cinzel text-[9px] tracking-[0.3em] uppercase font-bold">Mapa da Sorte</span>
              <span className="w-1 h-1 rounded-full bg-[#C49A28] animate-pulse [animation-delay:1s]" />
            </div>
            
            <h1 className="font-cinzel text-2xl font-black text-[#F5E6C8] tracking-tight mb-0.5 drop-shadow-[0_2px_12px_rgba(255,245,230,0.4)]">
              Resgatar Prêmio
            </h1>
            <div className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-[#D4A24C] mb-2">
              — R$ 1.000,00 —
            </div>
            <p className="font-inter text-[12px] leading-relaxed text-[#F5E6C8]/90">
              Preencha seus dados para receber via <strong className="text-[#F5D37A]">PIX</strong>.
            </p>
          </header>

          <div className="w-full bg-[#FEFAF4] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_30px_rgba(212,162,76,0.1)] border border-[#D4A24C]/20 overflow-hidden animate-in slide-in-from-bottom-7 duration-500">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#F5D37A] via-[#D4A24C] to-[#8B5E1F]" />
            
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3.5">
              <div className="space-y-1.5">
                <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Nome completo</label>
                <input 
                  type="text" 
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); checkFields(); }}
                  className="w-full h-11 rounded-xl px-4 text-[13px] bg-white border-1.5 border-[#E8D5A8] text-[#2A1205] font-medium focus:border-[#D4A24C] focus:ring-4 focus:ring-[#D4A24C]/10 outline-none transition-all placeholder:text-[#2A1205]/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Telefone</label>
                <input 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => { handleTelefoneChange(e); checkFields(); }}
                  className="w-full h-11 rounded-xl px-4 text-[13px] bg-white border-1.5 border-[#E8D5A8] text-[#2A1205] font-medium focus:border-[#D4A24C] focus:ring-4 focus:ring-[#D4A24C]/10 outline-none transition-all placeholder:text-[#2A1205]/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#7A5010]">Chave PIX</label>
                <input 
                  type="text" 
                  placeholder="CPF, e-mail ou aleatória"
                  value={pix}
                  onChange={(e) => { setPix(e.target.value); checkFields(); }}
                  className="w-full h-11 rounded-xl px-4 text-[13px] bg-white border-1.5 border-[#E8D5A8] text-[#2A1205] font-medium focus:border-[#D4A24C] focus:ring-4 focus:ring-[#D4A24C]/10 outline-none transition-all placeholder:text-[#2A1205]/40"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl p-3.5 bg-gradient-to-br from-[#F5D37A] to-[#D4A24C] border-1.5 border-[#B8860B] mt-1.5 shadow-inner">
                <div>
                  <div className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold text-[#4A2E0A]">Valor a receber</div>
                  <div className="font-cinzel text-xl font-black text-[#1A0A05]">R$ 1.000,00</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1A0A05] flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#F5D37A" strokeWidth="2.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <button 
                type="submit"
                id="btnSubmit"
                disabled={!isFormValid}
                className={cn(
                  "w-full h-13 rounded-xl mt-2 font-cinzel text-[13px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95",
                  isFormValid 
                    ? "bg-gradient-to-r from-[#D4A24C] to-[#8B5E1F] text-[#FFF8EC] hover:scale-[1.01] shadow-[#D4A24C]/30"
                    : "bg-[#D0B882] text-[#FFF8EC]/60 cursor-not-allowed opacity-60"
                )}
              >
                Receber PIX · R$ 1.000,00
              </button>
            </form>
          </div>

          <div className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#D4A24C]/20 bg-[#1A0205]/40 text-[#D4A24C] backdrop-blur-md text-[10px] font-medium">
            <Lock className="w-3.5 h-3.5" />
            Transferência segura via PIX · Banco Central do Brasil
          </div>
        </div>
      )}

      {flowStep === 'processing' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="w-full max-w-[340px] bg-[#FEFAF4] rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-90 duration-500">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#F5D37A] via-[#D4A24C] to-[#8B5E1F]" />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="24" cy="24" r="22" 
                      fill="none" 
                      stroke="#E8D5A8" 
                      strokeWidth="3"
                    />
                    <circle 
                      cx="24" cy="24" r="22" 
                      fill="none" 
                      stroke="#C49A28" 
                      strokeWidth="3" 
                      strokeDasharray={2 * Math.PI * 22}
                      strokeDashoffset={2 * Math.PI * 22 * (1 - progress / 100)}
                      className="transition-all duration-100 ease-linear"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#C49A28]" />
                  </div>
                </div>
                <div>
                  <h2 className="font-cinzel text-[14px] font-black text-[#2A1205] uppercase tracking-wide">Processando Transferência</h2>
                  <p className="text-[#8B5E1F] text-[11px] font-medium">Por favor, aguarde...</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {PROCESSING_STEPS.map((step, idx) => (
                  <div key={idx} className={cn(
                    "flex items-center gap-3 transition-all duration-500",
                    idx > currentProcessStep ? "opacity-30" : "opacity-100"
                  )}>
                    <div className="flex-shrink-0">
                      {idx < currentProcessStep ? (
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                      ) : idx === currentProcessStep ? (
                        <div className="w-4 h-4 rounded-full border-2 border-[#C49A28] border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-[#E8D5A8]" />
                      )}
                    </div>
                    <span className={cn(
                      "text-[12px] font-medium leading-tight",
                      idx === currentProcessStep ? "text-[#2A1205]" : "text-[#8B5E1F]"
                    )}>{step}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold text-[#8B5E1F]">Progresso</span>
                  <span className="font-cinzel text-[13px] font-black text-[#C49A28]">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-[#E8D5A8] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#F5D37A] to-[#D4A24C] transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="text-center text-[10px] text-[#8B5E1F]/60 mt-6 font-medium">Não feche nem atualize esta página</p>
            </div>
          </div>
        </div>
      )}

      {flowStep === 'blocked' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-700">
          <div className="w-full max-w-[320px] bg-[#FEFAF4] rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
            <div className="h-2 w-full bg-[#D32F2F]" />
            <div className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[#D32F2F]/10 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-[#D32F2F]" />
              </div>
              
              <h2 className="font-cinzel text-xl font-black text-[#2A1205] uppercase tracking-tight mb-3">Transferência Bloqueada</h2>
              
              <p className="text-[13px] text-[#2A1205]/80 leading-relaxed mb-8">
                Identificamos uma restrição de segurança. Para liberar o seu prêmio de <strong className="text-[#2A1205]">R$ 1.000,00</strong>, é necessário realizar a validação da conta.
              </p>

              <div className="bg-[#FFF8EC] border border-[#E8D5A8] rounded-2xl p-4 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C49A28] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-white">!</span>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-[10px] font-bold text-[#8B5E1F] uppercase tracking-wide mb-1">Motivo do Bloqueio</h4>
                    <p className="text-[11px] text-[#4A2E0A] font-medium">Verificação de identidade e proteção contra fraudes.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setFlowStep('steps')}
                className="w-full h-14 rounded-full bg-[#D32F2F] text-white font-cinzel text-[13px] font-bold uppercase tracking-[0.15em] shadow-[0_8px_25px_rgba(211,47,47,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Liberar Prêmio Agora
              </button>
              
              <p className="mt-6 text-[10px] text-[#8B5E1F]/60 font-medium tracking-wide">Protocolo de Segurança: #AUR-2024-9981</p>
            </div>
          </div>
        </div>
      )}

      {flowStep === 'steps' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-700">
          <div className="w-full max-w-[340px] bg-[#FEFAF4] rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.7)] overflow-hidden animate-in zoom-in-95 duration-700">
            <div className="h-2 w-full bg-gradient-to-r from-[#F5D37A] via-[#D4A24C] to-[#8B5E1F]" />
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A24C]/30 bg-[#FFF8EC] text-[#8B5E1F] mb-4">
                  <Lock className="w-3 h-3" />
                  <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold">Protocolo de Liberação</span>
                </div>
                <h2 className="font-cinzel text-xl font-black text-[#2A1205] uppercase tracking-tight">Como Liberar seu Prêmio</h2>
              </div>

              <div className="space-y-6 mb-10">
                {/* Passo 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF8EC] border-2 border-[#D4A24C] flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-[#C49A28]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-[10px] font-bold text-[#8B5E1F] uppercase tracking-wide">1º Passo</h4>
                    <p className="text-[12px] text-[#2A1205]/90 leading-relaxed">
                      Para confirmar que você é uma pessoa real, precisamos que <strong className="text-[#2A1205]">cadastre-se na casa</strong> e verifique sua conta.
                    </p>
                  </div>
                </div>

                {/* Passo 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF8EC] border-2 border-[#D4A24C] flex items-center justify-center">
                    <Wallet2 className="w-5 h-5 text-[#C49A28]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-[10px] font-bold text-[#8B5E1F] uppercase tracking-wide">2º Passo Essencial</h4>
                    <p className="text-[12px] text-[#2A1205]/90 leading-relaxed">
                      Realizar um depósito de <strong className="text-[#2A1205]">R$ 50 reais</strong> na casa para ativação do bônus.
                    </p>
                  </div>
                </div>

                {/* Passo 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF8EC] border-2 border-[#D4A24C] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#C49A28]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-[10px] font-bold text-[#8B5E1F] uppercase tracking-wide">3º Passo</h4>
                    <p className="text-[12px] text-[#2A1205]/90 leading-relaxed">
                      Você irá receber um <strong className="text-[#2A1205]">SMS</strong> da nossa equipe para resgatar o prêmio em até <strong className="text-[#2A1205]">48hs</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = 'https://go.aff.bet.bet/149p78og?utm_campaign=story1'}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#D4A24C] to-[#8B5E1F] text-[#FFF8EC] font-cinzel text-[13px] font-bold uppercase tracking-[0.15em] shadow-[0_8px_25px_rgba(212,162,76,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Começar Verificação
                <CheckCircle2 className="w-5 h-5" />
              </button>
              
              <p className="text-center text-[10px] text-[#8B5E1F]/60 mt-6 font-medium">Siga os passos acima para garantir o recebimento</p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-10 text-[10px] tracking-[0.25em] uppercase text-[#F5E6C8]/40 text-center">
        Todos os direitos reservados
      </footer>

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
