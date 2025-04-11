
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeveloperSearchTabProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  specialization: string;
  onSpecializationChange: (value: string) => void;
  experience: string;
  onExperienceChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  businessDescription?: string;
  onBusinessDescriptionChange?: (value: string) => void;
  isExpertiseTab?: boolean;
}

export default function DeveloperSearchTab({
  searchQuery,
  onSearch,
  specialization,
  onSpecializationChange,
  experience,
  onExperienceChange,
  onSubmit,
  businessDescription = "",
  onBusinessDescriptionChange,
  isExpertiseTab = false
}: DeveloperSearchTabProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder={isExpertiseTab ? "What expertise do you need?" : "Search for AI developers..."}
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 py-6 rounded-full border-2 focus:border-primary shadow-sm text-base"
        />
      </div>
      
      {isExpertiseTab && (
        <div className="mt-4">
          <Textarea
            placeholder="Describe your business problem or use case in detail..."
            value={businessDescription}
            onChange={(e) => onBusinessDescriptionChange && onBusinessDescriptionChange(e.target.value)}
            className="min-h-[120px] rounded-xl border-2 focus:border-primary shadow-sm text-base p-4"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div>
          <Select value={specialization} onValueChange={onSpecializationChange}>
            <SelectTrigger>
              <SelectValue placeholder={isExpertiseTab ? "Select industry" : "Select specialization"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any {isExpertiseTab ? "Industry" : "Specialization"}</SelectItem>
              {isExpertiseTab ? (
                <>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="nlp">Natural Language Processing</SelectItem>
                  <SelectItem value="computer-vision">Computer Vision</SelectItem>
                  <SelectItem value="generative-ai">Generative AI</SelectItem>
                  <SelectItem value="llm">Large Language Models</SelectItem>
                  <SelectItem value="ml-ops">ML Ops</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={experience} onValueChange={onExperienceChange}>
            <SelectTrigger>
              <SelectValue placeholder={isExpertiseTab ? "Select budget" : "Select experience"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any {isExpertiseTab ? "Budget" : "Experience"}</SelectItem>
              {isExpertiseTab ? (
                <>
                  <SelectItem value="low">Under $5,000</SelectItem>
                  <SelectItem value="medium">$5,000 - $15,000</SelectItem>
                  <SelectItem value="high">$15,000 - $50,000</SelectItem>
                  <SelectItem value="enterprise">$50,000+</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="junior">1-3 years</SelectItem>
                  <SelectItem value="mid">3-5 years</SelectItem>
                  <SelectItem value="senior">5-10 years</SelectItem>
                  <SelectItem value="expert">10+ years</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        onClick={onSubmit} 
        className="w-full rounded-full mt-4"
        disabled={isExpertiseTab ? (!searchQuery.trim() && !businessDescription?.trim()) : !searchQuery.trim()}
      >
        <Search className="mr-2 h-5 w-5" />
        {isExpertiseTab ? "Find AI Expertise" : "Find AI Developers"}
      </Button>
    </div>
  );
}
