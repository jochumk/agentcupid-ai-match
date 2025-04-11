
import { Building, Calendar, CreditCard, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { InquiryStatusBadge } from "./InquiryStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

// Ensure the InquiryStatus type here matches the one in InquiryStatusBadge
type InquiryStatus = "open" | "active" | "taken" | "completed" | "pending" | "draft";

interface Inquiry {
  id: string;
  title: string;
  description: string;
  company: string;
  industry: string;
  date: string; // ISO date string
  budget: {
    type: "fixed" | "range" | "open";
    value?: string;
    min?: number;
    max?: number;
  };
  integrations: string[];
  status: InquiryStatus;
  proposalCount: number;
}

interface InquiryCardProps {
  inquiry: Inquiry;
  isDeveloper?: boolean;
}

export function InquiryCard({ inquiry, isDeveloper = false }: InquiryCardProps) {
  const formatBudget = (budget: Inquiry["budget"]) => {
    if (budget.type === "open") return "Open Budget";
    if (budget.type === "fixed") return `$${budget.value}`;
    if (budget.type === "range") return `$${budget.min} - $${budget.max}`;
    return "Not specified";
  };

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "Unknown date";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{inquiry.title}</CardTitle>
          <InquiryStatusBadge status={inquiry.status} />
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Building className="h-3.5 w-3.5 mr-1" />
          <span>{inquiry.company}</span>
          <span className="mx-1.5">•</span>
          <span>{inquiry.industry}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {inquiry.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span title={inquiry.date}>{getTimeAgo(inquiry.date)}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <CreditCard className="h-3.5 w-3.5 mr-1.5" />
            <span>{formatBudget(inquiry.budget)}</span>
          </div>
        </div>
        
        {inquiry.integrations.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1 mt-3">
            <div className="flex items-center text-muted-foreground mr-1 text-sm">
              <Link2 className="h-3.5 w-3.5 mr-1" />
              <span>Integrations:</span>
            </div>
            {inquiry.integrations.slice(0, 3).map((integration) => (
              <Badge key={integration} variant="outline" className="text-xs">
                {integration}
              </Badge>
            ))}
            {inquiry.integrations.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{inquiry.integrations.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t pt-3">
        {inquiry.proposalCount > 0 && (
          <Badge variant="outline" className="text-primary border-primary-foreground/20">
            {inquiry.proposalCount} Proposal{inquiry.proposalCount > 1 ? 's' : ''}
          </Badge>
        )}
        
        <Button size="sm" asChild>
          <Link to={isDeveloper ? `/developer/inquiries/${inquiry.id}` : `/customer/inquiries/${inquiry.id}`}>
            {isDeveloper ? "View & Respond" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
