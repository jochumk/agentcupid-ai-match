
import { useState } from "react";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Star,
  User,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock data for customer inquiries
const mockInquiries = [
  {
    id: 1,
    customerName: "John Smith",
    companyName: "Acme Corp",
    email: "john.smith@acme.com",
    agent: "Email Automation Agent",
    message:
      "Hi, I'm interested in your Email Automation Agent. We're a small company with 10 employees and receive about 200 emails per day. Can your agent handle this volume? Also, does it integrate with Gmail?",
    status: "unread",
    date: "2 hours ago",
    avatarSrc: "",
    priority: "high",
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    companyName: "Johnson & Co",
    email: "sarah@johnsonco.com",
    agent: "Customer Support Agent",
    message:
      "Hello, we're looking for an AI solution to help our customer support team. Your agent looks promising, but I have a few questions about pricing for our team of 5 support staff.",
    status: "read",
    date: "1 day ago",
    avatarSrc: "",
    priority: "medium",
  },
  {
    id: 3,
    customerName: "Michael Brown",
    companyName: "Brown Enterprises",
    email: "michael@brownent.com",
    agent: "Data Analysis Agent",
    message:
      "I saw your Data Analysis Agent and I'm interested in how it handles Excel files. We have a lot of sales data that we need to analyze on a weekly basis. Can we schedule a demo?",
    status: "responded",
    date: "3 days ago",
    avatarSrc: "",
    priority: "low",
  },
  {
    id: 4,
    customerName: "Lisa Wong",
    companyName: "Wong Tech",
    email: "lisa@wongtech.io",
    agent: "Email Automation Agent",
    message:
      "Your Email Automation Agent looks like exactly what we need. We're currently using Outlook - is there an integration available? Also, what kind of setup support do you provide?",
    status: "scheduled",
    date: "4 days ago",
    avatarSrc: "",
    priority: "medium",
  },
  {
    id: 5,
    customerName: "Robert Davis",
    companyName: "Davis Retail",
    email: "robert@davisretail.com",
    agent: "Document Processing Agent",
    message:
      "We process hundreds of invoices monthly and your Document Processing Agent caught my attention. I'd like to understand more about the accuracy rate and how it handles different document formats.",
    status: "unread",
    date: "5 days ago",
    avatarSrc: "",
    priority: "high",
  },
];

