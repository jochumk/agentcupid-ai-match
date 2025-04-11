
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeveloperProfiles from "@/components/search/DeveloperProfiles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const DeveloperSearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || "AI Developer";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleViewProfile = (developerId: string) => {
    console.log(`Viewing profile: ${developerId}`);
    // Navigate to developer profile page in the future
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add additional search filtering logic here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 md:pt-24 bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  AI Developers: <span className="text-primary">{initialQuery}</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Find experienced AI engineers for your project
                </p>
              </div>
              
              <form onSubmit={handleSearchSubmit} className="w-full md:w-auto">
                <div className="relative">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 w-full md:w-64"
                    placeholder="Search developers..."
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
          </div>
        </div>
          
        <div className="container mx-auto px-4 py-8">
          <DeveloperProfiles onViewProfile={handleViewProfile} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DeveloperSearchResults;
