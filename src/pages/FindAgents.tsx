
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  MessagesSquare, 
  Brain,
  BarChart,
  Briefcase,
  Cloud,
  Code,
  DollarSign,
  Headphones,
  Heart,
  Image,
  Languages,
  Music,
  PenTool,
  ShoppingCart,
  Video,
  ChevronDown,
  Users,
  BookOpen,
  Building2,
  FileText,
  Settings,
  Calendar,
  Mail,
  Search
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import SearchAssistant from "@/components/search/SearchAssistant";

const categoryDefinitions = {
  communication: {
    name: "Communication",
    description: "Enhance team collaboration and customer engagement.",
    icon: MessagesSquare,
    tools: ["Slack", "Microsoft Teams", "Zoom", "Email"]
  },
  writing: {
    name: "Writing & Content",
    description: "Generate high-quality content for blogs, articles, and marketing.",
    icon: PenTool,
    tools: ["Google Docs", "Medium", "WordPress"]
  },
  productivity: {
    name: "Productivity",
    description: "Streamline workflows and automate repetitive tasks.",
    icon: BarChart,
    tools: ["Trello", "Asana", "Monday.com"]
  },
  sales: {
    name: "Sales & Marketing",
    description: "Boost sales performance and marketing effectiveness.",
    icon: DollarSign,
    tools: ["Salesforce", "HubSpot", "Mailchimp"]
  },
  customerService: {
    name: "Customer Service",
    description: "Improve customer satisfaction and support efficiency.",
    icon: Headphones,
    tools: ["Zendesk", "Intercom", "Help Scout"]
  },
  hr: {
    name: "Human Resources",
    description: "Automate HR processes and improve employee experience.",
    icon: Users,
    tools: ["Workday", "BambooHR", "Greenhouse"]
  },
  finance: {
    name: "Finance",
    description: "Manage finances, automate accounting, and improve financial insights.",
    icon: DollarSign,
    tools: ["QuickBooks", "Xero", "NetSuite"]
  },
  education: {
    name: "Education",
    description: "Enhance learning experiences and automate educational tasks.",
    icon: BookOpen,
    tools: ["Google Classroom", "Canvas", "Moodle"]
  },
  research: {
    name: "Research & Development",
    description: "Accelerate research processes and improve data analysis.",
    icon: Brain,
    tools: ["Jupyter Notebook", "MATLAB", "SPSS"]
  },
  projectManagement: {
    name: "Project Management",
    description: "Organize projects, track progress, and improve team collaboration.",
    icon: Briefcase,
    tools: ["Jira", "Asana", "Trello"]
  },
  cloudServices: {
    name: "Cloud Services",
    description: "Manage cloud infrastructure, automate deployments, and improve scalability.",
    icon: Cloud,
    tools: ["AWS", "Azure", "Google Cloud"]
  },
  softwareDevelopment: {
    name: "Software Development",
    description: "Automate coding tasks, improve code quality, and accelerate development cycles.",
    icon: Code,
    tools: ["GitHub", "GitLab", "Bitbucket"]
  },
  healthcare: {
    name: "Healthcare",
    description: "Improve patient care, automate administrative tasks, and enhance medical research.",
    icon: Heart,
    tools: ["Epic", "Cerner", "Meditech"]
  },
  media: {
    name: "Media & Entertainment",
    description: "Automate content creation, improve media management, and enhance user engagement.",
    icon: Image,
    tools: ["Adobe Creative Suite", "Final Cut Pro", "DaVinci Resolve"]
  },
  localization: {
    name: "Localization",
    description: "Automate translation processes, improve localization accuracy, and expand global reach.",
    icon: Languages,
    tools: ["SDL Trados", "memoQ", "Transifex"]
  },
  music: {
    name: "Music Production",
    description: "Automate music creation, improve audio quality, and enhance music distribution.",
    icon: Music,
    tools: ["Ableton Live", "Logic Pro", "Pro Tools"]
  },
  ecommerce: {
    name: "E-commerce",
    description: "Automate online sales, improve customer experience, and enhance marketing efforts.",
    icon: ShoppingCart,
    tools: ["Shopify", "Magento", "WooCommerce"]
  },
  videoProduction: {
    name: "Video Production",
    description: "Automate video editing, improve video quality, and enhance video distribution.",
    icon: Video,
    tools: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve"]
  },
  legal: {
    name: "Legal",
    description: "Automate legal processes, improve document management, and enhance legal research.",
    icon: FileText,
    tools: ["LexisNexis", "Westlaw", "Practical Law"]
  },
  manufacturing: {
    name: "Manufacturing",
    description: "Automate manufacturing processes, improve production efficiency, and enhance quality control.",
    icon: Building2,
    tools: ["SAP", "Oracle", "Siemens"]
  }
};

