
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Grid3X3, List, StarIcon, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

// Mock data for saved agents
const savedAgents = [
  {
    id: 1,
    name: "EmailGenius",
    description: "AI-powered email classification and response system",
    category: "Email Automation",
    tags: ["Email", "Support", "Classification"],
    rating: 4.8,
    price: "$49/mo",
    developer: "AI Solutions Inc.",
    saved: true,
  },
  {
    id: 2,
    name: "DocConnect",
    description: "Connect documentation to your support workflow",
    category: "Knowledge Base Integration",
    tags: ["Documentation", "Knowledge Base", "Support"],
    rating: 4.6,
    price: "$39/mo",
    developer: "Tech AI Labs",
    saved: true,
  },
];

// Mock data for recent inquiries
const recentInquiries = [
  {
    id: "INQ-1234",
    title: "Email automation for customer support",
    status: "active",
    date: "2025-04-10",
    proposals: 3,
    type: "Open",
  },
  {
    id: "INQ-1235",
    title: "Knowledge base integration with chatbot",
    status: "pending",
    date: "2025-04-09",
    proposals: 0,
    type: "Direct",
  },
  {
    id: "INQ-1236",
    title: "AI training for customer service team",
    status: "completed",
    date: "2025-04-05",
    proposals: 5,
    type: "Open",
  },
];

const CustomerDashboard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = savedAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-gray-600">Manage your agents and inquiries</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/find-agents">Browse Agents</Link>
            </Button>
            <Button asChild>
              <Link to="/submit-inquiry">
                Submit Inquiry
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="agents" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="agents">Saved Agents</TabsTrigger>
            <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="agents">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search saved agents..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("grid")}
                  className="h-8 w-8"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("list")}
                  className="h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {filteredAgents.length > 0 ? (
              <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {filteredAgents.map((agent) => (
                  <Card key={agent.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{agent.name}</CardTitle>
                        <Badge>{agent.category}</Badge>
                      </div>
                      <CardDescription>{agent.developer}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-2">{agent.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {agent.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="text-primary font-medium">{agent.price}</div>
                      <Button asChild size="sm">
                        <Link to={`/agent/${agent.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <StarIcon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No saved agents</h3>
                <p className="mt-2 text-gray-500">You haven't saved any agents yet.</p>
                <Button className="mt-4" asChild>
                  <Link to="/find-agents">Browse Agents</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="inquiries">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Recent Inquiries</h3>
                  <Button size="sm" asChild>
                    <Link to="/customer/inquiries">View All</Link>
                  </Button>
                </div>
              </div>
              <div className="divide-y">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/customer/inquiries/${inquiry.id}`} className="font-medium hover:text-primary">
                          {inquiry.title}
                        </Link>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span className="mr-3">ID: {inquiry.id}</span>
                          <span className="mr-3">Type: {inquiry.type}</span>
                          <span>
                            <Clock className="inline h-3 w-3 mr-1" />
                            {inquiry.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {inquiry.status === "active" && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {inquiry.proposals} Proposals
                          </Badge>
                        )}
                        {inquiry.status === "pending" && (
                          <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                            Pending
                          </Badge>
                        )}
                        {inquiry.status === "completed" && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CustomerDashboard;
