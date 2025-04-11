
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { CommandDialog, CommandInput } from "@/components/ui/command";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    
    if (query?.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold text-lg">AC</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AgentCupid
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link to="/request-custom-solution" className="text-sm font-medium hover:text-primary">
            Request Custom Solution
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            About Us
          </Link>
          <Link to="/developer/dashboard" className="text-sm font-medium hover:text-primary">
            For AI Creators
          </Link>
          <div className="flex space-x-2">
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 border-b border-gray-200">
          <div className="container mx-auto px-4 space-y-4">
            <div className="flex flex-col space-y-2">
              <Link to="/pricing" className="py-2 hover:text-primary">
                Pricing
              </Link>
              <Link to="/request-custom-solution" className="py-2 hover:text-primary">
                Request Custom Solution
              </Link>
              <Link to="/about" className="py-2 hover:text-primary">
                About Us
              </Link>
              <Link to="/developer/dashboard" className="py-2 hover:text-primary">
                For AI Creators
              </Link>
              <div className="pt-2 flex flex-col space-y-2">
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Command Dialog for Search */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            AI-Powered Search
          </h3>
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="relative">
              <CommandInput 
                name="search"
                placeholder="Describe what you need help with..." 
                className="pl-10"
                autoFocus
              />
            </div>
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/find-agents')}
              >
                Advanced Search
              </Button>
              <Button type="submit" size="sm">
                Search
              </Button>
            </div>
          </form>
        </div>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
