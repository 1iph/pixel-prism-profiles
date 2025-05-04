
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import { formatNumber, calculateKDRatio, calculateWLRatio } from '@/utils/hypixelApi';

const MurderMysteryStats = () => {
  const { playerData } = usePlayerSearch();
  
  if (!playerData || !playerData.stats || !playerData.stats.MurderMystery) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground">This player has no Murder Mystery stats</p>
      </div>
    );
  }
  
  const mm = playerData.stats.MurderMystery;
  
  // Calculate stats
  const wins = mm.wins || 0;
  const games = mm.games || 0;
  const kills = mm.kills || 0;
  const deaths = mm.deaths || 0;
  const coinPickups = mm.coins_picked_up || 0;
  const murderKills = mm.murderer_kills || 0;
  const detectiveKills = mm.detective_wins || 0;
  
  // Calculate ratios
  const kdr = calculateKDRatio(kills, deaths);
  const wlr = calculateWLRatio(wins, games - wins);
  
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
          <div className="stat-label">Murderer Kills</div>
          <div className="stat-value">{formatNumber(murderKills)}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Detective Wins</div>
          <div className="stat-value">{formatNumber(detectiveKills)}</div>
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
              <div className="text-sm text-muted-foreground">Murderer Kills</div>
              <div className="font-medium">{formatNumber(murderKills)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Knife Kills</div>
              <div className="font-medium">{formatNumber(mm.knife_kills || 0)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Bow Kills</div>
              <div className="font-medium">{formatNumber(mm.bow_kills || 0)}</div>
            </div>
          </div>
        </div>
        
        <div className="glass p-6 space-y-4">
          <h3 className="text-lg font-semibold">Game Stats</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Games Played</div>
              <div className="font-medium">{formatNumber(games)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Wins</div>
              <div className="font-medium">{formatNumber(wins)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Detective Wins</div>
              <div className="font-medium">{formatNumber(detectiveKills)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Innocents Killed</div>
              <div className="font-medium">{formatNumber(mm.kills_as_murderer || 0)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Coins Picked Up</div>
              <div className="font-medium">{formatNumber(coinPickups)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Coins</div>
              <div className="font-medium">{formatNumber(mm.coins || 0)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MurderMysteryStats;
