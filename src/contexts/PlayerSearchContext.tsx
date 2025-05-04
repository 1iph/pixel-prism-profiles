
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { HypixelPlayer, PlayerSearchContextType } from '@/types/hypixel';
import { fetchPlayerUUID, fetchPlayerData } from '@/utils/hypixelApi';
import { useToast } from '@/components/ui/use-toast';

const PlayerSearchContext = createContext<PlayerSearchContextType | undefined>(undefined);

export const PlayerSearchProvider = ({ children }: { children: ReactNode }) => {
  const [playerData, setPlayerData] = useState<HypixelPlayer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('hypixel-api-key') || '';
  });
  const { toast } = useToast();

  const searchPlayer = async (username: string) => {
    if (!username) {
      setError('Please enter a username');
      toast({
        title: 'Error',
        description: 'Please enter a username',
        variant: 'destructive'
      });
      return;
    }
    
    if (!apiKey) {
      setError('Please enter your Hypixel API key');
      toast({
        title: 'Error',
        description: 'Please enter your Hypixel API key',
        variant: 'destructive'
      });
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const uuid = await fetchPlayerUUID(username);
      const player = await fetchPlayerData(uuid, apiKey);
      
      setPlayerData(player);
      localStorage.setItem('hypixel-api-key', apiKey);
      
      toast({
        title: 'Success',
        description: `Loaded player data for ${player.displayname}`,
      });
    } catch (err: any) {
      console.error('Error searching player:', err);
      setError(err.message || 'An error occurred while searching for player');
      toast({
        title: 'Error',
        description: err.message || 'Failed to load player data',
        variant: 'destructive'
      });
      setPlayerData(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearPlayerData = () => {
    setPlayerData(null);
    setError(null);
  };
  
  return (
    <PlayerSearchContext.Provider
      value={{
        playerData,
        isLoading,
        error,
        apiKey,
        setApiKey,
        searchPlayer,
        clearPlayerData
      }}
    >
      {children}
    </PlayerSearchContext.Provider>
  );
};

export const usePlayerSearch = () => {
  const context = useContext(PlayerSearchContext);
  if (context === undefined) {
    throw new Error('usePlayerSearch must be used within a PlayerSearchProvider');
  }
  return context;
};
