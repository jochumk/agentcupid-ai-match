
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, CheckCircle2, Plus, MessageSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InquiryStatusBadge } from "@/components/inquiries/InquiryStatusBadge";
import Navbar from "@/components/Navbar";

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
  {
    id: "INQ-1237",
    title: "Data analysis dashboard",
    status: "open",
    date: "2025-04-11",
    proposals: 1,
    type: "Open",
  },
  {
    id: "INQ-1238",
    title: "Customer feedback analysis system",
    status: "taken",
    date: "2025-04-07",
    proposals: 4,
    type: "Open",
  },
];

const CustomerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInquiries = recentInquiries.filter(
    (inquiry) =>
      inquiry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-gray-600">Manage your inquiries and AI solutions</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            <Button variant="outline" asChild>
              <Link to="/find-agents">Browse Agents</Link>
            </Button>
            <Button asChild>
              <Link to="/submit-inquiry">
                <Plus className="mr-2 h-4 w-4" />
                New Inquiry
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="inquiries" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="inquiries">My Inquiries</TabsTrigger>
            <TabsTrigger value="agents">Saved Agents</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <div className="flex justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search inquiries..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10 flex-shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium">My Inquiries</h3>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/customer/inquiries">View All</Link>
                </Button>
              </div>
              
              {filteredInquiries.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No inquiries found</h3>
                  <p className="text-gray-500 mt-1 mb-4">
                    You don't have any inquiries yet or none match your search.
                  </p>
                  <Button asChild>
                    <Link to="/submit-inquiry">Create New Inquiry</Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredInquiries.map((inquiry) => (
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
                        <div className="flex items-center space-x-3">
                          {inquiry.proposals > 0 && (
                            <Badge variant="outline" className="text-primary border-primary-foreground/20">
                              {inquiry.proposals} Proposal{inquiry.proposals > 1 ? 's' : ''}
                            </Badge>
                          )}
                          <InquiryStatusBadge status={inquiry.status} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Inquiry Statistics</CardTitle>
                <CardDescription>Overview of your inquiry activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-primary">{recentInquiries.length}</p>
                    <p className="text-sm text-gray-500">Total Inquiries</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-amber-500">
                      {recentInquiries.filter(i => i.status === "active").length}
                    </p>
                    <p className="text-sm text-gray-500">Active</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-500">
                      {recentInquiries.filter(i => i.status === "taken").length}
                    </p>
                    <p className="text-sm text-gray-500">In Progress</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-500">
                      {recentInquiries.filter(i => i.status === "completed").length}
                    </p>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/customer/inquiries">View Detailed Analytics</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="agents">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Discover AI Agents</h3>
              <p className="mt-2 text-gray-500">Find and save AI agents that can help with your business needs.</p>
              <Button className="mt-4" asChild>
                <Link to="/find-agents">Browse Agents</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CustomerDashboard;
