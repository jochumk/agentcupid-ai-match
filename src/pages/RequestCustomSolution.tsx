
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormSteps, { FormStep } from "@/components/custom-solution/FormSteps";
import ChallengeStep from "@/components/custom-solution/ChallengeStep";
import ContextStep from "@/components/custom-solution/ContextStep";
import ProcessStep from "@/components/custom-solution/ProcessStep";
import ContactStep from "@/components/custom-solution/ContactStep";
import ConfirmationStep from "@/components/custom-solution/ConfirmationStep";

const RequestCustomSolution = () => {
  // Current step in the form
  const [currentStep, setCurrentStep] = useState<FormStep>("challenge");

  // Step 1: Business Challenge Description
  const [description, setDescription] = useState("");

  // Step 2: Business Context
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState([50]);

  // Step 3: Current Processes
  const [currentApproach, setCurrentApproach] = useState("");
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [otherPainPoint, setOtherPainPoint] = useState("");
  const [successMetrics, setSuccessMetrics] = useState("");

  // Step 4: Contact Information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [bestTimeToContact, setBestTimeToContact] = useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  // Handle navigation between steps
  const goToNextStep = () => {
    if (currentStep === "challenge") {
      setCurrentStep("context");
      window.scrollTo(0, 0);
    } else if (currentStep === "context") {
      setCurrentStep("process");
      window.scrollTo(0, 0);
    } else if (currentStep === "process") {
      setCurrentStep("contact");
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === "context") {
      setCurrentStep("challenge");
      window.scrollTo(0, 0);
    } else if (currentStep === "process") {
      setCurrentStep("context");
      window.scrollTo(0, 0);
    } else if (currentStep === "contact") {
      setCurrentStep("process");
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // In a real application, this would submit the data to a backend API
    console.log({
      description,
      companySize,
      industry,
      tools,
      timeline,
      budget: budget[0],
      currentApproach,
      painPoints,
      otherPainPoint,
      successMetrics,
      name,
      email,
      phone,
      preferredContact,
      bestTimeToContact,
    });

    // Show loading toast
    toast.loading("Submitting your request...");

    // Simulate API call delay
    setTimeout(() => {
      // Show success toast and move to confirmation step
      toast.success("Your request has been submitted successfully!");
      setCurrentStep("confirmation");
      window.scrollTo(0, 0);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-16">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {currentStep !== "confirmation" ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Tell us about your business challenge
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We'll connect you with AI specialists who can build a custom solution for your unique business needs.
                </p>
              </div>
              
              <FormSteps currentStep={currentStep} />
              
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border">
                {currentStep === "challenge" && (
                  <ChallengeStep
                    description={description}
                    setDescription={setDescription}
                    onNext={goToNextStep}
                  />
                )}
                
                {currentStep === "context" && (
                  <ContextStep
                    companySize={companySize}
                    setCompanySize={setCompanySize}
                    industry={industry}
                    setIndustry={setIndustry}
                    tools={tools}
                    setTools={setTools}
                    timeline={timeline}
                    setTimeline={setTimeline}
                    budget={budget}
                    setBudget={setBudget}
                    onBack={goToPreviousStep}
                    onNext={goToNextStep}
                  />
                )}
                
                {currentStep === "process" && (
                  <ProcessStep
                    currentApproach={currentApproach}
                    setCurrentApproach={setCurrentApproach}
                    painPoints={painPoints}
                    setPainPoints={setPainPoints}
                    otherPainPoint={otherPainPoint}
                    setOtherPainPoint={setOtherPainPoint}
                    successMetrics={successMetrics}
                    setSuccessMetrics={setSuccessMetrics}
                    onBack={goToPreviousStep}
                    onNext={goToNextStep}
                  />
                )}
                
                {currentStep === "contact" && (
                  <ContactStep
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                    preferredContact={preferredContact}
                    setPreferredContact={setPreferredContact}
                    bestTimeToContact={bestTimeToContact}
                    setBestTimeToContact={setBestTimeToContact}
                    agreedToPrivacy={agreedToPrivacy}
                    setAgreedToPrivacy={setAgreedToPrivacy}
                    onBack={goToPreviousStep}
                    onSubmit={handleSubmit}
                  />
                )}
              </div>
            </>
          ) : (
            <ConfirmationStep />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RequestCustomSolution;
