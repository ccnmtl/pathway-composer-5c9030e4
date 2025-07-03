
import React from 'react';
import PathwayList from './PathwayList';
import EmptyState from './EmptyState';

interface PathwayData {
  id: string;
  topics: string;
  arrangements: string;
  exercises: string;
  actions: string;
}

interface PathwayContentProps {
  category: string;
  pathways: PathwayData[];
  onEdit: (pathway: PathwayData) => void;
  onCopy: (pathway: PathwayData) => void;
  onDelete: (id: string) => void;
  onReorderPathways: (sourceIndex: number, destinationIndex: number, category: string) => void;
}

const PathwayContent: React.FC<PathwayContentProps> = ({
  category,
  pathways,
  onEdit,
  onCopy,
  onDelete,
  onReorderPathways
}) => {
  if (pathways.length === 0) {
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

      <PathwayList
        pathways={pathways}
        category={category}
        onEdit={onEdit}
        onCopy={onCopy}
        onDelete={onDelete}
        onReorderPathways={onReorderPathways}
      />
    </>
  );
};

export default PathwayContent;
