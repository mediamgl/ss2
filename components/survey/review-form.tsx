"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building,
  User,
  Lightbulb,
  Image,
  CheckCircle2,
} from "lucide-react";
import type { FormData } from "@/types";

interface ReviewFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  data: FormData;
}

export function ReviewForm({ onSubmit, onBack, data }: ReviewFormProps) {
  const sections = [
    {
      title: "Company Details",
      icon: Building,
      fields: [
        { label: "Company Name", value: data.companyName },
        { label: "Website", value: data.website },
        { label: "Stage", value: data.stage },
        { label: "Location", value: data.location },
        { label: "Industry", value: data.industry },
      ],
    },
    {
      title: "Founder Information",
      icon: User,
      fields: [
        { label: "Name", value: data.name },
        { label: "Role", value: data.role },
        { label: "Email", value: data.email },
        { label: "LinkedIn", value: data.linkedin },
      ],
    },
    {
      title: "Business Insights",
      icon: Lightbulb,
      fields: [
        { label: "Problem", value: data.problem },
        { label: "Solution", value: data.solution },
        { label: "Challenges", value: data.challenges },
        { label: "Lessons", value: data.lessons },
        { label: "Advice", value: data.advice },
      ],
    },
    {
      title: "Media",
      icon: Image,
      fields: [
        { label: "Cover Image", value: data.coverImage },
        { label: "Founder Image", value: data.founderImage },
        { label: "Video URL", value: data.videoUrl },
        { label: "Twitter", value: data.socialMedia?.twitter },
        { label: "LinkedIn", value: data.socialMedia?.linkedin },
        { label: "Instagram", value: data.socialMedia?.instagram },
      ],
    },
  ];

  const handleSubmit = () => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Review Your Story</h2>
        <p className="text-muted-foreground">
          Please review your information before submitting
        </p>
      </div>

      {sections.map((section) => (
        <Card key={section.title} className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <section.icon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">{section.title}</h3>
          </div>
          <div className="space-y-4">
            {section.fields.map(
              (field) =>
                field.value && (
                  <div key={field.label}>
                    <div className="font-medium text-sm text-muted-foreground mb-1">
                      {field.label}
                    </div>
                    <div className="text-sm">
                      {field.value.length > 100
                        ? `${field.value.substring(0, 100)}...`
                        : field.value}
                    </div>
                  </div>
                )
            )}
          </div>
        </Card>
      ))}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Previous Step
        </Button>
        <Button onClick={handleSubmit}>Submit Story</Button>
      </div>
    </div>
  );
}