const categories = Object.values(categoryDefinitions);

const FindAgents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [devSearchQuery, setDevSearchQuery] = useState("");
  const [searchTab, setSearchTab] = useState<"agents" | "developers">("agents");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [setupTime, setSetupTime] = useState<string>("any");
  const [showFilters, setShowFilters] = useState(false);
  const [industry, setIndustry] = useState<string>("any");
  const [budget, setBudget] = useState<string>("any");
  const navigate = useNavigate();

  const examplePrompts = [
    "Answer customer emails automatically", 
    "Generate blog content weekly",
    "Summarize meeting recordings",
    "Manage social media responses",
    "Screen job applications"
  ];

  const handlePromptClick = (prompt: string) => {
    if (searchTab === "agents") {
      setSearchQuery(prompt);
      navigate(`/search-results?q=${encodeURIComponent(prompt)}&type=agents`);
    } else {
      setDevSearchQuery(prompt);
      navigate(`/search-results?q=${encodeURIComponent(prompt)}&type=developers`);
    }
  };

  const handleSearch = (query: string) => {
    if (searchTab === "agents") {
      setSearchQuery(query);
    } else {
      setDevSearchQuery(query);
    }
  };

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();

    if (searchTab === "agents" && searchQuery) {
      queryParams.append("q", searchQuery);
      queryParams.append("type", "agents");

      if (selectedCategories.length > 0) {
        queryParams.append("categories", selectedCategories.join(","));
      }

      if (selectedTools.length > 0) {
        queryParams.append("tools", selectedTools.join(","));
      }

      if (setupTime !== "any") {
        queryParams.append("setupTime", setupTime);
      }
    } else if (searchTab === "developers" && devSearchQuery) {
      queryParams.append("q", devSearchQuery);
      queryParams.append("type", "developers");

      if (industry !== "any") {
        queryParams.append("industry", industry);
      }

      if (budget !== "any") {
        queryParams.append("budget", budget);
      }
    }

    navigate(`/search-results?${queryParams.toString()}`);
  };

  const handleToolToggle = (toolName: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolName)
        ? prev.filter((name) => name !== toolName)
        : [...prev, toolName]
    );
  };

  const renderCategoryIcon = (categoryName: string) => {
    const category = categoryDefinitions[categoryName as keyof typeof categoryDefinitions];
    if (category && category.icon) {
      return <category.icon className="h-5 w-5 mr-2" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-12 md:py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Find the Perfect Match for Your Needs
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Explore a wide range of AI solutions designed to automate tasks, improve productivity, and enhance your business processes.
            </p>
            
            <Tabs 
              defaultValue="agents" 
              value={searchTab} 
              onValueChange={(value) => setSearchTab(value as "agents" | "developers")}
              className="w-full max-w-xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="agents" className="text-base py-3">Find AI Agents</TabsTrigger>
                <TabsTrigger value="developers" className="text-base py-3">Find AI Developers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="agents">
                <SearchAssistant onSearch={handleSearch} initialQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="developers">
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Describe your business challenge... 
Example: We need help automating our customer support workflow by integrating with our existing CRM system..."
                    value={devSearchQuery}
                    onChange={(e) => setDevSearchQuery(e.target.value)}
                    className="min-h-[120px] p-4 text-base"
                  />
                  <p className="text-sm text-gray-500 text-left">
                    The more details you provide, the better matches we can find
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <Select value={industry} onValueChange={setIndustry}>
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
                      <Select value={budget} onValueChange={setBudget}>
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
                    onClick={handleSubmit} 
                    className="w-full rounded-full mt-4"
                    disabled={!devSearchQuery.trim()}
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Find AI Developers
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Popular Searches
              </h2>
              <button 
                className="text-primary text-sm hover:underline focus:outline-none"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? (
                  <>
                    Hide Filters
                    <ChevronDown className="h-4 w-4 ml-1 inline-block transform rotate-180" />
                  </>
                ) : (
                  <>
                    Show Filters
                    <ChevronDown className="h-4 w-4 ml-1 inline-block" />
                  </>
                )}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {examplePrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  className="rounded-full"
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`bg-white py-8 ${showFilters && searchTab === "agents" ? 'block' : 'hidden'}`}>
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
                      onClick={() => handleCategoryToggle(category.name)}
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
                      onClick={() => handleToolToggle(tool)}
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
              <Select value={setupTime} onValueChange={setSetupTime}>
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
              <Button onClick={handleSubmit} className="w-full rounded-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FindAgents;
