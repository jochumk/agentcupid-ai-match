
import { Button } from "@/components/ui/button";

interface ExamplePromptsProps {
  examplePrompts: string[];
  onPromptClick: (prompt: string) => void;
}

export default function ExamplePrompts({ examplePrompts, onPromptClick }: ExamplePromptsProps) {
  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {examplePrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            className="rounded-full"
            onClick={() => onPromptClick(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
