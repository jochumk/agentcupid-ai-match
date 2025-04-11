
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string(),
  otherCategory: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  experienceLevel: z.string(),
  industries: z.string(),
  tools: z.string(),
  rateStructure: z.string(),
  rateMin: z.string(),
  rateMax: z.string(),
  availability: z.string(),
  responseTime: z.string(),
  portfolioLinks: z.string().optional(),
  certifications: z.string().optional(),
  testimonials: z.string().optional(),
  matchingPreference: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const ExpertiseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  // Mock data for editing - in a real app this would come from an API
  const mockData = isEditing
    ? {
        title: "Custom GPT Integration Services",
        category: "Integration Support",
        otherCategory: "",
        description: "Help businesses integrate custom GPT models with their existing systems and workflows.",
        experienceLevel: "5+ years",
        industries: "Technology, E-commerce, Healthcare",
        tools: "OpenAI API, Python, REST APIs, NodeJS",
        rateStructure: "Hourly",
        rateMin: "150",
        rateMax: "200",
        availability: "Part-time",
        responseTime: "Within 24 hours",
        portfolioLinks: "https://example.com/case-study",
        certifications: "OpenAI Certified Developer",
        testimonials: "Great work on our integration project! - XYZ Company",
        matchingPreference: "automatic",
      }
    : {
        title: "",
        category: "",
        otherCategory: "",
        description: "",
        experienceLevel: "",
        industries: "",
        tools: "",
        rateStructure: "",
        rateMin: "",
        rateMax: "",
        availability: "",
        responseTime: "",
        portfolioLinks: "",
        certifications: "",
        testimonials: "",
        matchingPreference: "automatic",
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mockData,
  });

  const [showOtherCategory, setShowOtherCategory] = useState(form.getValues().category === "Other");

  const onSubmit = (data: FormValues) => {
    // In a real application, this would save to an API
    console.log(data);
    toast.success(isEditing ? "Expertise updated successfully" : "Expertise added successfully");
    navigate("/developer/expertise");
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Expertise" : "Add New Expertise"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update your service offering details"
              : "Showcase your additional services and skills to potential clients"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>
              Provide details about the expertise or service you offer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., AI Implementation Consulting" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear title that describes your service offering
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
                      <FormLabel>Service Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setShowOtherCategory(value === "Other");
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Implementation Services">Implementation Services</SelectItem>
                          <SelectItem value="Integration Support">Integration Support</SelectItem>
                          <SelectItem value="Custom Development">Custom Development</SelectItem>
                          <SelectItem value="Training & Onboarding">Training & Onboarding</SelectItem>
                          <SelectItem value="Strategic Consulting">Strategic Consulting</SelectItem>
                          <SelectItem value="Technical Support">Technical Support</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showOtherCategory && (
                  <FormField
                    control={form.control}
                    name="otherCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify Other Category</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your service in detail..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Be specific about what you offer, your approach, and the value you provide
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-2 years">1-2 years</SelectItem>
                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                            <SelectItem value="5+ years">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relevant Industries</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Healthcare, Finance, Technology" {...field} />
                        </FormControl>
                        <FormDescription>
                          Comma-separated list of industries
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tools & Technologies</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Python, TensorFlow, AWS, OpenAI API" {...field} />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of tools and technologies you're familiar with
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CardTitle className="text-xl mb-2">Pricing & Availability</CardTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="rateStructure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Structure</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rate structure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                            <SelectItem value="Daily">Daily</SelectItem>
                            <SelectItem value="Project-based">Project-based</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="rateMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min Rate (USD)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rateMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Rate (USD)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Limited hours">Limited hours</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="responseTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Response Time Commitment</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select response time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Within 24 hours">Within 24 hours</SelectItem>
                            <SelectItem value="Within 48 hours">Within 48 hours</SelectItem>
                            <SelectItem value="3-5 business days">3-5 business days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <CardTitle className="text-xl mb-2">Portfolio & Credentials</CardTitle>

                <FormField
                  control={form.control}
                  name="portfolioLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio/Case Study Links</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add links to relevant case studies or portfolio examples"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        One per line. These will be visible to potential clients
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certifications & Credentials</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List relevant certifications"
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="testimonials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Testimonials</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add client testimonials"
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <CardTitle className="text-xl mb-2">Matching Settings</CardTitle>

                <FormField
                  control={form.control}
                  name="matchingPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Match my expertise with client needs</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select matching preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic matching based on client needs</SelectItem>
                          <SelectItem value="specific-agents">Only offer with specific AI agents</SelectItem>
                          <SelectItem value="explicit-request">Only when explicitly requested</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Control when your expertise is shown to potential clients
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/developer/expertise")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? "Update Expertise" : "Add Expertise"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DeveloperLayout>
  );
};

export default ExpertiseForm;
