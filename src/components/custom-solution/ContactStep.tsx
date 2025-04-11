
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

interface ContactStepProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  preferredContact: string;
  setPreferredContact: (value: string) => void;
  bestTimeToContact: string;
  setBestTimeToContact: (value: string) => void;
  agreedToPrivacy: boolean;
  setAgreedToPrivacy: (value: boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const ContactStep: React.FC<ContactStepProps> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  preferredContact,
  setPreferredContact,
  bestTimeToContact,
  setBestTimeToContact,
  agreedToPrivacy,
  setAgreedToPrivacy,
  onBack,
  onSubmit,
}) => {
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const contactTimeOptions = [
    { label: "Morning (9am - 12pm)", value: "morning" },
    { label: "Afternoon (12pm - 5pm)", value: "afternoon" },
    { label: "Evening (5pm - 8pm)", value: "evening" },
    { label: "Any time", value: "anytime" },
  ];

  const isFormValid = name && isValidEmail(email) && preferredContact && bestTimeToContact && agreedToPrivacy;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="full-name" className="text-base font-medium">
            Full Name
          </Label>
          <Input
            id="full-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-base font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2"
            placeholder="Your email address"
            required
          />
          {email && !isValidEmail(email) && (
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid email address
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-base font-medium">
            Phone (optional)
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <Label className="text-base font-medium">
            Preferred Contact Method
          </Label>
          <RadioGroup
            value={preferredContact}
            onValueChange={setPreferredContact}
            className="mt-3 space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="contact-email" />
              <Label htmlFor="contact-email" className="font-normal">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="contact-phone" />
              <Label htmlFor="contact-phone" className="font-normal">Phone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="either" id="contact-either" />
              <Label htmlFor="contact-either" className="font-normal">Either</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="best-time" className="text-base font-medium">
            Best Time to Contact
          </Label>
          <Select value={bestTimeToContact} onValueChange={setBestTimeToContact}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select best time" />
            </SelectTrigger>
            <SelectContent>
              {contactTimeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start space-x-3 pt-4">
          <Checkbox
            id="privacy-policy"
            checked={agreedToPrivacy}
            onCheckedChange={(checked) => 
              setAgreedToPrivacy(checked as boolean)
            }
            className="mt-1"
          />
          <div>
            <Label 
              htmlFor="privacy-policy" 
              className="font-normal cursor-pointer"
            >
              I agree to the AgentCupid Privacy Policy and Terms of Service
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              We'll use your information to respond to your request and provide relevant information about our services.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={!isFormValid}
          className="px-8"
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
};

export default ContactStep;
