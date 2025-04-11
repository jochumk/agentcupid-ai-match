
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadCloud, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChallengeStepProps {
  description: string;
  setDescription: (value: string) => void;
  onNext: () => void;
}

const ChallengeStep: React.FC<ChallengeStepProps> = ({
  description,
  setDescription,
  onNext,
}) => {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...fileList]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-2">
          <Label htmlFor="challenge-description" className="text-lg font-medium">
            Describe your business challenge
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  The more details you provide, the better we can match you with
                  the right AI solution. Include specific pain points, volume of
                  work, and desired outcomes.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="challenge-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[200px] text-base p-4"
          placeholder="Example: We receive 100+ customer emails daily about order status and need to automate responses by checking our database. Our team spends 4+ hours daily on this task, and customers often wait hours for responses about simple status checks."
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{wordCount} words</span>
          <span className={wordCount < 100 ? "text-orange-500" : wordCount > 300 ? "text-red-500" : "text-green-500"}>
            {wordCount < 100 ? "Suggested: 100-300 words" : wordCount > 300 ? "Over suggested length" : "Good length"}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-dashed border-gray-300">
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900">
              Attach relevant documents or screenshots (optional)
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PDF, Word, Excel, or image files up to 10MB each
            </p>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="relative"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                className="sr-only"
                onChange={handleFileChange}
              />
              Browse Files
            </Button>
          </div>
        </div>

        {attachedFiles.length > 0 && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium mb-2">Attached Files:</h4>
            <ul className="space-y-2">
              {attachedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-white p-2 rounded border text-sm">
                  <div className="truncate max-w-xs">{file.name}</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFile(index)}
                    className="h-6 text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext} 
          size="lg"
          disabled={wordCount < 10} // Require at least some description
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ChallengeStep;
