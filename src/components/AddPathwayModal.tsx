
import React, { useState } from 'react';
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

interface AddPathwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pathway: PathwayData) => void;
  category: string;
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
  "singing and playing with...",
  "instrumental ensemble arrangements featuring...",
  "vocal harmony arrangements using...",
  "solo performance arrangements with...",
  "call and response patterns involving..."
];

const activityOptions = [
  "sing a scale in canon while playing one part on an instrument.",
  "perform a rhythmic pattern while maintaining steady tempo and dynamics.",
  "demonstrate proper technique through guided practice and peer feedback.",
  "create original musical phrases using learned concepts and structures.",
  "collaborate in ensemble performance showcasing individual and group skills."
];

const instructionOptions = [
  "with guidance from a music teacher",
  "under the supervision of a skilled instructor",
  "with assistance from a mentor",
  "led by an experienced musician",
  "facilitated by a professional educator"
];

const exerciseOptions = [
  "a beginner exercise. We will sing a scale in canon while playing one part on an instrument. Let's...",
  "an intermediate drill focusing on timing and pitch accuracy through...",
  "a group exercise emphasizing listening skills and ensemble playing via...",
  "a technical study combining theory and practical application using...",
  "a creative exploration encouraging improvisation and musical expression through..."
];

const AddPathwayModal: React.FC<AddPathwayModalProps> = ({
  isOpen,
  onClose,
  onSave,
  category
}) => {
  const [formData, setFormData] = useState({
    topic: '',
    proficiency: '',
    ensemble: '',
    activity: '',
    instruction: '',
    exercise: ''
  });

  const handleSave = () => {
    // Check if all fields are selected
    if (!formData.topic || !formData.proficiency || !formData.ensemble || !formData.activity || !formData.instruction || !formData.exercise) {
      return; // Don't save if any field is empty
    }

    const newPathway: PathwayData = {
      id: Date.now().toString(),
      ...formData
    };
    onSave(newPathway);
    onClose();
    // Reset form to defaults
    setFormData({
      topic: '',
      proficiency: '',
      ensemble: '',
      activity: '',
      instruction: '',
      exercise: ''
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form to defaults
    setFormData({
      topic: '',
      proficiency: '',
      ensemble: '',
      activity: '',
      instruction: '',
      exercise: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Rhythm / Add New Pathway
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="topic" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              TOPIC
            </Label>
            <Select value={formData.topic} onValueChange={(value) => setFormData(prev => ({ ...prev, topic: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select one." />
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
                <SelectValue placeholder="Select one." />
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
                <SelectValue placeholder="Select one." />
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
                <SelectValue placeholder="Select one." />
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
                <SelectValue placeholder="Select one." />
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
                <SelectValue placeholder="Select one." />
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
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPathwayModal;
