
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PathwayData {
  id: string;
  topics: string;
  arrangements: string;
  exercises: string;
  actions: string;
}

interface AddPathwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pathway: PathwayData) => void;
  category: string;
}

const topicsOptions = [
  "Let's explore scales by...",
  "Understanding chord progressions through...",
  "Discovering rhythmic patterns with...",
  "Learning melodic intervals by...",
  "Exploring harmonic structures via..."
];

const arrangementsOptions = [
  "singing and playing with...",
  "instrumental ensemble arrangements featuring...",
  "vocal harmony arrangements using...",
  "solo performance arrangements with...",
  "call and response patterns involving..."
];

const exercisesOptions = [
  "a beginner exercise. We will sing a scale in canon while playing one part on an instrument. Let's...",
  "an intermediate drill focusing on timing and pitch accuracy through...",
  "a group exercise emphasizing listening skills and ensemble playing via...",
  "a technical study combining theory and practical application using...",
  "a creative exploration encouraging improvisation and musical expression through..."
];

const actionsOptions = [
  "sing a scale in canon while playing one part on an instrument.",
  "perform a rhythmic pattern while maintaining steady tempo and dynamics.",
  "demonstrate proper technique through guided practice and peer feedback.",
  "create original musical phrases using learned concepts and structures.",
  "collaborate in ensemble performance showcasing individual and group skills."
];

const AddPathwayModal: React.FC<AddPathwayModalProps> = ({
  isOpen,
  onClose,
  onSave,
  category
}) => {
  const [formData, setFormData] = useState({
    topics: topicsOptions[0],
    arrangements: arrangementsOptions[0],
    exercises: exercisesOptions[0],
    actions: actionsOptions[0]
  });

  const handleSave = () => {
    const newPathway: PathwayData = {
      id: Date.now().toString(),
      ...formData
    };
    onSave(newPathway);
    onClose();
    // Reset form to defaults
    setFormData({
      topics: topicsOptions[0],
      arrangements: arrangementsOptions[0],
      exercises: exercisesOptions[0],
      actions: actionsOptions[0]
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form to defaults
    setFormData({
      topics: topicsOptions[0],
      arrangements: arrangementsOptions[0],
      exercises: exercisesOptions[0],
      actions: actionsOptions[0]
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            {category} / Add New Pathway
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="topics" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              TOPICS
            </Label>
            <Select value={formData.topics} onValueChange={(value) => setFormData(prev => ({ ...prev, topics: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select a topic approach..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {topicsOptions.map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="arrangements" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              ARRANGEMENTS
            </Label>
            <Select value={formData.arrangements} onValueChange={(value) => setFormData(prev => ({ ...prev, arrangements: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select an arrangement style..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {arrangementsOptions.map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="exercises" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              EXERCISES
            </Label>
            <Select value={formData.exercises} onValueChange={(value) => setFormData(prev => ({ ...prev, exercises: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select an exercise type..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {exercisesOptions.map((option, index) => (
                  <SelectItem key={index} value={option} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="actions" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              ACTIONS
            </Label>
            <Select value={formData.actions} onValueChange={(value) => setFormData(prev => ({ ...prev, actions: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select an action..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {actionsOptions.map((option, index) => (
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
            Add Pathway
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPathwayModal;
