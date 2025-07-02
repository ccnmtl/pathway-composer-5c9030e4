
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PathwayCard from './PathwayCard';
import EmptyState from './EmptyState';

interface PathwayData {
  id: string;
  topics: string;
  arrangements: string;
  exercises: string;
  actions: string;
}

interface PathwayTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  pathways: Record<string, PathwayData[]>;
  onEdit: (pathway: PathwayData) => void;
  onCopy: (pathway: PathwayData) => void;
  onDelete: (id: string) => void;
  onAddPath: () => void;
}

const PathwayTabs: React.FC<PathwayTabsProps> = ({
  activeTab,
  onTabChange,
  pathways,
  onEdit,
  onCopy,
  onDelete,
  onAddPath
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="flex items-center justify-between mb-6">
        <TabsList className="grid w-auto grid-cols-3 bg-card border border-border">
          <TabsTrigger value="harmony" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
            Harmony
          </TabsTrigger>
          <TabsTrigger value="melody" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
            Melody
          </TabsTrigger>
          <TabsTrigger value="rhythm" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
            Rhythm
          </TabsTrigger>
        </TabsList>
        
        <Button
          onClick={onAddPath}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          Add a Path
        </Button>
      </div>

      <TabsContent value="harmony" className="mt-0">
        <div className="space-y-4">
          {pathways.harmony.map((pathway) => (
            <PathwayCard
              key={pathway.id}
              pathway={pathway}
              onEdit={onEdit}
              onCopy={onCopy}
              onDelete={onDelete}
            />
          ))}
          {pathways.harmony.length === 0 && <EmptyState category="harmony" />}
        </div>
      </TabsContent>

      <TabsContent value="melody" className="mt-0">
        <div className="space-y-4">
          {pathways.melody.map((pathway) => (
            <PathwayCard
              key={pathway.id}
              pathway={pathway}
              onEdit={onEdit}
              onCopy={onCopy}
              onDelete={onDelete}
            />
          ))}
          {pathways.melody.length === 0 && <EmptyState category="melody" />}
        </div>
      </TabsContent>

      <TabsContent value="rhythm" className="mt-0">
        <div className="space-y-4">
          {pathways.rhythm.map((pathway) => (
            <PathwayCard
              key={pathway.id}
              pathway={pathway}
              onEdit={onEdit}
              onCopy={onCopy}
              onDelete={onDelete}
            />
          ))}
          {pathways.rhythm.length === 0 && <EmptyState category="rhythm" />}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PathwayTabs;
