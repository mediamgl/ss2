import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 via-primary/5 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Discover the <span className="text-primary">Secret Sauce</span> of Success
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Authentic founder stories, invaluable insights, and proven strategies from
            entrepreneurs who've been there, done that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/stories">
                Explore Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/survey">Share Your Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Stories</h2>
            <Button variant="ghost" asChild>
              <Link href="/stories">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map((story) => (
              <Card key={story.id} className="flex flex-col">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-3">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {story.excerpt}
                  </p>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href={`/stories/${story.id}`}>Read More</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-8">
            Get weekly founder stories and insights delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Users className="h-8 w-8 mx-auto text-primary" />
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-muted-foreground">Founder Stories</p>
            </div>
            <div className="space-y-2">
              <Star className="h-8 w-8 mx-auto text-primary" />
              <h3 className="text-3xl font-bold">50K+</h3>
              <p className="text-muted-foreground">Monthly Readers</p>
            </div>
            <div className="space-y-2">
              <TrendingUp className="h-8 w-8 mx-auto text-primary" />
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="text-muted-foreground">Industries Covered</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const featuredStories = [
  {
    id: 1,
    title: "From Garage to Global: The Journey of TechCraft",
    excerpt: "How a weekend project turned into a multi-million dollar SaaS company.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    tags: ["SaaS", "Technology"],
  },
  {
    id: 2,
    title: "Disrupting the Fashion Industry with Sustainability",
    excerpt: "The story of how EcoStyle is changing the way we think about fashion.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    tags: ["Fashion", "Sustainability"],
  },
  {
    id: 3,
    title: "Building a Community-First Food Delivery Platform",
    excerpt: "LocalEats' journey to connecting neighborhoods through food.",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&q=80&w=800",
    tags: ["Food Tech", "Community"],
  },
];