
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";

const categories = [
  { value: "email", label: "Email Management" },
  { value: "support", label: "Customer Support" },
  { value: "analytics", label: "Analytics & Reporting" },
  { value: "office", label: "Office Productivity" },
  { value: "operations", label: "Operations" },
  { value: "sales", label: "Sales & Marketing" },
  { value: "hr", label: "HR & Recruitment" },
  { value: "finance", label: "Finance & Accounting" },
];

const integrations = [
  { id: "gmail", label: "Gmail" },
  { id: "outlook", label: "Outlook" },
  { id: "slack", label: "Slack" },
  { id: "zoom", label: "Zoom" },
  { id: "excel", label: "Excel" },
  { id: "google_docs", label: "Google Docs" },
  { id: "salesforce", label: "Salesforce" },
  { id: "hubspot", label: "HubSpot" },
  { id: "shopify", label: "Shopify" },
  { id: "quickbooks", label: "QuickBooks" },
];

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  shortDescription: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(150, { message: "Description must be less than 150 characters" }),
  detailedDescription: z
    .string()
    .min(50, { message: "Detailed description must be at least 50 characters" }),
  features: z.string().min(10, { message: "Features must be at least 10 characters" }),
  problemsSolved: z.string().min(10, { message: "This field is required" }),
  integrations: z.record(z.boolean()).optional(),
  setupComplexity: z.string(),
  pricingModel: z.string(),
  priceAmount: z.string().min(1, { message: "Price is required" }),
  setupFee: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AgentSubmission = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      shortDescription: "",
      detailedDescription: "",
      features: "",
      problemsSolved: "",
      integrations: {},
      setupComplexity: "simple",
      pricingModel: "monthly",
      priceAmount: "",
      setupFee: "",
    },
  });

  const nextStep = async () => {
    const fieldsToValidate: any = {
      1: ["name", "category", "shortDescription"],
      2: ["detailedDescription", "features", "problemsSolved"],
      3: ["setupComplexity"],
      4: ["pricingModel", "priceAmount"],
    };

    const currentFields = fieldsToValidate[step];
    
    const isValid = await form.trigger(currentFields);
    
    if (isValid) {
      if (step === 5) {
        handleSubmit();
      } else {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleSubmit = () => {
    // In a real app, this would send data to your backend
    console.log(form.getValues());
    toast.success("AI Agent submitted successfully!");
    navigate("/developer/agents");
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New AI Agent</h1>
          <p className="text-muted-foreground">
            Create a new AI agent for businesses to discover and use
          </p>
        </div>

        {/* Progress steps */}
        <div className="relative">
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex flex-col items-center relative z-10 ${
                  stepNumber <= step ? "text-primary" : "text-gray-400"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    stepNumber <= step
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {stepNumber}
                </div>
                <p className="mt-2 text-xs font-medium text-center">
                  {stepNumber === 1 && "Basic Info"}
                  {stepNumber === 2 && "Details"}
                  {stepNumber === 3 && "Integrations"}
                  {stepNumber === 4 && "Pricing"}
                  {stepNumber === 5 && "Review"}
                </p>
              </div>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="absolute top-5 h-0.5 w-full bg-gray-100">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(step - 1) * 25}%` }}
            ></div>
          </div>
        </div>

        <Form {...form}>
          <form>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide the essential details about your AI agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Email Automation Assistant" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a clear, descriptive name that explains what your agent does
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the category that best describes your agent's primary function
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Briefly describe what your agent does in business terms"
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          This will appear in search results (max 150 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/developer/agents")}
                  >
                    Cancel
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 2: Detailed Description */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Description</CardTitle>
                  <CardDescription>
                    Explain how your agent helps businesses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="detailedDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a comprehensive explanation of what your agent does and how it helps businesses"
                            {...field}
                            rows={6}
                          />
                        </FormControl>
                        <FormDescription>
                          Focus on business benefits, not technical details
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Features</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List the main features of your agent (one per line)"
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription>
                          Focus on what the agent can do for the user
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="problemsSolved"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Problems Solved</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What specific business problems does your agent solve?"
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription>
                          Be specific about the pain points your agent addresses
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Integrations */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Specify what systems your agent works with
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Compatible Systems</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select all platforms that your agent can integrate with
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {integrations.map((integration) => (
                        <FormField
                          key={integration.id}
                          control={form.control}
                          name={`integrations.${integration.id}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {integration.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="setupComplexity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setup Complexity</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select setup complexity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="simple">Quick Setup (minutes)</SelectItem>
                            <SelectItem value="moderate">Some Setup (hours)</SelectItem>
                            <SelectItem value="complex">Custom Setup (days)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How much time and effort is required to set up this agent
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label htmlFor="screenshots">Screenshots & Demos</Label>
                    <div className="mt-2 border-2 border-dashed rounded-md p-6">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm font-medium">
                          Drag & drop files or click to upload
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Upload screenshots, videos, or sample outputs (max 5 files)
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={(e) => e.preventDefault()}
                        >
                          Upload Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 4: Pricing */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>
                    Set your pricing structure for this AI agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="pricingModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pricing Model</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly Subscription</SelectItem>
                            <SelectItem value="annual">Annual Subscription</SelectItem>
                            <SelectItem value="usage">Usage-Based</SelectItem>
                            <SelectItem value="onetime">One-Time Purchase</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How you want to charge customers for using your agent
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <Input
                              type="text"
                              placeholder="0.00"
                              className="pl-8"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Set a competitive price based on the value your agent provides
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="setupFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setup Fee (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <Input
                              type="text"
                              placeholder="0.00"
                              className="pl-8"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          One-time fee for setting up the agent (if applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 5: Review & Submit */}
            {step === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                  <CardDescription>
                    Review your agent details before submitting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md bg-gray-50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium">Basic Information</h3>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Name: </span>
                            <span className="text-sm">{form.watch("name")}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Category: </span>
                            <span className="text-sm">
                              {categories.find(c => c.value === form.watch("category"))?.label || form.watch("category")}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Short Description: </span>
                            <span className="text-sm">{form.watch("shortDescription")}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">Pricing</h3>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Model: </span>
                            <span className="text-sm capitalize">{form.watch("pricingModel")}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Price: </span>
                            <span className="text-sm">${form.watch("priceAmount")}</span>
                          </div>
                          {form.watch("setupFee") && (
                            <div>
                              <span className="text-sm font-medium text-gray-500">Setup Fee: </span>
                              <span className="text-sm">${form.watch("setupFee")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium">Integration Details</h3>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-500">Setup Complexity: </span>
                        <span className="text-sm capitalize">{form.watch("setupComplexity")}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-500">Compatible With: </span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {Object.entries(form.watch("integrations") || {})
                            .filter(([_, isSelected]) => isSelected)
                            .map(([id]) => (
                              <Badge key={id} variant="outline" className="capitalize">
                                {integrations.find(i => i.id === id)?.label || id}
                              </Badge>
                            ))}
                          {!Object.values(form.watch("integrations") || {}).some(val => val) && (
                            <span className="text-sm text-gray-500">None selected</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <Label className="mb-2 block">Terms & Conditions</Label>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm">
                        I confirm that this agent complies with the AgentCupid developer guidelines
                        and terms of service. I understand that it will be reviewed before being
                        published on the marketplace.
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleSubmit}>Submit Agent</Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </DeveloperLayout>
  );
};

export default AgentSubmission;
