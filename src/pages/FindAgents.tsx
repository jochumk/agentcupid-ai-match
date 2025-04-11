
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Mic, 
  Filter, 
  Star, 
  ChevronDown, 
  BookmarkPlus, 
  ArrowRight,
  Clock,
  TrendingUp,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Mock data for agents
const mockAgents = [
  {
    id: 1,
    name: "EmailMaster",
    description: "Automatically respond to customer support emails using your company's knowledge base",
    rating: 4.8,
    reviews: 127,
    priceRange: "$$ (Monthly subscription)",
    setupTime: "Quick Setup",
    worksWithTools: ["Gmail", "Outlook", "HelpDesk"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    categories: ["Customer Support", "Email Automation"]
  },
  {
    id: 2,
    name: "InvoiceHelper",
    description: "Process invoices automatically and prepare them for your accounting system",
    rating: 4.5,
    reviews: 89,
    priceRange: "$$ (Monthly subscription)",
    setupTime: "Some Setup",
    worksWithTools: ["QuickBooks", "Xero", "Gmail"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    categories: ["Finance", "Document Processing"]
  },
  {
    id: 3,
    name: "MeetingScribe",
    description: "Transcribe and summarize your business meetings with action items",
    rating: 4.7,
    reviews: 112,
    priceRange: "$ (Pay per use)",
    setupTime: "Quick Setup",
    worksWithTools: ["Zoom", "Teams", "Google Meet"],
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    categories: ["Productivity", "Meeting Management"]
  },
  {
    id: 4,
    name: "SocialResponder",
    description: "Automatically engage with customers across all your social media channels",
    rating: 4.3,
    reviews: 78,
    priceRange: "$$ (Monthly subscription)",
    setupTime: "Some Setup",
    worksWithTools: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
    imageUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    categories: ["Social Media", "Customer Support"]
  }
];

// Business categories
const businessCategories = [
  "Customer Support",
  "Sales",
  "Marketing",
  "Finance",
  "HR",
  "Productivity",
  "Document Processing",
  "Meeting Management",
  "Social Media"
];

// Business tools
const businessTools = [
  "Gmail",
  "Outlook",
  "Slack",
  "Teams",
  "Zoom",
  "QuickBooks",
  "Xero",
  "Salesforce",
  "HubSpot"
];

const FindAgents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([50]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [setupTime, setSetupTime] = useState<string>("any");
  const [showFilters, setShowFilters] = useState(false);

  // Example search prompts that rotate
  const examplePrompts = [
    "Answer customer emails automatically",
    "Process invoices faster",
    "Summarize meeting notes",
    "Manage social media responses",
    "Screen job applications"
  ];

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleToolToggle = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter(t => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 md:pt-24">
        {/* Hero section with search */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Find the Perfect AI Assistant for Your Business</h1>
              <p className="text-lg text-gray-600">
                Tell us what you need help with, and we'll match you with AI agents that can solve your business challenges.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto relative mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Describe what you need help with in your business..."
                  className="pr-20 pl-12 py-6 text-lg rounded-full border-2 focus:border-primary/50 h-16"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Mic className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 max-w-2xl mx-auto">
              <span>Try:</span>
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="hover:text-primary hover:underline transition-colors"
                  onClick={() => setSearchQuery(prompt)}
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          {/* Filters */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <h2 className="text-xl font-medium">Refine Results</h2>
              </div>
              <Button 
                variant="ghost" 
                className="text-sm flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show All Filters"}
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
            </div>
            
            {showFilters && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider 
                        value={priceRange} 
                        onValueChange={setPriceRange}
                        max={100}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>$</span>
                        <span>$$</span>
                        <span>$$$</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Setup Time */}
                  <div>
                    <h3 className="font-medium mb-3">Time to Implement</h3>
                    <ToggleGroup 
                      type="single" 
                      value={setupTime}
                      onValueChange={(value) => {
                        if (value) setSetupTime(value);
                      }}
                      className="flex flex-wrap gap-2"
                    >
                      <ToggleGroupItem value="quick" className="text-xs">
                        Quick Setup
                      </ToggleGroupItem>
                      <ToggleGroupItem value="some" className="text-xs">
                        Some Setup
                      </ToggleGroupItem>
                      <ToggleGroupItem value="custom" className="text-xs">
                        Custom Setup
                      </ToggleGroupItem>
                      <ToggleGroupItem value="any" className="text-xs">
                        Any
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  {/* Business Categories */}
                  <div>
                    <h3 className="font-medium mb-3">Business Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {businessCategories.slice(0, 6).map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                    {businessCategories.length > 6 && (
                      <Button variant="link" className="text-xs p-0 h-auto mt-2">
                        Show all categories
                      </Button>
                    )}
                  </div>
                  
                  {/* Works With */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <h3 className="font-medium mb-3">Works With</h3>
                    <div className="flex flex-wrap gap-2">
                      {businessTools.map((tool) => (
                        <Button
                          key={tool}
                          variant={selectedTools.includes(tool) ? "default" : "outline"}
                          className="text-xs h-8"
                          onClick={() => handleToolToggle(tool)}
                        >
                          {tool}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Agent Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAgents.map((agent) => (
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
                    >
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{agent.name}</CardTitle>
                  <p className="text-gray-600 mb-4">{agent.description}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {renderStars(agent.rating)}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                      ({agent.rating}) • {agent.reviews} reviews
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {agent.priceRange}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {agent.setupTime}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm text-gray-500 mb-1">Works with:</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.worksWithTools.map((tool) => (
                        <span 
                          key={tool} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 border-t bg-gray-50 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/agent/${agent.id}`} className="flex items-center">
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="sm">Start Setup</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Not finding what you need section */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-medium mb-2">Not finding what you need?</h3>
                <p className="text-gray-600 mb-4">
                  Our team of AI experts can help you find or build a custom solution for your specific business needs.
                </p>
                <Button asChild>
                  <Link to="/request-custom-solution">Request Custom Solution</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Popular with businesses like yours */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium">Popular with businesses like yours</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {mockAgents.slice(0, 3).map((agent) => (
                <div key={agent.id} className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={agent.imageUrl} 
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {renderStars(agent.rating)}
                      </div>
                      <span className="text-xs text-gray-500">({agent.rating})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recently viewed */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium">Recently viewed</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {mockAgents.slice(1, 4).reverse().map((agent) => (
                <div key={agent.id} className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={agent.imageUrl} 
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {agent.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FindAgents;
