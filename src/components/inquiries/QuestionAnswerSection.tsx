
import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateAndTime } from "@/utils/formatters";

type QuestionHistory = {
  id: string;
  question: string;
  askedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  answer: string;
  timestamp: string;
};

interface QuestionAnswerSectionProps {
  questionHistory: QuestionHistory[];
}

export default function QuestionAnswerSection({
  questionHistory
}: QuestionAnswerSectionProps) {
  const [newQuestion, setNewQuestion] = useState("");
  
  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    toast.success("Your question has been submitted");
    setNewQuestion("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>
            Get clarification before submitting your proposal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <Textarea
              placeholder="Type your question here..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[100px]"
            />
            <Button type="submit" disabled={!newQuestion.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Submit Question
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Previous Questions & Answers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questionHistory.length === 0 ? (
            <div className="text-center py-6">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No questions yet</h3>
              <p className="text-muted-foreground mt-1">
                Be the first to ask a question about this project
              </p>
            </div>
          ) : (
            questionHistory.map((item) => (
              <div key={item.id} className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.askedBy.avatar} />
                    <AvatarFallback>
                      {item.askedBy.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">
                        {item.askedBy.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatDateAndTime(item.timestamp)}
                      </span>
                    </div>
                    <div className="text-sm p-3 bg-muted rounded-md">
                      <strong className="text-primary">Q:</strong> {item.question}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 pl-11">
                  <div className="flex-1 space-y-1">
                    <div className="text-sm p-3 bg-secondary/10 rounded-md">
                      <strong className="text-secondary">A:</strong> {item.answer}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
