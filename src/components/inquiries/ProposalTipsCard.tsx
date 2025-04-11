
import { Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

export default function ProposalTipsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tips for a Successful Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <p className="text-sm">Demonstrate a clear understanding of the client's needs</p>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <p className="text-sm">Be specific about your implementation approach</p>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <p className="text-sm">Provide a realistic timeline with clear milestones</p>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <p className="text-sm">Include relevant experience and previous similar projects</p>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <p className="text-sm">Set clear expectations about what is included in your price</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
