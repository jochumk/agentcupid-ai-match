
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Coins,
  Download,
  FileText,
  Link2,
  Laptop,
  MessageSquare,
  Send,
  Star,
  ThumbsUp,
  Building,
  User,
  AlertTriangle,
  Mail,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// Mock inquiry detail data
const mockInquiryDetail = {
  id: "INQ-001",
  projectTitle: "AI Email Response System Integration",
  description: "We are looking for a developer to help integrate an AI-powered email response system with our existing customer service platform. Our support team handles approximately 500 emails per day, and we would like to automate at least 50% of the responses to common questions. We need a solution that can classify incoming emails, generate appropriate responses, and learn from human corrections.",
  status: "active",
  dateSubmitted: "2025-04-08T14:30:00Z",
  budget: { type: "fixed", amount: 5000 },
  timeline: "short",
  timelineDisplay: "Short-term (1-4 weeks)",
  currentTools: "Gmail, Zendesk, Slack",
  integrationRequirements: "Must integrate with Zendesk and Gmail API",
  industry: "Technology",
  attachments: [
    { id: "attachment1", name: "Requirements.pdf", size: "245 KB", type: "application/pdf" },
    { id: "attachment2", name: "Current System Diagram.png", size: "420 KB", type: "image/png" },
  ],
  proposals: [
    {
      id: "prop1",
      developerName: "Alex Johnson",
      developerAvatar: "",
      rating: 4.9,
      completedProjects: 28,
      submittedDate: "2025-04-09T15:45:00Z",
      solution: "I propose implementing a custom email classification system using natural language processing to categorize incoming emails and generate responses. The system will integrate with both Zendesk and Gmail APIs to seamlessly work with your existing workflow. Over time, the system will learn from user corrections to improve accuracy.",
      timeline: "3 weeks total: 1 week for setup and integration, 1 week for model training, 1 week for testing and refinement",
      cost: "$4,800 fixed price, including 3 months of post-launch support",
      experience: "I've built similar systems for 5 companies in the past, including a customer service automation tool for a SaaS company that reduced response time by 75%.",
      isSelected: false,
    },
    {
      id: "prop2",
      developerName: "Sarah Lee",
      developerAvatar: "",
      rating: 4.8,
      completedProjects: 34,
      submittedDate: "2025-04-10T09:20:00Z",
      solution: "My approach would be to create a tailored AI email assistant that works directly within your existing Zendesk workflow. The system will analyze incoming emails, categorize them by intent, and generate appropriate responses. The system will be trained on your existing email data to ensure high accuracy from day one.",
      timeline: "4 weeks: 1 week for requirements gathering and setup, 2 weeks for development and integration, 1 week for testing and training",
      cost: "$5,200, including implementation, training, and 6 months of support",
      experience: "I specialize in customer service automation solutions and have worked with 10+ companies to implement AI-powered communication systems.",
      isSelected: false,
    },
    {
      id: "prop3",
      developerName: "Michael Chen",
      developerAvatar: "",
      rating: 4.7,
      completedProjects: 19,
      submittedDate: "2025-04-10T14:05:00Z",
      solution: "I'll build a custom solution using OpenAI's GPT API combined with a custom classification model. This hybrid approach will allow for highly accurate email categorization while also generating human-like responses. The system will integrate directly with both Gmail and Zendesk.",
      timeline: "2-3 weeks for full implementation, with a working prototype available within the first week",
      cost: "$4,500 with milestone-based payments: $1,500 upon approval of the prototype, $3,000 upon final delivery",
      experience: "I've created multiple AI-powered email automation systems and have extensive experience with NLP models and API integrations.",
      isSelected: false,
    }
  ],
  messages: [
    {
      id: "msg1",
      from: {
        id: "dev1",
        name: "Alex Johnson",
        avatar: "",
        isCustomer: false,
      },
      content: "Hi there! I've submitted my proposal for your email automation project. I had a quick question - approximately how many different types of customer inquiries do you typically receive? This would help me better understand the categorization needs.",
      timestamp: "2025-04-09T16:30:00Z",
      isRead: true,
    },
    {
      id: "msg2",
      from: {
        id: "customer",
        name: "You",
        avatar: "",
        isCustomer: true,
      },
      content: "Hello Alex, thanks for your proposal! We typically handle about 20-25 different types of inquiries, with the top 10 accounting for about 80% of the volume. Would you be able to handle that variety?",
      timestamp: "2025-04-09T17:15:00Z",
      isRead: true,
    },
    {
      id: "msg3",
      from: {
        id: "dev1",
        name: "Alex Johnson",
        avatar: "",
        isCustomer: false,
      },
      content: "Absolutely! That's a very manageable number of categories. My solution would handle those top categories with high accuracy, and we can set up a process for the less common inquiries to be flagged for human review if needed. Would you be able to provide examples of each type of inquiry during the setup phase?",
      timestamp: "2025-04-09T18:05:00Z",
      isRead: false,
    },
  ],
};

const CustomerInquiryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inquiry] = useState(mockInquiryDetail);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [expandedProposal, setExpandedProposal] = useState(null);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the API
    toast.success("Your message has been sent");
    setNewMessage("");
  };
  
  const handleSelectProposal = (proposalId) => {
    setSelectedProposal(proposalId);
    toast.success("You've selected this proposal. Please confirm your selection.");
  };
  
  const handleConfirmSelection = () => {
    if (!selectedProposal) return;
    
    // In a real app, this would update the proposal status in the API
    toast.success("You have successfully selected this developer for your project!");
    
    // Reset state
    setSelectedProposal(null);
    
    // Navigate to the dashboard after a short delay
    setTimeout(() => {
      navigate("/customer/inquiries");
    }, 3000);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };
  
  const formatBudget = (budget) => {
    if (budget.type === "fixed") {
      return `$${budget.amount.toLocaleString()}`;
    } else if (budget.type === "range") {
      return `$${budget.min.toLocaleString()} - $${budget.max.toLocaleString()}`;
    } else {
      return "Open Budget";
    }
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-2 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/customer/inquiries")}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Inquiries
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {inquiry.projectTitle}
              </h1>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                Submitted {formatDate(inquiry.dateSubmitted)}{" "}
                <span className="mx-2">•</span> {getStatusBadge(inquiry.status)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 w-full">
                  <TabsTrigger value="overview">
                    <FileText className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="proposals">
                    <Star className="h-4 w-4 mr-2" />
                    Proposals ({inquiry.proposals.length})
                  </TabsTrigger>
                  <TabsTrigger value="messages">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                    {inquiry.messages.filter(m => !m.isRead && !m.from.isCustomer).length > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {inquiry.messages.filter(m => !m.isRead && !m.from.isCustomer).length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Budget</div>
                          <div className="flex items-center font-medium">
                            <Coins className="h-4 w-4 mr-2 text-muted-foreground" />
                            {formatBudget(inquiry.budget)}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Timeline</div>
                          <div className="flex items-center font-medium">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            {inquiry.timelineDisplay}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Industry</div>
                          <div className="flex items-center font-medium">
                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                            {inquiry.industry}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-2">Project Description</h3>
                        <p className="text-sm whitespace-pre-line">{inquiry.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-2">Current Tools & Systems</h3>
                          <div className="flex items-center">
                            <Laptop className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{inquiry.currentTools}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Integration Requirements</h3>
                          <div className="flex items-center">
                            <Link2 className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{inquiry.integrationRequirements}</span>
                          </div>
                        </div>
                      </div>
                      
                      {inquiry.attachments.length > 0 && (
                        <div>
                          <h3 className="font-medium mb-2">Attachments</h3>
                          <div className="space-y-2">
                            {inquiry.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className="flex items-center p-2 border rounded-md hover:bg-muted/50"
                              >
                                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{attachment.name}</p>
                                  <p className="text-xs text-muted-foreground">{attachment.size}</p>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Inquiry Status Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Inquiry Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Badge className="mr-2">{inquiry.status}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {inquiry.status === "active"
                              ? "Waiting for more proposals"
                              : inquiry.status === "in_progress"
                              ? "Developer working on your project"
                              : inquiry.status === "completed"
                              ? "Project has been delivered"
                              : "Draft - not yet submitted"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">
                            Submitted
                          </div>
                          <div className="text-sm font-medium">
                            Proposals
                          </div>
                          <div className="text-sm font-medium">
                            In Progress
                          </div>
                          <div className="text-sm font-medium">
                            Completed
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="h-2 bg-muted rounded-full mb-2">
                          <div 
                            className={`h-2 rounded-full bg-primary`}
                            style={{
                              width: inquiry.status === "active" ? "25%" :
                                     inquiry.status === "in_progress" ? "60%" :
                                     inquiry.status === "completed" ? "100%" : "0%"
                            }}
                          ></div>
                        </div>
                        
                        {/* Status indicators */}
                        <div className="flex justify-between">
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full border-2 bg-white ${
                              ["active", "in_progress", "completed"].includes(inquiry.status) 
                                ? "border-primary" : "border-muted-foreground"
                            } flex items-center justify-center`}>
                              {["active", "in_progress", "completed"].includes(inquiry.status) && (
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full border-2 bg-white ${
                              ["active", "in_progress", "completed"].includes(inquiry.status) 
                                ? "border-primary" : "border-muted-foreground"
                            } flex items-center justify-center`}>
                              {["active", "in_progress", "completed"].includes(inquiry.status) && (
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full border-2 bg-white ${
                              ["in_progress", "completed"].includes(inquiry.status) 
                                ? "border-primary" : "border-muted-foreground"
                            } flex items-center justify-center`}>
                              {["in_progress", "completed"].includes(inquiry.status) && (
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full border-2 bg-white ${
                              inquiry.status === "completed" 
                                ? "border-primary" : "border-muted-foreground"
                            } flex items-center justify-center`}>
                              {inquiry.status === "completed" && (
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Proposals Tab */}
                <TabsContent value="proposals" className="space-y-6">
                  {inquiry.proposals.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 flex flex-col items-center justify-center">
                        <Star className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No proposals yet</h3>
                        <p className="text-muted-foreground mt-1 max-w-md text-center">
                          You haven't received any proposals for this inquiry yet.
                          Check back soon or consider adjusting your requirements.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      {selectedProposal && (
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <div>
                                  <h3 className="font-medium">You've selected a developer</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Please confirm your selection to notify the developer
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedProposal(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={handleConfirmSelection}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Confirm Selection
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    
                      {inquiry.proposals.map((proposal) => (
                        <Card 
                          key={proposal.id}
                          className={expandedProposal === proposal.id ? "border-primary" : ""}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start space-x-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={proposal.developerAvatar} />
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {proposal.developerName.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{proposal.developerName}</CardTitle>
                                  <CardDescription className="mt-1 flex items-center">
                                    <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
                                    {proposal.rating}/5.0 • {proposal.completedProjects} completed projects
                                  </CardDescription>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Submitted {formatDate(proposal.submittedDate)}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-3">
                            {expandedProposal === proposal.id ? (
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-sm font-medium mb-1">Proposed Solution</h3>
                                  <p className="text-sm">{proposal.solution}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="text-sm font-medium mb-1">Timeline</h3>
                                    <p className="text-sm flex items-start">
                                      <Calendar className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                                      {proposal.timeline}
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <h3 className="text-sm font-medium mb-1">Cost</h3>
                                    <p className="text-sm flex items-start">
                                      <Coins className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                                      {proposal.cost}
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h3 className="text-sm font-medium mb-1">Relevant Experience</h3>
                                  <p className="text-sm">{proposal.experience}</p>
                                </div>
                                
                                <div className="pt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setExpandedProposal(null)}
                                  >
                                    Show Less
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <p className="text-sm line-clamp-2">{proposal.solution}</p>
                                
                                <div className="flex flex-wrap gap-4 text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span className="line-clamp-1 max-w-[200px]">{proposal.timeline.split(':')[0]}</span>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <Coins className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span className="line-clamp-1 max-w-[200px]">{proposal.cost.split(',')[0]}</span>
                                  </div>
                                </div>
                                
                                <div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setExpandedProposal(proposal.id)}
                                  >
                                    View Full Proposal
                                  </Button>
                                </div>
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="flex justify-between border-t bg-muted/30 pt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveTab("messages")}
                            >
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              Message Developer
                            </Button>
                            
                            <Button
                              size="sm"
                              disabled={selectedProposal !== null}
                              onClick={() => handleSelectProposal(proposal.id)}
                            >
                              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                              Select Proposal
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </>
                  )}
                </TabsContent>
                
                {/* Messages Tab */}
                <TabsContent value="messages" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Message Developers</CardTitle>
                      <CardDescription>
                        Ask questions or discuss details about your project
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
                        {inquiry.messages.length === 0 ? (
                          <div className="text-center py-8">
                            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <h3 className="text-lg font-medium">No messages yet</h3>
                            <p className="text-muted-foreground mt-1">
                              Start a conversation with a developer
                            </p>
                          </div>
                        ) : (
                          inquiry.messages.map((message) => (
                            <div 
                              key={message.id}
                              className={`flex ${message.from.isCustomer ? "justify-end" : "justify-start"}`}
                            >
                              <div 
                                className={`flex max-w-[80%] ${
                                  message.from.isCustomer ? "flex-row-reverse" : "flex-row"
                                }`}
                              >
                                <Avatar className={`h-8 w-8 ${message.from.isCustomer ? "ml-2" : "mr-2"}`}>
                                  <AvatarImage src={message.from.avatar} />
                                  <AvatarFallback className={
                                    message.from.isCustomer 
                                      ? "bg-secondary text-secondary-foreground"
                                      : "bg-primary text-primary-foreground"
                                  }>
                                    {message.from.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div 
                                    className={`rounded-lg p-3 text-sm ${
                                      message.from.isCustomer 
                                        ? "bg-secondary text-secondary-foreground"
                                        : "bg-muted"
                                    }`}
                                  >
                                    {message.content}
                                  </div>
                                  <div 
                                    className={`text-xs text-muted-foreground mt-1 ${
                                      message.from.isCustomer ? "text-right" : "text-left"
                                    }`}
                                  >
                                    {message.from.isCustomer ? "You" : message.from.name} • {formatTime(message.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      
                      <form onSubmit={handleSendMessage} className="pt-2">
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Type your message here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-end">
                            <Button type="submit" disabled={!newMessage.trim()}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </Button>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Inquiry Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("proposals")}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    View Proposals ({inquiry.proposals.length})
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                    {inquiry.messages.filter(m => !m.isRead && !m.from.isCustomer).length > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {inquiry.messages.filter(m => !m.isRead && !m.from.isCustomer).length}
                      </Badge>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.print()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Print Inquiry
                  </Button>
                </CardContent>
              </Card>
              
              {/* Customer Protection Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                    Customer Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">All developers are verified and rated</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Secure communication channel</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Milestone-based payments available</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Satisfaction guarantee on all projects</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Need Help Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Our AI experts can help guide you through the selection process
                    and answer any questions you might have.
                  </p>
                  <Button className="w-full" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
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

export default CustomerInquiryDetail;
