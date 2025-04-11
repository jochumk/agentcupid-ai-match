
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Search, 
  Grid, 
  List, 
  Filter, 
  Star, 
  ChevronDown, 
  BookmarkPlus, 
  ArrowRight,
  Check,
  X,
  Sliders,
  RefreshCw,
  Mail,
  Clock,
  BarChart,
  FileText,
  Globe,
  MessageSquare,
  Zap,
  BadgeCheck
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data for email automation agents
const emailAgents = [
  {
    id: 1,
    name: "EmailMaster Pro",
    description: "Automatically respond to customer support emails using your company's knowledge base with sentiment analysis and multi-language support",
    rating: 4.8,
    reviews: 187,
    price: 149,
    priceModel: "monthly",
    setupDifficulty: "Easy",
    userCapacity: "1-100",
    responseTime: "Instant",
    integrations: ["Gmail", "Outlook", "HelpDesk", "Zendesk"],
    capabilities: ["Auto-categorization", "Sentiment analysis", "Multilingual", "Templates"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    popularityScore: 98,
    timeSaving: "4.5 hours/day",
    costSaving: "$2,800/month"
  },
  {
    id: 2,
    name: "ResponseAI",
    description: "Intelligent email response system that learns your company voice and creates personalized replies for each customer inquiry",
    rating: 4.6,
    reviews: 142,
    price: 99,
    priceModel: "monthly",
    setupDifficulty: "Moderate",
    userCapacity: "1-50",
    responseTime: "Minutes",
    integrations: ["Gmail", "Outlook", "Intercom", "Slack"],
    capabilities: ["Auto-categorization", "Templates", "Document handling"],
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    popularityScore: 85,
    timeSaving: "3.2 hours/day",
    costSaving: "$2,100/month"
  },
  {
    id: 3,
    name: "MailGenius",
    description: "Complete email workflow automation with advanced routing, tagging, and response generation based on customer history",
    rating: 4.9,
    reviews: 203,
    price: 249,
    priceModel: "monthly",
    setupDifficulty: "Complex",
    userCapacity: "Unlimited",
    responseTime: "Instant",
    integrations: ["Gmail", "Outlook", "HubSpot", "Salesforce", "Zoho"],
    capabilities: ["Auto-categorization", "Sentiment analysis", "Multilingual", "Templates", "Document handling"],
    imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    popularityScore: 92,
    timeSaving: "6.1 hours/day",
    costSaving: "$3,900/month"
  },
  {
    id: 4,
    name: "InboxZero",
    description: "Keep your team's inbox at zero with smart categorization and automated responses to common customer questions",
    rating: 4.4,
    reviews: 87,
    price: 79,
    priceModel: "monthly",
    setupDifficulty: "Easy",
    userCapacity: "1-10",
    responseTime: "Minutes",
    integrations: ["Gmail", "Outlook"],
    capabilities: ["Auto-categorization", "Templates"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    popularityScore: 79,
    timeSaving: "2.8 hours/day",
    costSaving: "$1,700/month"
  },
  {
    id: 5,
    name: "CustomerMailBot",
    description: "Specialized AI assistant for customer support teams with detailed analytics and continuous improvement",
    rating: 4.7,
    reviews: 156,
    price: 129,
    priceModel: "monthly",
    setupDifficulty: "Moderate",
    userCapacity: "1-100",
    responseTime: "Minutes",
    integrations: ["Gmail", "Outlook", "Zendesk", "Freshdesk"],
    capabilities: ["Auto-categorization", "Sentiment analysis", "Templates", "Document handling"],
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    popularityScore: 88,
    timeSaving: "4.0 hours/day",
    costSaving: "$2,500/month"
  },
  {
    id: 6,
    name: "MultilingualMail",
    description: "Automatically respond to customer emails in over 50 languages with natural-sounding translations and cultural awareness",
    rating: 4.5,
    reviews: 112,
    price: 169,
    priceModel: "monthly",
    setupDifficulty: "Moderate",
    userCapacity: "1-50",
    responseTime: "Minutes",
    integrations: ["Gmail", "Outlook", "HelpScout"],
    capabilities: ["Multilingual", "Sentiment analysis", "Templates"],
    imageUrl: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1410&q=80",
    popularityScore: 82,
    timeSaving: "3.7 hours/day",
    costSaving: "$2,350/month"
  }
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || "Answer customer emails automatically";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState<string>("0");
  const [userCapacity, setUserCapacity] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [integrations, setIntegrations] = useState<string[]>([]);
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [responseTime, setResponseTime] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Filtered agents based on selected filters
  const [filteredAgents, setFilteredAgents] = useState(emailAgents);

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 500]);
    setMinRating("0");
    setUserCapacity("");
    setDifficulty("");
    setIntegrations([]);
    setCapabilities([]);
    setResponseTime("");
    setSortBy("relevance");
  };

  // Handle toggling an agent for comparison
  const toggleAgentSelection = (agentId: number) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else {
      if (selectedAgents.length < 3) {
        setSelectedAgents([...selectedAgents, agentId]);
      }
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let results = [...emailAgents];
    
    // Apply price filter
    results = results.filter(agent => 
      agent.price >= priceRange[0] && agent.price <= priceRange[1]
    );
    
    // Apply rating filter
    if (minRating !== "0") {
      results = results.filter(agent => agent.rating >= Number(minRating));
    }
    
    // Apply user capacity filter
    if (userCapacity) {
      results = results.filter(agent => agent.userCapacity === userCapacity);
    }
    
    // Apply difficulty filter
    if (difficulty) {
      results = results.filter(agent => agent.setupDifficulty === difficulty);
    }
    
    // Apply integrations filter
    if (integrations.length > 0) {
      results = results.filter(agent => 
        integrations.some(integration => agent.integrations.includes(integration))
      );
    }
    
    // Apply capabilities filter
    if (capabilities.length > 0) {
      results = results.filter(agent => 
        capabilities.some(capability => agent.capabilities.includes(capability))
      );
    }
    
    // Apply response time filter
    if (responseTime) {
      results = results.filter(agent => agent.responseTime === responseTime);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        results.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      default:
        // Default 'relevance' sorting is already applied in the mock data
        break;
    }
    
    setFilteredAgents(results);
  }, [priceRange, minRating, userCapacity, difficulty, integrations, capabilities, responseTime, sortBy]);

  // Handle search query submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    // In a real app, this would trigger a new search
  };

  // Handle integration toggle
  const toggleIntegration = (integration: string) => {
    if (integrations.includes(integration)) {
      setIntegrations(integrations.filter(i => i !== integration));
    } else {
      setIntegrations([...integrations, integration]);
    }
  };

  // Handle capability toggle
  const toggleCapability = (capability: string) => {
    if (capabilities.includes(capability)) {
      setCapabilities(capabilities.filter(c => c !== capability));
    } else {
      setCapabilities([...capabilities, capability]);
    }
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-400 opacity-50"
              : "text-gray-300"
          }`}
        />
      ));
  };

  // Check if we have results
  const hasResults = filteredAgents.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 md:pt-24 bg-gray-50">
        {/* Search header */}
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
            
            <div className="flex items-center justify-between mt-4 border-t pt-4">
              <div className="text-sm text-gray-600">
                Found <span className="font-medium">{filteredAgents.length}</span> AI agents
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
          </div>
        </div>
          
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
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
                  {/* Price Range */}
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
                  
                  {/* Minimum Rating */}
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
                  
                  {/* User Capacity */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">User Capacity</h3>
                    <Select value={userCapacity} onValueChange={setUserCapacity}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any Capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Capacity</SelectItem>
                        <SelectItem value="1-10">1-10 Users</SelectItem>
                        <SelectItem value="1-50">1-50 Users</SelectItem>
                        <SelectItem value="1-100">1-100 Users</SelectItem>
                        <SelectItem value="Unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Implementation Difficulty */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Implementation Difficulty</h3>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Any Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Difficulty</SelectItem>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Complex">Complex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Integrations */}
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
                  
                  {/* Advanced Filters */}
                  <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
                        <span className="text-sm font-medium">Advanced Filters</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-6">
                      {/* Email Capabilities */}
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
                      
                      {/* Response Time */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Response Time</h3>
                        <Select value={responseTime} onValueChange={setResponseTime}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Any Response Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any Response Time</SelectItem>
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
              
              {/* Active Filters */}
              {(integrations.length > 0 || capabilities.length > 0 || minRating !== "0" || userCapacity !== "" || difficulty !== "" || responseTime !== "") && (
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
              )}
              
              {/* Comparison Panel */}
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
            
            {/* Results */}
            <div className="w-full lg:w-3/4">
              {hasResults ? (
                <>
                  <Tabs defaultValue="all" className="mb-6">
                    <TabsList>
                      <TabsTrigger value="all">All Results ({filteredAgents.length})</TabsTrigger>
                      <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
                      <TabsTrigger value="best-value">Best Value</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {/* Featured Section */}
                  {filteredAgents.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <BadgeCheck className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-medium">Featured Email Automation</h2>
                      </div>
                      
                      <Card className="overflow-hidden transition-all hover:shadow-md border-primary/30">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="p-6 md:col-span-2">
                            <CardTitle className="text-xl mb-2">{filteredAgents[0].name}</CardTitle>
                            <p className="text-gray-600 mb-4">{filteredAgents[0].description}</p>
                            
                            <div className="flex items-center gap-1 mb-4">
                              <div className="flex">
                                {renderStars(filteredAgents[0].rating)}
                              </div>
                              <span className="text-sm text-gray-500 ml-1">
                                ({filteredAgents[0].rating}) • {filteredAgents[0].reviews} reviews
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Price</span>
                                <span className="font-medium">${filteredAgents[0].price}/{filteredAgents[0].priceModel}</span>
                              </div>
                              
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Setup</span>
                                <span className="font-medium">{filteredAgents[0].setupDifficulty}</span>
                              </div>
                              
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Response Time</span>
                                <span className="font-medium">{filteredAgents[0].responseTime}</span>
                              </div>
                              
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">User Capacity</span>
                                <span className="font-medium">{filteredAgents[0].userCapacity}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {filteredAgents[0].capabilities.map((capability) => (
                                <span 
                                  key={capability} 
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                                >
                                  {capability}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex gap-3">
                              <Button size="sm" asChild>
                                <Link to={`/agent/${filteredAgents[0].id}`}>
                                  View Details
                                </Link>
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toggleAgentSelection(filteredAgents[0].id)}
                                className={selectedAgents.includes(filteredAgents[0].id) ? "bg-primary/10" : ""}
                              >
                                {selectedAgents.includes(filteredAgents[0].id) ? "Selected" : "Select for Comparison"}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="relative h-full min-h-[200px] bg-gray-100">
                            <img 
                              src={filteredAgents[0].imageUrl} 
                              alt={filteredAgents[0].name} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-4">
                              <div className="grid grid-cols-2 gap-2 text-white">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span className="text-sm">Saves {filteredAgents[0].timeSaving}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BarChart className="h-4 w-4" />
                                  <span className="text-sm">Saves {filteredAgents[0].costSaving}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                  
                  {/* Results Grid or List */}
                  <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
                    {filteredAgents.slice(1).map((agent) => (
                      viewMode === "grid" ? (
                        <Card key={agent.id} className="overflow-hidden transition-all hover:shadow-md">
                          <CardHeader className="p-0">
                            <div className="relative h-40 overflow-hidden">
                              <img 
                                src={agent.imageUrl} 
                                alt={agent.name} 
                                className="w-full h-full object-cover"
                              />
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                                onClick={() => toggleAgentSelection(agent.id)}
                              >
                                {selectedAgents.includes(agent.id) ? (
                                  <Check className="h-4 w-4 text-primary" />
                                ) : (
                                  <BookmarkPlus className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-5">
                            <CardTitle className="text-lg mb-2">{agent.name}</CardTitle>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{agent.description}</p>
                            
                            <div className="flex items-center gap-1 mb-3">
                              <div className="flex">
                                {renderStars(agent.rating)}
                              </div>
                              <span className="text-xs text-gray-500 ml-1">
                                ({agent.rating}) • {agent.reviews} reviews
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                ${agent.price}/{agent.priceModel}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {agent.setupDifficulty}
                              </span>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Key Features:</p>
                              <div className="flex flex-wrap gap-1">
                                {agent.capabilities.slice(0, 3).map((capability) => (
                                  <span 
                                    key={capability} 
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600"
                                  >
                                    {capability}
                                  </span>
                                ))}
                                {agent.capabilities.length > 3 && (
                                  <span className="text-xs text-gray-500">+{agent.capabilities.length - 3} more</span>
                                )}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="px-5 py-3 border-t bg-gray-50 flex justify-between">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/agent/${agent.id}`} className="flex items-center">
                                View Details
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                            <Button size="sm">Quick Setup</Button>
                          </CardFooter>
                        </Card>
                      ) : (
                        <Card key={agent.id} className="overflow-hidden transition-all hover:shadow-md">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="relative h-full min-h-[120px] overflow-hidden">
                              <img 
                                src={agent.imageUrl} 
                                alt={agent.name} 
                                className="w-full h-full object-cover"
                              />
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                                onClick={() => toggleAgentSelection(agent.id)}
                              >
                                {selectedAgents.includes(agent.id) ? (
                                  <Check className="h-4 w-4 text-primary" />
                                ) : (
                                  <BookmarkPlus className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="md:col-span-2 p-5">
                              <div className="flex flex-col h-full">
                                <div>
                                  <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                                    <span className="text-lg font-medium">${agent.price}/{agent.priceModel}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1 mb-2">
                                    <div className="flex">
                                      {renderStars(agent.rating)}
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">
                                      ({agent.rating}) • {agent.reviews} reviews
                                    </span>
                                  </div>
                                  
                                  <p className="text-gray-600 text-sm mb-3">{agent.description}</p>
                                  
                                  <div className="flex flex-wrap gap-3 mb-3">
                                    <div className="flex items-center gap-1 text-xs">
                                      <Sliders className="h-3 w-3 text-gray-500" />
                                      <span>{agent.setupDifficulty} Setup</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs">
                                      <Clock className="h-3 w-3 text-gray-500" />
                                      <span>{agent.responseTime} Response</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs">
                                      <BarChart className="h-3 w-3 text-gray-500" />
                                      <span>Saves {agent.timeSaving}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-1 mb-4">
                                    {agent.capabilities.map((capability) => (
                                      <span 
                                        key={capability} 
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                                      >
                                        {capability}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex gap-3 mt-auto">
                                  <Button size="sm" asChild>
                                    <Link to={`/agent/${agent.id}`}>
                                      View Details
                                    </Link>
                                  </Button>
                                  
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => toggleAgentSelection(agent.id)}
                                    className={selectedAgents.includes(agent.id) ? "bg-primary/10" : ""}
                                  >
                                    {selectedAgents.includes(agent.id) ? "Selected" : "Compare"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white p-8 rounded-lg border text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-medium mb-2">No results found</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn't find any AI agents that match your current filters. Try broadening your search criteria.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={resetFilters}>
                      Clear All Filters
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/request-custom-solution">
                        Request Custom Solution
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
