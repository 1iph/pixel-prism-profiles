
// Hypixel API types
export interface HypixelPlayer {
  uuid: string;
  displayname: string;
  rank?: string;
  packageRank?: string;
  newPackageRank?: string;
  monthlyPackageRank?: string;
  rankPlusColor?: string;
  monthlyRankColor?: string;
  firstLogin?: number;
  lastLogin?: number;
  lastLogout?: number;
  networkExp?: number;
  karma?: number;
  achievementPoints?: number;
  stats?: {
    Bedwars?: BedwarsStats;
    SkyWars?: SkywarsStats;
    Duels?: DuelsStats;
    MurderMystery?: MurderMysteryStats;
    SkyBlock?: SkyBlockStats;
    [key: string]: any;
  };
}

export interface BedwarsStats {
  coins?: number;
  wins_bedwars?: number;
  winstreak?: number;
  kills_bedwars?: number;
  deaths_bedwars?: number;
  final_kills_bedwars?: number;
  final_deaths_bedwars?: number;
  beds_broken_bedwars?: number;
  beds_lost_bedwars?: number;
  games_played_bedwars?: number;
}

export interface SkywarsStats {
  coins?: number;
  souls?: number;
  wins?: number;
  losses?: number;
  kills?: number;
  deaths?: number;
  levelFormatted?: string;
}

export interface DuelsStats {
  coins?: number;
  wins?: number;
  losses?: number;
  kills?: number;
  deaths?: number;
  current_winstreak?: number;
  best_winstreak?: number;
}

export interface MurderMysteryStats {
  coins?: number;
  wins?: number;
  games?: number;
  kills?: number;
  deaths?: number;
  detective_wins?: number;
  murderer_wins?: number;
}

export interface SkyBlockStats {
  profiles?: Record<string, SkyBlockProfile>;
}

export interface SkyBlockProfile {
  profile_id?: string;
  cute_name?: string;
  banking?: {
    balance?: number;
  };
  members?: Record<string, any>;
}

// Player search context
export interface PlayerSearchContextType {
  playerData: HypixelPlayer | null;
  isLoading: boolean;
  error: string | null;
  apiKey: string;
  setApiKey: (key: string) => void;
  searchPlayer: (username: string) => Promise<void>;
  clearPlayerData: () => void;
}

// Game mode definitions
export interface GameMode {
  id: string;
  name: string;
  icon: string;
}

export const GAME_MODES: GameMode[] = [
  { id: 'overall', name: 'Overall', icon: 'star' },
  { id: 'bedwars', name: 'Bedwars', icon: 'bed' },
  { id: 'skywars', name: 'Skywars', icon: 'sword' },
  { id: 'duels', name: 'Duels', icon: 'shield' },
  { id: 'murder_mystery', name: 'Murder Mystery', icon: 'user' },
  { id: 'skyblock', name: 'SkyBlock', icon: 'grid-2x2' },
];