// Template responses
const templateResponses = [
  {
    id: 1,
    title: "Initial Response",
    content:
      "Thank you for your interest in our [Agent Name]. I'd be happy to answer your questions and discuss how our solution can help [Company Name]. Would you be available for a quick call to discuss your specific needs in more detail?",
  },
  {
    id: 2,
    title: "Schedule Demo",
    content:
      "I'd be happy to schedule a demo for you to see [Agent Name] in action. We could walk through your specific use case and show you how our solution can address your needs. Would any of these times work for you: [Suggest Times]?",
  },
  {
    id: 3,
    title: "Integration Information",
    content:
      "Yes, [Agent Name] integrates with [Integration]. The setup process is straightforward and typically takes about [Time Frame]. We also provide full support during the implementation to ensure everything works smoothly with your existing systems.",
  },
  {
    id: 4,
    title: "Pricing Information",
    content:
      "Regarding pricing, our [Agent Name] starts at $[Price] per month for [Features]. For your team size of [Team Size], we could also offer a custom package that includes [Additional Benefits]. Would you like me to prepare a detailed quote for you?",
  },
];

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [replyContent, setReplyContent] = useState("");

  // Filter inquiries based on search term and status
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.agent.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const selectedInquiryData = inquiries.find(
    (inquiry) => inquiry.id === selectedInquiry
  );

  const markAsRead = (id: number) => {
    const updatedInquiries = inquiries.map((inquiry) => {
      if (inquiry.id === id && inquiry.status === "unread") {
        return { ...inquiry, status: "read" };
      }
      return inquiry;
    });
    setInquiries(updatedInquiries);
  };

  const handleInquiryClick = (id: number) => {
    setSelectedInquiry(id);
    markAsRead(id);
  };

  const applyTemplate = (content: string) => {
    let personalized = content
      .replace("[Agent Name]", selectedInquiryData?.agent || "")
      .replace("[Company Name]", selectedInquiryData?.companyName || "");
    
    setReplyContent(personalized);
  };

  const sendReply = () => {
    if (!replyContent.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    // Update the inquiry status to responded
    const updatedInquiries = inquiries.map((inquiry) => {
      if (inquiry.id === selectedInquiry) {
        return { ...inquiry, status: "responded" };
      }
      return inquiry;
    });
    
    setInquiries(updatedInquiries);
    toast.success("Reply sent successfully!");
    setReplyContent("");
  };

  const scheduleCall = () => {
    // Update the inquiry status to scheduled
    const updatedInquiries = inquiries.map((inquiry) => {
      if (inquiry.id === selectedInquiry) {
        return { ...inquiry, status: "scheduled" };
      }
      return inquiry;
    });
    
    setInquiries(updatedInquiries);
    toast.success("Call scheduled successfully!");
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Inquiries</h1>
          <p className="text-muted-foreground">
            Manage and respond to inquiries from potential customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inquiry list */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle>Inquiries</CardTitle>
                <CardDescription>
                  {inquiries.filter(i => i.status === "unread").length} unread messages
                </CardDescription>
                <div className="mt-2 space-y-2">
                  <Input
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                    icon={Search}
                  />
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Inquiries</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="responded">Responded</SelectItem>
                      <SelectItem value="scheduled">Call Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100vh-320px)] overflow-y-auto">
                <div className="space-y-2">
                  {filteredInquiries.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">
                      No inquiries found
                    </p>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className={`p-3 rounded-md cursor-pointer border ${
                          selectedInquiry === inquiry.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        } ${
                          inquiry.status === "unread"
                            ? "bg-blue-50 dark:bg-blue-950/20"
                            : ""
                        }`}
                        onClick={() => handleInquiryClick(inquiry.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={inquiry.avatarSrc} />
                            <AvatarFallback>
                              {inquiry.customerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">
                                {inquiry.customerName}
                              </p>
                              <span className="text-xs text-gray-500">
                                {inquiry.date}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">{inquiry.companyName}</p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {inquiry.agent}
                            </p>
                            <p className="text-sm mt-1 line-clamp-2">{inquiry.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge
                                variant={
                                  inquiry.status === "unread"
                                    ? "default"
                                    : inquiry.status === "responded"
                                    ? "success"
                                    : inquiry.status === "scheduled"
                                    ? "outline"
                                    : "secondary"
                                }
                                className="text-xs py-0 px-2"
                              >
                                {inquiry.status}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`text-xs py-0 px-2 ${
                                  inquiry.priority === "high"
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : inquiry.priority === "medium"
                                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                                }`}
                              >
                                {inquiry.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message detail and reply */}
          <div className="md:col-span-2">
            {selectedInquiryData ? (
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {selectedInquiryData.customerName}
                        <Badge
                          variant="outline"
                          className="ml-2"
                        >
                          {selectedInquiryData.companyName}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Mail className="h-3 w-3 mr-1" />
                        {selectedInquiryData.email}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={scheduleCall}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[calc(100vh-400px)] overflow-y-auto space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Inquiry about {selectedInquiryData.agent}
                    </h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedInquiryData.avatarSrc} />
                            <AvatarFallback>
                              {selectedInquiryData.customerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">
                                {selectedInquiryData.customerName}
                              </p>
                              <span className="text-xs text-gray-500">
                                {selectedInquiryData.date}
                              </span>
                            </div>
                            <p className="text-sm mt-2">{selectedInquiryData.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Template responses */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Template Responses</h3>
                    <div className="space-y-2">
                      {templateResponses.map((template) => (
                        <Collapsible key={template.id}>
                          <Card>
                            <CollapsibleTrigger className="w-full text-left p-3">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{template.title}</span>
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <CardContent className="pt-0 pb-3 px-3">
                                <p className="text-sm">{template.content}</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => applyTemplate(template.content)}
                                >
                                  Use Template
                                </Button>
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="w-full space-y-2">
                    <Textarea
                      placeholder="Type your reply here..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={4}
                    />
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          Mention
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Suggest Times
                        </Button>
                      </div>
                      <Button onClick={sendReply}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-10">
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No inquiry selected</h3>
                  <p className="text-muted-foreground mt-1">
                    Select an inquiry from the list to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DeveloperLayout>
  );
};

export default InquiryManagement;
