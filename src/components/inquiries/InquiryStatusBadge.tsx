
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, CircleDot, CircleCheck } from "lucide-react";

type InquiryStatus = "open" | "active" | "taken" | "completed" | "pending" | "draft";

interface InquiryStatusBadgeProps {
  status: InquiryStatus;
  className?: string;
}

export function InquiryStatusBadge({ status, className }: InquiryStatusBadgeProps) {
  switch (status) {
    case "open":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          Open
        </Badge>
      );
    case "active":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          <CircleDot className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    case "taken":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          <CircleCheck className="h-3 w-3 mr-1" />
          Taken
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-300">
          Pending
        </Badge>
      );
    case "draft":
      return (
        <Badge variant="outline">
          Draft
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
