"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Link from "next/link";

export default function StoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === "all" || story.industry === industryFilter;
    const matchesStage = stageFilter === "all" || story.stage === stageFilter;
    return matchesSearch && matchesIndustry && matchesStage;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Founder Stories</h1>
        <p className="text-muted-foreground">
          Discover inspiring journeys and valuable insights from founders across different industries.
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="health">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series-a">Series A</SelectItem>
                <SelectItem value="series-b">Series B</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStories.map((story) => (
          <Link key={story.id} href={`/stories/${story.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <img
                  src={story.image}
                  alt={story.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <Badge>{story.industry}</Badge>
                  <Badge variant="outline">{story.stage}</Badge>
                </div>
                <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                <p className="text-muted-foreground mb-4">{story.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <img
                    src={story.authorImage}
                    alt={story.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{story.author}</span>
                  <span>•</span>
                  <span>{story.date}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
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
    stage: "growth"
  },
  {
    id: 2,
    title: "Revolutionizing Healthcare with AI",
    excerpt: "How we're using artificial intelligence to improve patient outcomes.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    author: "Dr. James Wilson",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    date: "Oct 12, 2023",
    industry: "health",
    stage: "series-b"
  },
  {
    id: 3,
    title: "From Fintech Startup to Banking Alternative",
    excerpt: "The story of creating a new generation of financial services.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
    author: "Michael Chang",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    date: "Oct 10, 2023",
    industry: "finance",
    stage: "series-a"
  },
  {
    id: 4,
    title: "Disrupting Traditional Retail",
    excerpt: "How we built an omnichannel experience that customers love.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    author: "Emma Roberts",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    date: "Oct 8, 2023",
    industry: "retail",
    stage: "seed"
  }
];