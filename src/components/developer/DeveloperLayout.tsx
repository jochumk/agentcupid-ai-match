
import { Link, useLocation } from "react-router-dom";
import {
  BarChart2,
  BookOpen,
  ChevronLeft,
  FileText,
  Inbox,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DeveloperLayoutProps {
  children: React.ReactNode;
}

const DeveloperLayout = ({ children }: DeveloperLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      href: "/developer/dashboard",
      icon: BarChart2,
    },
    {
      name: "My Agents",
      href: "/developer/agents",
      icon: FileText,
    },
    {
      name: "Add New Agent",
      href: "/developer/agents/new",
      icon: Plus,
    },
    {
      name: "Customer Inquiries",
      href: "/developer/inquiries",
      icon: MessageSquare,
    },
    {
      name: "Documentation",
      href: "/developer/documentation",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-full bg-white shadow-md"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AC</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  AgentCupid
                </span>
              </Link>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-6 flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>DD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Developer Studio</p>
                <p className="text-xs text-gray-500">AI Agent Creator</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="px-3 py-4 border-t border-gray-200">
            <Link
              to="/developer/settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
              Settings
            </Link>
            <Link
              to="/developer/profile"
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === "/developer/profile"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <User className="mr-3 h-5 w-5 flex-shrink-0" />
              My Profile
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          isSidebarOpen ? "md:ml-64" : "ml-0"
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DeveloperLayout;
