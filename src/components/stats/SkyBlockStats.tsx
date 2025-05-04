
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import { formatNumber } from '@/utils/hypixelApi';

const SkyBlockStats = () => {
  const { playerData } = usePlayerSearch();
  
  if (!playerData || !playerData.stats || !playerData.stats.SkyBlock) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground">This player has no SkyBlock stats</p>
      </div>
    );
  }
  
  const skyblock = playerData.stats.SkyBlock;
  const profiles = skyblock.profiles || {};
  const profileKeys = Object.keys(profiles);
  
  if (profileKeys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground">This player has no SkyBlock profiles</p>
      </div>
    );
  }
  
  // Just display basic profile info since SkyBlock data is very extensive
  return (
    <div className="animate-tab-fade space-y-6">
      <div className="glass p-6">
        <h3 className="text-lg font-semibold mb-4">SkyBlock Profiles</h3>
        
        <div className="space-y-4">
          {profileKeys.map((profileId) => {
            const profile = profiles[profileId];
            const profileName = profile.cute_name || 'Unnamed Profile';
            const balance = profile.banking?.balance || 0;
            
            return (
              <div key={profileId} className="border border-glass-border p-4 rounded-lg hover:bg-glass-background/50 transition-colors">
                <h4 className="text-md font-medium">{profileName}</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Profile ID</div>
                    <div className="text-sm font-mono">{profileId.substring(0, 8)}...</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Bank Balance</div>
                    <div className="text-sm">{formatNumber(Math.floor(balance))} coins</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            SkyBlock data is limited in the API. For more detailed statistics, use specialized SkyBlock stat trackers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkyBlockStats;
