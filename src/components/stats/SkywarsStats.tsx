
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import { formatNumber, calculateKDRatio, calculateWLRatio } from '@/utils/hypixelApi';

const SkywarsStats = () => {
  const { playerData } = usePlayerSearch();
  
  if (!playerData || !playerData.stats || !playerData.stats.SkyWars) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground">This player has no Skywars stats</p>
      </div>
    );
  }
  
  const sw = playerData.stats.SkyWars;
  
  // Calculate stats
  const wins = sw.wins || 0;
  const losses = sw.losses || 0;
  const kills = sw.kills || 0;
  const deaths = sw.deaths || 0;
  const coins = sw.coins || 0;
  const souls = sw.souls || 0;
  
  // Calculate ratios
  const kdr = calculateKDRatio(kills, deaths);
  const wlr = calculateWLRatio(wins, losses);
  
  return (
    <div className="animate-tab-fade space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-label">Level</div>
          <div className="stat-value">{sw.levelFormatted || '1'}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Wins</div>
          <div className="stat-value">{formatNumber(wins)}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">K/D Ratio</div>
          <div className="stat-value">{kdr}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Souls</div>
          <div className="stat-value">{formatNumber(souls)}</div>
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
              <div className="text-sm text-muted-foreground">Kills (Solo)</div>
              <div className="font-medium">{formatNumber(sw.kills_solo || 0)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Kills (Team)</div>
              <div className="font-medium">{formatNumber(sw.kills_team || 0)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Arrows Hit</div>
              <div className="font-medium">{formatNumber(sw.arrows_hit || 0)}</div>
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
              <div className="text-sm text-muted-foreground">Souls</div>
              <div className="font-medium">{formatNumber(souls)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkywarsStats;
