import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Paperclip, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";

// Mock inquiry data for demo purposes
const mockInquiry = {
  id: "INQ-2024-001",
  title: "AI Chatbot for Customer Support",
  description: "We need an AI chatbot that can handle basic customer inquiries and provide support 24/7. It should integrate with our existing CRM and knowledge base.",
  dateSubmitted: "2024-07-15",
  status: "active",
  industry: "E-commerce",
  integrations: ["CRM", "Knowledge Base"],
  budget: "$5000 - $10000",
  preferredAgent: "AI Solutions Inc.",
  attachments: ["requirements.pdf", "design-mockup.png"],
  messages: [
    {
      id: "MSG-001",
      sender: "customer",
      timestamp: "2024-07-16 09:30",
      text: "Hello, we are looking for a chatbot that can understand natural language and provide accurate responses.",
    },
    {
      id: "MSG-002",
      sender: "developer",
      timestamp: "2024-07-16 10:00",
      text: "Our AI chatbot can definitely help with that. We have experience in building chatbots for e-commerce businesses.",
    },
  ],
};

// Mock proposals data for demo purposes
const mockProposals = [
  {
    id: "PRO-001",
    developer: "AI Solutions Inc.",
    description: "We propose a chatbot solution that uses natural language processing and machine learning to understand customer inquiries and provide accurate responses. It will integrate seamlessly with your CRM and knowledge base.",
    price: "$7500",
    timeline: "4 weeks",
    status: "pending",
  },
  {
    id: "PRO-002",
    developer: "Quantum AI Labs",
    description: "Our chatbot solution is designed to handle a high volume of customer inquiries and provide personalized support. It uses advanced AI algorithms to understand customer needs and provide relevant information.",
    price: "$9000",
    timeline: "6 weeks",
    status: "accepted",
  },
];

const CustomerInquiryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [inquiry, setInquiry] = useState(mockInquiry);
  const [proposals, setProposals] = useState(mockProposals);
  const [replyText, setReplyText] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      const newMessage = {
        id: `MSG-${Math.random().toString(36).substring(7)}`,
        sender: "customer",
        timestamp: new Date().toISOString(),
        text: replyText,
      };

      setInquiry({
        ...inquiry,
        messages: [...inquiry.messages, newMessage],
      });

      setReplyText("");
    }
  };

  const handleAcceptProposal = (proposal) => {
    setSelectedProposal(proposal);
    setIsAcceptDialogOpen(true);
  };

  const confirmAcceptProposal = () => {
    setProposals(
      proposals.map((proposal) =>
        proposal.id === selectedProposal.id
          ? { ...proposal, status: "accepted" }
          : proposal
      )
    );
    setInquiry({ ...inquiry, status: "completed" });
    setIsAcceptDialogOpen(false);
  };

  const handleRejectProposal = (proposal) => {
    setProposals(
      proposals.map((p) =>
        p.id === proposal.id ? { ...p, status: "rejected" } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-20">
        {/* Header section */}
        <div className="mb-8">
          <Link to="/customer/inquiries" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inquiries
          </Link>
          <h2 className="mt-4 text-3xl font-bold">{inquiry.title}</h2>
          <div className="mt-2 flex flex-wrap space-x-2">
            <Badge>{inquiry.industry}</Badge>
            {inquiry.integrations.map((integration, index) => (
              <Badge key={index} variant="secondary">{integration}</Badge>
            ))}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Inquiry Details</CardTitle>
                <CardDescription>
                  View the details of your inquiry and communicate with potential AI developers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{inquiry.description}</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Date Submitted</div>
                    <div className="text-gray-500">
                      <Calendar className="mr-1 inline-block h-4 w-4" />
                      {inquiry.dateSubmitted}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Budget</div>
                    <div className="text-gray-500">{inquiry.budget}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Preferred Agent</div>
                    <div className="text-gray-500">{inquiry.preferredAgent || "No preference"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Attachments</div>
                    <div className="text-gray-500">
                      {inquiry.attachments.map((attachment, index) => (
                        <Link
                          key={index}
                          to="#"
                          className="inline-flex items-center hover:underline mr-2"
                        >
                          <Paperclip className="mr-1 h-4 w-4" />
                          {attachment}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                {inquiry.status === "active" ? (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Active
                  </Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
                  </Badge>
                )}
              </CardFooter>
            </Card>

            {/* Messages section */}
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Communicate with AI developers about your inquiry.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiry.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`rounded-lg py-2 px-3 max-w-md ${message.sender === "customer"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        <div className="text-sm text-gray-500">{message.timestamp}</div>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Customer Avatar" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button
                      onClick={handleReplySubmit}
                      className="mt-2 w-full"
                    >
                      Send <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proposals section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Proposals</CardTitle>
                <CardDescription>
                  Review proposals from AI developers and select the best one for your needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <Card key={proposal.id} className="border">
                      <CardHeader>
                        <CardTitle>{proposal.developer}</CardTitle>
                        <CardDescription>
                          {proposal.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <div className="font-medium text-gray-700">Price</div>
                            <div>{proposal.price}</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700">Timeline</div>
                            <div>{proposal.timeline}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div>
                          {proposal.status === "pending" && (
                            <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                              Pending
                            </Badge>
                          )}
                          {proposal.status === "accepted" && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Accepted
                            </Badge>
                          )}
                          {proposal.status === "rejected" && (
                            <Badge variant="destructive">Rejected</Badge>
                          )}
                        </div>
                        <div className="space-x-2">
                          {proposal.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleAcceptProposal(proposal)}
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectProposal(proposal)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerInquiryDetail;
