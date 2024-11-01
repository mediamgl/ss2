"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Episode } from "@/types";

interface EpisodeCardProps {
  episode: Episode;
  onPlay: () => void;
  isPlaying: boolean;
}

export function EpisodeCard({ episode, onPlay, isPlaying }: EpisodeCardProps) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex gap-6">
        <img
          src={episode.image}
          alt={episode.title}
          className="w-32 h-32 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{episode.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {episode.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {episode.duration}
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {episode.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              variant={isPlaying ? "secondary" : "default"}
              size="icon"
              onClick={onPlay}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">{episode.description}</p>
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => setShowNotes(!showNotes)}
          >
            Show Notes
            {showNotes ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {showNotes && (
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Topics Covered</h3>
              <ul className="space-y-1 text-sm">
                {episode.showNotes.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Timestamps</h3>
              <ul className="space-y-1 text-sm">
                {episode.showNotes.timestamps.map((timestamp, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-muted-foreground">
                      {timestamp.time}
                    </span>
                    {timestamp.topic}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Links & Resources</h3>
              <ul className="space-y-1 text-sm">
                {episode.showNotes.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}