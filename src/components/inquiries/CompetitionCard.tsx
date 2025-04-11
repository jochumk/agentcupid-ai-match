
import { Users, AlertTriangle, PenTool } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CompetitionCardProps {
  responseCount: number;
  onCreateProposal: () => void;
}

export default function CompetitionCard({
  responseCount,
  onCreateProposal
}: CompetitionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Competition</CardTitle>
        <CardDescription>
          Other developers interested in this project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{responseCount}</h3>
            <p className="text-muted-foreground">
              {responseCount === 1
                ? "developer has responded"
                : "developers have responded"}
            </p>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <AlertTriangle className="h-4 w-4 inline-block mr-1 text-amber-500" />
          Submit your proposal soon to increase your chances of being selected.
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onCreateProposal}
          className="w-full"
        >
          <PenTool className="h-4 w-4 mr-2" />
          Create Your Proposal
        </Button>
      </CardFooter>
    </Card>
  );
}
