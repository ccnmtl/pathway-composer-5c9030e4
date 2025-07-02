
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
    <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="grid grid-cols-4 gap-0">
          {/* Topics */}
          <div className="p-4 border-r border-gray-100">
            <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">TOPICS</h3>
            <p className="text-sm text-gray-700 break-words">{pathway.topics}</p>
          </div>
          
          {/* Arrangements */}
          <div className="p-4 border-r border-gray-100">
            <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">ARRANGEMENTS</h3>
            <p className="text-sm text-gray-700 break-words">{pathway.arrangements}</p>
          </div>
          
          {/* Exercises */}
          <div className="p-4 border-r border-gray-100">
            <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">EXERCISES</h3>
            <p className="text-sm text-gray-700 break-words">{pathway.exercises}</p>
          </div>
          
          {/* Actions */}
          <div className="p-4">
            <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">ACTIONS</h3>
            <p className="text-sm text-gray-700 break-words">{pathway.actions}</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="px-4 py-3 border-t border-gray-100 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(pathway)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(pathway)}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 text-xs"
          >
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(pathway.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PathwayCard;
