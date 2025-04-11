
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    quote: "AgentCupid helped us find the perfect email automation solution for our support team. We've reduced response times by 75% and improved customer satisfaction.",
    author: "Sarah Johnson",
    title: "Customer Support Manager",
    company: "TechStart Inc.",
    image: "https://via.placeholder.com/100x100?text=SJ"
  },
  {
    id: 2,
    quote: "As an AI developer, AgentCupid has been instrumental in connecting us with businesses that need our solutions. Our customer base has grown 3x in just six months.",
    author: "Michael Chen",
    title: "Founder",
    company: "AIFlow Technologies",
    image: "https://via.placeholder.com/100x100?text=MC"
  },
  {
    id: 3,
    quote: "The implementation process was seamless. The developer provided exceptional support and our team was up and running with the new AI solution in just days.",
    author: "David Miller",
    title: "Operations Director",
    company: "Global Services Ltd",
    image: "https://via.placeholder.com/100x100?text=DM"
  }
];

const TestimonialSection = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold">Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600">
            See how AgentCupid has helped businesses and developers achieve their goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
