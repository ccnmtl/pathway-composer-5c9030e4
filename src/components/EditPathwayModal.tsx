
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PathwayData {
  id: string;
  topic: string;
  proficiency: string;
  ensemble: string;
  activity: string;
  instruction: string;
  exercise: string;
}

interface EditPathwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  pathway: PathwayData | null;
  onSave: (pathway: PathwayData) => void;
  category: string;
  existingPathways: PathwayData[];
}

const topicOptions = [
  "Beat",
  "Meter",
  "Syncopation"
];

const proficiencyOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Beginner + Intermediate",
  "Beginner + Advanced",
  "Intermediate + Advanced"
];

const ensembleOptions = [
  "Solo",
  "Duet",
  "Trio",
  "Quartet"
];

const activityOptions = [
  "Compose",
  "Improvise",
  "Move",
  "Notate",
  "Play",
  "Read",
  "Sing"
];

const instructionOptions = [
  "Student-Led",
  "Instructor-Led"
];

const exerciseOptions = [
  "Changing",
  "Dictation",
  "Matching",
  "Plastique Animée"
];

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
    exercise: ''
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
        exercise: pathway.exercise
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
                {topicOptions.map((option, index) => (
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
            <Select value={formData.proficiency} onValueChange={(value) => setFormData(prev => ({ ...prev, proficiency: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select proficiency level..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {proficiencyOptions.map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="ensemble" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              ENSEMBLE
            </Label>
            <Select value={formData.ensemble} onValueChange={(value) => setFormData(prev => ({ ...prev, ensemble: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select an ensemble style..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {ensembleOptions.map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="activity" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              ACTIVITY
            </Label>
            <Select value={formData.activity} onValueChange={(value) => setFormData(prev => ({ ...prev, activity: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select an activity..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {activityOptions.map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="instruction" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              INSTRUCTION
            </Label>
            <Select value={formData.instruction} onValueChange={(value) => setFormData(prev => ({ ...prev, instruction: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select instruction type..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {instructionOptions.map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="exercise" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              EXERCISE
            </Label>
            <Select value={formData.exercise} onValueChange={(value) => setFormData(prev => ({ ...prev, exercise: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select an exercise type..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {exerciseOptions.map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
