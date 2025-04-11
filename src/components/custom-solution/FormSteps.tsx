
import React from 'react';
import { Progress } from "@/components/ui/progress";

export type FormStep = 'challenge' | 'context' | 'process' | 'contact' | 'confirmation';

interface FormStepsProps {
  currentStep: FormStep;
}

const FormSteps: React.FC<FormStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 'challenge', name: 'Business Challenge' },
    { id: 'context', name: 'Business Context' },
    { id: 'process', name: 'Current Processes' },
    { id: 'contact', name: 'Contact Information' },
  ];

  const getCurrentStepIndex = () => {
    if (currentStep === 'confirmation') return 4;
    return steps.findIndex(step => step.id === currentStep) + 1;
  };

  const progressPercentage = (getCurrentStepIndex() / steps.length) * 100;

  return (
    <div className="mb-8">
      <Progress value={progressPercentage} className="h-2 mb-4" />
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2 
                ${currentStep === step.id || (currentStep === 'confirmation' && index === steps.length - 1)
                  ? 'border-primary bg-primary text-white'
                  : getCurrentStepIndex() > index + 1
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-gray-300 text-gray-400'
                }`}
            >
              {getCurrentStepIndex() > index + 1 ? '✓' : index + 1}
            </div>
            <span className={`text-xs ${currentStep === step.id ? 'text-primary font-medium' : 'text-gray-500'}`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSteps;
