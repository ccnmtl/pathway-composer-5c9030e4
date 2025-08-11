
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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

interface EditPathwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  pathway: PathwayData | null;
  onSave: (pathway: PathwayData) => void;
  category: string;
  existingPathways: PathwayData[];
}

const getTopicOptions = (category: string) => {
  switch (category) {
    case "Rhythm":
      return ["Beat", "Meter", "Syncopation"];
    case "Melody":
      return ["Scales", "Intervals", "Chromaticism"];
    case "Harmony":
      return ["Consonance and Disonance", "Chord Positions", "Enharmony"];
    default:
      return [];
  }
};

const getProficiencyOptions = (category: string) => {
  switch (category) {
    case "Rhythm":
      return ["Beginner", "Intermediate", "Advanced", "Beginner + Intermediate", "Beginner + Advanced", "Intermediate + Advanced"];
    case "Melody":
    case "Harmony":
      return ["Beginner", "Intermediate", "Advanced"];
    default:
      return [];
  }
};

const getEnsembleOptions = (category: string) => {
  switch (category) {
    case "Rhythm":
    case "Melody":
      return ["Solo", "Duet", "Trio", "Quartet"];
    case "Harmony":
      return ["Solo", "Duo"];
    default:
      return [];
  }
};

const getActivityOptions = (category: string) => {
  switch (category) {
    case "Rhythm":
      return ["Compose", "Improvise", "Move", "Notate", "Play", "Read", "Sing"];
    case "Melody":
      return ["Sing", "Play", "Movement"];
    case "Harmony":
      return ["Sing", "Play"];
    default:
      return [];
  }
};

const instructionOptions = [
  "Student-Led",
  "Instructor-Led"
];

const getExerciseOptions = (category: string) => {
  switch (category) {
    case "Rhythm":
      return ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Donec at dignissim ligula. Ut placerat nulla vel tortor rutrum eleifend.", "Sed lacus odio, porta a mi ut, vehicula ornare arcu."];
    case "Melody":
      return ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Donec at dignissim ligula. Ut placerat nulla vel tortor rutrum eleifend.", "Sed lacus odio, porta a mi ut, vehicula ornare arcu."];
    case "Harmony":
      return ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Donec at dignissim ligula. Ut placerat nulla vel tortor rutrum eleifend.", "Sed lacus odio, porta a mi ut, vehicula ornare arcu."];
    default:
      return [];
  }
};

const EditPathwayModal: React.FC<EditPathwayModalProps> = ({
  isOpen,
  onClose,
  pathway,
  onSave,
  category,
  existingPathways
}) => {
  const [formData, setFormData] = useState({
    topic: '',
    proficiency: '',
    ensemble: '',
    activity: '',
    instruction: '',
    exercise: '',
    facultyNotes: ''
  });

  const [showError, setShowError] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);

  useEffect(() => {
    if (pathway) {
      setFormData({
        topic: pathway.topic,
        proficiency: pathway.proficiency,
        ensemble: pathway.ensemble,
        activity: pathway.activity,
        instruction: pathway.instruction,
        exercise: pathway.exercise,
        facultyNotes: pathway.facultyNotes || ''
      });
    }
  }, [pathway]);

  const handleSave = () => {
    // Check if all fields are selected
    if (!formData.topic || !formData.proficiency || !formData.ensemble || !formData.activity || !formData.instruction || !formData.exercise) {
      setShowError(true);
      setShowDuplicateError(false);
      return; // Don't save if any field is empty
    }

    // Check for duplicates (excluding the current pathway being edited)
    const isDuplicate = existingPathways.some(existingPathway => 
      existingPathway.id !== pathway?.id &&
      existingPathway.topic === formData.topic &&
      existingPathway.proficiency === formData.proficiency &&
      existingPathway.ensemble === formData.ensemble &&
      existingPathway.activity === formData.activity &&
      existingPathway.instruction === formData.instruction &&
      existingPathway.exercise === formData.exercise
    );

    if (isDuplicate) {
      setShowDuplicateError(true);
      setShowError(false);
      return;
    }

    if (pathway) {
      onSave({
        ...pathway,
        ...formData
      });
    }
    onClose();
    setShowError(false);
    setShowDuplicateError(false);
  };

  const handleCancel = () => {
    setShowError(false);
    setShowDuplicateError(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            {category} / Edit Pathway
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="topic" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              TOPIC
            </Label>
            <Select value={formData.topic} onValueChange={(value) => setFormData(prev => ({ ...prev, topic: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select a topic approach..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {getTopicOptions(category).map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="proficiency" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              PROFICIENCY
            </Label>
            <div className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
              Beginner, Intermediate, Advanced
            </div>
          </div>
          
          <div>
            <Label htmlFor="ensemble" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              ENSEMBLE
            </Label>
            <div className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
              Solo, Duet, Trio, Quartet
            </div>
          </div>
          
          <div>
            <Label htmlFor="activity" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              ACTIVITY
            </Label>
            <div className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
              Compose, Improvise, Move, Notate, Play, Read, Sing
            </div>
          </div>
          
          <div>
            <Label htmlFor="instruction" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              INSTRUCTION
            </Label>
            <div className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
              Instructor-led, Student Led
            </div>
          </div>
          
          <div>
            <Label htmlFor="exercise" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              EXERCISE
            </Label>
            <div className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
              Beginner/Solo: Teacher performs a beat. Student performs the same beat.<br />
              Intermediate/Duo: Duo: One student performs same beat. Another student divides it into (2, 3, 4)<br />
              Advanced/Trio: Student performs a beat. One student performs the beat, another performs the division, another finds the 'subdivision.' Change order of performances.
            </div>
          </div>
          
          <div>
            <Label htmlFor="facultyNotes" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              EXERCISE NOTES
            </Label>
            <Textarea
              id="facultyNotes"
              value={formData.facultyNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, facultyNotes: e.target.value }))}
              placeholder="Enter exercise notes..."
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>
        </div>
        
        {showError && (
          <div className="text-red-500 text-sm mt-4">
            Make sure all options have been selected.
          </div>
        )}
        
        {showDuplicateError && (
          <div className="text-red-500 text-sm mt-4">
            This pathway already exists. Please select different options.
          </div>
        )}
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-6 bg-blue-600 hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPathwayModal;
