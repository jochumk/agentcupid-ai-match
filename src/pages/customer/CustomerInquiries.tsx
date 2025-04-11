
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Star,
  Users,
  Edit,
  Eye,
} from "lucide-react";

// Mock data for customer inquiries
const mockCustomerInquiries = [
  {
    id: "INQ-001",
    projectTitle: "AI Email Response System Integration",
    description: "Looking for a developer to help integrate an AI-powered email response system with our existing customer service platform.",
    status: "active",
    dateSubmitted: "2025-04-08T14:30:00Z",
    proposalCount: 3,
    unreadMessages: 2,
    matchedDevelopers: [
      { id: "dev1", name: "Alex Johnson", rating: 4.9, avatar: "" },
      { id: "dev2", name: "Sarah Lee", rating: 4.8, avatar: "" },
      { id: "dev3", name: "Michael Chen", rating: 4.7, avatar: "" },
    ],
  },
  {
    id: "INQ-002",
    projectTitle: "Customer Data Analysis Dashboard",
    description: "Need a custom dashboard to analyze customer data and provide insights for our marketing team.",
    status: "draft",
    dateSubmitted: "2025-04-07T10:15:00Z",
    proposalCount: 0,
    unreadMessages: 0,
    matchedDevelopers: [],
  },
  {
    id: "INQ-003",
    projectTitle: "Chatbot Implementation for Support",
    description: "Looking to implement an AI chatbot on our website to handle customer support inquiries.",
    status: "in_progress",
    dateSubmitted: "2025-04-01T09:45:00Z",
    proposalCount: 5,
    unreadMessages: 0,
    matchedDevelopers: [],
    selectedDeveloper: { id: "dev4", name: "Emma Wilson", rating: 4.9, avatar: "" },
  },
  {
    id: "INQ-004",
    projectTitle: "Sales Prediction Model",
    description: "Need a developer to build a predictive model for our sales forecasting.",
    status: "completed",
    dateSubmitted: "2025-03-15T16:20:00Z",
    proposalCount: 7,
    unreadMessages: 0,
    matchedDevelopers: [],
    selectedDeveloper: { id: "dev5", name: "David Park", rating: 5.0, avatar: "" },
  },
];

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusBadge = (status) => {
  switch (status) {
    case "draft":
      return <Badge variant="outline">Draft</Badge>;
    case "active":
      return <Badge>Active</Badge>;
    case "in_progress":
      return <Badge variant="secondary">In Progress</Badge>;
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const CustomerInquiries = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter inquiries based on active tab
  const filteredInquiries = mockCustomerInquiries.filter((inquiry) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return inquiry.status === "active";
    if (activeTab === "in_progress") return inquiry.status === "in_progress";
    if (activeTab === "completed") return inquiry.status === "completed";
    if (activeTab === "draft") return inquiry.status === "draft";
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">My Inquiries</h1>
              <p className="text-muted-foreground">
                Track and manage your custom solution inquiries
              </p>
            </div>
            <Button onClick={() => navigate("/submit-inquiry")}>
              <Plus className="h-4 w-4 mr-2" />
              New Inquiry
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Inquiries</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {filteredInquiries.length === 0 ? (
                <Card>
                  <CardContent className="py-12 flex flex-col items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No inquiries found</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                      {activeTab === "draft" 
                        ? "You don't have any draft inquiries yet."
                        : "You don't have any inquiries in this category."}
                    </p>
                    <Button onClick={() => navigate("/submit-inquiry")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Inquiry
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredInquiries.map((inquiry) => (
                    <Card key={inquiry.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{inquiry.projectTitle}</CardTitle>
                            <CardDescription className="mt-1 flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              Submitted {formatDate(inquiry.dateSubmitted)}
                            </CardDescription>
                          </div>
                          {getStatusBadge(inquiry.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {inquiry.description}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="flex flex-col items-center bg-muted/50 p-2 rounded-md">
                            <div className="font-medium text-lg">{inquiry.proposalCount}</div>
                            <div className="text-muted-foreground text-xs">Proposals</div>
                          </div>
                          
                          <div className="flex flex-col items-center bg-muted/50 p-2 rounded-md">
                            <div className="font-medium text-lg flex items-center">
                              {inquiry.unreadMessages > 0 ? (
                                <>
                                  {inquiry.unreadMessages}
                                  <Badge variant="destructive" className="ml-1 h-2 w-2 p-0 rounded-full" />
                                </>
                              ) : (
                                "0"
                              )}
                            </div>
                            <div className="text-muted-foreground text-xs">Messages</div>
                          </div>
                          
                          <div className="flex flex-col items-center bg-muted/50 p-2 rounded-md">
                            <div className="font-medium text-lg flex items-center">
                              {inquiry.status === "in_progress" || inquiry.status === "completed" ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                "–"
                              )}
                            </div>
                            <div className="text-muted-foreground text-xs">Developer</div>
                          </div>
                        </div>
                        
                        {inquiry.status === "active" && inquiry.matchedDevelopers.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2 flex items-center">
                              <Star className="h-4 w-4 text-amber-500 mr-1" />
                              Top Matched Developers
                            </h4>
                            <div className="flex -space-x-2 overflow-hidden">
                              {inquiry.matchedDevelopers.map((dev) => (
                                <Avatar key={dev.id} className="border-2 border-background">
                                  <AvatarImage src={dev.avatar} />
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {dev.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-background bg-muted text-xs font-medium">
                                {inquiry.proposalCount > 3 ? `+${inquiry.proposalCount - 3}` : ""}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {(inquiry.status === "in_progress" || inquiry.status === "completed") && inquiry.selectedDeveloper && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Selected Developer</h4>
                            <div className="flex items-center space-x-2">
                              <Avatar>
                                <AvatarImage src={inquiry.selectedDeveloper.avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {inquiry.selectedDeveloper.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{inquiry.selectedDeveloper.name}</p>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-amber-500 mr-0.5" />
                                  <span className="text-xs">{inquiry.selectedDeveloper.rating}/5.0</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="bg-muted/30 pt-3 pb-3 justify-between">
                        {inquiry.status === "draft" ? (
                          <>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit Draft
                            </Button>
                            <Button size="sm">
                              Submit Inquiry
                            </Button>
                          </>
                        ) : (
                          <>
                            {inquiry.unreadMessages > 0 && (
                              <Button variant="outline" size="sm">
                                <Mail className="h-3.5 w-3.5 mr-1" />
                                {inquiry.unreadMessages} New Message{inquiry.unreadMessages > 1 ? "s" : ""}
                              </Button>
                            )}
                            <Button
                              variant={inquiry.unreadMessages > 0 ? "default" : "outline"}
                              size="sm"
                              className="ml-auto"
                              onClick={() => navigate(`/customer/inquiries/${inquiry.id}`)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View Details
                            </Button>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Analytics Section */}
          <div className="mt-12 mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Inquiry Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Inquiries</CardDescription>
                  <CardTitle className="text-3xl">{mockCustomerInquiries.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Across all statuses
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Active Proposals</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockCustomerInquiries
                      .filter(i => i.status === "active")
                      .reduce((sum, i) => sum + i.proposalCount, 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    From various developers
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Completed Projects</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockCustomerInquiries.filter(i => i.status === "completed").length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Successfully delivered
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Unread Messages</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockCustomerInquiries.reduce((sum, i) => sum + i.unreadMessages, 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Requiring your attention
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Help Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Need Help with Your AI Projects?</CardTitle>
              <CardDescription>
                Not sure which type of AI solution would best fit your needs?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <p className="text-muted-foreground">
                  Our AI experts can help you identify the right solution for your business challenges.
                  Schedule a free consultation to discuss your needs.
                </p>
                <Button className="whitespace-nowrap md:flex-shrink-0">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Book a Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Check = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default CustomerInquiries;
