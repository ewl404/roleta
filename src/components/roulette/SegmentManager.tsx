"use client";

import React, { useState } from 'react';
import { WheelSegment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Wand2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { suggestWheelEntries } from '@/ai/flows/suggest-wheel-entries';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SegmentManagerProps {
  segments: WheelSegment[];
  setSegments: (segments: WheelSegment[]) => void;
}

export const SegmentManager: React.FC<SegmentManagerProps> = ({ segments, setSegments }) => {
  const [newLabel, setNewLabel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const addSegment = (label: string) => {
    if (!label.trim()) return;
    const newSegment: WheelSegment = {
      id: Math.random().toString(36).substr(2, 9),
      label,
      weight: 1,
    };
    setSegments([...segments, newSegment]);
    setNewLabel('');
  };

  const removeSegment = (id: string) => {
    setSegments(segments.filter(s => s.id !== id));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const result = await suggestWheelEntries({ userPrompt: prompt });
      const newSegments = result.suggestions.map(s => ({
        id: Math.random().toString(36).substr(2, 9),
        label: s,
        weight: 1,
      }));
      setSegments([...segments, ...newSegments]);
      setPrompt('');
      toast({ title: "Sugestões adicionadas!", description: `${newSegments.length} novas entradas foram criadas.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Erro na IA", description: "Não foi possível gerar sugestões agora." });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl bg-card border border-gold/20 metallic-shadow">
      <div className="space-y-4">
        <h3 className="font-headline text-xl gold-text font-bold">Gerenciar Segmentos</h3>
        
        <div className="flex gap-2">
          <Input 
            placeholder="Nome do segmento..." 
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSegment(newLabel)}
            className="bg-obsidian border-gold/30 focus-visible:ring-gold text-cream"
          />
          <Button onClick={() => addSegment(newLabel)} variant="secondary" className="bg-gold hover:bg-gold-dark text-obsidian font-bold">
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>

        <div className="space-y-2 border-t border-gold/20 pt-4">
          <Label className="text-cream/70 text-sm">Gerar com IA</Label>
          <div className="flex gap-2">
            <Input 
              placeholder="Ex: Destinos de viagem, Refeições..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-obsidian border-gold/30 text-cream"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-obsidian"
            >
              <Wand2 className={cn("w-4 h-4 mr-2", isGenerating && "animate-spin")} />
              {isGenerating ? "Gerando..." : "Sugerir"}
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[250px] pr-4">
        <div className="space-y-2">
          {segments.map((segment, index) => (
            <div 
              key={segment.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-obsidian border border-gold/10 group hover:border-gold/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color || (index % 2 === 0 ? '#4A0404' : '#1A0F0D') }} />
                <span className="font-medium text-cream">{segment.label}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removeSegment(segment.id)}
                className="text-destructive opacity-50 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {segments.length === 0 && (
            <div className="text-center py-8 text-cream/30 italic">Nenhum segmento adicionado</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
