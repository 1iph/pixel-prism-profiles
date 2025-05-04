
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import PlayerSearch from '@/components/PlayerSearch';
import PlayerProfile from '@/components/PlayerProfile';
import GameModeTabs from '@/components/GameModeTabs';
import Footer from '@/components/Footer';

const Index = () => {
  const { playerData } = usePlayerSearch();
  
  return (
    <div className="min-h-screen w-full pb-12 px-4">
      <div className="max-w-5xl mx-auto pt-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-hypixel-gradient bg-clip-text text-transparent animate-pulse-glow">
            Hypixel Stats
          </h1>
          <p className="mt-2 text-muted-foreground">
            View detailed Hypixel player statistics
          </p>
        </div>
        
        <PlayerSearch />
        
        {playerData && (
          <>
            <PlayerProfile />
            <GameModeTabs />
          </>
        )}
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
