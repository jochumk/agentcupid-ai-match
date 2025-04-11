
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryDefinition {
  name: string;
  description: string;
  icon: React.ElementType;
  tools: string[];
}

interface AgentFiltersProps {
  showFilters: boolean;
  categoryDefinitions: Record<string, CategoryDefinition>;
  selectedCategories: string[];
  selectedTools: string[];
  setupTime: string;
  onSetupTimeChange: (value: string) => void;
  onCategoryToggle: (categoryName: string) => void;
  onToolToggle: (toolName: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  renderCategoryIcon: (categoryName: string) => React.ReactNode;
}

export default function AgentFilters({
  showFilters,
  categoryDefinitions,
  selectedCategories,
  selectedTools,
  setupTime,
  onSetupTimeChange,
  onCategoryToggle,
  onToolToggle,
  onSubmit,
  renderCategoryIcon
}: AgentFiltersProps) {
  const categories = Object.values(categoryDefinitions);

  if (!showFilters) return null;
  
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Filter Your Results
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                    className="rounded-full text-sm"
                    onClick={() => onCategoryToggle(category.name)}
                  >
                    {renderCategoryIcon(category.name)}
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Tools & Integrations
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.values(categoryDefinitions).flatMap(category => category.tools).map((tool) => (
                  <Button
                    key={tool}
                    variant={selectedTools.includes(tool) ? "default" : "outline"}
                    className="rounded-full text-sm"
                    onClick={() => onToolToggle(tool)}
                  >
                    {tool}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Setup Time
            </h3>
            <Select value={setupTime} onValueChange={onSetupTimeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="quick">Quick Setup (minutes)</SelectItem>
                <SelectItem value="moderate">Moderate Setup (hours)</SelectItem>
                <SelectItem value="complex">Complex Setup (days)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-6">
            <Button onClick={onSubmit} className="w-full rounded-full">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
