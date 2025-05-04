import { HypixelPlayer } from '@/types/hypixel';

// Function to fetch player UUID from Mojang API
export const fetchPlayerUUID = async (username: string): Promise<string> => {
  try {
    // Using a CORS proxy to avoid CORS issues
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const mojangApiUrl = `https://api.mojang.com/users/profiles/minecraft/${username}`;
    
    const response = await fetch(`${corsProxy}${mojangApiUrl}`, {
      headers: {
        'Origin': window.location.origin
      }
    });
    
    if (!response.ok) {
      throw new Error('Player not found');
    }
    
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error fetching player UUID:', error);
    throw new Error('Failed to fetch player UUID');
  }
};

// Function to fetch player data from Hypixel API
export const fetchPlayerData = async (uuid: string, apiKey: string): Promise<HypixelPlayer> => {
  try {
    const response = await fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=${apiKey}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.cause || 'Failed to fetch player data');
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.cause || 'Failed to fetch player data');
    }
    
    if (!data.player) {
      throw new Error('Player has never logged into Hypixel');
    }
    
    return data.player;
  } catch (error) {
    console.error('Error fetching player data:', error);
    throw error;
  }
};

// Calculate network level from network exp
export const calculateNetworkLevel = (networkExp: number = 0): number => {
  return Math.floor((Math.sqrt(networkExp + 15312.5) - 88.38834764831843) / 35.35);
};

// Format number with commas
export const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Calculate KD ratio
export const calculateKDRatio = (kills: number = 0, deaths: number = 0): string => {
  if (deaths === 0) return kills.toFixed(2);
  return (kills / deaths).toFixed(2);
};

// Calculate WL ratio
export const calculateWLRatio = (wins: number = 0, losses: number = 0): string => {
  if (losses === 0) return wins.toFixed(2);
  return (wins / losses).toFixed(2);
};

// Get player rank display
export const getPlayerRank = (player: HypixelPlayer): { name: string; color: string } => {
  if (!player) return { name: 'Default', color: 'text-gray-300' };
  
  if (player.rank === 'ADMIN') return { name: 'ADMIN', color: 'text-red-500' };
  if (player.rank === 'MODERATOR') return { name: 'MOD', color: 'text-green-500' };
  if (player.rank === 'HELPER') return { name: 'HELPER', color: 'text-blue-400' };
  if (player.rank === 'YOUTUBER') return { name: 'YOUTUBE', color: 'text-red-500' };
  
  if (player.newPackageRank === 'MVP_PLUS') {
    if (player.monthlyPackageRank === 'SUPERSTAR') {
      return { name: 'MVP++', color: 'text-hypixel-gold' };
    }
    return { name: 'MVP+', color: 'text-hypixel-blue' };
  }
  
  if (player.newPackageRank === 'MVP') return { name: 'MVP', color: 'text-hypixel-blue' };
  if (player.newPackageRank === 'VIP_PLUS') return { name: 'VIP+', color: 'text-green-500' };
  if (player.newPackageRank === 'VIP') return { name: 'VIP', color: 'text-green-500' };
  
  return { name: 'Default', color: 'text-gray-300' };
};
