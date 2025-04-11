
import { useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Define filter types
type Industry = {
  value: string;
  label: string;
};

type Budget = {
  value: string;
  label: string;
  min?: number;
  max?: number;
};

type Integration = {
  value: string;
  label: string;
};

type Status = {
  value: string;
  label: string;
};

// Sample data
const industries: Industry[] = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "entertainment", label: "Entertainment" },
];

const budgets: Budget[] = [
  { value: "any", label: "Any Budget" },
  { value: "low", label: "Under $1,000", max: 1000 },
  { value: "medium", label: "1,000 - $5,000", min: 1000, max: 5000 },
  { value: "high", label: "5,000 - $10,000", min: 5000, max: 10000 },
  { value: "very-high", label: "10,000+", min: 10000 },
];

const integrations: Integration[] = [
  { value: "crm", label: "CRM Systems" },
  { value: "email", label: "Email Providers" },
  { value: "knowledge-base", label: "Knowledge Base" },
  { value: "chat", label: "Chat/Messaging Platforms" },
  { value: "ticketing", label: "Ticketing Systems" },
  { value: "analytics", label: "Analytics Tools" },
  { value: "database", label: "Database Systems" },
  { value: "api", label: "External APIs" },
];

const statuses: Status[] = [
  { value: "open", label: "Open" },
  { value: "active", label: "Active" },
  { value: "taken", label: "Taken" },
  { value: "completed", label: "Completed" },
];

interface InquiryFiltersProps {
  onFilterChange?: (filters: {
    industries: string[];
    budget: string;
    integrations: string[];
    status: string;
  }) => void;
}

export function InquiryFilters({ onFilterChange }: InquiryFiltersProps) {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("any");
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [industryOpen, setIndustryOpen] = useState(false);
  const [integrationOpen, setIntegrationOpen] = useState(false);

  // Handle industry selection/deselection
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  // Handle integration selection/deselection
  const toggleIntegration = (integration: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(integration)
        ? prev.filter((i) => i !== integration)
        : [...prev, integration]
    );
  };

  // Handle filter changes
  const handleFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({
        industries: selectedIndustries,
        budget: selectedBudget,
        integrations: selectedIntegrations,
        status: selectedStatus,
      });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedIndustries([]);
    setSelectedBudget("any");
    setSelectedIntegrations([]);
    setSelectedStatus("all");
    
    if (onFilterChange) {
      onFilterChange({
        industries: [],
        budget: "any",
        integrations: [],
        status: "all",
      });
    }
  };

  // Get the count of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedIndustries.length > 0) count++;
    if (selectedBudget !== "any") count++;
    if (selectedIntegrations.length > 0) count++;
    if (selectedStatus !== "all") count++;
    return count;
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Industry Filter */}
      <Popover open={industryOpen} onOpenChange={setIndustryOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            Industry
            {selectedIndustries.length > 0 && (
              <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                {selectedIndustries.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search industry..." />
            <CommandList>
              <CommandEmpty>No industry found.</CommandEmpty>
              <CommandGroup>
                {industries.map((industry) => (
                  <CommandItem
                    key={industry.value}
                    onSelect={() => toggleIndustry(industry.value)}
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                        selectedIndustries.includes(industry.value)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{industry.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setSelectedIndustries([]);
                    setIndustryOpen(false);
                  }}
                  className="justify-center text-center"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Budget Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            Budget
            {selectedBudget !== "any" && (
              <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                1
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]">
          <DropdownMenuLabel>Select Budget Range</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedBudget} onValueChange={setSelectedBudget}>
            {budgets.map((budget) => (
              <DropdownMenuRadioItem key={budget.value} value={budget.value}>
                {budget.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Integration Needs Filter */}
      <Popover open={integrationOpen} onOpenChange={setIntegrationOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            Integrations
            {selectedIntegrations.length > 0 && (
              <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                {selectedIntegrations.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search integrations..." />
            <CommandList>
              <CommandEmpty>No integration found.</CommandEmpty>
              <CommandGroup>
                {integrations.map((integration) => (
                  <CommandItem
                    key={integration.value}
                    onSelect={() => toggleIntegration(integration.value)}
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                        selectedIntegrations.includes(integration.value)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <span>{integration.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setSelectedIntegrations([]);
                    setIntegrationOpen(false);
                  }}
                  className="justify-center text-center"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            Status
            {selectedStatus !== "all" && (
              <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                1
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedStatus} onValueChange={setSelectedStatus}>
            <DropdownMenuRadioItem value="all">
              All Statuses
            </DropdownMenuRadioItem>
            {statuses.map((status) => (
              <DropdownMenuRadioItem key={status.value} value={status.value}>
                {status.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Apply/Clear Filters */}
      <Button 
        variant="default" 
        size="sm" 
        className="h-8"
        onClick={handleFilterChange}
      >
        Apply Filters
      </Button>
      
      {getActiveFilterCount() > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8"
          onClick={clearFilters}
        >
          Clear All
        </Button>
      )}
    </div>
  );
}
