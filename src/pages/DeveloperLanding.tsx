
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchHeader from "@/components/search/SearchHeader";
import AgentSearchTab from "@/components/search/AgentSearchTab";
import DeveloperSearchTab from "@/components/search/DeveloperSearchTab";
import DeveloperProfiles from "@/components/search/DeveloperProfiles";
import { toast } from "sonner";

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
  
  const handleSearch = (query: string) => {
    if (currentTab === "agents") {
      setAgentSearchQuery(query);
    } else if (currentTab === "expertise") {
      setExpertiseSearchQuery(query);
    } else {
      setDeveloperSearchQuery(query);
    }
  };
  
  const handlePromptClick = (prompt: string) => {
    setAgentSearchQuery(prompt);
  };

  const handleViewProfile = (developerId: string) => {
    toast.info("This feature is coming soon!");
    console.log("View developer profile:", developerId);
    // In a real app, this would navigate to the developer's profile page
    // navigate(`/developer-profile/${developerId}`);
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
                onSearch={handleSearch}
                selectedCategories={selectedCategories}
                selectedTools={selectedTools}
                setupTime={setupTime}
                onSubmit={handleAgentSearch}
                examplePrompts={examplePrompts}
                onPromptClick={handlePromptClick}
              />
            }
            expertiseTabContent={
              <DeveloperSearchTab 
                searchQuery={expertiseSearchQuery}
                onSearch={handleSearch}
                specialization={industry}
                onSpecializationChange={setIndustry}
                experience={budget}
                onExperienceChange={setBudget}
                onSubmit={handleExpertiseSearch}
                isExpertiseTab={true}
              />
            }
            developerTabContent={
              <DeveloperSearchTab
                searchQuery={developerSearchQuery}
                onSearch={handleSearch}
                specialization={specialization}
                onSpecializationChange={setSpecialization}
                experience={experience}
                onExperienceChange={setExperience}
                onSubmit={handleDeveloperSearch}
              />
            }
          />
          
          {/* Developer Profiles Section - Replaces the previous Featured Developers Section */}
          {currentTab === "developers" && (
            <DeveloperProfiles onViewProfile={handleViewProfile} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
