
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
  facultyNotes: string;
}

interface PathwayCardProps {
  pathway: PathwayData;
  onEdit: (pathway: PathwayData) => void;
  onCopy: (pathway: PathwayData) => void;
  onDelete: (id: string) => void;
  dragHandleProps?: any;
  category: string;
}

const PathwayCard: React.FC<PathwayCardProps> = ({ pathway, onEdit, onCopy, onDelete, dragHandleProps, category }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Function to filter exercise content based on selected proficiency levels
  const getFilteredExerciseContent = () => {
    if (!pathway.exercise) return "";
    
    const selectedProficiencies = pathway.proficiency.split(', ').filter(p => p);
    const exerciseLines = pathway.exercise.split('\n\n'); // Split by double newlines (exercise blocks)
    
    // If all proficiency levels are selected (Beginner, Intermediate, Advanced), show all content
    const allProficiencies = ["Beginner", "Intermediate", "Advanced"];
    if (selectedProficiencies.length === allProficiencies.length && 
        allProficiencies.every(prof => selectedProficiencies.includes(prof))) {
      return pathway.exercise;
    }
    
    // Filter content based on selected proficiency levels
    const filteredExercises = exerciseLines.filter(exercise => {
      return selectedProficiencies.some(proficiency => 
        exercise.trim().startsWith(`${proficiency}/`)
      );
    });
    
    return filteredExercises.join('\n\n');
  };

  const handleDeleteConfirm = () => {
    onDelete(pathway.id);
    setShowDeleteAlert(false);
  };

  const getCategoryBackgroundClass = () => {
    switch (category) {
      case 'rhythm':
        return 'bg-[hsl(var(--tab-rhythm-bg))]';
      case 'melody':
        return 'bg-[hsl(var(--tab-melody-bg))]';
      case 'harmony':
        return 'bg-[hsl(var(--tab-harmony-bg))]';
      default:
        return 'bg-card';
    }
  };

  return (
    <Card className={`border border-border ${getCategoryBackgroundClass()} shadow-sm hover:border-[hsl(var(--card-hover-border))] transition-colors duration-200`}>
      <CardContent className="p-0">
        {/* Mobile Layout - Grippy on Right spanning full height */}
        <div className="flex md:hidden">
          {/* Content and Actions */}
          <div className="flex-1 flex flex-col">
            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Topic */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed font-bold">{pathway.topic}</p>
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
                <p className="text-sm text-card-foreground break-words leading-relaxed whitespace-pre-line">
                  {getFilteredExerciseContent().split('\n').map((line, index) => {
                    const firstColonMatch = line.match(/^([^:]+:)\s*(.*)/);
                    if (firstColonMatch) {
                      return (
                        <span key={index}>
                          <span className="font-bold">{firstColonMatch[1]}</span>
                          {firstColonMatch[2] && <span> {firstColonMatch[2]}</span>}
                          {index < getFilteredExerciseContent().split('\n').length - 1 && <br />}
                        </span>
                      );
                    }
                    return (
                      <span key={index}>
                        {line}
                        {index < getFilteredExerciseContent().split('\n').length - 1 && <br />}
                      </span>
                    );
                  })}
                </p>
              </div>
              
              {/* Faculty Notes */}
              <div>
                <p className="text-sm text-card-foreground break-words leading-relaxed">{pathway.facultyNotes}</p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="px-4 py-3 border-t border-border flex flex-row justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(pathway)}
                className="text-foreground hover:text-foreground hover:bg-accent text-xs min-h-[36px] sm:min-h-auto"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(pathway)}
                className="text-foreground hover:text-foreground hover:bg-accent text-xs min-h-[36px] sm:min-h-auto"
              >
                Copy
              </Button>
              
              <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-foreground hover:bg-accent text-xs min-h-[36px] sm:min-h-auto"
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
            <div style={{ display: 'grid', gridTemplateColumns: '10% 10% 10% 10% 10% 25% 25%', gap: 0 }}>
              {/* Topic */}
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words font-bold">{pathway.topic}</p>
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
              <div className="p-4 border-r border-border">
                <p className="text-sm text-card-foreground break-words whitespace-pre-line">
                  {getFilteredExerciseContent().split('\n').map((line, index) => {
                    const firstColonMatch = line.match(/^([^:]+:)\s*(.*)/);
                    if (firstColonMatch) {
                      return (
                        <span key={index}>
                          <span className="font-bold">{firstColonMatch[1]}</span>
                          {firstColonMatch[2] && <span> {firstColonMatch[2]}</span>}
                          {index < getFilteredExerciseContent().split('\n').length - 1 && <br />}
                        </span>
                      );
                    }
                    return (
                      <span key={index}>
                        {line}
                        {index < getFilteredExerciseContent().split('\n').length - 1 && <br />}
                      </span>
                    );
                  })}
                </p>
              </div>
              
              {/* Faculty Notes */}
              <div className="p-4">
                <p className="text-sm text-card-foreground break-words">{pathway.facultyNotes}</p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="px-4 py-3 border-t border-border flex flex-row justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(pathway)}
                className="text-foreground hover:text-foreground hover:bg-accent text-xs min-h-[36px] sm:min-h-auto"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(pathway)}
                className="text-foreground hover:text-foreground hover:bg-accent text-xs min-h-[36px] sm:min-h-auto"
              >
                Copy
              </Button>
              
              <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-foreground hover:bg-accent text-xs min-h-[36px] sm:min-h-auto"
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
