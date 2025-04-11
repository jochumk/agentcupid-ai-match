
import { FileText, Coins, Calendar, Building, Laptop, Link2, Download } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type Attachment = {
  id: string;
  name: string;
  size: string;
  type: string;
};

type Budget = {
  type: string;
  amount?: number;
  min?: number;
  max?: number;
};

interface ProjectOverviewCardProps {
  description: string;
  budget: Budget;
  timelineDisplay: string;
  industry: string;
  currentTools: string;
  integrationRequirements: string;
  attachments: Attachment[];
}

export default function ProjectOverviewCard({
  description,
  budget,
  timelineDisplay,
  industry,
  currentTools,
  integrationRequirements,
  attachments
}: ProjectOverviewCardProps) {
  const formatBudget = (budget: Budget) => {
    if (budget.type === "fixed") {
      return `$${budget.amount?.toLocaleString()}`;
    } else if (budget.type === "range") {
      return `$${budget.min?.toLocaleString()} - $${budget.max?.toLocaleString()}`;
    } else {
      return "Open Budget";
    }
  };

  return (
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
              {formatBudget(budget)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Timeline</div>
            <div className="flex items-center font-medium">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              {timelineDisplay}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Industry</div>
            <div className="flex items-center font-medium">
              <Building className="h-4 w-4 mr-2 text-muted-foreground" />
              {industry}
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">Project Description</h3>
          <p className="text-sm whitespace-pre-line">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Current Tools & Systems</h3>
            <div className="flex items-center">
              <Laptop className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{currentTools}</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Integration Requirements</h3>
            <div className="flex items-center">
              <Link2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{integrationRequirements}</span>
            </div>
          </div>
        </div>
        
        {attachments.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Attachments</h3>
            <div className="space-y-2">
              {attachments.map((attachment) => (
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
  );
}
