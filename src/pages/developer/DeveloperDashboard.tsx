
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Eye, MessageSquare, Plus, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const DeveloperDashboard = () => {
  // Mock data for the dashboard - in a real app, this would come from an API
  const stats = [
    {
      title: "Total Agent Views",
      value: "3,240",
      change: "+20%",
      icon: Eye,
      description: "Last 30 days",
    },
    {
      title: "Active Customers",
      value: "12",
      change: "+5",
      icon: UserPlus,
      description: "Last 30 days",
    },
    {
      title: "New Inquiries",
      value: "24",
      change: "+8",
      icon: MessageSquare,
      description: "Last 7 days",
    },
    {
      title: "Revenue",
      value: "$1,840",
      change: "+12%",
      icon: BarChart2,
      description: "Last 30 days",
    },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      type: "inquiry",
      message: "New inquiry received for Email Automation Agent",
      time: "2 hours ago",
    },
    {
      type: "customer",
      message: "New customer started using Customer Support Agent",
      time: "5 hours ago",
    },
    {
      type: "view",
      message: "Your Data Analysis Agent was viewed 54 times",
      time: "1 day ago",
    },
    {
      type: "update",
      message: "You updated the description for Document Processing Agent",
      time: "2 days ago",
    },
  ];

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Developer Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your AI agents.
            </p>
          </div>
          <Button asChild>
            <Link to="/developer/agents/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Agent
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your agent activity from the past few days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {activity.type === "inquiry" && <MessageSquare className="h-4 w-4 text-primary" />}
                      {activity.type === "customer" && <UserPlus className="h-4 w-4 text-primary" />}
                      {activity.type === "view" && <Eye className="h-4 w-4 text-primary" />}
                      {activity.type === "update" && <BarChart2 className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>
                Your top performing agents based on views
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Email Automation Agent</p>
                    <p className="text-sm text-muted-foreground">1,240 views</p>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Customer Support Agent</p>
                    <p className="text-sm text-muted-foreground">850 views</p>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Data Analysis Agent</p>
                    <p className="text-sm text-muted-foreground">620 views</p>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Document Processing Agent</p>
                    <p className="text-sm text-muted-foreground">530 views</p>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DeveloperLayout>
  );
};

export default DeveloperDashboard;
