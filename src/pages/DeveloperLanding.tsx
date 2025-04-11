
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchHeader from "@/components/search/SearchHeader";
import AgentSearchTab from "@/components/search/AgentSearchTab";
import ExpertiseSearchTab from "@/components/search/DeveloperSearchTab";
import DeveloperSearchTab from "@/components/search/DeveloperSearchTab";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export default function DeveloperLanding() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get the current tab from URL or default to "developers"
  const currentTab = (searchParams.get("tab") as "agents" | "expertise" | "developers") || "developers";
  
  // Agent search state
  const [agentSearchQuery, setAgentSearchQuery] = useState(searchParams.get("agentQuery") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [setupTime, setSetupTime] = useState<string>("any");
  
  // Expertise search state
  const [expertiseSearchQuery, setExpertiseSearchQuery] = useState(searchParams.get("expertiseQuery") || "");
  const [industry, setIndustry] = useState<string>("any");
  const [budget, setBudget] = useState<string>("any");
  
  // Developer search state
  const [developerSearchQuery, setDeveloperSearchQuery] = useState(searchParams.get("developerQuery") || "");
  const [specialization, setSpecialization] = useState<string>("any");
  const [experience, setExperience] = useState<string>("any");
  
  // Example search prompts
  const examplePrompts = [
    "Customer support automation",
    "Document processing",
    "Sales assistant"
  ];
  
  const handleTabChange = (value: string) => {
    searchParams.set("tab", value);
    setSearchParams(searchParams);
  };
  
  const handleAgentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search-results?q=${encodeURIComponent(agentSearchQuery)}&type=agent`);
  };
  
  const handleExpertiseSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search-results?q=${encodeURIComponent(expertiseSearchQuery)}&type=expertise&industry=${industry}&budget=${budget}`);
  };
  
  const handleDeveloperSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search-results?q=${encodeURIComponent(developerSearchQuery)}&type=developer&specialization=${specialization}&experience=${experience}`);
  };
  
  const handlePromptClick = (prompt: string) => {
    setAgentSearchQuery(prompt);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SearchHeader 
            searchTab={currentTab}
            onSearchTabChange={handleTabChange}
            agentTabContent={
              <AgentSearchTab 
                searchQuery={agentSearchQuery}
                onSearch={setAgentSearchQuery}
                selectedCategories={selectedCategories}
                selectedTools={selectedTools}
                setupTime={setupTime}
                onSubmit={handleAgentSearch}
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
                onSubmit={handleExpertiseSearch}
              />
            }
            developerTabContent={
              <DeveloperSearchTab
                searchQuery={developerSearchQuery}
                onSearch={setDeveloperSearchQuery}
                specialization={specialization}
                onSpecializationChange={setSpecialization}
                experience={experience}
                onExperienceChange={setExperience}
                onSubmit={handleDeveloperSearch}
              />
            }
          />
          
          {/* Featured Developers Section */}
          {currentTab === "developers" && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Featured AI Developers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Example Developer Cards */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full flex items-center justify-center mr-4">
                          <Briefcase className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">AI Developer {i}</h3>
                          <p className="text-sm text-gray-600">Specializing in {i % 3 === 0 ? "NLP" : i % 3 === 1 ? "Computer Vision" : "LLM Integration"}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Expert AI developer with {3 + i} years of experience building cutting-edge solutions for enterprise clients.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Python</span>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">TensorFlow</span>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">PyTorch</span>
                        {i % 2 === 0 && <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Custom LLMs</span>}
                        {i % 3 === 0 && <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">MLOps</span>}
                      </div>
                      <Button className="w-full" variant="outline">View Profile</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  View All Developers
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
