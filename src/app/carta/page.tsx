
import { CardGame } from "@/components/cards/CardGame";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function CartaPage() {
  const bg = PlaceHolderImages.find(img => img.id === 'mystical-bg');

  return (
    <main className="relative min-h-screen bg-[#080102] text-[#F5E6C8] overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        {bg && (
          <Image
            src={bg.imageUrl}
            alt="Mystical Background"
            fill
            className="object-cover object-top opacity-50"
            data-ai-hint={bg.imageHint}
          />
        )}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(180deg, rgba(8,1,2,0.72) 0%, rgba(20,2,4,0.5) 40%, rgba(20,2,4,0.55) 70%, rgba(8,1,2,0.85) 100%)'
          }}
        />
      </div>
      
      <div className="relative z-10">
        <CardGame />
      </div>
    </main>
  );
}
