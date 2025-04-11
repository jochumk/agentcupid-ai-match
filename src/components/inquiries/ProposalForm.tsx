
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarClock, DollarSign, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  proposalDescription: z.string().min(50, {
    message: "Proposal description must be at least 50 characters."
  }),
  timeline: z.string({
    required_error: "Please select a timeline."
  }),
  cost: z.string().min(1, {
    message: "Please enter your cost estimate."
  }),
  relevantExperience: z.string().min(20, {
    message: "Please describe your relevant experience."
  })
});

type ProposalFormProps = {
  inquiryId: string;
  onComplete?: () => void;
};

export function ProposalForm({ inquiryId, onComplete }: ProposalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      proposalDescription: "",
      timeline: "",
      cost: "",
      relevantExperience: ""
    }
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would send the data to an API
      console.log("Submitting proposal for inquiry", inquiryId, values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Your proposal has been submitted successfully!");
      form.reset();
      if (onComplete) onComplete();
    } catch (error) {
      toast.error("Failed to submit proposal. Please try again.");
      console.error("Error submitting proposal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="proposalDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposed Solution</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your proposed solution in detail..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Be specific about how you would approach the problem and what technologies you would use.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Timeline</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <CalendarClock className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="3-weeks">3 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="2-months">2 Months</SelectItem>
                    <SelectItem value="3-months+">3+ Months</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost Estimate (USD)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Enter amount or range"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  You can provide a fixed amount or a range.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="relevantExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relevant Experience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your experience with similar projects..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Highlight your expertise that's relevant to this inquiry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          <Send className="h-4 w-4 mr-2" />
          {isSubmitting ? "Submitting..." : "Submit Proposal"}
        </Button>
      </form>
    </Form>
  );
}
