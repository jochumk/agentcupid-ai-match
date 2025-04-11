
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AgentSearchTabProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedCategories: string[];
  selectedTools: string[];
  setupTime: string;
  onSubmit: (e: React.FormEvent) => void;
  examplePrompts: string[];
  onPromptClick: (prompt: string) => void;
}

export default function AgentSearchTab({
  searchQuery,
  onSearch,
  selectedCategories,
  selectedTools,
  setupTime,
  onSubmit,
  examplePrompts,
  onPromptClick
}: AgentSearchTabProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Search for AI agents..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 py-6 rounded-full border-2 focus:border-primary shadow-sm text-base"
        />
      </div>
      
      <div className="max-w-4xl mx-auto mt-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {examplePrompts.map((prompt) => (
            <Button
              key={prompt}
              variant="outline"
              className="rounded-full"
              onClick={() => onPromptClick(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={onSubmit} 
        className="w-full rounded-full mt-4"
        disabled={!searchQuery.trim()}
      >
        <Search className="mr-2 h-5 w-5" />
        Find AI Agents
      </Button>
    </div>
  );
}
