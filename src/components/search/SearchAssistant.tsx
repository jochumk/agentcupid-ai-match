
import { useState, useEffect, useRef } from "react";
import { 
  Search, 
  X, 
  ArrowRight, 
  Mic, 
  Sparkles, 
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface SearchSuggestion {
  text: string;
  type: 'autocomplete' | 'clarification' | 'refinement';
}

interface SearchAssistantProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchAssistant = ({ onSearch, initialQuery = "" }: SearchAssistantProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [clarificationQuestion, setClarificationQuestion] = useState("");
  const [searchQuality, setSearchQuality] = useState(20);
  const [isListening, setIsListening] = useState(false);
  const [emailProvider, setEmailProvider] = useState("");
  const [needsKnowledgeBase, setNeedsKnowledgeBase] = useState(false);
  const [emailVolume, setEmailVolume] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Generate suggestions based on input
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setClarificationQuestion("");
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Email automation specific logic
    if (lowerQuery.includes("email") || lowerQuery.includes("mail")) {
      setClarificationQuestion("What specifically do you need help with regarding emails?");
      setSuggestions([
        { text: "Automated customer email responses", type: "autocomplete" },
        { text: "Email sorting and categorization", type: "autocomplete" },
        { text: "Email template creation", type: "autocomplete" },
        { text: "Email scheduling and follow-ups", type: "refinement" }
      ]);
      
      if (lowerQuery.includes("automat") || lowerQuery.includes("answer") || lowerQuery.includes("respond")) {
        setClarificationQuestion("Would you like to specify any details about your email automation needs?");
      }
    } 
    // Customer service related queries
    else if (lowerQuery.includes("customer") || lowerQuery.includes("support") || lowerQuery.includes("service")) {
      setClarificationQuestion("What aspect of customer service are you looking to improve?");
      setSuggestions([
        { text: "24/7 customer support automation", type: "autocomplete" },
        { text: "Customer inquiry categorization", type: "autocomplete" },
        { text: "Customer satisfaction analysis", type: "refinement" }
      ]);
    }
    // Content creation related queries
    else if (lowerQuery.includes("content") || lowerQuery.includes("write") || lowerQuery.includes("blog")) {
      setClarificationQuestion("What type of content are you looking to create?");
      setSuggestions([
        { text: "Blog post generation", type: "autocomplete" },
        { text: "Social media content creation", type: "autocomplete" },
        { text: "Product descriptions", type: "refinement" }
      ]);
    }
    // Default suggestions for other queries
    else {
      setClarificationQuestion("Could you provide more details about what you're looking for?");
      setSuggestions([
        { text: "Generate reports automatically", type: "autocomplete" },
        { text: "Schedule meetings intelligently", type: "autocomplete" },
        { text: "Analyze customer feedback", type: "refinement" }
      ]);
    }

    // Update search quality based on query length and specificity
    const baseQuality = Math.min(query.length * 3, 40);
    const specificityBonus = (lowerQuery.includes("automat") || lowerQuery.includes("tool") || 
                             lowerQuery.includes("integrate")) ? 15 : 0;
    const detailBonus = (emailProvider || needsKnowledgeBase || emailVolume) ? 25 : 0;
    
    setSearchQuality(Math.min(baseQuality + specificityBonus + detailBonus, 100));
  }, [query, emailProvider, needsKnowledgeBase, emailVolume]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    // If it's a complete phrase, automatically update search quality
    setSearchQuality(Math.min(searchQuality + 30, 100));
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Build a more comprehensive search query including the assistant-gathered details
      let enhancedQuery = query;
      
      if (emailProvider) {
        enhancedQuery += ` [Email Provider: ${emailProvider}]`;
      }
      
      if (needsKnowledgeBase) {
        enhancedQuery += " [Needs Knowledge Base Integration]";
      }
      
      if (emailVolume) {
        enhancedQuery += ` [Email Volume: ${emailVolume}]`;
      }
      
      onSearch(enhancedQuery);
      navigate(`/search-results?q=${encodeURIComponent(enhancedQuery)}`);
    }
  };

  const toggleVoiceInput = () => {
    // In a real implementation, this would connect to the Web Speech API
    setIsListening(!isListening);
    if (!isListening) {
      // Simulating voice recognition after 2 seconds
      setTimeout(() => {
        setQuery(query + (query ? " " : "") + "customer emails automatically");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              ref={searchRef}
              type="text"
              placeholder="Describe what you need help with..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-20 py-6 rounded-full border-2 focus:border-primary shadow-sm text-base"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                onClick={toggleVoiceInput}
              >
                <Mic className={`h-5 w-5 ${isListening ? 'text-primary animate-pulse' : 'text-gray-400'}`} />
              </Button>
              <CollapsibleTrigger
                asChild
                onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <Button 
            className="ml-2 rounded-full px-6" 
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        
        {/* AI Assistant Badge */}
        <div className="absolute -top-2 right-24 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-powered
        </div>

        {/* Autocomplete Suggestions */}
        {suggestions.length > 0 && query && !isAssistantOpen && (
          <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg mt-1 border overflow-hidden">
            <div className="p-2 border-b text-xs text-gray-500">Suggestions</div>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  {suggestion.type === 'clarification' && <ChevronDown className="h-4 w-4 mr-2 text-blue-500" />}
                  {suggestion.type === 'refinement' && <ArrowRight className="h-4 w-4 mr-2 text-green-500" />}
                  {suggestion.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expandable AI Assistant */}
        <Collapsible
          open={isAssistantOpen}
          onOpenChange={setIsAssistantOpen}
          className="mt-2"
        >
          <CollapsibleContent className="bg-white rounded-lg shadow-lg p-4 border animate-accordion-down">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                AI Search Assistant
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setIsAssistantOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Clarification Questions */}
            {clarificationQuestion && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">{clarificationQuestion}</p>
                <Textarea 
                  placeholder="Add more details to improve your search..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mb-2"
                />
              </div>
            )}
            
            {/* Email Specific Questions (shown when query contains email) */}
            {query.toLowerCase().includes("email") && (
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-sm font-medium block mb-1">What email provider do you use?</label>
                  <Input 
                    placeholder="e.g., Gmail, Outlook, etc." 
                    value={emailProvider}
                    onChange={(e) => setEmailProvider(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="knowledgeBase" 
                    checked={needsKnowledgeBase}
                    onCheckedChange={(checked) => setNeedsKnowledgeBase(checked === true)}
                  />
                  <label htmlFor="knowledgeBase" className="text-sm font-medium">
                    I need integration with a knowledge base
                  </label>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Approximately how many emails do you handle daily?</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={emailVolume}
                    onChange={(e) => setEmailVolume(e.target.value)}
                  >
                    <option value="">Select volume</option>
                    <option value="Less than 50">Less than 50</option>
                    <option value="50-200">50-200</option>
                    <option value="200-1000">200-1000</option>
                    <option value="More than 1000">More than 1000</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Search Quality Indicator */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Search Quality</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    searchQuality < 30 ? 'bg-red-500' : 
                    searchQuality < 70 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${searchQuality}%` }}
                />
              </div>
            </div>
            
            {/* Preview of Top Matches */}
            {query && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Preview of Top Matches</p>
                <div className="space-y-2">
                  {searchQuality > 50 && (
                    <>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-3">
                          <h4 className="font-medium text-sm">Email Response Automation</h4>
                          <p className="text-xs text-gray-500">Categorizes and responds to customer emails</p>
                        </CardContent>
                      </Card>
                      
                      {searchQuality > 70 && (
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-3">
                            <h4 className="font-medium text-sm">Smart Email Responder Pro</h4>
                            <p className="text-xs text-gray-500">AI email assistant with knowledge base integration</p>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}
                  
                  {searchQuality < 50 && (
                    <p className="text-xs text-gray-400 italic">Add more details to see potential matches</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAssistantOpen(false)}
              >
                Skip to Results
              </Button>
              <Button 
                size="sm" 
                onClick={handleSearch}
                disabled={query.trim() === ""}
              >
                Search Now
              </Button>
            </div>
            
            {/* Feedback Buttons */}
            <div className="mt-4 flex justify-center space-x-4">
              <button className="text-xs text-gray-500 flex items-center hover:text-gray-700">
                <ThumbsUp className="h-3 w-3 mr-1" /> Helpful
              </button>
              <button className="text-xs text-gray-500 flex items-center hover:text-gray-700">
                <ThumbsDown className="h-3 w-3 mr-1" /> Not Helpful
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default SearchAssistant;
