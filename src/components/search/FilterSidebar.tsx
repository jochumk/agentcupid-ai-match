
import { Filter, RefreshCw, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterSidebarProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  minRating: string;
  setMinRating: (rating: string) => void;
  userCapacity: string;
  setUserCapacity: (capacity: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  integrations: string[];
  toggleIntegration: (integration: string) => void;
  capabilities: string[];
  toggleCapability: (capability: string) => void;
  responseTime: string;
  setResponseTime: (time: string) => void;
  resetFilters: () => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  selectedAgents: number[];
  toggleAgentSelection: (agentId: number) => void;
  emailAgents: any[];
}

export default function FilterSidebar({
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  userCapacity,
  setUserCapacity,
  difficulty,
  setDifficulty,
  integrations,
  toggleIntegration,
  capabilities,
  toggleCapability,
  responseTime,
  setResponseTime,
  resetFilters,
  showFilters,
  setShowFilters,
  showAdvancedFilters,
  setShowAdvancedFilters,
  selectedAgents,
  toggleAgentSelection,
  emailAgents
}: FilterSidebarProps) {
  return (
    <div className="w-full lg:w-1/4">
      <div className="bg-white rounded-lg border p-4 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h2 className="font-medium">Filters</h2>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-xs h-8 mr-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden h-8 w-8"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>
        
        <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div>
            <h3 className="text-sm font-medium mb-3">Price Range ($/month)</h3>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Minimum Rating</h3>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">User Capacity</h3>
            <Select value={userCapacity} onValueChange={setUserCapacity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Capacity</SelectItem>
                <SelectItem value="1-10">1-10 Users</SelectItem>
                <SelectItem value="1-50">1-50 Users</SelectItem>
                <SelectItem value="1-100">1-100 Users</SelectItem>
                <SelectItem value="Unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Implementation Difficulty</h3>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Difficulty</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Complex">Complex</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Integrations</h3>
            <div className="space-y-2">
              {["Gmail", "Outlook", "Zendesk", "Salesforce", "HubSpot"].map((tool) => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`integration-${tool}`}
                    checked={integrations.includes(tool)}
                    onCheckedChange={() => toggleIntegration(tool)}
                  />
                  <label
                    htmlFor={`integration-${tool}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tool}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
                <span className="text-sm font-medium">Advanced Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Email Capabilities</h3>
                <div className="space-y-2">
                  {["Auto-categorization", "Sentiment analysis", "Multilingual", "Document handling", "Templates"].map((capability) => (
                    <div key={capability} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`capability-${capability}`}
                        checked={capabilities.includes(capability)}
                        onCheckedChange={() => toggleCapability(capability)}
                      />
                      <label
                        htmlFor={`capability-${capability}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {capability}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Response Time</h3>
                <Select value={responseTime} onValueChange={setResponseTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Response Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Response Time</SelectItem>
                    <SelectItem value="Instant">Instant</SelectItem>
                    <SelectItem value="Minutes">Minutes</SelectItem>
                    <SelectItem value="Hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      
      <ActiveFilters 
        minRating={minRating}
        setMinRating={setMinRating}
        userCapacity={userCapacity}
        setUserCapacity={setUserCapacity}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        responseTime={responseTime}
        setResponseTime={setResponseTime}
        integrations={integrations}
        toggleIntegration={toggleIntegration}
        capabilities={capabilities}
        toggleCapability={toggleCapability}
        resetFilters={resetFilters}
      />
      
      {selectedAgents.length > 0 && (
        <div className="bg-white rounded-lg border p-4 mt-4">
          <h3 className="text-sm font-medium mb-3">Selected for Comparison</h3>
          <div className="space-y-2 mb-3">
            {selectedAgents.map(id => {
              const agent = emailAgents.find(a => a.id === id);
              return agent ? (
                <div key={id} className="flex items-center justify-between">
                  <span className="text-sm">{agent.name}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleAgentSelection(id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : null;
            })}
          </div>
          <Button className="w-full" disabled={selectedAgents.length < 2}>
            Compare Selected ({selectedAgents.length}/3)
          </Button>
        </div>
      )}
    </div>
  );
}

interface ActiveFiltersProps {
  minRating: string;
  setMinRating: (rating: string) => void;
  userCapacity: string;
  setUserCapacity: (capacity: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  responseTime: string;
  setResponseTime: (time: string) => void;
  integrations: string[];
  toggleIntegration: (integration: string) => void;
  capabilities: string[];
  toggleCapability: (capability: string) => void;
  resetFilters: () => void;
}

function ActiveFilters({
  minRating,
  setMinRating,
  userCapacity,
  setUserCapacity,
  difficulty,
  setDifficulty,
  responseTime,
  setResponseTime,
  integrations,
  toggleIntegration,
  capabilities,
  toggleCapability,
  resetFilters
}: ActiveFiltersProps) {
  const hasActiveFilters = minRating !== "0" || userCapacity !== "" || difficulty !== "" || responseTime !== "" || 
    integrations.length > 0 || capabilities.length > 0;
  
  if (!hasActiveFilters) return null;
  
  return (
    <div className="bg-white rounded-lg border p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Active Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="text-xs h-7"
        >
          <X className="h-3 w-3 mr-1" />
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {minRating !== "0" && (
          <div className="flex items-center bg-gray-100 rounded-full text-xs px-3 py-1">
            {minRating}+ Stars
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMinRating("0")}
              className="h-4 w-4 ml-1 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        {userCapacity !== "" && (
          <div className="flex items-center bg-gray-100 rounded-full text-xs px-3 py-1">
            {userCapacity}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setUserCapacity("")}
              className="h-4 w-4 ml-1 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        {difficulty !== "" && (
          <div className="flex items-center bg-gray-100 rounded-full text-xs px-3 py-1">
            {difficulty}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setDifficulty("")}
              className="h-4 w-4 ml-1 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        {responseTime !== "" && (
          <div className="flex items-center bg-gray-100 rounded-full text-xs px-3 py-1">
            {responseTime} Response
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setResponseTime("")}
              className="h-4 w-4 ml-1 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        {integrations.map(integration => (
          <div key={integration} className="flex items-center bg-gray-100 rounded-full text-xs px-3 py-1">
            {integration}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => toggleIntegration(integration)}
              className="h-4 w-4 ml-1 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        
        {capabilities.map(capability => (
          <div key={capability} className="flex items-center bg-gray-100 rounded-full text-xs px-3 py-1">
            {capability}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => toggleCapability(capability)}
              className="h-4 w-4 ml-1 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
