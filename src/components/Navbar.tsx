
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, MessageSquare, User, Code, ChevronDown } from "lucide-react";
import { CommandDialog, CommandInput } from "@/components/ui/command";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path is in developer section
  const isDeveloperSection = location.pathname.includes("/developer");

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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/find-agents"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-secondary/50 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Browse All Agents
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Explore our marketplace of AI agents ready to solve your business challenges
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/search-results?q=support"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Customer Support</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          AI solutions for email, chat and ticket automation
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/search-results?q=knowledge"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Knowledge Management</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Connect your documentation to AI-powered systems
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Customers</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/customer/dashboard"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">My Dashboard</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Manage your saved agents and inquiries
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/submit-inquiry"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Submit Inquiry</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get help from AI developers for your specific needs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/customer/inquiries"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">My Inquiries</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Track status and responses to your inquiries
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/request-custom-solution"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Request Custom Solution</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get a tailored AI solution for complex needs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Developers</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/developer/dashboard"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Developer Dashboard</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Manage your AI agents and track performance
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/developer/agents/new"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Submit New Agent</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Add your AI agent to the AgentCupid marketplace
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/developer/inquiries"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Browse Inquiries</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Find customer inquiries that match your expertise
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/developer/expertise"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">My Expertise</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Showcase your skills and consulting services
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-4 w-4" />
            </Button>
            
            {isDeveloperSection ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span>Developer</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Developer Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/developer/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/developer/agents">My Agents</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/developer/inquiries">Browse Inquiries</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/developer/profile">Profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Account</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Customer Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/customer/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/customer/inquiries">My Inquiries</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
              <h3 className="text-sm font-medium text-gray-500 px-2 py-1">Discover</h3>
              <Link to="/find-agents" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                Browse All Agents
              </Link>
              <Link to="/search-results?q=support" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                Customer Support
              </Link>
              <Link to="/search-results?q=knowledge" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                Knowledge Management
              </Link>
              
              <h3 className="text-sm font-medium text-gray-500 mt-4 px-2 py-1">For Customers</h3>
              <Link to="/customer/dashboard" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                My Dashboard
              </Link>
              <Link to="/submit-inquiry" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                Submit Inquiry
              </Link>
              <Link to="/customer/inquiries" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                My Inquiries
              </Link>
              
              <h3 className="text-sm font-medium text-gray-500 mt-4 px-2 py-1">For Developers</h3>
              <Link to="/developer/dashboard" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                Developer Dashboard
              </Link>
              <Link to="/developer/agents/new" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                Submit New Agent
              </Link>
              <Link to="/developer/inquiries" className="py-2 px-2 hover:bg-gray-100 rounded-md">
                Browse Inquiries
              </Link>
              
              <div className="pt-2 flex flex-col space-y-2">
                <Button variant="outline" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                
                {isDeveloperSection ? (
                  <Button asChild>
                    <Link to="/developer/dashboard">
                      <Code className="h-4 w-4 mr-2" />
                      Developer Dashboard
                    </Link>
                  </Button>
                ) : (
                  <Button asChild>
                    <Link to="/customer/dashboard">
                      <User className="h-4 w-4 mr-2" />
                      Customer Dashboard
                    </Link>
                  </Button>
                )}
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
