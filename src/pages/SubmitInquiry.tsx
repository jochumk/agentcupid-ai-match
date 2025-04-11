
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { 
  Building, 
  Calendar, 
  Coins, 
  FileUp, 
  Laptop, 
  Link2, 
  Send, 
  User 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Form schema validation
const formSchema = z.object({
  inquiryType: z.enum(["direct", "open"], {
    required_error: "Please select an inquiry type",
  }),
  developerID: z.string().optional().nullable(),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().optional(),
  industry: z.string({
    required_error: "Please select your industry.",
  }),
  projectDescription: z.string().min(30, {
    message: "Project description must be at least 30 characters.",
  }),
  currentTools: z.string().optional(),
  integrationRequirements: z.string().optional(),
  timeline: z.string({
    required_error: "Please select your preferred timeline.",
  }),
  budgetType: z.enum(["fixed", "range", "open"], {
    required_error: "Please select a budget type.",
  }),
  fixedBudget: z.string().optional(),
  minBudget: z.number().optional(),
  maxBudget: z.number().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const industries = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "entertainment", label: "Entertainment" },
  { value: "other", label: "Other" },
];

const timelineOptions = [
  { value: "urgent", label: "Urgent (< 1 week)" },
  { value: "short", label: "Short-term (1-4 weeks)" },
  { value: "medium", label: "Medium-term (1-3 months)" },
  { value: "long", label: "Long-term (3+ months)" },
  { value: "flexible", label: "Flexible" },
];

// Mock data for developers (would come from API in real implementation)
const topDevelopers = [
  { id: "dev1", name: "Alex Johnson", expertise: "Email Automation, Data Analysis" },
  { id: "dev2", name: "Sarah Lee", expertise: "Customer Support, Document Processing" },
  { id: "dev3", name: "Michael Chen", expertise: "Data Analysis, Workflow Automation" },
];

const SubmitInquiry = () => {
  const navigate = useNavigate();
  const [budgetRange, setBudgetRange] = useState([1000, 5000]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Define form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inquiryType: "open",
      developerID: null,
      companyName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      industry: "",
      projectDescription: "",
      currentTools: "",
      integrationRequirements: "",
      timeline: "",
      budgetType: "open",
      fixedBudget: "",
      minBudget: budgetRange[0],
      maxBudget: budgetRange[1],
      termsAgreed: false,
    },
  });
  
  const inquiryType = form.watch("inquiryType");
  const budgetType = form.watch("budgetType");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const onSubmit = (values: FormValues) => {
    // In a real application, this would submit to an API
    console.log(values);
    console.log("Attached file:", selectedFile);
    
    // Show success message
    toast.success("Your inquiry has been submitted successfully!");
    
    // Redirect to customer dashboard
    setTimeout(() => {
      navigate("/customer/inquiries");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Submit a Custom Solution Inquiry</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tell us about your business needs and connect with AI developers 
              who can create custom solutions tailored to your requirements.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Inquiry Details</CardTitle>
              <CardDescription>
                Provide information about your project and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Inquiry Type Selection */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Inquiry Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="open" id="inquiry-open" />
                                <label htmlFor="inquiry-open" className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Open Inquiry (visible to all developers)
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="direct" id="inquiry-direct" />
                                <label htmlFor="inquiry-direct" className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Direct Inquiry (to a specific developer)
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Developer Selection (only for direct inquiries) */}
                    {inquiryType === "direct" && (
                      <FormField
                        control={form.control}
                        name="developerID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Developer</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a developer" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {topDevelopers.map((dev) => (
                                  <SelectItem key={dev.id} value={dev.id}>
                                    {dev.name} - {dev.expertise}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              These are our top-rated developers
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  
                  {/* Company & Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="Your company" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry.value} value={industry.value}>
                                  {industry.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="Your name" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline Expectations</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <Calendar className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timelineOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Project Details */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your project and the problem you're trying to solve..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Be specific about your goals and what you hope to achieve.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="currentTools"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Tools & Systems</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Laptop className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                className="pl-10" 
                                placeholder="List the tools and systems you currently use..." 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            E.g., CRM systems, email providers, data storage, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="integrationRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Integration Requirements</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                className="pl-10" 
                                placeholder="List any systems the solution needs to integrate with..." 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Budget Section */}
                  <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-medium mb-4 flex items-center">
                      <Coins className="h-5 w-5 mr-2 text-muted-foreground" />
                      Budget Information
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="budgetType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="fixed" id="budget-fixed" />
                                <label htmlFor="budget-fixed" className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Fixed Budget
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="range" id="budget-range" />
                                <label htmlFor="budget-range" className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Budget Range
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="open" id="budget-open" />
                                <label htmlFor="budget-open" className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  Open Budget (developers make offers)
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {budgetType === "fixed" && (
                      <FormField
                        control={form.control}
                        name="fixedBudget"
                        render={({ field }) => (
                          <FormItem className="mt-3">
                            <FormLabel>Fixed Budget Amount (USD)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-3">$</span>
                                <Input 
                                  className="pl-8" 
                                  type="number" 
                                  placeholder="Enter amount" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {budgetType === "range" && (
                      <div className="mt-3 space-y-4">
                        <div className="flex justify-between mb-2">
                          <FormLabel>Budget Range: ${budgetRange[0]} - ${budgetRange[1]}</FormLabel>
                        </div>
                        <Slider
                          min={500}
                          max={50000}
                          step={500}
                          value={budgetRange}
                          onValueChange={(values) => {
                            setBudgetRange(values);
                            form.setValue("minBudget", values[0]);
                            form.setValue("maxBudget", values[1]);
                          }}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$500</span>
                          <span>$50,000+</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* File Attachment */}
                  <div className="space-y-2">
                    <FormLabel>Attachment (optional)</FormLabel>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center">
                      <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag & drop a file or click to browse
                      </p>
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className="mt-2"
                      >
                        Select File
                      </Button>
                      {selectedFile && (
                        <div className="mt-3 text-sm">
                          Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Max file size: 10MB. Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG
                    </p>
                  </div>
                  
                  {/* Terms Agreement */}
                  <FormField
                    control={form.control}
                    name="termsAgreed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a> and <a href="#" className="text-primary hover:underline">privacy policy</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {/* Submit Button */}
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Inquiry
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitInquiry;
