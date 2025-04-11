
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Filter,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Sliders,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeveloperLayout from "@/components/developer/DeveloperLayout";

// Mock data for inquiries
const mockInquiries = [
  {
    id: "INQ-001",
    title: "AI Chatbot for Customer Support",
    description: "Looking for an AI chatbot to handle basic customer inquiries on our website.",
    date: "2024-04-25",
    budget: 5000,
    industry: "E-commerce",
    integrations: ["Website", "CRM"],
    status: "open",
    preferred: true,
    customer: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
  },
  {
    id: "INQ-002",
    title: "Automated Email Marketing Campaign",
    description: "Need an AI to create and manage email marketing campaigns.",
    date: "2024-04-24",
    budget: 10000,
    industry: "Marketing",
    integrations: ["Mailchimp", "Salesforce"],
    status: "pending",
    preferred: false,
    customer: {
      name: "Alice Smith",
      avatar: "https://avatars.githubusercontent.com/u/88843?v=4",
    },
  },
  {
    id: "INQ-003",
    title: "AI-Powered Data Analysis Tool",
    description: "Seeking an AI solution to analyze large datasets and provide insights.",
    date: "2024-04-23",
    budget: 15000,
    industry: "Finance",
    integrations: ["Excel", "SQL"],
    status: "closed",
    preferred: true,
    customer: {
      name: "Bob Johnson",
      avatar: "https://pbs.twimg.com/profile_images/1587647094267049984/d-oVy26j_400x400.jpg",
    },
  },
];

