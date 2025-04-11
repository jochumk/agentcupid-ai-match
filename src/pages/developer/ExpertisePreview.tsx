
import { useNavigate, useParams } from "react-router-dom";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Clock, DollarSign, Edit, MessageSquare, Star } from "lucide-react";

const ExpertisePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data for the preview - in a real app this would come from an API
  const expertise = {
    id: id || "1",
    title: "Custom GPT Integration Services",
    category: "Integration Support",
    description: "Help businesses integrate custom GPT models with their existing systems and workflows. I specialize in creating seamless connections between AI models and business applications, ensuring data flows correctly and the AI delivers valuable outputs to your specific use case.",
    experienceLevel: "5+ years",
    industries: ["Technology", "E-commerce", "Healthcare"],
    tools: ["OpenAI API", "Python", "REST APIs", "NodeJS"],
    rateStructure: "Hourly",
    rateRange: "$150-$200",
    availability: "Part-time",
    responseTime: "Within 24 hours",
    portfolioLinks: ["https://example.com/case-study-1", "https://example.com/case-study-2"],
    certifications: ["OpenAI Certified Developer", "Google Cloud Professional ML Engineer"],
    testimonials: [
      {
        text: "Great work on our integration project! The implementation was smooth and the results exceeded our expectations.",
        client: "XYZ Company",
        rating: 5
      },
      {
        text: "Helped us set up our customer service automation with impressive results. Very knowledgeable about AI systems.",
        client: "ABC Corporation",
        rating: 5
      }
    ],
    matchingPreference: "automatic",
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Client Preview
            </h1>
            <p className="text-muted-foreground">
              This is how your expertise will appear to potential clients
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate(`/developer/expertise/${id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Expertise
          </Button>
        </div>

        <Card className="border-2 border-primary/20">
          <CardHeader className="flex flex-row items-start justify-between pb-4">
            <div>
              <CardTitle className="text-2xl">{expertise.title}</CardTitle>
              <div className="flex mt-2 space-x-2">
                <Badge>{expertise.category}</Badge>
                <Badge variant="outline">{expertise.experienceLevel} experience</Badge>
              </div>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>DD</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-2">About This Service</h3>
              <p className="text-muted-foreground">{expertise.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Pricing</h3>
                  </div>
                  <p>{expertise.rateStructure}</p>
                  <p className="text-xl font-medium">{expertise.rateRange}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Availability</h3>
                  </div>
                  <p>{expertise.availability}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Response Time</h3>
                  </div>
                  <p>{expertise.responseTime}</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Industries & Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {expertise.industries.map((industry) => (
                  <Badge key={industry} variant="secondary">{industry}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {expertise.tools.map((tool) => (
                  <Badge key={tool} variant="outline">{tool}</Badge>
                ))}
              </div>
            </div>

            {expertise.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Certifications & Credentials</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  {expertise.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {expertise.testimonials.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Client Testimonials</h3>
                <div className="space-y-4">
                  {expertise.testimonials.map((testimonial, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{testimonial.client}</p>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button size="lg" className="w-full sm:w-auto">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact About This Service
            </Button>
          </CardFooter>
        </Card>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => navigate("/developer/expertise")}>
            Back to My Expertise
          </Button>
        </div>
      </div>
    </DeveloperLayout>
  );
};

export default ExpertisePreview;
