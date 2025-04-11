
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ResultsHeaderProps {
  initialQuery: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
}

export default function ResultsHeader({
  initialQuery,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit
}: ResultsHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Search Results: <span className="text-primary">{initialQuery}</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              AI agents that can process, categorize, and respond to customer emails
            </p>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="w-full md:w-auto">
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 w-full md:w-64"
                placeholder="Refine your search..."
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
