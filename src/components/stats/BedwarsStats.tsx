
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import { formatNumber, calculateKDRatio, calculateWLRatio } from '@/utils/hypixelApi';

const BedwarsStats = () => {
  const { playerData } = usePlayerSearch();
  
  if (!playerData || !playerData.stats || !playerData.stats.Bedwars) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground">This player has no Bedwars stats</p>
      </div>
    );
  }
  
  const bw = playerData.stats.Bedwars;
  
  // Calculate stats
  const wins = bw.wins_bedwars || 0;
  const losses = (bw.games_played_bedwars || 0) - wins;
  const kills = bw.kills_bedwars || 0;
  const deaths = bw.deaths_bedwars || 0;
  const finalKills = bw.final_kills_bedwars || 0;
  const finalDeaths = bw.final_deaths_bedwars || 0;
  const bedsBroken = bw.beds_broken_bedwars || 0;
  const bedsLost = bw.beds_lost_bedwars || 0;
  
  // Calculate ratios
  const kdr = calculateKDRatio(kills, deaths);
  const fkdr = calculateKDRatio(finalKills, finalDeaths);
  const wlr = calculateWLRatio(wins, losses);
  const bblr = calculateKDRatio(bedsBroken, bedsLost);
  
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
          <div className="stat-label">Final K/D</div>
          <div className="stat-value">{fkdr}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Beds Broken</div>
          <div className="stat-value">{formatNumber(bedsBroken)}</div>
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
              <div className="text-sm text-muted-foreground">Final Kills</div>
              <div className="font-medium">{formatNumber(finalKills)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Final Deaths</div>
              <div className="font-medium">{formatNumber(finalDeaths)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Final K/D</div>
              <div className="font-medium">{fkdr}</div>
            </div>
          </div>
        </div>
        
        <div className="glass p-6 space-y-4">
          <h3 className="text-lg font-semibold">Game Stats</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Games Played</div>
              <div className="font-medium">{formatNumber(bw.games_played_bedwars || 0)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Winstreak</div>
              <div className="font-medium">{formatNumber(bw.winstreak || 0)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Beds Broken</div>
              <div className="font-medium">{formatNumber(bedsBroken)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Beds Lost</div>
              <div className="font-medium">{formatNumber(bedsLost)}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">BB/BL Ratio</div>
              <div className="font-medium">{bblr}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Coins</div>
              <div className="font-medium">{formatNumber(bw.coins || 0)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedwarsStats;
