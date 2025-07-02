
import React from 'react';
import { Button } from '@/components/ui/button';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
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
      <>
        {/* Column Headers - Desktop Only */}
        <div className="hidden md:flex mb-4">
          <div className="w-8"></div> {/* Space for drag handle */}
          <div className="flex-1 grid grid-cols-4 gap-0">
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">TOPICS</h3>
            </div>
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">ARRANGEMENTS</h3>
            </div>
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">EXERCISES</h3>
            </div>
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">ACTIONS</h3>
            </div>
          </div>
        </div>

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
      </>
    );
  };

  return (
    <div className="w-full">
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col gap-4 mb-6 md:hidden">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="grid w-full grid-cols-3 bg-card border border-border">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-center ${
                  activeTab === 'harmony' 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => onTabChange('harmony')}
              >
                Harmony
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 text-xs opacity-50 cursor-not-allowed flex items-center justify-center"
              >
                Melody
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-3 py-2 text-xs opacity-50 cursor-not-allowed flex items-center justify-center"
              >
                Rhythm
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Button
          onClick={onAddPath}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 w-full"
        >
          Add a Path
        </Button>
      </div>

      {/* Desktop/Tablet Layout - Side by Side */}
      <div className="hidden md:flex items-center justify-between mb-6">
        <NavigationMenu>
          <NavigationMenuList className="grid w-auto grid-cols-3 bg-card border border-border">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`px-6 py-2 cursor-pointer flex items-center justify-center ${
                  activeTab === 'harmony' 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => onTabChange('harmony')}
              >
                Harmony
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-6 py-2 opacity-50 cursor-not-allowed flex items-center justify-center"
              >
                Melody
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-6 py-2 opacity-50 cursor-not-allowed flex items-center justify-center"
              >
                Rhythm
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Button
          onClick={onAddPath}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          Add a Path
        </Button>
      </div>

      {/* Content based on active tab */}
      <div className="mt-0">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default PathwayTabs;
