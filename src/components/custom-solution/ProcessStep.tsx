
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface ProcessStepProps {
  currentApproach: string;
  setCurrentApproach: (value: string) => void;
  painPoints: string[];
  setPainPoints: (value: string[]) => void;
  otherPainPoint: string;
  setOtherPainPoint: (value: string) => void;
  successMetrics: string;
  setSuccessMetrics: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  currentApproach,
  setCurrentApproach,
  painPoints,
  setPainPoints,
  otherPainPoint,
  setOtherPainPoint,
  successMetrics,
  setSuccessMetrics,
  onBack,
  onNext,
}) => {
  const painPointOptions = [
    { id: "time-consuming", label: "Time consuming" },
    { id: "error-prone", label: "Error-prone" },
    { id: "costly", label: "Costly" },
    { id: "poor-experience", label: "Poor customer experience" },
    { id: "limited-scalability", label: "Limited scalability" },
    { id: "other", label: "Other" },
  ];

  const togglePainPoint = (id: string) => {
    if (painPoints.includes(id)) {
      setPainPoints(painPoints.filter(point => point !== id));
    } else {
      setPainPoints([...painPoints, id]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="current-approach" className="text-base font-medium">
          How do you handle this process today?
        </Label>
        <Textarea
          id="current-approach"
          value={currentApproach}
          onChange={(e) => setCurrentApproach(e.target.value)}
          placeholder="Describe your current manual or automated process..."
          className="mt-2 min-h-[120px]"
        />
      </div>

      <div>
        <Label className="text-base font-medium">
          What are the key pain points with your current process?
        </Label>
        <div className="mt-4 space-y-3">
          {painPointOptions.map((option) => (
            <div key={option.id} className="flex items-start space-x-3">
              <Checkbox
                id={option.id}
                checked={painPoints.includes(option.id)}
                onCheckedChange={() => togglePainPoint(option.id)}
                className="mt-1"
              />
              <div className="grid gap-1.5 w-full">
                <Label htmlFor={option.id} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
                {option.id === "other" && painPoints.includes("other") && (
                  <Input
                    value={otherPainPoint}
                    onChange={(e) => setOtherPainPoint(e.target.value)}
                    placeholder="Please specify..."
                    className="mt-1"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="success-metrics" className="text-base font-medium">
          How will you measure success?
        </Label>
        <Textarea
          id="success-metrics"
          value={successMetrics}
          onChange={(e) => setSuccessMetrics(e.target.value)}
          placeholder="Example: Reduce email response time from 4 hours to under 15 minutes, decrease support staff time by 75%..."
          className="mt-2 min-h-[120px]"
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!currentApproach || currentApproach.length < 10 || !successMetrics || successMetrics.length < 10}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProcessStep;
