
import { useState } from "react";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Camera, Check, Save, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const expertiseAreas = [
  { value: "nlp", label: "Natural Language Processing" },
  { value: "computer_vision", label: "Computer Vision" },
  { value: "decision_systems", label: "Decision Support Systems" },
  { value: "data_analysis", label: "Data Analysis" },
  { value: "automation", label: "Process Automation" },
  { value: "llm", label: "Large Language Models" },
  { value: "chatbots", label: "Conversational AI" },
  { value: "recommendation", label: "Recommendation Systems" },
];

const experienceLevels = [
  { value: "beginner", label: "Beginner (1-2 years)" },
  { value: "intermediate", label: "Intermediate (3-5 years)" },
  { value: "expert", label: "Expert (5+ years)" },
  { value: "professional", label: "Professional Agency" },
];

const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  companyName: z.string().optional(),
  bio: z
    .string()
    .min(50, { message: "Bio must be at least 50 characters" })
    .max(500, { message: "Bio must be less than 500 characters" }),
  experienceLevel: z.string().min(1, { message: "Please select an experience level" }),
  expertise: z.array(z.string()).min(1, { message: "Select at least one area of expertise" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const DeveloperProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Mock data for initial form values - in a real app, fetch from API
  const defaultValues: Partial<ProfileFormValues> = {
    displayName: "Alex Chen",
    companyName: "AI Solutions Inc.",
    bio: "Experienced AI developer specializing in NLP and automation systems. Over 8 years of experience creating enterprise-grade AI agents that solve real business problems.",
    experienceLevel: "expert",
    expertise: ["nlp", "automation", "llm"],
    email: "alex@example.com",
    website: "https://example.com",
    twitter: "alexchen",
    linkedin: "alexchen",
    acceptTerms: true,
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server and get a URL
      // Here we just create a local URL for demonstration
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, this would send data to your backend
    console.log("Profile data:", data);
    console.log("Profile image:", profileImage);
    
    toast.success("Profile updated successfully!");
  };

  return (
    <DeveloperLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Developer Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and showcase your AI expertise to businesses
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile sidebar */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Public Profile</CardTitle>
              <CardDescription>
                How businesses will see you
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="profile-image" 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Camera className="w-6 h-6" />
                </label>
                <input 
                  id="profile-image" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleProfileImageUpload}
                />
              </div>
              
              <div className="text-center">
                <h3 className="font-medium">{form.watch("displayName")}</h3>
                <p className="text-sm text-muted-foreground">{form.watch("companyName")}</p>
              </div>
              
              <div className="w-full pt-4">
                <div className="text-sm font-medium mb-2">Expertise</div>
                <div className="flex flex-wrap gap-1">
                  {form.watch("expertise")?.map((area) => (
                    <Badge key={area} variant="secondary">
                      {expertiseAreas.find(a => a.value === area)?.label || area}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="w-full pt-2">
                <div className="text-sm font-medium mb-2">Experience Level</div>
                <div>
                  <Badge variant="outline" className="text-primary">
                    {experienceLevels.find(e => e.value === form.watch("experienceLevel"))?.label || form.watch("experienceLevel")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile Information</CardTitle>
              <CardDescription>
                Update your public profile and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your full name as shown to businesses
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Company or organization" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your business name, if applicable
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your expertise and experience" 
                            {...field} 
                            rows={5}
                          />
                        </FormControl>
                        <FormDescription>
                          Tell businesses about your AI expertise and experience
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the option that best describes your experience with AI development
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expertise"
                    render={() => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel>Areas of Expertise</FormLabel>
                          <FormDescription>
                            Select all areas where you have significant experience
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {expertiseAreas.map((area) => (
                            <FormField
                              key={area.value}
                              control={form.control}
                              name="expertise"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={area.value}
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(area.value)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, area.value])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== area.value
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {area.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Used for communications and login
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourwebsite.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your personal or company website
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter/X (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="@username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="username or URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Accept terms and conditions
                          </FormLabel>
                          <FormDescription>
                            I agree to the AgentCupid terms of service and developer guidelines.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Payment information section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
              How you'll receive payments from customers using your AI agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="accountName">Account Name</Label>
                <Input id="accountName" placeholder="Account holder name" className="mt-1" />
                <p className="text-sm text-muted-foreground mt-1">
                  The name associated with your payment account
                </p>
              </div>
              
              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select defaultValue="bank">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Stripe Connect</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose your preferred payment method
                </p>
              </div>
              
              <div>
                <Label htmlFor="accountNumber">Account Number / Email</Label>
                <Input id="accountNumber" type="text" placeholder="Account details" className="mt-1" />
                <p className="text-sm text-muted-foreground mt-1">
                  Your payment account number or email address
                </p>
              </div>
              
              <div>
                <Label htmlFor="taxId">Tax ID (Optional)</Label>
                <Input id="taxId" placeholder="Tax identification number" className="mt-1" />
                <p className="text-sm text-muted-foreground mt-1">
                  For tax reporting purposes
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex items-start space-x-3">
              <Checkbox id="isBusinessAccount" />
              <div>
                <Label htmlFor="isBusinessAccount">This is a business account</Label>
                <p className="text-sm text-muted-foreground">
                  Select this if you're receiving payments as a business entity
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>
              <Check className="mr-2 h-4 w-4" />
              Save Payment Information
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DeveloperLayout>
  );
};

export default DeveloperProfile;
