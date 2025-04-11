
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeveloperSearchTabProps {
  devSearchQuery: string;
  onDevSearchQueryChange: (value: string) => void;
  industry: string;
  onIndustryChange: (value: string) => void;
  budget: string;
  onBudgetChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function DeveloperSearchTab({
  devSearchQuery,
  onDevSearchQueryChange,
  industry,
  onIndustryChange,
  budget,
  onBudgetChange,
  onSubmit
}: DeveloperSearchTabProps) {
  return (
    <div className="space-y-4">
      <Textarea 
        placeholder="Describe your business challenge... 
Example: We need help automating our customer support workflow by integrating with our existing CRM system..."
        value={devSearchQuery}
        onChange={(e) => onDevSearchQueryChange(e.target.value)}
        className="min-h-[120px] p-4 text-base"
      />
      <p className="text-sm text-gray-500 text-left">
        The more details you provide, the better matches we can find
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <Select value={industry} onValueChange={onIndustryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Industry</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
          <Select value={budget} onValueChange={onBudgetChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Budget</SelectItem>
              <SelectItem value="0-5000">$0 - $5,000</SelectItem>
              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
              <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
              <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
              <SelectItem value="100000+">$100,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={onSubmit} 
        className="w-full rounded-full mt-4"
        disabled={!devSearchQuery.trim()}
      >
        <Search className="mr-2 h-5 w-5" />
        Find AI Developers
      </Button>
    </div>
  );
}
