
import { Button } from "@/components/ui/button";

interface ExamplePromptsProps {
  examplePrompts: string[];
  onPromptClick: (prompt: string) => void;
  className?: string;
}

export default function ExamplePrompts({ examplePrompts, onPromptClick, className = "" }: ExamplePromptsProps) {
  return (
    <div className={`max-w-4xl mx-auto mt-4 ${className}`}>
      <h3 className="text-sm font-medium text-gray-500 mb-2 text-center">Try these examples:</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {examplePrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            className="rounded-full text-sm"
            onClick={() => onPromptClick(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
