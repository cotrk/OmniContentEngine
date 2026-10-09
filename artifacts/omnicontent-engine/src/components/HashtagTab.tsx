import { Copy, Tag } from 'lucide-react';
import type { GeneratedPost, Project } from '@/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface HashtagTabProps {
  posts: GeneratedPost[];
  activeProject: Project;
}

export function HashtagTab({ posts, activeProject }: HashtagTabProps) {
  // Extract unique hashtags from posts
  const allGeoTags = new Set<string>();
  const allStrategyTags = new Set<string>();
  const allCommunityTags = new Set<string>();

  posts.forEach(post => {
    post.tags.geo.forEach(tag => allGeoTags.add(tag));
    post.tags.strategy.forEach(tag => allStrategyTags.add(tag));
    post.tags.community.forEach(tag => allCommunityTags.add(tag));
  });

  const geoTags = Array.from(allGeoTags);
  const strategyTags = Array.from(allStrategyTags);
  const communityTags = Array.from(allCommunityTags);

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(`#${tag}`);
    toast.success('Hashtag copied!');
  };

  const handleCopyAll = (tags: string[], category: string) => {
    const formatted = tags.map(t => `#${t}`).join(' ');
    navigator.clipboard.writeText(formatted);
    toast.success(`All ${category} hashtags copied!`);
  };

  // Extract unique image prompts
  const imagePrompts = posts
    .filter(post => post.imagePrompt)
    .map((post, index) => ({
      id: post.id,
      platform: post.platform,
      prompt: post.imagePrompt!,
      index
    }));

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Image prompt copied!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hashtag Matrix */}
      <div>
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Hashtag Matrix
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Geo Tags */}
          <div className="bg-card border border-card-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: activeProject.categoryHashtags.geo.color }}
                />
                <h3 className="text-sm font-medium">
                  {activeProject.categoryHashtags.geo.label}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyAll(geoTags, 'Geo')}
                className="h-7 text-xs"
                data-testid="button-copy-all-geo"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {geoTags.length === 0 ? (
                <p className="text-xs text-muted-foreground">No tags yet</p>
              ) : (
                geoTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleCopyTag(tag)}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: activeProject.categoryHashtags.geo.color }}
                    data-testid={`tag-geo-${tag}`}
                  >
                    #{tag}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Strategy Tags */}
          <div className="bg-card border border-card-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: activeProject.categoryHashtags.strategy.color }}
                />
                <h3 className="text-sm font-medium">
                  {activeProject.categoryHashtags.strategy.label}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyAll(strategyTags, 'Strategy')}
                className="h-7 text-xs"
                data-testid="button-copy-all-strategy"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {strategyTags.length === 0 ? (
                <p className="text-xs text-muted-foreground">No tags yet</p>
              ) : (
                strategyTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleCopyTag(tag)}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: activeProject.categoryHashtags.strategy.color }}
                    data-testid={`tag-strategy-${tag}`}
                  >
                    #{tag}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Community Tags */}
          <div className="bg-card border border-card-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: activeProject.categoryHashtags.community.color }}
                />
                <h3 className="text-sm font-medium">
                  {activeProject.categoryHashtags.community.label}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyAll(communityTags, 'Community')}
                className="h-7 text-xs"
                data-testid="button-copy-all-community"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {communityTags.length === 0 ? (
                <p className="text-xs text-muted-foreground">No tags yet</p>
              ) : (
                communityTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleCopyTag(tag)}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: activeProject.categoryHashtags.community.color }}
                    data-testid={`tag-community-${tag}`}
                  >
                    #{tag}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Prompt Gallery */}
      {imagePrompts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-6">Visual Prompt Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {imagePrompts.map(({ id, platform, prompt, index }) => (
              <div
                key={id}
                className="bg-card border border-card-border rounded-lg p-4"
                data-testid={`prompt-card-${id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {platform}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyPrompt(prompt)}
                    className="h-7 text-xs"
                    data-testid={`button-copy-prompt-${id}`}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
