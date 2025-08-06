
import React from 'react';
import NavigationTabs from './NavigationTabs';
import PathwayContent from './PathwayContent';

interface PathwayData {
  id: string;
  topic: string;
  proficiency: string;
  ensemble: string;
  activity: string;
  instruction: string;
  exercise: string;
  facultyNotes: string;
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
  const categoryPathways = pathways[activeTab];

  return (
    <div className="w-full">
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        onAddPath={onAddPath}
      />

      {/* Content based on active tab */}
      <div className="mt-0">
        <PathwayContent
          category={activeTab}
          pathways={categoryPathways}
          onEdit={onEdit}
          onCopy={onCopy}
          onDelete={onDelete}
          onReorderPathways={onReorderPathways}
        />
      </div>
    </div>
  );
};

export default PathwayTabs;
