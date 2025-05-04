
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import { formatNumber, formatDate } from '@/utils/hypixelApi';

const OverallStats = () => {
  const { playerData } = usePlayerSearch();
  
  if (!playerData) return null;
  
  // Get general stats
  const karma = playerData.karma || 0;
  const achievementPoints = playerData.achievementPoints || 0;
  const firstLogin = formatDate(playerData.firstLogin);
  const lastLogin = formatDate(playerData.lastLogin);
  
  // Count achievements
  let totalAchievements = 0;
  if (playerData.achievementRewards) {
    totalAchievements = Object.keys(playerData.achievementRewards).length;
  } else if (playerData.achievementsOneTime) {
    // Fallback to achievementsOneTime if achievementRewards is not available
    totalAchievements = playerData.achievementsOneTime.length;
  }
  
  // Find favorite game mode based on stats
  let favoriteGame = 'Unknown';
  let highestValue = 0;
  
  if (playerData.stats) {
    if (playerData.stats.Bedwars && (playerData.stats.Bedwars.games_played_bedwars || 0) > highestValue) {
      favoriteGame = 'Bedwars';
      highestValue = playerData.stats.Bedwars.games_played_bedwars || 0;
    }
    
    if (playerData.stats.SkyWars && (playerData.stats.SkyWars.games_played || 0) > highestValue) {
      favoriteGame = 'SkyWars';
      highestValue = playerData.stats.SkyWars.games_played || 0;
    }
    
    if (playerData.stats.Duels && (playerData.stats.Duels.games_played_duels || 0) > highestValue) {
      favoriteGame = 'Duels';
      highestValue = playerData.stats.Duels.games_played_duels || 0;
    }
    
    if (playerData.stats.MurderMystery && (playerData.stats.MurderMystery.games || 0) > highestValue) {
      favoriteGame = 'Murder Mystery';
      highestValue = playerData.stats.MurderMystery.games || 0;
    }
  }
  
  return (
    <div className="animate-tab-fade space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="stat-label">Karma</div>
          <div className="stat-value">{formatNumber(karma)}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Achievement Points</div>
          <div className="stat-value">{formatNumber(achievementPoints)}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Total Achievements</div>
          <div className="stat-value">{formatNumber(totalAchievements)}</div>
        </div>
      </div>
      
      <div className="glass p-6 space-y-4">
        <h3 className="text-lg font-semibold">General Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-muted-foreground">First Login</div>
            <div className="font-medium">{firstLogin}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Last Login</div>
            <div className="font-medium">{lastLogin}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Favorite Game</div>
            <div className="font-medium">{favoriteGame}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Social Media</div>
            <div className="font-medium">
              {playerData.socialMedia?.links ? 'Connected' : 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallStats;
