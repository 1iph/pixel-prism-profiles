
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePlayerSearch } from '@/contexts/PlayerSearchContext';
import { Search } from 'lucide-react';

const PlayerSearch = () => {
  const [username, setUsername] = useState<string>('');
  const { searchPlayer, apiKey, setApiKey, isLoading, error } = usePlayerSearch();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchPlayer(username);
  };
  
  return (
    <div className="glass w-full max-w-3xl mx-auto p-6 space-y-6 mb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center">Search Hypixel Player Stats</h2>
        <p className="text-center text-muted-foreground">
          Enter a Minecraft username and your Hypixel API key to view player statistics
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Minecraft Username
          </label>
          <div className="flex gap-2">
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Minecraft username"
              disabled={isLoading}
              className="bg-background/60"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="apiKey" className="block text-sm font-medium">
              Hypixel API Key
            </label>
            <a 
              href="https://api.hypixel.net/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs hypixel-link"
            >
              How to get an API key
            </a>
          </div>
          <Input
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
            placeholder="Enter your Hypixel API key"
            disabled={isLoading}
            className="bg-background/60"
          />
          <p className="text-xs text-muted-foreground">
            Your API key will be stored locally in your browser
          </p>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full bg-hypixel-gradient hover:opacity-90"
        >
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Player
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default PlayerSearch;
