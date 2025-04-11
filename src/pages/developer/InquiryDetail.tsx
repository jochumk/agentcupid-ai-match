
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertTriangle,
  ArrowLeft,
  Building,
  Calendar,
  Check,
  Clock,
  Coins,
  Download,
  FileText,
  Link2,
  MessageSquare,
  Send,
  Laptop,
  Users,
  User,
  PenTool,
  ThumbsUp,
  CreditCard,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for a single inquiry
const mockInquiryData = {
  id: "INQ-001",
  companyName: "TechCorp Solutions",
  contactName: "David Chen",
  contactEmail: "david.chen@techcorp.com",
  contactPhone: "+1 (555) 123-4567",
  industry: "Technology",
  projectTitle: "AI Email Response System Integration",
  description: "We are looking for a developer to help integrate an AI-powered email response system with our existing customer service platform. Our support team handles approximately 500 emails per day, and we would like to automate at least 50% of the responses to common questions. We need a solution that can classify incoming emails, generate appropriate responses, and learn from human corrections.",
  currentTools: "Gmail, Zendesk, Slack",
  integrationRequirements: "Must integrate with Zendesk and Gmail API",
  timeline: "short",
  timelineDisplay: "Short-term (1-4 weeks)",
  budget: { type: "fixed", amount: 5000 },
  status: "open",
  datePosted: "2025-04-08T14:30:00Z",
  responseCount: 2,
  match: 92,
  isRecommended: true,
  attachments: [
    { id: "attachment1", name: "Requirements.pdf", size: "245 KB", type: "application/pdf" },
    { id: "attachment2", name: "Current System Diagram.png", size: "420 KB", type: "image/png" },
  ],
  questionHistory: [
    {
      id: "q1",
      question: "How many users will be using the system simultaneously?",
      askedBy: {
        id: "dev1",
        name: "Alex Johnson",
        avatar: "",
      },
      answer: "We have about
      15-20 support staff who would be using the system simultaneously during peak hours.",
      timestamp: "2025-04-09T10:15:00Z",
    },
    {
      id: "q2",
      question: "What languages need to be supported in the email responses?",
      askedBy: {
        id: "dev2",
        name: "Sarah Lee",
        avatar: "",
      },
      answer: "Initially, we only need English support, but we'd like to expand to Spanish and French in the future.",
      timestamp: "2025-04-09T11:30:00Z",
    },
  ],
};

const InquiryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inquiry] = useState(mockInquiryData);
  const [newQuestion, setNewQuestion] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [proposalData, setProposalData] = useState({
    solution: "",
    timeline: "",
    cost: "",
    experience: "",
  });
  
  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    toast.success("Your question has been submitted");
    setNewQuestion("");
  };
  
  const handleProposalChange = (field, value) => {
    setProposalData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmitProposal = (e) => {
    e.preventDefault();
    
    if (!proposalData.solution || !proposalData.timeline || !proposalData.cost) {
      toast.error("Please complete all required fields");
      return;
    }
    
    toast.success("Your proposal has been submitted successfully!");
    
    // Reset form after submission
    setProposalData({
      solution: "",
      timeline: "",
      cost: "",
      experience: "",
    });
    
    // Switch back to details tab
    setActiveTab("details");
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

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/developer/inquiries")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Inquiries
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {inquiry.projectTitle}
            </h1>
            <div className="flex items-center text-muted-foreground">
              <Building className="h-4 w-4 mr-1" />
              {inquiry.companyName}{" "}
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4 mr-1" />
              Posted {formatDate(inquiry.datePosted)}
              {inquiry.isRecommended && (
                <>
                  <span className="mx-2">•</span>
                  <Star className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-amber-700 font-medium">
                    {inquiry.match}% Match
                  </span>
                </>
              )}
            </div>
          </div>
          <Badge
            className={
              inquiry.status === "open"
                ? "bg-primary"
                : inquiry.status === "active"
                ? "bg-secondary"
                : "bg-muted"
            }
          >
            {inquiry.status === "open" ? "New" : 
             inquiry.status === "active" ? "Active" : 
             inquiry.status === "taken" ? "Taken" : 
             "Completed"}
          </Badge>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="details">
              <FileText className="h-4 w-4 mr-2" />
              Project Details
            </TabsTrigger>
            <TabsTrigger value="questions">
              <MessageSquare className="h-4 w-4 mr-2" />
              Questions & Answers
            </TabsTrigger>
            <TabsTrigger value="proposal">
              <PenTool className="h-4 w-4 mr-2" />
              Submit Proposal
            </TabsTrigger>
          </TabsList>
          
          {/* Project Details Tab */}
          <TabsContent value="details" className="space-y-6">
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
            
            <Card>
              <CardHeader>
                <CardTitle>Client Contact</CardTitle>
                <CardDescription>
                  Direct contact information for the inquiry submitter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {inquiry.contactName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{inquiry.contactName}</h3>
                    <div className="text-sm text-muted-foreground">
                      {inquiry.companyName}
                    </div>
                    <div className="flex space-x-4 text-sm">
                      <span className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {inquiry.contactEmail}
                      </span>
                      {inquiry.contactPhone && (
                        <span className="flex items-center">
                          <PhoneIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {inquiry.contactPhone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Competition</CardTitle>
                <CardDescription>
                  Other developers interested in this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{inquiry.responseCount}</h3>
                    <p className="text-muted-foreground">
                      {inquiry.responseCount === 1
                        ? "developer has responded"
                        : "developers have responded"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 inline-block mr-1 text-amber-500" />
                  Submit your proposal soon to increase your chances of being selected.
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setActiveTab("proposal")}
                  className="w-full"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Create Your Proposal
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
                <CardDescription>
                  Get clarification before submitting your proposal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <Textarea
                    placeholder="Type your question here..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button type="submit" disabled={!newQuestion.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Question
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Previous Questions & Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {inquiry.questionHistory.length === 0 ? (
                  <div className="text-center py-6">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No questions yet</h3>
                    <p className="text-muted-foreground mt-1">
                      Be the first to ask a question about this project
                    </p>
                  </div>
                ) : (
                  inquiry.questionHistory.map((item) => (
                    <div key={item.id} className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.askedBy.avatar} />
                          <AvatarFallback>
                            {item.askedBy.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">
                              {item.askedBy.name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(item.timestamp)} at {formatTime(item.timestamp)}
                            </span>
                          </div>
                          <div className="text-sm p-3 bg-muted rounded-md">
                            <strong className="text-primary">Q:</strong> {item.question}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 pl-11">
                        <div className="flex-1 space-y-1">
                          <div className="text-sm p-3 bg-secondary/10 rounded-md">
                            <strong className="text-secondary">A:</strong> {item.answer}
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Proposal Tab */}
          <TabsContent value="proposal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Proposal</CardTitle>
                <CardDescription>
                  Provide details about your solution, timeline and budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProposal} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Proposed Solution *</h3>
                      <Textarea
                        placeholder="Describe your approach to solving this problem..."
                        value={proposalData.solution}
                        onChange={(e) => handleProposalChange("solution", e.target.value)}
                        className="min-h-[150px]"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Be specific about your solution and implementation approach.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Timeline Estimate *</h3>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="e.g., 3 weeks, with milestone deliveries at week 1 and 2"
                          className="pl-10"
                          value={proposalData.timeline}
                          onChange={(e) => handleProposalChange("timeline", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Cost Estimate *</h3>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="e.g., $4,500 total, or hourly rate"
                          className="pl-10"
                          value={proposalData.cost}
                          onChange={(e) => handleProposalChange("cost", e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Be clear about what is included in your price and any potential additional costs.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Relevant Experience</h3>
                      <Textarea
                        placeholder="Describe your experience with similar projects..."
                        value={proposalData.experience}
                        onChange={(e) => handleProposalChange("experience", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center mb-4 text-sm">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      <span>
                        Your proposal will be visible to the customer immediately.
                        Make sure all information is accurate and professional.
                      </span>
                    </div>
                    <Button type="submit" className="w-full">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Submit Proposal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tips for a Successful Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">Demonstrate a clear understanding of the client's needs</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">Be specific about your implementation approach</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">Provide a realistic timeline with clear milestones</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">Include relevant experience and previous similar projects</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">Set clear expectations about what is included in your price</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DeveloperLayout>
  );
};

const PhoneIcon = ({ className }) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default InquiryDetail;
