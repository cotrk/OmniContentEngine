import { useState } from 'react';
import { Copy, Check, ChevronRight } from 'lucide-react';
import type { GeneratedPost, Platform } from '@/types';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface PostCardProps {
  post: GeneratedPost;
  onUpdate: (id: string, updates: Partial<GeneratedPost>) => void;
  categoryColors: {
    geo: string;
    strategy: string;
    community: string;
  };
}

const platformColors: Record<Platform, { bg: string; label: string }> = {
  linkedin: { bg: '#0077B5', label: 'LinkedIn' },
  facebook: { bg: '#3B5998', label: 'Facebook' },
  threads: { bg: '#1A1A1A', label: 'Threads' }
};

function getDayLabel(dayIndex: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayIndex + 1);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `Day ${dayIndex + 1} — ${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

export function PostCard({ post, onUpdate, categoryColors }: PostCardProps) {
  const [imagePromptOpen, setImagePromptOpen] = useState(false);
  const platformInfo = platformColors[post.platform];

  const handleCopyPost = () => {
    const allTags = [
      ...post.tags.geo.map(t => `#${t}`),
      ...post.tags.strategy.map(t => `#${t}`),
      ...post.tags.community.map(t => `#${t}`)
    ].join(' ');
    
    const fullContent = `${post.content}\n\n${allTags}`;
    navigator.clipboard.writeText(fullContent);
    toast.success('Post copied to clipboard!');
  };

  const handleCopyImagePrompt = () => {
    if (post.imagePrompt) {
      navigator.clipboard.writeText(post.imagePrompt);
      toast.success('Image prompt copied!');
    }
  };

  const handleToggleScheduled = () => {
    onUpdate(post.id, { scheduled: !post.scheduled });
    toast.success(post.scheduled ? 'Marked as unscheduled' : 'Marked as scheduled');
  };

  return (
    <div 
      className={`bg-card border border-card-border rounded-lg p-4 transition-all ${
        post.scheduled ? 'opacity-60' : 'hover:shadow-md'
      }`}
      data-testid={`card-post-${post.id}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="px-3 py-1 rounded-full text-white text-xs font-medium"
            style={{ backgroundColor: platformInfo.bg }}
          >
            {platformInfo.label}
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {getDayLabel(post.dayIndex)}
          </span>
        </div>
        {post.scheduled && (
          <div className="flex items-center gap-1 text-xs text-green-600">
            <Check className="w-3 h-3" />
            <span>Scheduled</span>
          </div>
        )}
      </div>

      {/* Content */}
      <Textarea
        value={post.content}
        onChange={(e) => onUpdate(post.id, { content: e.target.value })}
        className="min-h-[120px] mb-3 resize-none text-sm leading-relaxed"
        data-testid={`textarea-content-${post.id}`}
      />

      {/* Image Prompt */}
      {post.imagePrompt && (
        <Collapsible open={imagePromptOpen} onOpenChange={setImagePromptOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between mb-3 h-auto p-2 text-xs hover:bg-accent"
              data-testid={`button-toggle-prompt-${post.id}`}
            >
              <span className="text-muted-foreground">AI Image Prompt</span>
              <ChevronRight className={`w-3 h-3 transition-transform ${imagePromptOpen ? 'rotate-90' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mb-3">
            <div className="bg-muted rounded p-3 text-xs text-muted-foreground leading-relaxed">
              {post.imagePrompt}
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-7 text-xs"
                onClick={handleCopyImagePrompt}
                data-testid={`button-copy-prompt-${post.id}`}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy Image Prompt
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.geo.map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: categoryColors.geo }}
          >
            #{tag}
          </span>
        ))}
        {post.tags.strategy.map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: categoryColors.strategy }}
          >
            #{tag}
          </span>
        ))}
        {post.tags.community.map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: categoryColors.community }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-card-border">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          onClick={handleCopyPost}
          data-testid={`button-copy-post-${post.id}`}
        >
          <Copy className="w-3 h-3 mr-1" />
          Copy Post
        </Button>
        <Button
          variant={post.scheduled ? 'default' : 'outline'}
          size="sm"
          className="h-8 text-xs ml-auto"
          onClick={handleToggleScheduled}
          data-testid={`button-schedule-${post.id}`}
        >
          {post.scheduled ? (
            <>
              <Check className="w-3 h-3 mr-1" />
              Scheduled
            </>
          ) : (
            'Mark Scheduled'
          )}
        </Button>
      </div>
    </div>
  );
}
