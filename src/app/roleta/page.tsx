
import { RouletteGame } from "@/components/roulette/RouletteGame";

export default function RoletaPage() {
  return (
    <main className="relative overflow-hidden min-h-screen">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-overlay">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-burgundy rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/10 rounded-full blur-[120px]" />
      </div>
      
      <RouletteGame />
    </main>
  );
}
