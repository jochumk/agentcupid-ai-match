
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeveloperSearchTabProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  specialization: string;
  onSpecializationChange: (value: string) => void;
  experience: string;
  onExperienceChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function DeveloperSearchTab({
  searchQuery,
  onSearch,
  specialization,
  onSpecializationChange,
  experience,
  onExperienceChange,
  onSubmit
}: DeveloperSearchTabProps) {
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
          placeholder="Search for AI developers..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 py-6 rounded-full border-2 focus:border-primary shadow-sm text-base"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
          <Select value={specialization} onValueChange={onSpecializationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Specialization</SelectItem>
              <SelectItem value="nlp">Natural Language Processing</SelectItem>
              <SelectItem value="cv">Computer Vision</SelectItem>
              <SelectItem value="llm">Large Language Models</SelectItem>
              <SelectItem value="ml">Machine Learning</SelectItem>
              <SelectItem value="rl">Reinforcement Learning</SelectItem>
              <SelectItem value="robotics">Robotics & Automation</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
          <Select value={experience} onValueChange={onExperienceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Experience</SelectItem>
              <SelectItem value="junior">1-2 Years</SelectItem>
              <SelectItem value="mid">3-5 Years</SelectItem>
              <SelectItem value="senior">5-10 Years</SelectItem>
              <SelectItem value="expert">10+ Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={onSubmit} 
        className="w-full rounded-full mt-4"
        disabled={!searchQuery.trim()}
      >
        <Search className="mr-2 h-5 w-5" />
        Find AI Developers
      </Button>
    </div>
  );
}
