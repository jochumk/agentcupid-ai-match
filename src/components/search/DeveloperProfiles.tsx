
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Star, Code, BookOpen } from "lucide-react";

interface DeveloperProfile {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  experience: string;
  rating: number;
  avatar?: string;
  available: boolean;
}

// Sample developer profiles data
const developerProfiles: DeveloperProfile[] = [
  {
    id: "dev1",
    name: "Alex Chen",
    title: "AI Engineer",
    expertise: ["Natural Language Processing", "Computer Vision", "LLM Integration"],
    experience: "8 years",
    rating: 4.9,
    avatar: "/profiles/alex.jpg",
    available: true
  },
  {
    id: "dev2",
    name: "Sarah Wilson",
    title: "ML Specialist",
    expertise: ["Recommendation Systems", "Data Analysis", "MLOps"],
    experience: "6 years",
    rating: 4.7,
    avatar: "/profiles/sarah.jpg",
    available: true
  },
  {
    id: "dev3",
    name: "Michael Rodriguez",
    title: "AI Solutions Architect",
    expertise: ["Conversational AI", "Enterprise AI", "Process Automation"],
    experience: "10 years",
    rating: 4.8,
    avatar: "/profiles/michael.jpg",
    available: false
  },
  {
    id: "dev4",
    name: "Priya Sharma",
    title: "Computer Vision Expert",
    expertise: ["Image Recognition", "Video Analysis", "Object Detection"],
    experience: "7 years",
    rating: 4.6,
    avatar: "/profiles/priya.jpg",
    available: true
  },
  {
    id: "dev5",
    name: "James Lee",
    title: "NLP Specialist",
    expertise: ["Language Models", "Sentiment Analysis", "Text Classification"],
    experience: "5 years",
    rating: 4.5,
    avatar: "/profiles/james.jpg",
    available: true
  },
  {
    id: "dev6",
    name: "Emma Thompson",
    title: "AI Research Scientist",
    expertise: ["Reinforcement Learning", "Neural Networks", "AI Ethics"],
    experience: "9 years",
    rating: 4.9,
    avatar: "/profiles/emma.jpg",
    available: false
  }
];

interface DeveloperProfilesProps {
  onViewProfile: (developerId: string) => void;
}

export default function DeveloperProfiles({ onViewProfile }: DeveloperProfilesProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-8">Top AI Developers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developerProfiles.map((developer) => (
          <div 
            key={developer.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-14 w-14 mr-4 border-2 border-primary/20">
                  <AvatarImage src={developer.avatar} alt={developer.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {developer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{developer.name}</h3>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600">{developer.title}</p>
                    <div className="flex items-center ml-2 text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs ml-1">{developer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                <span>{developer.experience} experience</span>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-2">
                Specialist in {developer.expertise.slice(0, 2).join(", ")} 
                {developer.expertise.length > 2 ? " and more" : ""}.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {developer.expertise.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
                {developer.expertise.length > 3 && (
                  <Badge variant="outline" className="font-normal">
                    +{developer.expertise.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  {developer.available ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Available now
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Limited availability
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="outline"
                  onClick={() => onViewProfile(developer.id)}
                  className="px-3"
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button size="lg" className="px-8">
          Browse All Developers
        </Button>
      </div>
    </div>
  );
}
