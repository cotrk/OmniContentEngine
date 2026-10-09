import { Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Tab = 'ingestion' | 'calendar' | 'hashtags';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onExport: (format: 'json' | 'csv') => void;
  onReset: () => void;
}

export function Header({ activeTab, onTabChange, onExport, onReset }: HeaderProps) {
  return (
    <div className="h-16 border-b border-card-border bg-card flex items-center justify-between px-6">
      {/* Tab Navigation */}
      <div className="flex gap-1">
        <Button
          variant={activeTab === 'ingestion' ? 'default' : 'ghost'}
          onClick={() => onTabChange('ingestion')}
          className="text-sm font-medium"
          data-testid="tab-ingestion"
        >
          Data Ingestion
        </Button>
        <Button
          variant={activeTab === 'calendar' ? 'default' : 'ghost'}
          onClick={() => onTabChange('calendar')}
          className="text-sm font-medium"
          data-testid="tab-calendar"
        >
          Content Calendar
        </Button>
        <Button
          variant={activeTab === 'hashtags' ? 'default' : 'ghost'}
          onClick={() => onTabChange('hashtags')}
          className="text-sm font-medium"
          data-testid="tab-hashtags"
        >
          Hashtag Library
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2" data-testid="button-export">
              <Download className="w-4 h-4" />
              Export Schedule
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExport('json')} data-testid="option-export-json">
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport('csv')} data-testid="option-export-csv">
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2" 
          onClick={onReset}
          data-testid="button-reset"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Canvas
        </Button>
      </div>
    </div>
  );
}
