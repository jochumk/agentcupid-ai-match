
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  FileText,
  MessageSquare,
  PenTool,
} from "lucide-react";

// Import refactored components
import HeaderSection from "@/components/inquiries/HeaderSection";
import ProjectOverviewCard from "@/components/inquiries/ProjectOverviewCard";
import ClientContactCard from "@/components/inquiries/ClientContactCard";
import CompetitionCard from "@/components/inquiries/CompetitionCard";
import QuestionAnswerSection from "@/components/inquiries/QuestionAnswerSection";
import ProposalSubmissionForm from "@/components/inquiries/ProposalSubmissionForm";
import ProposalTipsCard from "@/components/inquiries/ProposalTipsCard";

const mockInquiryData = {
  id: "INQ-001",
  companyName: "TechCorp Solutions",
  contactName: "David Chen",
  contactEmail: "david.chen@techcorp.com",
  contactPhone: "+1 (555) 123-4567",
  industry: "Technology",
  projectTitle: "AI Email Response System Integration",
  description: "We are looking for a developer to help integrate an AI-powered email response system with our existing customer service platform. Our support team handles approximately 500 emails per day, and we would like to automate at least 50% of the responses to common questions. We need a solution that can classify incoming emails, generate appropriate responses, and learn from human corrections.",
  currentTools: "Gmail, Zendesk, Slack",
  integrationRequirements: "Must integrate with Zendesk and Gmail API",
  timeline: "short",
  timelineDisplay: "Short-term (1-4 weeks)",
  budget: { type: "fixed", amount: 5000 },
  status: "open",
  datePosted: "2025-04-08T14:30:00Z",
  responseCount: 2,
  match: 92,
  isRecommended: true,
  attachments: [
    { id: "attachment1", name: "Requirements.pdf", size: "245 KB", type: "application/pdf" },
    { id: "attachment2", name: "Current System Diagram.png", size: "420 KB", type: "image/png" },
  ],
  questionHistory: [
    {
      id: "q1",
      question: "How many users will be using the system simultaneously?",
      askedBy: {
        id: "dev1",
        name: "Alex Johnson",
        avatar: "",
      },
      answer: "We have about 15-20 support staff who would be using the system simultaneously during peak hours.",
      timestamp: "2025-04-09T10:15:00Z",
    },
    {
      id: "q2",
      question: "What languages need to be supported in the email responses?",
      askedBy: {
        id: "dev2",
        name: "Sarah Lee",
        avatar: "",
      },
      answer: "Initially, we only need English support, but we'd like to expand to Spanish and French in the future.",
      timestamp: "2025-04-09T11:30:00Z",
    },
  ],
};

const InquiryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inquiry] = useState(mockInquiryData);
  const [activeTab, setActiveTab] = useState("details");
  const [isContactBlurred] = useState(true);
  
  const handleNavigateToInquiries = () => {
    navigate("/developer/inquiries");
  };
  
  const handleShowProposalTab = () => {
    setActiveTab("proposal");
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <HeaderSection 
          projectTitle={inquiry.projectTitle}
          companyName={inquiry.companyName}
          datePosted={inquiry.datePosted}
          isRecommended={inquiry.isRecommended}
          match={inquiry.match}
          status={inquiry.status}
          onBack={handleNavigateToInquiries}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="details">
              <FileText className="h-4 w-4 mr-2" />
              Project Details
            </TabsTrigger>
            <TabsTrigger value="questions">
              <MessageSquare className="h-4 w-4 mr-2" />
              Questions & Answers
            </TabsTrigger>
            <TabsTrigger value="proposal">
              <PenTool className="h-4 w-4 mr-2" />
              Submit Proposal
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <ProjectOverviewCard 
              description={inquiry.description}
              budget={inquiry.budget}
              timelineDisplay={inquiry.timelineDisplay}
              industry={inquiry.industry}
              currentTools={inquiry.currentTools}
              integrationRequirements={inquiry.integrationRequirements}
              attachments={inquiry.attachments}
            />
            
            <ClientContactCard 
              contactName={inquiry.contactName}
              companyName={inquiry.companyName}
              contactEmail={inquiry.contactEmail}
              contactPhone={inquiry.contactPhone}
              isContactBlurred={isContactBlurred}
              onMakeOffer={handleShowProposalTab}
            />
            
            <CompetitionCard 
              responseCount={inquiry.responseCount}
              onCreateProposal={handleShowProposalTab}
            />
          </TabsContent>
          
          <TabsContent value="questions">
            <QuestionAnswerSection questionHistory={inquiry.questionHistory} />
          </TabsContent>
          
          <TabsContent value="proposal" className="space-y-6">
            <ProposalSubmissionForm onSubmit={() => setActiveTab("details")} />
            <ProposalTipsCard />
          </TabsContent>
        </Tabs>
      </div>
    </DeveloperLayout>
  );
};

export default InquiryDetail;
