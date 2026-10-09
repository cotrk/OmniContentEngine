import { useState } from 'react';
import { ChevronDown, Plus, Zap, Settings as SettingsIcon } from 'lucide-react';
import type { Project, EngineConfig } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarProps {
  activeProject: Project;
  projects: Project[];
  engineConfig: EngineConfig;
  onProjectChange: (projectId: string) => void;
  onProjectUpdate: (updates: Partial<Project>) => void;
  onEngineConfigChange: (config: Partial<EngineConfig>) => void;
}

export function Sidebar({
  activeProject,
  projects,
  engineConfig,
  onProjectChange,
  onProjectUpdate,
  onEngineConfigChange
}: SidebarProps) {
  const [projectSettingsOpen, setProjectSettingsOpen] = useState(false);
  const [engineSettingsOpen, setEngineSettingsOpen] = useState(false);

  const isConnected = engineConfig.connectionType === 'simulated';
  const statusLabel = engineConfig.connectionType === 'simulated' 
    ? 'Mock Engine Active' 
    : 'Local Engine Connected';

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden">
      {/* Logo & Status */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-sidebar-foreground" />
          <h1 className="text-sm font-bold text-sidebar-foreground tracking-tight">
            OmniContent Engine
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-amber-500' : 'bg-green-500'}`} />
          <span className="text-xs text-sidebar-foreground/70">{statusLabel}</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Project Switcher */}
        <div className="p-4 border-b border-sidebar-border">
          <Label className="text-xs uppercase tracking-wider text-sidebar-foreground/60 mb-2 block">
            Active Project
          </Label>
          <Select value={activeProject.id} onValueChange={onProjectChange}>
            <SelectTrigger className="w-full bg-sidebar-accent border-sidebar-border text-sidebar-foreground" data-testid="select-project">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id} data-testid={`option-project-${project.id}`}>
                  {project.name}
                </SelectItem>
              ))}
              <SelectItem value="new" disabled data-testid="option-add-project">
                <div className="flex items-center gap-2 text-sidebar-foreground/50">
                  <Plus className="w-3 h-3" />
                  Add New Project
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Project Settings */}
        <Collapsible open={projectSettingsOpen} onOpenChange={setProjectSettingsOpen}>
          <div className="p-4 border-b border-sidebar-border">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-0 h-auto hover:bg-transparent"
                data-testid="button-toggle-project-settings"
              >
                <Label className="text-xs uppercase tracking-wider text-sidebar-foreground/60 cursor-pointer">
                  Project Settings
                </Label>
                <ChevronDown className={`w-4 h-4 text-sidebar-foreground/60 transition-transform ${projectSettingsOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-3">
              <div>
                <Label htmlFor="project-name" className="text-xs text-sidebar-foreground/80">Project Name</Label>
                <Input
                  id="project-name"
                  value={activeProject.name}
                  onChange={(e) => onProjectUpdate({ name: e.target.value })}
                  className="mt-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm"
                  data-testid="input-project-name"
                />
              </div>
              <div>
                <Label htmlFor="brand-focus" className="text-xs text-sidebar-foreground/80">Brand Focus</Label>
                <Input
                  id="brand-focus"
                  value={activeProject.brandFocus}
                  onChange={(e) => onProjectUpdate({ brandFocus: e.target.value })}
                  className="mt-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm"
                  data-testid="input-brand-focus"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-xs text-sidebar-foreground/80">Primary Location</Label>
                <Input
                  id="location"
                  value={activeProject.primaryLocation}
                  onChange={(e) => onProjectUpdate({ primaryLocation: e.target.value })}
                  className="mt-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm"
                  data-testid="input-location"
                />
              </div>
              <div className="pt-2">
                <Label className="text-xs text-sidebar-foreground/80 mb-2 block">Category Hashtags</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeProject.categoryHashtags.geo.color }} />
                    <span className="text-xs text-sidebar-foreground/70 flex-1">Geo/Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeProject.categoryHashtags.strategy.color }} />
                    <span className="text-xs text-sidebar-foreground/70 flex-1">Strategy/Authority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeProject.categoryHashtags.community.color }} />
                    <span className="text-xs text-sidebar-foreground/70 flex-1">Community/Engagement</span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* AI Engine Settings */}
        <Collapsible open={engineSettingsOpen} onOpenChange={setEngineSettingsOpen}>
          <div className="p-4">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-0 h-auto hover:bg-transparent mb-4"
                data-testid="button-toggle-engine-settings"
              >
                <Label className="text-xs uppercase tracking-wider text-sidebar-foreground/60 cursor-pointer flex items-center gap-2">
                  <SettingsIcon className="w-3 h-3" />
                  AI Engine
                </Label>
                <ChevronDown className={`w-4 h-4 text-sidebar-foreground/60 transition-transform ${engineSettingsOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3">
              <div>
                <Label htmlFor="connection-type" className="text-xs text-sidebar-foreground/80">Connection Type</Label>
                <Select 
                  value={engineConfig.connectionType} 
                  onValueChange={(value) => onEngineConfigChange({ connectionType: value as EngineConfig['connectionType'] })}
                >
                  <SelectTrigger 
                    id="connection-type" 
                    className="mt-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm"
                    data-testid="select-connection-type"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ollama" data-testid="option-ollama">Local Ollama (CORS)</SelectItem>
                    <SelectItem value="webllm" data-testid="option-webllm">In-Browser WebLLM</SelectItem>
                    <SelectItem value="simulated" data-testid="option-simulated">Simulated Local Engine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="model" className="text-xs text-sidebar-foreground/80">Model</Label>
                <Select 
                  value={engineConfig.model} 
                  onValueChange={(value) => onEngineConfigChange({ model: value })}
                >
                  <SelectTrigger 
                    id="model" 
                    className="mt-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm"
                    data-testid="select-model"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ministral-8b" data-testid="option-ministral">Ministral 8B</SelectItem>
                    <SelectItem value="mistral-nemo-12b" data-testid="option-nemo">Mistral Nemo 12B</SelectItem>
                    <SelectItem value="llama-3.2-3b" data-testid="option-llama">Llama 3.2 3B</SelectItem>
                    <SelectItem value="phi-4-mini" data-testid="option-phi">Phi-4 Mini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {engineConfig.connectionType === 'ollama' && (
                <div>
                  <Label htmlFor="endpoint" className="text-xs text-sidebar-foreground/80">Endpoint URL</Label>
                  <Input
                    id="endpoint"
                    value={engineConfig.endpointUrl}
                    onChange={(e) => onEngineConfigChange({ endpointUrl: e.target.value })}
                    className="mt-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground text-sm"
                    placeholder="http://localhost:11434"
                    data-testid="input-endpoint"
                  />
                </div>
              )}
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
