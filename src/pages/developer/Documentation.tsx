
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, CheckCircle, FileText, HelpCircle, Star } from "lucide-react";

const Documentation = () => {
  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">
            Guidelines and resources for creating effective AI agent listings
          </p>
        </div>

        <Tabs defaultValue="guidelines">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Agent Listing Guidelines
                </CardTitle>
                <CardDescription>
                  Follow these guidelines to create effective agent listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">1. Writing a Compelling Description</h3>
                  <p>
                    Your agent description is the first thing potential customers
                    will see. Make it clear, concise, and focused on the benefits
                    to the business user.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Focus on outcomes:</strong> Explain what your agent
                      accomplishes, not just how it works.
                    </li>
                    <li>
                      <strong>Use business language:</strong> Avoid technical jargon
                      and AI terminology.
                    </li>
                    <li>
                      <strong>Address pain points:</strong> Clearly state which
                      business problems your agent solves.
                    </li>
                    <li>
                      <strong>Be specific:</strong> Include concrete details about
                      capabilities and limitations.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">2. Providing Visual Examples</h3>
                  <p>
                    Visual examples are crucial for helping users understand how
                    your agent will help their business.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Before/after examples:</strong> Show the transformation
                      your agent provides.
                    </li>
                    <li>
                      <strong>Screenshots:</strong> Include clear, annotated
                      screenshots of your agent in action.
                    </li>
                    <li>
                      <strong>Demonstration videos:</strong> Create short (30-60 second)
                      videos showing your agent solving a specific problem.
                    </li>
                    <li>
                      <strong>Sample outputs:</strong> Show the actual results your
                      agent produces.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">3. Setting Pricing</h3>
                  <p>
                    Effective pricing is clear, competitive, and reflects the value
                    your agent provides.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Be transparent:</strong> Clearly state all costs,
                      including setup fees or usage-based components.
                    </li>
                    <li>
                      <strong>Offer tiers:</strong> Consider different pricing tiers
                      for different business sizes or needs.
                    </li>
                    <li>
                      <strong>Justify premium pricing:</strong> If your agent is
                      priced higher than alternatives, clearly explain the added value.
                    </li>
                    <li>
                      <strong>Consider ROI:</strong> Frame pricing in terms of the
                      return on investment businesses can expect.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">4. Integration Information</h3>
                  <p>
                    Businesses need to know how your agent will work with their
                    existing systems.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Be comprehensive:</strong> List all supported
                      integrations and platforms.
                    </li>
                    <li>
                      <strong>Explain setup:</strong> Provide a clear explanation
                      of the setup process and time required.
                    </li>
                    <li>
                      <strong>Detail requirements:</strong> Specify any system
                      requirements or prerequisites.
                    </li>
                    <li>
                      <strong>Document limitations:</strong> Be honest about any
                      limitations or incompatibilities.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Best Practices Tab */}
          <TabsContent value="best-practices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Best Practices
                </CardTitle>
                <CardDescription>
                  Strategies for creating effective agent listings that convert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">
                      Translating Technical Capabilities into Business Benefits
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      <p>
                        One of the biggest challenges for AI developers is
                        explaining complex capabilities in simple, business-oriented
                        terms. Here's how to do it effectively:
                      </p>
                      <div className="space-y-4">
                        <h4 className="font-medium">Instead of saying:</h4>
                        <div className="bg-red-50 p-4 rounded-md">
                          <p>
                            "Our agent uses GPT-4 with a fine-tuned model to process
                            text data through a transformer architecture and generate
                            email responses with high semantic accuracy."
                          </p>
                        </div>

                        <h4 className="font-medium">Say:</h4>
                        <div className="bg-green-50 p-4 rounded-md">
                          <p>
                            "Our Email Assistant saves you 10+ hours per week by
                            automatically drafting personalized responses to customer
                            inquiries, maintaining your company's voice while ensuring
                            accurate and helpful information."
                          </p>
                        </div>

                        <div className="pt-4">
                          <h4 className="font-medium">Key principles:</h4>
                          <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>
                              Focus on the outcome (time saved, problems solved)
                              not the technology
                            </li>
                            <li>
                              Quantify benefits whenever possible (hours saved,
                              percentage improvement)
                            </li>
                            <li>
                              Use everyday business language that resonates with
                              non-technical users
                            </li>
                            <li>
                              Emphasize how it fits into existing workflows
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">
                      Creating Compelling Visual Demonstrations
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      <p>
                        Visual demonstrations are essential for helping potential
                        customers understand your agent's value. Here are best
                        practices for creating effective visuals:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Show real-world scenarios:</strong> Use realistic
                          business examples that your target customers will recognize.
                        </li>
                        <li>
                          <strong>Demonstrate the "before and after":</strong> Show
                          the painful manual process, then show how your agent
                          solves it.
                        </li>
                        <li>
                          <strong>Focus on outcomes:</strong> Emphasize the end
                          result (the clean inbox, the organized document, etc.).
                        </li>
                        <li>
                          <strong>Keep it simple:</strong> Don't try to show every
                          feature—focus on the 1-2 most compelling use cases.
                        </li>
                        <li>
                          <strong>Use annotations:</strong> Add callouts, arrows,
                          or highlights to draw attention to important aspects.
                        </li>
                        <li>
                          <strong>Include testimonial quotes:</strong> Overlay
                          quotes from satisfied users for social proof.
                        </li>
                      </ul>
                      <div className="mt-4">
                        <h4 className="font-medium">For videos:</h4>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                          <li>Keep them short (30-60 seconds)</li>
                          <li>Start with the problem/pain point</li>
                          <li>Show the solution with your agent</li>
                          <li>End with the positive outcome/result</li>
                          <li>
                            Add captions (many users watch without sound)
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">
                      Responding to Customer Inquiries Effectively
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      <p>
                        How you respond to initial inquiries can make or break a
                        potential sale. Follow these best practices:
                      </p>
                      <ul className="list-disc pl-6 space-y-4">
                        <li>
                          <strong>Respond quickly:</strong> Aim to reply within 1-2
                          business hours if possible. Quick response times significantly
                          increase conversion rates.
                        </li>
                        <li>
                          <strong>Personalize your response:</strong> Reference
                          their specific questions and the name of their company.
                          Show you're not sending a generic template.
                        </li>
                        <li>
                          <strong>Answer questions directly:</strong> Address their
                          specific questions first before providing additional
                          information.
                        </li>
                        <li>
                          <strong>Provide relevant examples:</strong> If possible,
                          relate your response to their industry or specific use case.
                        </li>
                        <li>
                          <strong>Suggest next steps:</strong> Always end with a
                          clear call to action - whether it's scheduling a demo,
                          answering more questions, or starting a trial.
                        </li>
                        <li>
                          <strong>Offer flexibility:</strong> Give them multiple
                          ways to continue the conversation (call, email, meeting).
                        </li>
                      </ul>

                      <div className="bg-blue-50 p-4 rounded-md mt-4">
                        <h4 className="font-medium">Sample Response Template:</h4>
                        <p className="mt-2">
                          "Hi [Name], <br /><br />
                          
                          Thanks for your interest in our [Agent Name]. To answer your
                          question about [specific inquiry] - yes, [direct answer]. <br /><br />
                          
                          For your company's situation with [reference something they
                          mentioned], I think you'd particularly benefit from [specific
                          feature], which has helped other [industry] companies to
                          [specific outcome]. <br /><br />
                          
                          Would you be interested in seeing a quick demo tailored to
                          your specific needs? I'm available [suggest times] this week,
                          or I can answer any additional questions you might have. <br /><br />
                          
                          Looking forward to helping [Company Name] with [problem they're
                          trying to solve]."
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium">
                      Setting and Communicating Pricing
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      <p>
                        Pricing your AI agent effectively is crucial. Here are strategies
                        for setting and communicating your pricing:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Value-based pricing:</strong> Price based on the value
                          delivered (time saved, revenue generated), not just your costs.
                        </li>
                        <li>
                          <strong>Tiered options:</strong> Offer 2-3 tiers to accommodate
                          different business sizes and needs.
                        </li>
                        <li>
                          <strong>Transparent pricing:</strong> Make all costs clear
                          upfront to build trust (include setup fees, support costs, etc.).
                        </li>
                        <li>
                          <strong>ROI calculator:</strong> Consider creating a simple
                          calculator that shows the return on investment.
                        </li>
                        <li>
                          <strong>Competitor awareness:</strong> Know how your pricing
                          compares to alternatives, including manual processes.
                        </li>
                      </ul>

                      <div className="mt-4">
                        <h4 className="font-medium">Effective Price Presentation:</h4>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                          <li>
                            Present pricing in context of value ("$99/mo to save 20+
                            hours of work")
                          </li>
                          <li>
                            Include "What You Get" details with each price point
                          </li>
                          <li>
                            Consider annual discounts to increase commitment
                          </li>
                          <li>
                            Be prepared to justify premium pricing with specific
                            advantages
                          </li>
                          <li>
                            Offer a satisfaction guarantee to reduce perceived risk
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Templates & Examples
                </CardTitle>
                <CardDescription>
                  Ready-to-use templates for your agent listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Agent Description Template</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      <strong>[Agent Name]</strong> is a specialized AI solution
                      that helps [target audience] to [solve specific problem] without
                      [pain point of current method]. <br /><br />
                      
                      Unlike traditional approaches that require [current process],
                      [Agent Name] enables you to [key benefit #1], [key benefit #2],
                      and [key benefit #3] with minimal setup and training. <br /><br />
                      
                      Businesses using [Agent Name] typically see [specific outcome],
                      saving [time/money/resources] while improving [quality/accuracy/satisfaction].
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Fill in the bracketed sections with your specific information.
                    Focus on benefits and outcomes, not technical capabilities.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Feature List Template</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">Key Features:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>
                        <strong>[Feature Name]:</strong> [Brief description of what
                        it does, written in terms of the benefit to the user]
                      </li>
                      <li>
                        <strong>[Feature Name]:</strong> [Brief description of what
                        it does, written in terms of the benefit to the user]
                      </li>
                      <li>
                        <strong>[Feature Name]:</strong> [Brief description of what
                        it does, written in terms of the benefit to the user]
                      </li>
                      <li>
                        <strong>[Feature Name]:</strong> [Brief description of what
                        it does, written in terms of the benefit to the user]
                      </li>
                      <li>
                        <strong>[Feature Name]:</strong> [Brief description of what
                        it does, written in terms of the benefit to the user]
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Limit to 5-7 core features. For each feature, emphasize the
                    outcome rather than the technical implementation.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Integration Description Template</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">Integration Information:</p>
                    <p className="mt-2">
                      [Agent Name] seamlessly integrates with your existing
                      [systems/workflows] through [integration methods]. The
                      setup process takes approximately [timeframe] and requires
                      [prerequisites, if any].
                    </p>
                    <p className="font-medium mt-4">Works With:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>
                        <strong>[System/Platform]:</strong> [Brief description of
                        integration capabilities]
                      </li>
                      <li>
                        <strong>[System/Platform]:</strong> [Brief description of
                        integration capabilities]
                      </li>
                      <li>
                        <strong>[System/Platform]:</strong> [Brief description of
                        integration capabilities]
                      </li>
                    </ul>
                    <p className="mt-4">
                      Our team provides [level of support] during the setup process
                      to ensure a smooth implementation with your existing systems.
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Be specific about each integration. If there are limitations,
                    be transparent about them.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Customer Testimonial Template</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="italic">
                      "Before using [Agent Name], our team was spending [amount of
                      time/resources] on [task]. Since implementing this solution,
                      we've been able to [specific positive outcome] and [additional
                      benefit]. The [specific feature] has been particularly valuable
                      for our [department/function]."
                    </p>
                    <div className="flex items-center mt-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">[Customer Name]</p>
                        <p className="text-sm text-gray-600">[Job Title], [Company]</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use real testimonials whenever possible. Focus on specific,
                    measurable results the customer achieved.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Common questions from AI agent developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>
                      How long does the agent review process take?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Our review process typically takes 3-5 business days. We
                        review each agent submission for quality, accuracy of
                        description, and compliance with our guidelines. If changes
                        are needed, we'll provide specific feedback, and the review
                        process will restart once you've made the updates.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2">
                    <AccordionTrigger>
                      What types of agents perform best on AgentCupid?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Agents that solve specific business problems with clear,
                        measurable outcomes tend to perform best. The top-performing
                        categories include:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>Email and communication automation</li>
                        <li>Customer support optimization</li>
                        <li>Data analysis and reporting</li>
                        <li>Document processing and management</li>
                        <li>Sales and marketing automation</li>
                      </ul>
                      <p className="mt-2">
                        Agents that offer specific integrations with popular business
                        tools like Gmail, Outlook, Salesforce, and HubSpot also tend
                        to attract more interest.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3">
                    <AccordionTrigger>
                      How are developer payments handled?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Payments are processed through our secure payment system.
                        Here's how it works:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>
                          Customer payments are collected through our platform
                        </li>
                        <li>
                          AgentCupid retains a 15% platform fee
                        </li>
                        <li>
                          The remaining 85% is paid out to developers
                        </li>
                        <li>
                          Payments are disbursed on the 15th of each month for
                          the previous month's earnings
                        </li>
                        <li>
                          Minimum payout threshold is $50
                        </li>
                        <li>
                          Payment methods include direct deposit, PayPal, and
                          cryptocurrency
                        </li>
                      </ul>
                      <p className="mt-2">
                        You can track all your earnings and upcoming payments in
                        the "Finances" section of your developer dashboard.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-4">
                    <AccordionTrigger>
                      Can I offer multiple pricing tiers for my agent?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes, we encourage offering multiple pricing tiers to address
                        different customer needs and budgets. You can create up to
                        three tiers (e.g., Basic, Professional, Enterprise) with
                        different feature sets and pricing.
                      </p>
                      <p className="mt-2">
                        When creating multiple tiers:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>
                          Clearly differentiate what's included in each tier
                        </li>
                        <li>
                          Consider user limits, feature access, and support levels
                          as differentiators
                        </li>
                        <li>
                          Price tiers with meaningful differences (e.g., Basic $29,
                          Pro $79, Enterprise $199)
                        </li>
                        <li>
                          Highlight the "most popular" tier to help guide customer
                          decisions
                        </li>
                      </ul>
                      <p className="mt-2">
                        You can set up and manage pricing tiers in the "Pricing"
                        section when editing your agent.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-5">
                    <AccordionTrigger>
                      How can I improve my agent's visibility and conversion rate?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Here are proven strategies to improve your agent's performance:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>
                          <strong>Create an engaging listing:</strong> Use clear
                          headers, bullet points, and visual elements to make your
                          listing easy to scan.
                        </li>
                        <li>
                          <strong>Include compelling visuals:</strong> Agents with
                          demonstration videos get 3x more engagement.
                        </li>
                        <li>
                          <strong>Collect and showcase testimonials:</strong> Real
                          customer quotes boost credibility and conversion.
                        </li>
                        <li>
                          <strong>Optimize for search:</strong> Include relevant
                          keywords in your agent title and description.
                        </li>
                        <li>
                          <strong>Respond quickly to inquiries:</strong> Agents with
                          response times under 2 hours have 80% higher conversion rates.
                        </li>
                        <li>
                          <strong>Offer a free trial or demo:</strong> Reducing the
                          risk for customers increases conversion.
                        </li>
                      </ul>
                      <p className="mt-2">
                        Check the "Performance" tab in your dashboard for specific
                        recommendations based on your agent's metrics.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-6">
                    <AccordionTrigger>
                      What support does AgentCupid provide to developers?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        We provide comprehensive support to help you succeed:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>
                          <strong>Listing optimization:</strong> Feedback and tips
                          to improve your agent listings
                        </li>
                        <li>
                          <strong>Marketing support:</strong> Featured placement
                          opportunities and promotion to our customer base
                        </li>
                        <li>
                          <strong>Technical resources:</strong> Documentation, API
                          guides, and integration support
                        </li>
                        <li>
                          <strong>Developer community:</strong> Access to our community
                          of AI developers for networking and knowledge sharing
                        </li>
                        <li>
                          <strong>Customer insights:</strong> Analytics and feedback
                          to help you improve your offerings
                        </li>
                        <li>
                          <strong>Payment handling:</strong> We manage all payment
                          processing and customer billing
                        </li>
                      </ul>
                      <p className="mt-2">
                        For personalized support, contact the developer success team
                        at developers@agentcupid.com or through the chat support
                        in your dashboard.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DeveloperLayout>
  );
};

export default Documentation;
