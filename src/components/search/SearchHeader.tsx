
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchHeaderProps {
  searchTab: "agents" | "expertise";
  onSearchTabChange: (value: string) => void;
  agentTabContent: React.ReactNode;
  expertiseTabContent: React.ReactNode;
}

export default function SearchHeader({
  searchTab,
  onSearchTabChange,
  agentTabContent,
  expertiseTabContent
}: SearchHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        Find the Perfect Match for Your Needs
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Explore a wide range of AI solutions designed to automate tasks, improve productivity, and enhance your business processes.
      </p>
      
      <Tabs 
        defaultValue="agents" 
        value={searchTab} 
        onValueChange={(value) => onSearchTabChange(value as "agents" | "expertise")}
        className="w-full max-w-xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="agents" className="text-base py-3">Find AI Agents</TabsTrigger>
          <TabsTrigger value="expertise" className="text-base py-3">Find AI Expertise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents">
          {agentTabContent}
        </TabsContent>
        
        <TabsContent value="expertise">
          {expertiseTabContent}
        </TabsContent>
      </Tabs>
    </div>
  );
}
