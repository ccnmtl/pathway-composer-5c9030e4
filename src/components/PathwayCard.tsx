
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
  topic: string;
  proficiency: string;
  ensemble: string;
  activity: string;
  instruction: string;
  exercise: string;
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
    <Card className="border border-border bg-card shadow-sm hover:border-warning transition-colors duration-200">
      <CardContent className="p-0">
        {/* Mobile Layout - Grippy on Right spanning full height */}
        <div className="flex md:hidden">
          {/* Content and Actions */}
          <div className="flex-1 flex flex-col">
            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Topic */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.topic}</p>
              </div>
              
              {/* Proficiency */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.proficiency}</p>
              </div>
              
              {/* Ensemble */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.ensemble}</p>
              </div>
              
              {/* Activity */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.activity}</p>
              </div>
              
              {/* Instruction */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.instruction}</p>
              </div>
              
              {/* Exercise */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.exercise}</p>
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
            <div className="grid grid-cols-6 gap-0">
              {/* Topic */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.topic}</p>
              </div>
              
              {/* Proficiency */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.proficiency}</p>
              </div>
              
              {/* Ensemble */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.ensemble}</p>
              </div>
              
              {/* Activity */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.activity}</p>
              </div>
              
              {/* Instruction */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words">{pathway.instruction}</p>
              </div>
              
              {/* Exercise */}
              <div className="p-4">
                <p className="text-sm text-card-foreground break-words">{pathway.exercise}</p>
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
