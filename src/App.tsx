
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindAgents from "./pages/FindAgents";
import NotFound from "./pages/NotFound";
import DeveloperLogin from "./pages/developer/DeveloperLogin";
import DeveloperSignup from "./pages/developer/DeveloperSignup";
import DeveloperDashboard from "./pages/developer/DeveloperDashboard";
import DeveloperProfile from "./pages/developer/DeveloperProfile";
import AgentSubmission from "./pages/developer/AgentSubmission";
import AgentManagement from "./pages/developer/AgentManagement";
import InquiryManagement from "./pages/developer/InquiryManagement";
import Documentation from "./pages/developer/Documentation";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-agents" element={<FindAgents />} />
          
          {/* Developer Routes */}
          <Route path="/developer/login" element={<DeveloperLogin />} />
          <Route path="/developer/signup" element={<DeveloperSignup />} />
          <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
          <Route path="/developer/profile" element={<DeveloperProfile />} />
          <Route path="/developer/agents/new" element={<AgentSubmission />} />
          <Route path="/developer/agents" element={<AgentManagement />} />
          <Route path="/developer/inquiries" element={<InquiryManagement />} />
          <Route path="/developer/documentation" element={<Documentation />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
