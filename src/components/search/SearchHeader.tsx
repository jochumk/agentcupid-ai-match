
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchHeaderProps {
  searchTab: "agents" | "developers";
  onSearchTabChange: (value: string) => void;
  agentTabContent: React.ReactNode;
  developerTabContent: React.ReactNode;
}

export default function SearchHeader({
  searchTab,
  onSearchTabChange,
  agentTabContent,
  developerTabContent
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
        onValueChange={(value) => onSearchTabChange(value as "agents" | "developers")}
        className="w-full max-w-xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="agents" className="text-base py-3">Find AI Agents</TabsTrigger>
          <TabsTrigger value="developers" className="text-base py-3">Find AI Developers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents">
          {agentTabContent}
        </TabsContent>
        
        <TabsContent value="developers">
          {developerTabContent}
        </TabsContent>
      </Tabs>
    </div>
  );
}
