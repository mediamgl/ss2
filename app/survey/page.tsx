"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { CompanyForm } from "@/components/survey/company-form";
import { FounderForm } from "@/components/survey/founder-form";
import { InsightsForm } from "@/components/survey/insights-form";
import { MediaForm } from "@/components/survey/media-form";
import { ReviewForm } from "@/components/survey/review-form";
import type { FormData } from "@/types";

const steps = [
  { id: 1, title: "Company Details" },
  { id: 2, title: "Founder Information" },
  { id: 3, title: "Business Insights" },
  { id: 4, title: "Media Upload" },
  { id: 5, title: "Review" },
];

export default function SurveyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const progress = (step / steps.length) * 100;

  const handleNext = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (step < steps.length) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (data: FormData) => {
    try {
      // Here you would typically send the data to your API
      console.log("Submitting data:", data);
      toast.success("Survey submitted successfully!");
      // Redirect to thank you page or stories page
    } catch (error) {
      toast.error("Failed to submit survey. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Share Your Story</h1>
          <p className="text-muted-foreground">
            Help other founders learn from your experience and insights.
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            {steps.map((s) => (
              <span
                key={s.id}
                className={step >= s.id ? "text-primary font-medium" : ""}
              >
                {s.title}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          {step === 1 && <CompanyForm onNext={handleNext} data={formData} />}
          {step === 2 && (
            <FounderForm onNext={handleNext} onBack={handleBack} data={formData} />
          )}
          {step === 3 && (
            <InsightsForm
              onNext={handleNext}
              onBack={handleBack}
              data={formData}
            />
          )}
          {step === 4 && (
            <MediaForm onNext={handleNext} onBack={handleBack} data={formData} />
          )}
          {step === 5 && (
            <ReviewForm
              onSubmit={handleSubmit}
              onBack={handleBack}
              data={formData as FormData}
            />
          )}
        </div>
      </div>
    </div>
  );
}