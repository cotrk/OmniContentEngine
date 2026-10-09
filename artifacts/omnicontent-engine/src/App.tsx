import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as SonnerToaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { IngestionTab } from '@/components/IngestionTab';
import { CalendarTab } from '@/components/CalendarTab';
import { HashtagTab } from '@/components/HashtagTab';
import type { Project, EngineConfig, OutputConfig, GeneratedPost } from '@/types';
import { generateContentFromMock, getDefaultPosts } from '@/lib/mockEngine';
import { toast } from 'sonner';

const queryClient = new QueryClient();

type Tab = 'ingestion' | 'calendar' | 'hashtags';

const defaultProject: Project = {
  id: 'project-1',
  name: 'Your Second Act - Arkansas',
  brandFocus: 'Second-career entrepreneurship and community building',
  primaryLocation: 'Northwest Arkansas',
  categoryHashtags: {
    geo: {
      label: 'Geo/Location',
      color: '#94A187',
      tags: ['ArkansasEntrepreneurs', 'NWABusiness', 'BentonvilleAR']
    },
    strategy: {
      label: 'Strategy/Authority',
      color: '#DCAE96',
      tags: ['SecondActSuccess', 'CareerPivot', 'BusinessWisdom']
    },
    community: {
      label: 'Community/Engagement',
      color: '#7286A0',
      tags: ['EntrepreneurMindset', 'SmallBusinessOwner', 'SupportLocal']
    }
  }
};

const defaultEngineConfig: EngineConfig = {
  connectionType: 'simulated',
  model: 'ministral-8b',
  endpointUrl: 'http://localhost:11434'
};

const defaultOutputConfig: OutputConfig = {
  linkedInCount: 1,
  facebookCount: 2,
  threadsCount: 2,
  includeVisualPrompts: true
};

function MainApp() {
  const [activeTab, setActiveTab] = useState<Tab>('calendar');
  const [projects] = useState<Project[]>([defaultProject]);
  const [activeProject, setActiveProject] = useState<Project>(defaultProject);
  const [engineConfig, setEngineConfig] = useState<EngineConfig>(defaultEngineConfig);
  const [inputContent, setInputContent] = useState('');
  const [outputConfig, setOutputConfig] = useState<OutputConfig>(defaultOutputConfig);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>(getDefaultPosts());
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProjectChange = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setActiveProject(project);
    }
  };

  const handleProjectUpdate = (updates: Partial<Project>) => {
    setActiveProject(prev => ({ ...prev, ...updates }));
  };

  const handleEngineConfigChange = (updates: Partial<EngineConfig>) => {
    setEngineConfig(prev => ({ ...prev, ...updates }));
  };

  const handleOutputConfigChange = (updates: Partial<OutputConfig>) => {
    setOutputConfig(prev => ({ ...prev, ...updates }));
  };

  const handleProcess = async () => {
    setIsGenerating(true);
    try {
      let posts: GeneratedPost[];

      if (engineConfig.connectionType === 'ollama') {
        // Try Ollama with timeout
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 2000);

          const response = await fetch(`${engineConfig.endpointUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: engineConfig.model,
              prompt: inputContent,
              stream: false
            }),
            signal: controller.signal
          });

          clearTimeout(timeout);

          if (!response.ok) {
            throw new Error('Ollama request failed');
          }

          // If Ollama succeeds, we'd parse the response here
          // For now, fall back to mock
          posts = await generateContentFromMock(inputContent, outputConfig);
        } catch (error) {
          // Ollama failed, use mock
          toast.info('Ollama unavailable, using mock engine');
          posts = await generateContentFromMock(inputContent, outputConfig);
        }
      } else {
        // Use mock engine
        posts = await generateContentFromMock(inputContent, outputConfig);
      }

      setGeneratedPosts(posts);
      toast.success('Content bundle generated successfully!');
      setActiveTab('calendar');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdatePost = (id: string, updates: Partial<GeneratedPost>) => {
    setGeneratedPosts(prev =>
      prev.map(post => (post.id === id ? { ...post, ...updates } : post))
    );
  };

  const handleExport = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const data = JSON.stringify(generatedPosts, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'content-schedule.json';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Exported as JSON');
    } else {
      // CSV export
      const headers = ['Day', 'Platform', 'Content', 'Geo Tags', 'Strategy Tags', 'Community Tags', 'Scheduled'];
      const rows = generatedPosts.map(post => [
        `Day ${post.dayIndex + 1}`,
        post.platform,
        `"${post.content.replace(/"/g, '""')}"`,
        post.tags.geo.map(t => `#${t}`).join(' '),
        post.tags.strategy.map(t => `#${t}`).join(' '),
        post.tags.community.map(t => `#${t}`).join(' '),
        post.scheduled ? 'Yes' : 'No'
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'content-schedule.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Exported as CSV');
    }
  };

  const handleReset = () => {
    setGeneratedPosts([]);
    setInputContent('');
    setActiveTab('ingestion');
    toast.success('Canvas reset');
  };

  const categoryColors = {
    geo: activeProject.categoryHashtags.geo.color,
    strategy: activeProject.categoryHashtags.strategy.color,
    community: activeProject.categoryHashtags.community.color
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        activeProject={activeProject}
        projects={projects}
        engineConfig={engineConfig}
        onProjectChange={handleProjectChange}
        onProjectUpdate={handleProjectUpdate}
        onEngineConfigChange={handleEngineConfigChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onExport={handleExport}
          onReset={handleReset}
        />
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'ingestion' && (
            <IngestionTab
              inputContent={inputContent}
              onInputChange={setInputContent}
              outputConfig={outputConfig}
              onOutputConfigChange={handleOutputConfigChange}
              onProcess={handleProcess}
              isGenerating={isGenerating}
            />
          )}
          {activeTab === 'calendar' && (
            <CalendarTab
              posts={generatedPosts}
              onUpdatePost={handleUpdatePost}
              categoryColors={categoryColors}
            />
          )}
          {activeTab === 'hashtags' && (
            <HashtagTab
              posts={generatedPosts}
              activeProject={activeProject}
            />
          )}
        </main>
      </div>
      <SonnerToaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MainApp />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
