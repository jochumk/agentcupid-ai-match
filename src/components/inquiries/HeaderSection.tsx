
import { Building, Clock, Star, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatters";

interface HeaderSectionProps {
  projectTitle: string;
  companyName: string;
  datePosted: string;
  isRecommended: boolean;
  match?: number;
  status: string;
  onBack: () => void;
}

export default function HeaderSection({
  projectTitle,
  companyName,
  datePosted,
  isRecommended,
  match,
  status,
  onBack
}: HeaderSectionProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Inquiries
      </Button>
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight">
          {projectTitle}
        </h1>
        <div className="flex items-center text-muted-foreground">
          <Building className="h-4 w-4 mr-1" />
          {companyName}{" "}
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          Posted {formatDate(datePosted)}
          {isRecommended && (
            <>
              <span className="mx-2">•</span>
              <Star className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-amber-700 font-medium">
                {match}% Match
              </span>
            </>
          )}
        </div>
      </div>
      <Badge
        className={
          status === "open"
            ? "bg-primary"
            : status === "active"
            ? "bg-secondary"
            : "bg-muted"
        }
      >
        {status === "open" ? "New" : 
         status === "active" ? "Active" : 
         status === "taken" ? "Taken" : 
         "Completed"}
      </Badge>
    </div>
  );
}
