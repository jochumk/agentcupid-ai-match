
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart2,
  Bell,
  CalendarClock,
  Clock,
  CreditCard,
  Filter,
  Search,
  Star,
  Tag,
  AlertOctagon,
  Users,
  Eye,
  Briefcase,
  Crown,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for inquiries
const mockInquiries = [
  {
    id: "INQ-001",
    companyName: "TechCorp Solutions",
    industry: "technology",
    projectTitle: "AI Email Response System Integration",
    description: "Looking for a developer to help integrate an AI-powered email response system with our existing customer service platform.",
    budget: { type: "fixed", amount: 5000 },
    timeline: "short",
    status: "open",
    date: "2025-04-08T14:30:00Z",
    responseCount: 0,
    match: 92,
    isRecommended: true,
    integrationsNeeded: ["Gmail", "Zendesk"],
  },
  {
    id: "INQ-002",
    companyName: "HealthPlus Medical",
    industry: "healthcare",
    projectTitle: "Patient Data Analysis Tool",
    description: "Need a custom AI solution to analyze patient data and provide insights for our medical staff.",
    budget: { type: "range", min: 8000, max: 15000 },
    timeline: "medium",
    status: "active",
    date: "2025-04-07T10:15:00Z",
    responseCount: 3,
    match: 78,
    isRecommended: false,
    integrationsNeeded: ["Epic Systems", "HealthVault"],
  },
  {
    id: "INQ-003",
    companyName: "EduLearn Academy",
    industry: "education",
    projectTitle: "Automated Grading System",
    description: "Looking for a developer to build an AI-powered grading system for our online courses.",
    budget: { type: "open" },
    timeline: "medium",
    status: "active",
    date: "2025-04-06T09:45:00Z",
    responseCount: 5,
    match: 85,
    isRecommended: true,
    integrationsNeeded: ["Canvas LMS", "Google Classroom"],
  },
  {
    id: "INQ-004",
    companyName: "RetailMax Stores",
    industry: "retail",
    projectTitle: "Customer Behavior Analysis",
    description: "Need a solution to analyze in-store customer behavior using our existing camera systems.",
    budget: { type: "fixed", amount: 12000 },
    timeline: "long",
    status: "taken",
    date: "2025-04-05T16:20:00Z",
    responseCount: 7,
    match: 65,
    isRecommended: false,
    integrationsNeeded: ["Shopify", "Square"],
  },
  {
    id: "INQ-005",
    companyName: "FinSecure Banking",
    industry: "finance",
    projectTitle: "Fraud Detection Enhancement",
    description: "Looking to improve our existing fraud detection system with more advanced AI capabilities.",
    budget: { type: "range", min: 20000, max: 30000 },
    timeline: "medium",
    status: "open",
    date: "2025-04-04T11:10:00Z",
    responseCount: 0,
    match: 91,
    isRecommended: true,
    integrationsNeeded: ["Plaid", "Stripe"],
  },
  {
    id: "INQ-006",
    companyName: "MediaStream Productions",
    industry: "entertainment",
    projectTitle: "Content Recommendation Engine",
    description: "Need a developer to build a sophisticated content recommendation system for our streaming platform.",
    budget: { type: "open" },
    timeline: "long",
    status: "active",
    date: "2025-04-03T13:25:00Z",
    responseCount: 4,
    match: 82,
    isRecommended: true,
    integrationsNeeded: ["AWS Media Services", "Firebase"],
  },
  {
    id: "INQ-007",
    companyName: "GreenGrow Farms",
    industry: "agriculture",
    projectTitle: "Crop Yield Prediction Tool",
    description: "Looking for an AI solution to predict crop yields based on various environmental factors.",
    budget: { type: "fixed", amount: 7500 },
    timeline: "short",
    status: "completed",
    date: "2025-04-01T09:30:00Z",
    responseCount: 6,
    match: 68,
    isRecommended: false,
    integrationsNeeded: ["John Deere API", "Weather Data APIs"],
  },
];

