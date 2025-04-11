
import { useState } from "react";
import { Link } from "react-router-dom";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, MoreHorizontal, Plus, Star, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Mock data for AI agents
const mockAgents = [
  {
    id: 1,
    name: "Email Automation Agent",
    category: "Email Management",
    status: "active",
    views: 1240,
    inquiries: 12,
    customers: 8,
    rating: 4.8,
    price: "Monthly: $29",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    name: "Customer Support Agent",
    category: "Support",
    status: "active",
    views: 850,
    inquiries: 8,
    customers: 4,
    rating: 4.5,
    price: "Monthly: $49",
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    name: "Data Analysis Agent",
    category: "Analytics",
    status: "draft",
    views: 0,
    inquiries: 0,
    customers: 0,
    rating: 0,
    price: "Monthly: $69",
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    name: "Document Processing Agent",
    category: "Office",
    status: "active",
    views: 530,
    inquiries: 6,
    customers: 2,
    rating: 4.2,
    price: "Monthly: $39",
    lastUpdated: "5 days ago",
  },
  {
    id: 5,
    name: "Inventory Management Agent",
    category: "Operations",
    status: "inactive",
    views: 320,
    inquiries: 2,
    customers: 1,
    rating: 3.9,
    price: "Monthly: $59",
    lastUpdated: "2 weeks ago",
  },
];

const AgentManagement = () => {
  const [agents, setAgents] = useState(mockAgents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter agents based on search term and status
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleAgentStatus = (id: number) => {
    const updatedAgents = agents.map((agent) => {
      if (agent.id === id) {
        const newStatus = agent.status === "active" ? "inactive" : "active";
        toast.success(`Agent status changed to ${newStatus}`);
        return { ...agent, status: newStatus };
      }
      return agent;
    });
    setAgents(updatedAgents);
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My AI Agents</h1>
            <p className="text-muted-foreground">
              Manage and monitor your agents performance
            </p>
          </div>
          <Button asChild>
            <Link to="/developer/agents/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Agent
            </Link>
          </Button>
        </div>

        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agents.length}</div>
              <p className="text-xs text-muted-foreground">
                {agents.filter(a => a.status === "active").length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {agents.reduce((sum, agent) => sum + agent.views, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {agents.reduce((sum, agent) => sum + agent.inquiries, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {agents.reduce((sum, agent) => sum + agent.customers, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all agents
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter and search */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("inactive")}
            >
              Inactive
            </Button>
            <Button
              variant={statusFilter === "draft" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("draft")}
            >
              Draft
            </Button>
          </div>
          <div className="w-full sm:w-1/3">
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Agents table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Inquiries</TableHead>
                  <TableHead>Customers</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          agent.status === "active"
                            ? "default"
                            : agent.status === "inactive"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Eye className="mr-1 h-3 w-3" /> {agent.views.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-3 w-3" /> {agent.inquiries}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3" /> {agent.customers}
                      </div>
                    </TableCell>
                    <TableCell>
                      {agent.rating > 0 ? (
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{agent.rating}</span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{agent.price}</TableCell>
                    <TableCell>{agent.lastUpdated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link to={`/developer/agents/${agent.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link to={`/developer/agents/${agent.id}/edit`}>Edit Agent</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toggleAgentStatus(agent.id)}>
                            {agent.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAgents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center h-24">
                      No agents found. Try adjusting your filters or{" "}
                      <Link to="/developer/agents/new" className="text-primary hover:underline">
                        create a new agent
                      </Link>
                      .
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DeveloperLayout>
  );
};

export default AgentManagement;
