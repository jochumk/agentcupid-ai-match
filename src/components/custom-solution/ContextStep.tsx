
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ContextStepProps {
  companySize: string;
  setCompanySize: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  tools: string[];
  setTools: (value: string[]) => void;
  timeline: string;
  setTimeline: (value: string) => void;
  budget: number[];
  setBudget: (value: number[]) => void;
  onBack: () => void;
  onNext: () => void;
}

const ContextStep: React.FC<ContextStepProps> = ({
  companySize,
  setCompanySize,
  industry,
  setIndustry,
  tools,
  setTools,
  timeline,
  setTimeline,
  budget,
  setBudget,
  onBack,
  onNext,
}) => {
  const [open, setOpen] = useState(false);
  
  const industries = [
    { label: "Retail / E-commerce", value: "retail" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Financial Services", value: "finance" },
    { label: "Manufacturing", value: "manufacturing" },
    { label: "Technology", value: "technology" },
    { label: "Education", value: "education" },
    { label: "Professional Services", value: "services" },
    { label: "Real Estate", value: "realestate" },
    { label: "Hospitality", value: "hospitality" },
    { label: "Other", value: "other" },
  ];

  const companySizes = [
    { label: "1-10 employees", value: "1-10" },
    { label: "11-50 employees", value: "11-50" },
    { label: "51-200 employees", value: "51-200" },
    { label: "201-500 employees", value: "201-500" },
    { label: "501-1000 employees", value: "501-1000" },
    { label: "1000+ employees", value: "1000+" },
  ];

  const timelineOptions = [
    { label: "Urgent (Within 2 weeks)", value: "urgent" },
    { label: "Within 1 month", value: "1month" },
    { label: "Within 3 months", value: "3months" },
    { label: "Future planning (3+ months)", value: "future" },
  ];

  const toolOptions = [
    "Microsoft Office",
    "Google Workspace",
    "Slack",
    "Salesforce",
    "Hubspot",
    "Zendesk",
    "Jira",
    "Trello",
    "Asana",
    "QuickBooks",
    "SAP",
    "Oracle",
    "AWS",
    "Azure",
    "G Suite",
    "Other CRM",
    "Other ERP",
  ];

  const toggleTool = (tool: string) => {
    if (tools.includes(tool)) {
      setTools(tools.filter(t => t !== tool));
    } else {
      setTools([...tools, tool]);
    }
  };

  // Format budget label based on value
  const formatBudgetLabel = (value: number): string => {
    if (value <= 20) return "Under $5,000";
    if (value <= 40) return "$5,000-$15,000";
    if (value <= 60) return "$15,000-$50,000";
    if (value <= 80) return "$50,000-$100,000";
    return "Over $100,000";
  };

  const budgetValue = budget[0] || 50;
  const budgetLabel = formatBudgetLabel(budgetValue);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="company-size" className="text-base font-medium">
            Company Size
          </Label>
          <Select value={companySize} onValueChange={setCompanySize}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map(size => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="industry" className="text-base font-medium">
            Industry
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between mt-2"
              >
                {industry
                  ? industries.find((ind) => ind.value === industry)?.label
                  : "Select industry..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search industry..." />
                <CommandEmpty>No industry found.</CommandEmpty>
                <CommandGroup>
                  {industries.map((ind) => (
                    <CommandItem
                      key={ind.value}
                      value={ind.value}
                      onSelect={(currentValue) => {
                        setIndustry(currentValue === industry ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          industry === ind.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {ind.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="text-base font-medium">
            Current Tools & Software Used
          </Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {toolOptions.map(tool => (
              <Button
                key={tool}
                type="button"
                variant={tools.includes(tool) ? "default" : "outline"}
                className={`text-sm h-9 ${tools.includes(tool) ? "bg-primary text-white" : ""}`}
                onClick={() => toggleTool(tool)}
              >
                {tool}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="timeline" className="text-base font-medium">
            Implementation Timeline
          </Label>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <Label className="text-base font-medium">
              Budget Range
            </Label>
            <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded-full">
              {budgetLabel}
            </span>
          </div>
          <div className="py-6 px-2">
            <Slider
              value={budget}
              onValueChange={setBudget}
              max={100}
              step={20}
              className="mt-2"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Lower</span>
              <span>Higher</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!companySize || !industry || !timeline}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ContextStep;
