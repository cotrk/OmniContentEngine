import React, { useState } from 'react';
import { Calendar, List } from 'lucide-react';
import type { GeneratedPost } from '@/types';
import { Button } from '@/components/ui/button';
import { PostCard } from './PostCard';

interface CalendarTabProps {
  posts: GeneratedPost[];
  onUpdatePost: (id: string, updates: Partial<GeneratedPost>) => void;
  categoryColors: {
    geo: string;
    strategy: string;
    community: string;
  };
}

type ViewMode = 'calendar' | 'list';

export function CalendarTab({ posts, onUpdatePost, categoryColors }: CalendarTabProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');

  // Group posts by day
  const postsByDay = posts.reduce((acc, post) => {
    if (!acc[post.dayIndex]) {
      acc[post.dayIndex] = [];
    }
    acc[post.dayIndex].push(post);
    return acc;
  }, {} as Record<number, GeneratedPost[]>);

  // Sort posts within each day by platform order
  const platformOrder = { linkedin: 0, facebook: 1, threads: 2 };
  Object.values(postsByDay).forEach(dayPosts => {
    dayPosts.sort((a, b) => platformOrder[a.platform] - platformOrder[b.platform]);
  });

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center max-w-md">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No content generated yet</h3>
          <p className="text-sm text-muted-foreground">
            Head to the Data Ingestion tab to process your first content bundle and populate your calendar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* View Switcher */}
      <div className="flex justify-end mb-6 gap-2">
        <Button
          variant={viewMode === 'calendar' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('calendar')}
          className="gap-2"
          data-testid="button-view-calendar"
        >
          <Calendar className="w-4 h-4" />
          Calendar View
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
          className="gap-2"
          data-testid="button-view-list"
        >
          <List className="w-4 h-4" />
          List View
        </Button>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-5 gap-4" data-testid="container-calendar-view">
          {[0, 1, 2, 3, 4].map(dayIndex => (
            <div key={dayIndex} className="space-y-3">
              <div className="sticky top-0 bg-background pb-2 z-10">
                <h3 className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                  Day {dayIndex + 1}
                </h3>
              </div>
              {postsByDay[dayIndex]?.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onUpdate={onUpdatePost}
                  categoryColors={categoryColors}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="max-w-3xl mx-auto space-y-4" data-testid="container-list-view">
          {posts
            .sort((a, b) => {
              if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex;
              return platformOrder[a.platform] - platformOrder[b.platform];
            })
            .map(post => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={onUpdatePost}
                categoryColors={categoryColors}
              />
            ))}
        </div>
      )}
    </div>
  );
}
