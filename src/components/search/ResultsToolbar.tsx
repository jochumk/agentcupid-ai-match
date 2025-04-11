
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResultsToolbarProps {
  filteredAgentsCount: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function ResultsToolbar({
  filteredAgentsCount,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy
}: ResultsToolbarProps) {
  return (
    <div className="flex items-center justify-between mt-4 border-t pt-4">
      <div className="text-sm text-gray-600">
        Found <span className="font-medium">{filteredAgentsCount}</span> AI agents
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm text-gray-600">View:</span>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-8 text-sm">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
