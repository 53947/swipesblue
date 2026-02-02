import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

interface CheckoutProgressProps {
  currentStep: number;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  { id: 1, label: "Information" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Confirmation" },
];

export default function CheckoutProgress({ currentStep, steps = defaultSteps }: CheckoutProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isComplete
                      ? "border-[#10B981] bg-[#10B981]"
                      : isCurrent
                      ? "border-[#1844A6] bg-[#1844A6]"
                      : "border-border bg-background"
                  }`}
                  data-testid={`step-indicator-${step.id}`}
                >
                  {isComplete ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={`text-sm font-semibold ${
                        isCurrent ? "text-white" : "text-muted-foreground"
                      }`}
                    >
                      {step.id}
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isComplete || isCurrent ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div className="flex-1 h-0.5 mx-4" style={{ 
                  backgroundColor: isComplete ? "#10B981" : "#E5E5E5" 
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
