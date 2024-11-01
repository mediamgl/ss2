"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Music2,
  Youtube,
  Rss,
  Apple,
} from "lucide-react";
import { AudioPlayer } from "@/components/podcast/audio-player";
import { EpisodeCard } from "@/components/podcast/episode-card";
import type { Episode } from "@/types";
import { episodes } from "@/data/episodes";

export function PodcastContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  }, []);

  const filteredEpisodes = useMemo(() => 
    episodes.filter((episode) =>
      episode.title.toLowerCase().includes(searchQuery) ||
      episode.description.toLowerCase().includes(searchQuery) ||
      episode.guest.toLowerCase().includes(searchQuery) ||
      episode.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    ),
    [searchQuery]
  );

  const handlePlay = useCallback((episode: Episode) => {
    setCurrentEpisode(episode);
  }, []);

  const handleClose = useCallback(() => {
    setCurrentEpisode(null);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Secret Sauce Podcast</h1>
          <p className="text-muted-foreground mb-8">
            Deep conversations with founders about their entrepreneurial journey,
            challenges, and success strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="gap-2" aria-label="Listen on Spotify">
              <Music2 className="h-4 w-4" />
              <span>Spotify</span>
            </Button>
            <Button variant="outline" className="gap-2" aria-label="Listen on Apple Podcasts">
              <Apple className="h-4 w-4" />
              <span>Apple Podcasts</span>
            </Button>
            <Button variant="outline" className="gap-2" aria-label="Watch on YouTube">
              <Youtube className="h-4 w-4" />
              <span>YouTube</span>
            </Button>
            <Button variant="outline" className="gap-2" aria-label="Subscribe via RSS">
              <Rss className="h-4 w-4" />
              <span>RSS Feed</span>
            </Button>
          </div>
        </div>

        {currentEpisode && (
          <AudioPlayer
            episode={currentEpisode}
            onClose={handleClose}
          />
        )}

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search episodes..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
              aria-label="Search episodes"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              onPlay={() => handlePlay(episode)}
              isPlaying={currentEpisode?.id === episode.id}
            />
          ))}
          {filteredEpisodes.length === 0 && (
            <div 
              className="text-center py-12 text-muted-foreground" 
              role="alert"
              aria-live="polite"
            >
              No episodes found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}