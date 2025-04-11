
import { User, Handshake } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "./PhoneIcon";

interface ClientContactCardProps {
  contactName: string;
  companyName: string;
  contactEmail: string;
  contactPhone?: string;
  isContactBlurred: boolean;
  onMakeOffer: () => void;
}

export default function ClientContactCard({
  contactName,
  companyName,
  contactEmail,
  contactPhone,
  isContactBlurred,
  onMakeOffer
}: ClientContactCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Contact</CardTitle>
        <CardDescription>
          Direct contact information for the inquiry submitter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {contactName.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <h3 className="font-medium filter blur-sm select-none">
              {contactName}
            </h3>
            <div className="text-sm text-muted-foreground filter blur-sm select-none">
              {companyName}
            </div>
            <div className="flex space-x-4 text-sm filter blur-sm select-none">
              <span className="flex items-center">
                <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {contactEmail}
              </span>
              {contactPhone && (
                <span className="flex items-center">
                  <PhoneIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  {contactPhone}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="default" 
          size="sm"
          onClick={() => {
            onMakeOffer();
            toast.success("You can now submit your proposal");
          }}
        >
          <Handshake className="h-4 w-4 mr-2" />
          Make an Offer
        </Button>
      </CardFooter>
    </Card>
  );
}
