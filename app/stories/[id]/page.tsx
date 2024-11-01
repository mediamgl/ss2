"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Building, Target, Quote } from "lucide-react";
import Link from "next/link";

export default function StoryPage() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === parseInt(id as string));

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Story not found</h1>
        <Button asChild>
          <Link href="/stories">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/stories">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Badge>{story.industry}</Badge>
            <Badge variant="outline">{story.stage}</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <img
              src={story.authorImage}
              alt={story.author}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-medium text-foreground">{story.author}</div>
              <div className="text-sm">{story.date}</div>
            </div>
          </div>
        </div>

        <div className="aspect-video mb-12">
          <img
            src={story.image}
            alt={story.title}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4">The Beginning</h2>
          <p className="mb-6">{story.content.beginning}</p>

          <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
          <p className="mb-6">{story.content.challenge}</p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Building className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">The Problem</h3>
              <p className="text-muted-foreground">{story.content.problem}</p>
            </Card>
            <Card className="p-6">
              <Target className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">The Solution</h3>
              <p className="text-muted-foreground">{story.content.solution}</p>
            </Card>
            <Card className="p-6">
              <Calendar className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">The Result</h3>
              <p className="text-muted-foreground">{story.content.result}</p>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Key Insights</h2>
          <p className="mb-6">{story.content.insights}</p>

          <blockquote className="border-l-4 border-primary pl-6 my-8 italic">
            <Quote className="h-8 w-8 mb-4 text-primary" />
            {story.content.quote}
          </blockquote>

          <h2 className="text-2xl font-semibold mb-4">Looking Ahead</h2>
          <p className="mb-6">{story.content.future}</p>
        </div>
      </div>
    </article>
  );
}

const stories = [
  {
    id: 1,
    title: "Building a Billion-Dollar SaaS Platform",
    excerpt: "The journey from a small startup to a market leader in enterprise software.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    author: "Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    date: "Oct 15, 2023",
    industry: "tech",
    stage: "growth",
    content: {
      beginning: "It all started in a small apartment in San Francisco, where our team of three developers had a vision to revolutionize how enterprises manage their data.",
      challenge: "Breaking into the enterprise market was our biggest challenge. We were competing against established players with decades of experience and massive sales teams.",
      problem: "Enterprises were struggling with complex, outdated data management systems that required extensive training and maintenance.",
      solution: "We developed an intuitive, AI-powered platform that could be implemented in days instead of months.",
      result: "Within 18 months, we had over 100 enterprise customers and raised our Series C funding.",
      insights: "The key to our success was focusing on user experience and customer support. We learned that enterprises value reliability and support just as much as features.",
      quote: "Success in enterprise software isn't just about building great technology—it's about building trust and relationships.",
      future: "We're now expanding globally and investing heavily in AI capabilities to stay ahead of the curve."
    }
  },
  // Add more stories with similar structure
];