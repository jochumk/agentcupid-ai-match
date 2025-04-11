
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchHeader from "@/components/search/SearchHeader";
import AgentSearchTab from "@/components/search/AgentSearchTab";
import ExpertiseSearchTab from "@/components/search/DeveloperSearchTab";
import AgentFilters from "@/components/search/AgentFilters";

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
  const [expertiseSearchQuery, setExpertiseSearchQuery] = useState("");
  const [searchTab, setSearchTab] = useState<"agents" | "expertise">("agents");
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
      setExpertiseSearchQuery(prompt);
      navigate(`/search-results?q=${encodeURIComponent(prompt)}&type=expertise`);
    }
  };

  const handleSearch = (query: string) => {
    if (searchTab === "agents") {
      setSearchQuery(query);
    } else {
      setExpertiseSearchQuery(query);
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
    } else if (searchTab === "expertise" && expertiseSearchQuery) {
      queryParams.append("q", expertiseSearchQuery);
      queryParams.append("type", "expertise");

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
          <SearchHeader 
            searchTab={searchTab}
            onSearchTabChange={(value) => setSearchTab(value as "agents" | "expertise")}
            agentTabContent={
              <AgentSearchTab 
                searchQuery={searchQuery}
                onSearch={handleSearch}
                selectedCategories={selectedCategories}
                selectedTools={selectedTools}
                setupTime={setupTime}
                onSubmit={handleSubmit}
                examplePrompts={examplePrompts}
                onPromptClick={handlePromptClick}
              />
            }
            expertiseTabContent={
              <ExpertiseSearchTab 
                expertiseSearchQuery={expertiseSearchQuery}
                onExpertiseSearchQueryChange={setExpertiseSearchQuery}
                industry={industry}
                onIndustryChange={setIndustry}
                budget={budget}
                onBudgetChange={setBudget}
                onSubmit={handleSubmit}
              />
            }
          />
          
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
          </div>
        </div>
      </div>
      
      {searchTab === "agents" && (
        <AgentFilters 
          showFilters={showFilters}
          categoryDefinitions={categoryDefinitions}
          selectedCategories={selectedCategories}
          selectedTools={selectedTools}
          setupTime={setupTime}
          onSetupTimeChange={setSetupTime}
          onCategoryToggle={handleCategoryToggle}
          onToolToggle={handleToolToggle}
          onSubmit={handleSubmit}
          renderCategoryIcon={renderCategoryIcon}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default FindAgents;
