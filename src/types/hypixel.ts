
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
  achievementRewards?: Record<string, any>; // Added this property
  socialMedia?: { // Added this property
    links?: Record<string, string>;
  };
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
  games_played?: number; // Added this property
  kills_solo?: number; // Added this property
  kills_team?: number; // Added this property
  arrows_hit?: number; // Added this property
}

export interface DuelsStats {
  coins?: number;
  wins?: number;
  losses?: number;
  kills?: number;
  deaths?: number;
  current_winstreak?: number;
  best_winstreak?: number;
  games_played_duels?: number; // Added this property
  melee_hits?: number; // Added this property
  melee_swings?: number; // Added this property
  bow_hits?: number; // Added this property
  blocks_placed?: number; // Added this property
}

export interface MurderMysteryStats {
  coins?: number;
  wins?: number;
  games?: number;
  kills?: number;
  deaths?: number;
  detective_wins?: number;
  murderer_wins?: number;
  coins_picked_up?: number; // Added this property
  murderer_kills?: number; // Added this property (though it may be a typo for murderer_wins)
  knife_kills?: number; // Added this property
  bow_kills?: number; // Added this property
  kills_as_murderer?: number; // Added this property
}

export interface SkyBlockProfile {
  profile_id?: string;
  cute_name?: string;
  banking?: {
    balance?: number;
  };
  members?: Record<string, any>;
}

export interface SkyBlockStats {
  profiles?: Record<string, SkyBlockProfile>;
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
