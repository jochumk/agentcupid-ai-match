
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultsHeader from "@/components/search/ResultsHeader";
import ResultsToolbar from "@/components/search/ResultsToolbar";
import FilterSidebar from "@/components/search/FilterSidebar";
import ResultsContent from "@/components/search/ResultsContent";
import { emailAgents } from "@/data/emailAgents";

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
  const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>([]);

  const [filteredAgents, setFilteredAgents] = useState(emailAgents);

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

  const toggleAgentSelection = (agentId: number) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else {
      if (selectedAgents.length < 3) {
        setSelectedAgents([...selectedAgents, agentId]);
      }
    }
  };

  const toggleDescriptionExpand = (agentId: number) => {
    if (expandedDescriptions.includes(agentId)) {
      setExpandedDescriptions(expandedDescriptions.filter(id => id !== agentId));
    } else {
      setExpandedDescriptions([...expandedDescriptions, agentId]);
    }
  };

  useEffect(() => {
    let results = [...emailAgents];
    
    results = results.filter(agent => 
      agent.price >= priceRange[0] && agent.price <= priceRange[1]
    );
    
    if (minRating !== "0") {
      results = results.filter(agent => agent.rating >= Number(minRating));
    }
    
    if (userCapacity) {
      results = results.filter(agent => agent.userCapacity === userCapacity);
    }
    
    if (difficulty) {
      results = results.filter(agent => agent.setupDifficulty === difficulty);
    }
    
    if (integrations.length > 0) {
      results = results.filter(agent => 
        integrations.some(integration => agent.integrations.includes(integration))
      );
    }
    
    if (capabilities.length > 0) {
      results = results.filter(agent => 
        capabilities.some(capability => agent.capabilities.includes(capability))
      );
    }
    
    if (responseTime) {
      results = results.filter(agent => agent.responseTime === responseTime);
    }
    
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
        break;
    }
    
    setFilteredAgents(results);
  }, [priceRange, minRating, userCapacity, difficulty, integrations, capabilities, responseTime, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleIntegration = (integration: string) => {
    if (integrations.includes(integration)) {
      setIntegrations(integrations.filter(i => i !== integration));
    } else {
      setIntegrations([...integrations, integration]);
    }
  };

  const toggleCapability = (capability: string) => {
    if (capabilities.includes(capability)) {
      setCapabilities(capabilities.filter(c => c !== capability));
    } else {
      setCapabilities([...capabilities, capability]);
    }
  };

  const handleOpenExternalAgent = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
      
      <div className="pt-16 md:pt-24 bg-gray-50">
        <ResultsHeader 
          initialQuery={initialQuery}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
          
        <div className="container mx-auto px-4 py-8">
          <ResultsToolbar
            filteredAgentsCount={filteredAgents.length}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
              userCapacity={userCapacity}
              setUserCapacity={setUserCapacity}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              integrations={integrations}
              toggleIntegration={toggleIntegration}
              capabilities={capabilities}
              toggleCapability={toggleCapability}
              responseTime={responseTime}
              setResponseTime={setResponseTime}
              resetFilters={resetFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              showAdvancedFilters={showAdvancedFilters}
              setShowAdvancedFilters={setShowAdvancedFilters}
              selectedAgents={selectedAgents}
              toggleAgentSelection={toggleAgentSelection}
              emailAgents={emailAgents}
            />
            
            <div className="w-full lg:w-3/4">
              <ResultsContent
                filteredAgents={filteredAgents}
                viewMode={viewMode}
                selectedAgents={selectedAgents}
                toggleAgentSelection={toggleAgentSelection}
                expandedDescriptions={expandedDescriptions}
                toggleDescriptionExpand={toggleDescriptionExpand}
                handleOpenExternalAgent={handleOpenExternalAgent}
                renderStars={renderStars}
                resetFilters={resetFilters}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
