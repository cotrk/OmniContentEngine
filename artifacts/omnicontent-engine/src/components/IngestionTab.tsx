import { useState } from 'react';
import { Loader2, X, ClipboardPaste } from 'lucide-react';
import type { OutputConfig } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface IngestionTabProps {
  inputContent: string;
  onInputChange: (content: string) => void;
  outputConfig: OutputConfig;
  onOutputConfigChange: (config: Partial<OutputConfig>) => void;
  onProcess: () => void;
  isGenerating: boolean;
}

export function IngestionTab({
  inputContent,
  onInputChange,
  outputConfig,
  onOutputConfigChange,
  onProcess,
  isGenerating
}: IngestionTabProps) {
  const [inputType, setInputType] = useState<'transcript' | 'research'>('transcript');

  const wordCount = inputContent.trim().split(/\s+/).filter(w => w.length > 0).length;
  const charCount = inputContent.length;

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    onInputChange(text);
  };

  const handleClear = () => {
    onInputChange('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Input Type Toggle */}
      <div className="flex gap-2">
        <Button
          variant={inputType === 'transcript' ? 'default' : 'outline'}
          onClick={() => setInputType('transcript')}
          className="text-sm"
          data-testid="button-type-transcript"
        >
          Video Transcript
        </Button>
        <Button
          variant={inputType === 'research' ? 'default' : 'outline'}
          onClick={() => setInputType('research')}
          className="text-sm"
          data-testid="button-type-research"
        >
          Deep-Dive Research
        </Button>
      </div>

      {/* Input Area */}
      <div className="bg-card border border-card-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium">
            {inputType === 'transcript' ? 'Paste Video Transcript' : 'Paste Research Content'}
          </Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePaste}
              className="h-8 text-xs"
              data-testid="button-paste"
            >
              <ClipboardPaste className="w-3 h-3 mr-1" />
              Paste
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 text-xs"
              data-testid="button-clear"
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>
        <Textarea
          value={inputContent}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={`Paste your ${inputType === 'transcript' ? 'video transcript' : 'research notes'} here...`}
          className="min-h-[200px] resize-none text-sm"
          data-testid="textarea-input"
        />
        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
          <span data-testid="text-word-count">{wordCount} words</span>
          <span data-testid="text-char-count">{charCount} characters</span>
        </div>
      </div>

      {/* Output Configuration */}
      <div className="bg-card border border-card-border rounded-lg p-6">
        <Label className="text-sm font-medium mb-4 block">Output Configuration</Label>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* LinkedIn Count */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">LinkedIn Posts</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOutputConfigChange({ linkedInCount: Math.max(0, outputConfig.linkedInCount - 1) })}
                  disabled={outputConfig.linkedInCount === 0}
                  className="h-8 w-8 p-0"
                  data-testid="button-linkedin-decrease"
                >
                  −
                </Button>
                <div className="flex-1 text-center font-medium" data-testid="text-linkedin-count">
                  {outputConfig.linkedInCount}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOutputConfigChange({ linkedInCount: outputConfig.linkedInCount + 1 })}
                  className="h-8 w-8 p-0"
                  data-testid="button-linkedin-increase"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Facebook Count */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Facebook Posts</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOutputConfigChange({ facebookCount: Math.max(0, outputConfig.facebookCount - 1) })}
                  disabled={outputConfig.facebookCount === 0}
                  className="h-8 w-8 p-0"
                  data-testid="button-facebook-decrease"
                >
                  −
                </Button>
                <div className="flex-1 text-center font-medium" data-testid="text-facebook-count">
                  {outputConfig.facebookCount}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOutputConfigChange({ facebookCount: outputConfig.facebookCount + 1 })}
                  className="h-8 w-8 p-0"
                  data-testid="button-facebook-increase"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Threads Count */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Threads Posts</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOutputConfigChange({ threadsCount: Math.max(0, outputConfig.threadsCount - 1) })}
                  disabled={outputConfig.threadsCount === 0}
                  className="h-8 w-8 p-0"
                  data-testid="button-threads-decrease"
                >
                  −
                </Button>
                <div className="flex-1 text-center font-medium" data-testid="text-threads-count">
                  {outputConfig.threadsCount}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOutputConfigChange({ threadsCount: outputConfig.threadsCount + 1 })}
                  className="h-8 w-8 p-0"
                  data-testid="button-threads-increase"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Visual Prompts Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-card-border">
            <Label htmlFor="visual-prompts" className="text-sm cursor-pointer">
              Include AI Visual Prompts
            </Label>
            <Switch
              id="visual-prompts"
              checked={outputConfig.includeVisualPrompts}
              onCheckedChange={(checked) => onOutputConfigChange({ includeVisualPrompts: checked })}
              data-testid="switch-visual-prompts"
            />
          </div>
        </div>
      </div>

      {/* Process Button */}
      <Button
        onClick={onProcess}
        disabled={isGenerating || !inputContent.trim()}
        className="w-full h-12 text-base font-medium bg-gradient-to-r from-[#1E293B] to-[#334155] hover:from-[#334155] hover:to-[#475569]"
        data-testid="button-process"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating posts...
          </>
        ) : (
          'Process Content Bundle'
        )}
      </Button>
    </div>
  );
}
