
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpertiseCard } from "@/components/developer/expertise/ExpertiseCard";
import { EmptyState } from "@/components/developer/expertise/EmptyState";

// Mock data for demo purposes
const mockExpertise = [
  {
    id: "1",
    title: "Custom GPT Integration Services",
    category: "Integration Support",
    description: "Help businesses integrate custom GPT models with their existing systems and workflows.",
    experienceLevel: "5+ years",
    industries: ["Technology", "E-commerce", "Healthcare"],
    tools: ["OpenAI API", "Python", "REST APIs", "NodeJS"],
    rateStructure: "Hourly",
    rateRange: "$150-200",
    availability: "Part-time",
    responseTime: "Within 24 hours",
    isActive: true,
  },
  {
    id: "2",
    title: "AI Implementation Strategy",
    category: "Strategic Consulting",
    description: "Develop comprehensive strategies for implementing AI solutions across your organization.",
    experienceLevel: "3-5 years",
    industries: ["Finance", "Retail"],
    tools: ["Microsoft Azure", "Google Cloud", "AWS"],
    rateStructure: "Project-based",
    rateRange: "$5,000-15,000",
    availability: "Limited hours",
    responseTime: "Within 48 hours",
    isActive: true,
  },
];

const Expertise = () => {
  const [expertise, setExpertise] = useState(mockExpertise);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExpertise = expertise.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpertiseStatus = (id: string) => {
    setExpertise(
      expertise.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const deleteExpertise = (id: string) => {
    setExpertise(expertise.filter((item) => item.id !== id));
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Expertise</h1>
            <p className="text-muted-foreground">
              Showcase your additional services and skills to potential clients
            </p>
          </div>
          <Button asChild>
            <Link to="/developer/expertise/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Expertise
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Your Expertise</CardTitle>
            <CardDescription>
              Customers sometimes need help implementing or customizing AI solutions. List your additional expertise to receive service requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search expertise..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear
              </Button>
            </div>

            {expertise.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredExpertise.map((item) => (
                  <ExpertiseCard
                    key={item.id}
                    expertise={item}
                    onToggleStatus={toggleExpertiseStatus}
                    onDelete={deleteExpertise}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DeveloperLayout>
  );
};

export default Expertise;
