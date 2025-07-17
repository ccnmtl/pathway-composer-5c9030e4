
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PathwayData {
  id: string;
  topics: string;
  arrangements: string;
  exercises: string;
  actions: string;
  instructor: string;
}

interface PathwayCardProps {
  pathway: PathwayData;
  onEdit: (pathway: PathwayData) => void;
  onCopy: (pathway: PathwayData) => void;
  onDelete: (id: string) => void;
  dragHandleProps?: any;
}

const PathwayCard: React.FC<PathwayCardProps> = ({ pathway, onEdit, onCopy, onDelete, dragHandleProps }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(pathway.id);
    setShowDeleteAlert(false);
  };

  return (
    <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Mobile Layout - Grippy on Right spanning full height */}
        <div className="flex md:hidden">
          {/* Content and Actions */}
          <div className="flex-1 flex flex-col">
            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Topics */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.topics}</p>
              </div>
              
              {/* Arrangements */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.arrangements}</p>
              </div>
              
              {/* Exercises */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.exercises}</p>
              </div>
              
              {/* Actions */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.actions}</p>
              </div>
              
              {/* Instructor */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.instructor}</p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="px-4 py-3 border-t border-border flex flex-row justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(pathway)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 text-xs min-h-[36px] sm:min-h-auto"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(pathway)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 text-xs min-h-[36px] sm:min-h-auto"
              >
                Copy
              </Button>
              
              <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 text-xs min-h-[36px] sm:min-h-auto"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Pathway</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this pathway? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteConfirm}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          {/* Drag Handle - Right side for mobile, spanning full height */}
          <div 
            {...dragHandleProps}
            className="flex items-center justify-center w-10 bg-muted/50 cursor-grab active:cursor-grabbing hover:bg-muted/70 transition-colors border-l border-border"
          >
            <GripVertical size={20} className="text-muted-foreground" />
          </div>
        </div>

        {/* Desktop/Tablet Layout - Grippy on Left spanning full height */}
        <div className="hidden md:flex">
          {/* Drag Handle spanning full height */}
          <div 
            {...dragHandleProps}
            className="flex items-center justify-center w-8 bg-muted/50 cursor-grab active:cursor-grabbing hover:bg-muted/70 transition-colors border-r border-border"
          >
            <GripVertical size={16} className="text-muted-foreground" />
          </div>
          
          {/* Content and Actions */}
          <div className="flex-1 flex flex-col">
            {/* Content */}
            <div className="grid grid-cols-5 gap-0">
              {/* Topics */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.topics}</p>
              </div>
              
              {/* Arrangements */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.arrangements}</p>
              </div>
              
              {/* Exercises */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.exercises}</p>
              </div>
              
              {/* Actions */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.actions}</p>
              </div>
              
              {/* Instructor */}
              <div className="p-4">
                <p className="text-sm text-card-foreground break-words">{pathway.instructor}</p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="px-4 py-3 border-t border-border flex flex-row justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(pathway)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 text-xs min-h-[36px] sm:min-h-auto"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(pathway)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 text-xs min-h-[36px] sm:min-h-auto"
              >
                Copy
              </Button>
              
              <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 text-xs min-h-[36px] sm:min-h-auto"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Pathway</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this pathway? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteConfirm}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PathwayCard;
