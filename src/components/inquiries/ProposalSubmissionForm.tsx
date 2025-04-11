
import { useState } from "react";
import { AlertTriangle, Calendar, CreditCard, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ProposalFormData {
  solution: string;
  timeline: string;
  cost: string;
  experience: string;
}

interface ProposalSubmissionFormProps {
  onSubmit: () => void;
}

export default function ProposalSubmissionForm({ onSubmit }: ProposalSubmissionFormProps) {
  const [proposalData, setProposalData] = useState<ProposalFormData>({
    solution: "",
    timeline: "",
    cost: "",
    experience: ""
  });
  
  const handleProposalChange = (field: keyof ProposalFormData, value: string) => {
    setProposalData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!proposalData.solution || !proposalData.timeline || !proposalData.cost) {
      toast.error("Please complete all required fields");
      return;
    }
    
    toast.success("Your proposal has been submitted successfully!");
    
    setProposalData({
      solution: "",
      timeline: "",
      cost: "",
      experience: "",
    });
    
    onSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Proposal</CardTitle>
        <CardDescription>
          Provide details about your solution, timeline and budget
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitProposal} className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Proposed Solution *</h3>
              <Textarea
                placeholder="Describe your approach to solving this problem..."
                value={proposalData.solution}
                onChange={(e) => handleProposalChange("solution", e.target.value)}
                className="min-h-[150px]"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Be specific about your solution and implementation approach.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Timeline Estimate *</h3>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="e.g., 3 weeks, with milestone deliveries at week 1 and 2"
                  className="pl-10"
                  value={proposalData.timeline}
                  onChange={(e) => handleProposalChange("timeline", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Cost Estimate *</h3>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="e.g., $4,500 total, or hourly rate"
                  className="pl-10"
                  value={proposalData.cost}
                  onChange={(e) => handleProposalChange("cost", e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Be clear about what is included in your price and any potential additional costs.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Relevant Experience</h3>
              <Textarea
                placeholder="Describe your experience with similar projects..."
                value={proposalData.experience}
                onChange={(e) => handleProposalChange("experience", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center mb-4 text-sm">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
              <span>
                Your proposal will be visible to the customer immediately.
                Make sure all information is accurate and professional.
              </span>
            </div>
            <Button type="submit" className="w-full">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Submit Proposal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
