
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Clock, HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ConfirmationStep = () => {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Your custom solution request has been submitted!</h2>
      
      <p className="text-gray-600 max-w-md mb-8">
        Thank you for providing the details about your business challenge. Our team will review your request and get back to you soon.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mb-10">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Response Time</h3>
          <p className="text-sm text-gray-600">Within 24 hours</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Confirmation Email</h3>
          <p className="text-sm text-gray-600">Sent to your inbox</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Reference Number</h3>
          <p className="text-sm text-gray-600">CS-{Math.floor(10000 + Math.random() * 90000)}</p>
        </div>
      </div>
      
      <div className="w-full max-w-2xl mb-10">
        <h3 className="text-lg font-medium mb-4 text-left">Frequently Asked Questions</h3>
        
        <Accordion type="single" collapsible className="bg-white rounded-md">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">What happens next?</AccordionTrigger>
            <AccordionContent>
              A specialist from our team will review your request and reach out within 24 hours to discuss your needs in more detail, answer any questions, and recommend possible solutions.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">Can I modify my request?</AccordionTrigger>
            <AccordionContent>
              Yes! You'll receive a confirmation email with a link to view and edit your request. You can also contact our support team directly if you need to make any changes.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">How long does the process take?</AccordionTrigger>
            <AccordionContent>
              After our initial consultation, we'll provide you with a timeline based on your specific needs. Simple solutions might be implemented within days, while more complex custom solutions could take several weeks to develop and deploy.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">What if I have more questions?</AccordionTrigger>
            <AccordionContent>
              Feel free to reach out to our support team at support@agentcupid.com with any questions you might have. We're here to help at every step of the process.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg w-full max-w-2xl mb-8">
        <h3 className="font-medium mb-4 flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-primary" />
          While you wait, you might want to explore these options:
        </h3>
        
        <div className="space-y-3">
          <Link to="/find-agents" className="block p-3 bg-white rounded border hover:shadow-sm transition-shadow">
            <div className="font-medium">Browse our AI agent marketplace</div>
            <p className="text-sm text-gray-600">We have 100+ pre-built solutions for common business challenges</p>
          </Link>
          
          <Link to="/pricing" className="block p-3 bg-white rounded border hover:shadow-sm transition-shadow">
            <div className="font-medium">Review pricing plans</div>
            <p className="text-sm text-gray-600">Learn about our subscription options and custom solution pricing</p>
          </Link>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <Button variant="outline" asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
        
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
