export type Platform = 'linkedin' | 'facebook' | 'threads';

export interface GeneratedPost {
  id: string;
  platform: Platform;
  dayIndex: number;
  content: string;
  tags: {
    geo: string[];
    strategy: string[];
    community: string[];
  };
  imagePrompt?: string;
  scheduled: boolean;
}

export interface Project {
  id: string;
  name: string;
  brandFocus: string;
  primaryLocation: string;
  categoryHashtags: {
    geo: { label: string; color: string; tags: string[] };
    strategy: { label: string; color: string; tags: string[] };
    community: { label: string; color: string; tags: string[] };
  };
}

export interface EngineConfig {
  connectionType: 'ollama' | 'webllm' | 'simulated';
  model: string;
  endpointUrl: string;
}

export interface OutputConfig {
  linkedInCount: number;
  facebookCount: number;
  threadsCount: number;
  includeVisualPrompts: boolean;
}