// Filter options
const industries = [
  { value: "all", label: "All Industries" },
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "entertainment", label: "Entertainment" },
  { value: "agriculture", label: "Agriculture" },
];

const timelines = [
  { value: "all", label: "All Timelines" },
  { value: "urgent", label: "Urgent (< 1 week)" },
  { value: "short", label: "Short-term (1-4 weeks)" },
  { value: "medium", label: "Medium-term (1-3 months)" },
  { value: "long", label: "Long-term (3+ months)" },
];

const budgetRanges = [
  { value: "all", label: "All Budgets" },
  { value: "low", label: "Under $5,000" },
  { value: "medium", label: "$5,000 - $15,000" },
  { value: "high", label: "$15,000 - $30,000" },
  { value: "enterprise", label: "Over $30,000" },
  { value: "open", label: "Open Budget" },
];

const InquiryListing = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [timelineFilter, setTimelineFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showRecommendedOnly, setShowRecommendedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("date");

  // Filter inquiries based on all criteria
  const filteredInquiries = inquiries.filter((inquiry) => {
    // Text search
    const matchesSearch =
      inquiry.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Industry filter
    const matchesIndustry = 
      industryFilter === "all" || inquiry.industry === industryFilter;
    
    // Timeline filter
    const matchesTimeline = 
      timelineFilter === "all" || inquiry.timeline === timelineFilter;
    
    // Budget filter
    let matchesBudget = budgetFilter === "all";
    if (!matchesBudget) {
      if (budgetFilter === "open" && inquiry.budget.type === "open") {
        matchesBudget = true;
      } else if (inquiry.budget.type === "fixed") {
        const amount = inquiry.budget.amount;
        if (
          (budgetFilter === "low" && amount < 5000) ||
          (budgetFilter === "medium" && amount >= 5000 && amount < 15000) ||
          (budgetFilter === "high" && amount >= 15000 && amount < 30000) ||
          (budgetFilter === "enterprise" && amount >= 30000)
        ) {
          matchesBudget = true;
        }
      } else if (inquiry.budget.type === "range") {
        const avg = (inquiry.budget.min + inquiry.budget.max) / 2;
        if (
          (budgetFilter === "low" && avg < 5000) ||
          (budgetFilter === "medium" && avg >= 5000 && avg < 15000) ||
          (budgetFilter === "high" && avg >= 15000 && avg < 30000) ||
          (budgetFilter === "enterprise" && avg >= 30000)
        ) {
          matchesBudget = true;
        }
      }
    }
    
    // Status filter
    const matchesStatus = 
      statusFilter === "all" || inquiry.status === statusFilter;
    
    // Recommended filter
    const matchesRecommended = 
      !showRecommendedOnly || inquiry.isRecommended;
    
    return matchesSearch && matchesIndustry && matchesTimeline && 
           matchesBudget && matchesStatus && matchesRecommended;
  });

  // Sort inquiries
  const sortedInquiries = [...filteredInquiries].sort((a, b) => {
    switch (sortOption) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "match":
        return b.match - a.match;
      case "budget-high":
        const getBudgetValue = (inq) => {
          if (inq.budget.type === "fixed") return inq.budget.amount;
          if (inq.budget.type === "range") return (inq.budget.min + inq.budget.max) / 2;
          return 0; // For open budgets, sort them last
        };
        return getBudgetValue(b) - getBudgetValue(a);
      case "budget-low":
        const getBudgetVal = (inq) => {
          if (inq.budget.type === "fixed") return inq.budget.amount;
          if (inq.budget.type === "range") return (inq.budget.min + inq.budget.max) / 2;
          return 100000; // For open budgets, sort them last
        };
        return getBudgetVal(a) - getBudgetVal(b);
      default:
        return 0;
    }
  });

  const handleInquiryClick = (id) => {
    navigate(`/developer/inquiries/${id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return <Badge variant="default">New</Badge>;
      case "active":
        return <Badge variant="secondary">Active</Badge>;
      case "taken":
        return <Badge variant="outline">Taken</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Inquiries</h1>
          <p className="text-muted-foreground">
            Browse and respond to customer inquiries for custom AI solutions
          </p>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search inquiries..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger>
                    <Briefcase className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                  <SelectTrigger>
                    <CreditCard className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={timelineFilter} onValueChange={setTimelineFilter}>
                  <SelectTrigger>
                    <CalendarClock className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <AlertOctagon className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">New/Open</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="taken">Taken</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
                    <BarChart2 className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Newest First</SelectItem>
                    <SelectItem value="match">Best Match</SelectItem>
                    <SelectItem value="budget-high">Budget (High to Low)</SelectItem>
                    <SelectItem value="budget-low">Budget (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center pt-2">
                <Checkbox
                  id="recommended"
                  checked={showRecommendedOnly}
                  onCheckedChange={setShowRecommendedOnly}
                />
                <label
                  htmlFor="recommended"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                >
                  <Crown className="h-4 w-4 text-amber-500 mr-1" />
                  Show recommended matches only
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Available Inquiries</CardTitle>
              <Badge variant="outline" className="ml-2">
                {filteredInquiries.length} results
              </Badge>
            </div>
            <CardDescription>
              Click on an inquiry to view details and submit a proposal
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No inquiries found</h3>
                <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
                  Try adjusting your filters or check back later for new inquiries.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Match</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedInquiries.map((inquiry) => (
                      <TableRow 
                        key={inquiry.id}
                        className={inquiry.isRecommended ? "bg-amber-50/30" : ""}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-start">
                            {inquiry.isRecommended && (
                              <Crown className="h-4 w-4 text-amber-500 mr-1 mt-1 flex-shrink-0" />
                            )}
                            <div>
                              {inquiry.projectTitle}
                              <div className="text-xs text-muted-foreground max-w-xs truncate">
                                {inquiry.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {inquiry.companyName}
                            <span className="text-xs text-muted-foreground capitalize">
                              {inquiry.industry}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatBudget(inquiry.budget)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {inquiry.timeline}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                            {inquiry.responseCount}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center whitespace-nowrap">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                            {formatDate(inquiry.date)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(inquiry.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className={`h-3.5 w-3.5 ${inquiry.match > 80 ? "text-amber-500" : "text-muted-foreground"} mr-1`} />
                            <span className={inquiry.match > 80 ? "font-medium" : ""}>
                              {inquiry.match}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline" 
                            size="sm"
                            onClick={() => handleInquiryClick(inquiry.id)}
                            className="whitespace-nowrap"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Inquiry Notification Preferences
            </CardTitle>
            <CardDescription>
              Customize which types of inquiries you'd like to be notified about
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Industries</h4>
                {industries.slice(1).map((industry) => (
                  <div key={industry.value} className="flex items-center space-x-2">
                    <Checkbox id={`industry-${industry.value}`} defaultChecked={["technology", "finance", "healthcare"].includes(industry.value)} />
                    <label
                      htmlFor={`industry-${industry.value}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {industry.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Budget Minimum</h4>
                <div className="px-3">
                  <Slider
                    defaultValue={[5000]}
                    max={50000}
                    step={1000}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$0</span>
                    <span>$50,000+</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Skills & Integration</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-email" defaultChecked />
                  <label
                    htmlFor="skill-email"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email Systems
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-data" defaultChecked />
                  <label
                    htmlFor="skill-data"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Data Analysis
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-crm" defaultChecked />
                  <label
                    htmlFor="skill-crm"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    CRM Integration
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-chat" />
                  <label
                    htmlFor="skill-chat"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Chatbots
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-nlp" />
                  <label
                    htmlFor="skill-nlp"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    NLP Systems
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button>
                <Bell className="h-4 w-4 mr-2" />
                Save Notification Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DeveloperLayout>
  );
};

export default InquiryListing;
