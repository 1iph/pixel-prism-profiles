
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import { calculateNetworkLevel, getPlayerRank } from '@/utils/hypixelApi';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PlayerProfile = () => {
  const { playerData, clearPlayerData } = usePlayerSearch();
  
  if (!playerData) return null;
  
  // Calculate network level
  const networkLevel = calculateNetworkLevel(playerData.networkExp);
  
  // Get player rank
  const rank = getPlayerRank(playerData);
  
  return (
    <div className="glass p-6 w-full max-w-3xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* 3D Skin Render */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <img
            src={`https://crafatar.com/renders/body/${playerData.uuid}?overlay=true&scale=4`}
            alt={`${playerData.displayname}'s skin`}
            className="w-full h-full object-contain drop-shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
        </div>
        
        {/* Player Info */}
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold">{playerData.displayname}</h1>
            <span className={`px-2 py-0.5 rounded text-sm font-semibold ${rank.color}`}>
              {rank.name}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="text-sm">Network Level</div>
              <div className="text-xl font-bold bg-hypixel-gradient bg-clip-text text-transparent">
                {networkLevel}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Karma</div>
                <div className="font-semibold">{playerData.karma?.toLocaleString() || '0'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Achievement Points</div>
                <div className="font-semibold">{playerData.achievementPoints?.toLocaleString() || '0'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center sm:justify-start">
        <Button
          variant="outline"
          size="sm"
          onClick={clearPlayerData}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Search Another Player
        </Button>
      </div>
    </div>
  );
};

export default PlayerProfile;