const InquiryListing = () => {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const [filters, setFilters] = useState({
    industries: [],
    integrations: [],
    budget: { min: 0, max: 10000 },
    statuses: [],
    showPreferred: false,
  });

  const filteredInquiries = inquiries.filter((inquiry) => {
    const searchMatch =
      inquiry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.description.toLowerCase().includes(searchQuery.toLowerCase());

    const industryMatch =
      filters.industries.length === 0 || filters.industries.includes(inquiry.industry);

    const integrationMatch =
      filters.integrations.length === 0 ||
      filters.integrations.some((integration) => inquiry.integrations.includes(integration));

    const budgetMatch = inquiry.budget >= filters.budget.min && inquiry.budget <= filters.budget.max;

    const statusMatch = filters.statuses.length === 0 || filters.statuses.includes(inquiry.status);

    const preferredMatch = !filters.showPreferred || inquiry.preferred;

    return searchMatch && industryMatch && integrationMatch && budgetMatch && statusMatch && preferredMatch;
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => {
      const current = [...prev[type]];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const handleShowPreferredChange = (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      showPreferred: checked,
    }));
  };

  const clearFilters = () => {
    setFilters({
      industries: [],
      integrations: [],
      budget: { min: 0, max: 10000 },
      statuses: [],
      showPreferred: false,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-100 text-green-800">Open</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "closed":
        return <Badge className="bg-red-100 text-red-800">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Inquiries</h1>
            <p className="text-muted-foreground">
              Browse customer inquiries and find opportunities to offer your AI solutions.
            </p>
          </div>
          <Button asChild>
            <Link to="/developer/inquiry-management">
              <Plus className="mr-2 h-4 w-4" />
              Create Inquiry
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inquiry Listings</CardTitle>
            <CardDescription>
              Find customer inquiries that match your expertise and offer your AI solutions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inquiries..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear
              </Button>
              <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <Sliders className="mr-2 h-5 w-5" />
                      Filter Inquiries
                    </DialogTitle>
                    <DialogDescription>
                      Set filters to narrow down the inquiries based on your preferences.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    {/* Industry Filter */}
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <ScrollArea className="h-[120px] w-full rounded-md border p-2">
                        <div className="flex flex-col space-y-1">
                          {["E-commerce", "Marketing", "Finance", "Healthcare", "Technology"].map((industry) => (
                            <div key={industry} className="flex items-center space-x-2">
                              <Checkbox
                                id={`industry-${industry}`}
                                checked={filters.industries.includes(industry)}
                                onCheckedChange={(checked) =>
                                  handleFilterChange("industries", industry)
                                }
                              />
                              <Label htmlFor={`industry-${industry}`}>{industry}</Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                    
                    {/* Integration Filter */}
                    <div className="space-y-2">
                      <Label>Integrations</Label>
                      <ScrollArea className="h-[120px] w-full rounded-md border p-2">
                        <div className="flex flex-col space-y-1">
                          {["Website", "CRM", "Mailchimp", "Salesforce", "Excel", "SQL"].map((integration) => (
                            <div key={integration} className="flex items-center space-x-2">
                              <Checkbox
                                id={`integration-${integration}`}
                                checked={filters.integrations.includes(integration)}
                                onCheckedChange={(checked) =>
                                  handleFilterChange("integrations", integration)
                                }
                              />
                              <Label htmlFor={`integration-${integration}`}>{integration}</Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                    
                    {/* Show Preferred Only */}
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="show-preferred" 
                        checked={filters.showPreferred}
                        onCheckedChange={handleShowPreferredChange}
                      />
                      <Label htmlFor="show-preferred">Show recommended inquiries only</Label>
                    </div>
                    
                    {/* Budget Range Input */}
                    <div className="space-y-2">
                      <Label>Budget Range</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.budget.min}
                          onChange={(e) => 
                            setFilters(prev => ({
                              ...prev, 
                              budget: {...prev.budget, min: parseInt(e.target.value) || 0}
                            }))
                          }
                          className="w-24"
                        />
                        <span>to</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.budget.max}
                          onChange={(e) => 
                            setFilters(prev => ({
                              ...prev, 
                              budget: {...prev.budget, max: parseInt(e.target.value) || 10000}
                            }))
                          }
                          className="w-24"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="secondary" onClick={clearFilters}>
                      Reset Filters
                    </Button>
                    <Button type="button" onClick={() => setIsFilterDialogOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                  All Inquiries
                </TabsTrigger>
                <TabsTrigger value="preferred" onClick={() => setActiveTab("preferred")}>
                  Recommended for You
                </TabsTrigger>
                <TabsTrigger value="active" onClick={() => setActiveTab("active")}>
                  Active
                </TabsTrigger>
                <TabsTrigger value="pending" onClick={() => setActiveTab("pending")}>
                  Pending
                </TabsTrigger>
                <TabsTrigger value="closed" onClick={() => setActiveTab("closed")}>
                  Closed
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-2">
                {filteredInquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          <Link to={`/developer/inquiries/${inquiry.id}`} className="hover:underline">
                            {inquiry.title}
                          </Link>
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link to={`/developer/inquiries/${inquiry.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link to="#">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to="#">Delete</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        {inquiry.industry} - Budget: ${inquiry.budget}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {inquiry.description}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={inquiry.customer.avatar} alt={inquiry.customer.name} />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{inquiry.customer.name}</span>
                      </div>
                      <div className="text-xs">Posted on {format(new Date(inquiry.date), "MMM d, yyyy")}</div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="preferred" className="space-y-2">
                {filteredInquiries
                  .filter((inquiry) => inquiry.preferred)
                  .map((inquiry) => (
                    <Card key={inquiry.id} className="border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            <Link to={`/developer/inquiries/${inquiry.id}`} className="hover:underline">
                              {inquiry.title}
                            </Link>
                          </CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Link to={`/developer/inquiries/${inquiry.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Link to="#">Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link to="#">Delete</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription>
                          {inquiry.industry} - Budget: ${inquiry.budget}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {inquiry.description}
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={inquiry.customer.avatar} alt={inquiry.customer.name} />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{inquiry.customer.name}</span>
                        </div>
                        <div className="text-xs">Posted on {format(new Date(inquiry.date), "MMM d, yyyy")}</div>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
              <TabsContent value="active" className="space-y-2">
                {filteredInquiries
                  .filter((inquiry) => inquiry.status === "open")
                  .map((inquiry) => (
                    <Card key={inquiry.id} className="border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            <Link to={`/developer/inquiries/${inquiry.id}`} className="hover:underline">
                              {inquiry.title}
                            </Link>
                          </CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Link to={`/developer/inquiries/${inquiry.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Link to="#">Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link to="#">Delete</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription>
                          {inquiry.industry} - Budget: ${inquiry.budget}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {inquiry.description}
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={inquiry.customer.avatar} alt={inquiry.customer.name} />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{inquiry.customer.name}</span>
                        </div>
                        <div className="text-xs">Posted on {format(new Date(inquiry.date), "MMM d, yyyy")}</div>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
              <TabsContent value="pending" className="space-y-2">
                {filteredInquiries
                  .filter((inquiry) => inquiry.status === "pending")
                  .map((inquiry) => (
                    <Card key={inquiry.id} className="border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            <Link to={`/developer/inquiries/${inquiry.id}`} className="hover:underline">
                              {inquiry.title}
                            </Link>
                          </CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Link to={`/developer/inquiries/${inquiry.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Link to="#">Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link to="#">Delete</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription>
                          {inquiry.industry} - Budget: ${inquiry.budget}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {inquiry.description}
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={inquiry.customer.avatar} alt={inquiry.customer.name} />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{inquiry.customer.name}</span>
                        </div>
                        <div className="text-xs">Posted on {format(new Date(inquiry.date), "MMM d, yyyy")}</div>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
              <TabsContent value="closed" className="space-y-2">
                {filteredInquiries
                  .filter((inquiry) => inquiry.status === "closed")
                  .map((inquiry) => (
                    <Card key={inquiry.id} className="border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            <Link to={`/developer/inquiries/${inquiry.id}`} className="hover:underline">
                              {inquiry.title}
                            </Link>
                          </CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Link to={`/developer/inquiries/${inquiry.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Link to="#">Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link to="#">Delete</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription>
                          {inquiry.industry} - Budget: ${inquiry.budget}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {inquiry.description}
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={inquiry.customer.avatar} alt={inquiry.customer.name} />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{inquiry.customer.name}</span>
                        </div>
                        <div className="text-xs">Posted on {format(new Date(inquiry.date), "MMM d, yyyy")}</div>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Remove the extra Dialog component since we now have it in the right place */}
    </DeveloperLayout>
  );
};

export default InquiryListing;
