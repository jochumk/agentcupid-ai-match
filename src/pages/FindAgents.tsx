
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchHeader from "@/components/search/SearchHeader";
import AgentSearchTab from "@/components/search/AgentSearchTab";
import ExpertiseSearchTab from "@/components/search/DeveloperSearchTab";
import DeveloperSearchTab from "@/components/search/DeveloperSearchTab";
import AgentFilters from "@/components/search/AgentFilters";
import PopularCategories from "@/components/search/PopularCategories";
import { categories, categoryDefinitions, renderCategoryIcon } from "@/utils/categoryDefinitions";
import ExamplePrompts from "@/components/search/ExamplePrompts";

const FindAgents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expertiseSearchQuery, setExpertiseSearchQuery] = useState("");
  const [developerSearchQuery, setDeveloperSearchQuery] = useState("");
  const [searchTab, setSearchTab] = useState<"agents" | "expertise" | "developers">("agents");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [setupTime, setSetupTime] = useState<string>("any");
  const [showFilters, setShowFilters] = useState(false);
  const [industry, setIndustry] = useState<string>("any");
  const [budget, setBudget] = useState<string>("any");
  const [specialization, setSpecialization] = useState<string>("any");
  const [experience, setExperience] = useState<string>("any");
  const [businessDescription, setBusinessDescription] = useState<string>("");
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
    } else if (searchTab === "expertise") {
      setExpertiseSearchQuery(prompt);
      navigate(`/search-results?q=${encodeURIComponent(prompt)}&type=expertise`);
    } else {
      setDeveloperSearchQuery(prompt);
      navigate(`/search-results?q=${encodeURIComponent(prompt)}&type=developers`);
    }
  };

  const handleSearch = (query: string) => {
    if (searchTab === "agents") {
      setSearchQuery(query);
    } else if (searchTab === "expertise") {
      setExpertiseSearchQuery(query);
    } else {
      setDeveloperSearchQuery(query);
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
      if (!expertiseSearchQuery.trim() && !businessDescription.trim()) {
        return;
      }
      
      queryParams.append("q", expertiseSearchQuery);
      queryParams.append("type", "expertise");
      
      if (businessDescription.trim()) {
        queryParams.append("description", businessDescription);
      }

      if (industry !== "any") {
        queryParams.append("industry", industry);
      }

      if (budget !== "any") {
        queryParams.append("budget", budget);
      }
      
      if (businessDescription.trim()) {
        const formData = {
          type: "expertise",
          title: expertiseSearchQuery || "Need AI expertise",
          description: businessDescription,
          industry,
          budget
        };
        
        sessionStorage.setItem("inquiryData", JSON.stringify(formData));
        navigate("/submit-inquiry?from=expertise");
        return;
      }
    } else if (searchTab === "developers" && developerSearchQuery) {
      queryParams.append("q", developerSearchQuery);
      queryParams.append("type", "developers");

      if (specialization !== "any") {
        queryParams.append("specialization", specialization);
      }

      if (experience !== "any") {
        queryParams.append("experience", experience);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-12 md:py-20 mt-16">
        <div className="container mx-auto px-4">
          <SearchHeader 
            searchTab={searchTab}
            onSearchTabChange={(value) => setSearchTab(value as "agents" | "expertise" | "developers")}
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
                searchQuery={expertiseSearchQuery}
                onSearch={handleSearch}
                specialization={industry}
                onSpecializationChange={setIndustry}
                experience={budget}
                onExperienceChange={setBudget}
                onSubmit={handleSubmit}
                businessDescription={businessDescription}
                onBusinessDescriptionChange={setBusinessDescription}
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
                onSubmit={handleSubmit}
              />
            }
          />
          
          <PopularCategories 
            showFilters={showFilters} 
            setShowFilters={setShowFilters} 
          />
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
