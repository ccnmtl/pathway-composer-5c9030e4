
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
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
  onReorderPathways: (sourceIndex: number, destinationIndex: number, category: string) => void;
}

const PathwayTabs: React.FC<PathwayTabsProps> = ({
  activeTab,
  onTabChange,
  pathways,
  onEdit,
  onCopy,
  onDelete,
  onAddPath,
  onReorderPathways
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    onReorderPathways(sourceIndex, destinationIndex, activeTab);
  };

  const renderTabContent = (category: string) => {
    const categoryPathways = pathways[category];
    
    if (categoryPathways.length === 0) {
      return <EmptyState category={category} />;
    }

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`${category}-pathways`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {categoryPathways.map((pathway, index) => (
                <Draggable key={pathway.id} draggableId={pathway.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`${snapshot.isDragging ? 'opacity-50' : ''}`}
                    >
                      <PathwayCard
                        pathway={pathway}
                        onEdit={onEdit}
                        onCopy={onCopy}
                        onDelete={onDelete}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col gap-4 mb-6 md:hidden">
        <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
          <TabsTrigger value="harmony" className="px-3 py-2 text-xs data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
            Harmony
          </TabsTrigger>
          <TabsTrigger value="melody" className="px-3 py-2 text-xs opacity-50 cursor-not-allowed data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
            Melody
          </TabsTrigger>
          <TabsTrigger value="rhythm" className="px-3 py-2 text-xs opacity-50 cursor-not-allowed data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
            Rhythm
          </TabsTrigger>
        </TabsList>
        
        <Button
          onClick={onAddPath}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 w-full"
        >
          Add a Path
        </Button>
      </div>

      {/* Desktop/Tablet Layout - Side by Side */}
      <div className="hidden md:flex items-center justify-between mb-6">
        <TabsList className="grid w-auto grid-cols-3 bg-card border border-border">
          <TabsTrigger value="harmony" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
            Harmony
          </TabsTrigger>
          <TabsTrigger value="melody" className="px-6 py-2 opacity-50 cursor-not-allowed data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
            Melody
          </TabsTrigger>
          <TabsTrigger value="rhythm" className="px-6 py-2 opacity-50 cursor-not-allowed data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-300">
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
        {renderTabContent('harmony')}
      </TabsContent>

      <TabsContent value="melody" className="mt-0">
        {renderTabContent('melody')}
      </TabsContent>

      <TabsContent value="rhythm" className="mt-0">
        {renderTabContent('rhythm')}
      </TabsContent>
    </Tabs>
  );
};

export default PathwayTabs;
