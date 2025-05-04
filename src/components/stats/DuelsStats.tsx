
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import { formatNumber, calculateKDRatio, calculateWLRatio } from '@/utils/hypixelApi';

const DuelsStats = () => {
  const { playerData } = usePlayerSearch();
  
  if (!playerData || !playerData.stats || !playerData.stats.Duels) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground">This player has no Duels stats</p>
      </div>
    );
  }
  
  const duels = playerData.stats.Duels;
  
  // Calculate stats
  const wins = duels.wins || 0;
  const losses = duels.losses || 0;
  const kills = duels.kills || 0;
  const deaths = duels.deaths || 0;
  const bestWinstreak = duels.best_winstreak || 0;
  const currentWinstreak = duels.current_winstreak || 0;
  const coins = duels.coins || 0;
  
  // Calculate ratios
  const kdr = calculateKDRatio(kills, deaths);
  const wlr = calculateWLRatio(wins, losses);
  
  return (
    <div className="animate-tab-fade space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-label">Wins</div>
          <div className="stat-value">{formatNumber(wins)}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">W/L Ratio</div>
          <div className="stat-value">{wlr}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Current Streak</div>
          <div className="stat-value">{formatNumber(currentWinstreak)}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Best Streak</div>
          <div className="stat-value">{formatNumber(bestWinstreak)}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass p-6 space-y-4">
          <h3 className="text-lg font-semibold">Combat Stats</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Kills</div>
              <div className="font-medium">{formatNumber(kills)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Deaths</div>
              <div className="font-medium">{formatNumber(deaths)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">K/D Ratio</div>
              <div className="font-medium">{kdr}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Melee Hits</div>
              <div className="font-medium">{formatNumber(duels.melee_hits || 0)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Melee Swings</div>
              <div className="font-medium">{formatNumber(duels.melee_swings || 0)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Bow Hits</div>
              <div className="font-medium">{formatNumber(duels.bow_hits || 0)}</div>
            </div>
          </div>
        </div>
        
        <div className="glass p-6 space-y-4">
          <h3 className="text-lg font-semibold">Game Stats</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Games Played</div>
              <div className="font-medium">{formatNumber((wins || 0) + (losses || 0))}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Wins</div>
              <div className="font-medium">{formatNumber(wins)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Losses</div>
              <div className="font-medium">{formatNumber(losses)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">W/L Ratio</div>
              <div className="font-medium">{wlr}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Coins</div>
              <div className="font-medium">{formatNumber(coins)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Blocks Placed</div>
              <div className="font-medium">{formatNumber(duels.blocks_placed || 0)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuelsStats;
