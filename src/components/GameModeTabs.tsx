
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GAME_MODES } from '@/types/hypixel';
import { Bed, Star, Sword, Shield, User, LayoutGrid } from 'lucide-react';

// Import stat components
import OverallStats from './stats/OverallStats';
import BedwarsStats from './stats/BedwarsStats';
import SkywarsStats from './stats/SkywarsStats';
import DuelsStats from './stats/DuelsStats';
import MurderMysteryStats from './stats/MurderMysteryStats';
import SkyBlockStats from './stats/SkyBlockStats';

const GameModeTabs = () => {
  const [activeTab, setActiveTab] = useState<string>('overall');
  
  // Map icons to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'bed':
        return <Bed className="h-4 w-4" />;
      case 'star':
        return <Star className="h-4 w-4" />;
      case 'sword':
        return <Sword className="h-4 w-4" />;
      case 'shield':
        return <Shield className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      case 'grid-2x2':
        return <LayoutGrid className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };
  
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full max-w-3xl mx-auto glass p-6"
    >
      <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-6">
        {GAME_MODES.map((mode) => (
          <TabsTrigger
            key={mode.id}
            value={mode.id}
            className="flex items-center gap-2 data-[state=active]:bg-hypixel-gradient"
          >
            {getIcon(mode.icon)}
            <span className="hidden md:inline">{mode.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="overall">
        <OverallStats />
      </TabsContent>
      
      <TabsContent value="bedwars">
        <BedwarsStats />
      </TabsContent>
      
      <TabsContent value="skywars">
        <SkywarsStats />
      </TabsContent>
      
      <TabsContent value="duels">
        <DuelsStats />
      </TabsContent>
      
      <TabsContent value="murder_mystery">
        <MurderMysteryStats />
      </TabsContent>
      
      <TabsContent value="skyblock">
        <SkyBlockStats />
      </TabsContent>
    </Tabs>
  );
};

export default GameModeTabs;
