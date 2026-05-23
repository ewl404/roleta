"use client";

import React from 'react';
import { SpinResult } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Trophy } from 'lucide-react';

interface HistoryProps {
  history: SpinResult[];
}

export const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="flex flex-col h-full rounded-xl bg-card border border-gold/20 metallic-shadow p-6 overflow-hidden">
      <h3 className="font-headline text-xl gold-text font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5" /> Histórico
      </h3>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 text-cream/20 italic">Aguardando o primeiro giro...</div>
          ) : (
            history.map((result, index) => (
              <div 
                key={result.id} 
                className="relative pl-6 pb-4 border-l border-gold/20 last:pb-0"
              >
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                <div className="flex flex-col">
                  <span className="text-cream font-bold text-lg">{result.label}</span>
                  <span className="text-gold/50 text-xs">
                    {format(result.timestamp, 'HH:mm:ss')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
