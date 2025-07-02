
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PathwayData {
  id: string;
  topics: string;
  arrangements: string;
  exercises: string;
  actions: string;
}

interface PathwayCardProps {
  pathway: PathwayData;
  onEdit: (pathway: PathwayData) => void;
  onCopy: (pathway: PathwayData) => void;
  onDelete: (id: string) => void;
}

const PathwayCard: React.FC<PathwayCardProps> = ({ pathway, onEdit, onCopy, onDelete }) => {
  return (
    <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="grid grid-cols-4 gap-0">
          {/* Topics */}
          <div className="p-4 border-r border-border">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">TOPICS</h3>
            <p className="text-sm text-card-foreground break-words">{pathway.topics}</p>
          </div>
          
          {/* Arrangements */}
          <div className="p-4 border-r border-border">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">ARRANGEMENTS</h3>
            <p className="text-sm text-card-foreground break-words">{pathway.arrangements}</p>
          </div>
          
          {/* Exercises */}
          <div className="p-4 border-r border-border">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">EXERCISES</h3>
            <p className="text-sm text-card-foreground break-words">{pathway.exercises}</p>
          </div>
          
          {/* Actions */}
          <div className="p-4">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">ACTIONS</h3>
            <p className="text-sm text-card-foreground break-words">{pathway.actions}</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="px-4 py-3 border-t border-border flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(pathway)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 text-xs"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(pathway)}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 text-xs"
          >
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(pathway.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 text-xs"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PathwayCard;
