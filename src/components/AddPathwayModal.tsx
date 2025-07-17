
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
  instructor: string;
  proficiency: string;
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

const instructorOptions = [
  "with guidance from a music teacher",
  "under the supervision of a skilled instructor",
  "with assistance from a mentor",
  "led by an experienced musician",
  "facilitated by a professional educator"
];

const proficiencyOptions = [
  "suitable for beginners",
  "designed for intermediate students",
  "appropriate for advanced learners",
  "challenging for expert musicians",
  "adaptable for all skill levels"
];

const AddPathwayModal: React.FC<AddPathwayModalProps> = ({
  isOpen,
  onClose,
  onSave,
  category
}) => {
  const [formData, setFormData] = useState({
    topics: '',
    arrangements: '',
    exercises: '',
    actions: '',
    instructor: '',
    proficiency: ''
  });

  const handleSave = () => {
    // Check if all fields are selected
    if (!formData.topics || !formData.arrangements || !formData.exercises || !formData.actions || !formData.instructor || !formData.proficiency) {
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
      topics: '',
      arrangements: '',
      exercises: '',
      actions: '',
      instructor: '',
      proficiency: ''
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form to defaults
    setFormData({
      topics: '',
      arrangements: '',
      exercises: '',
      actions: '',
      instructor: '',
      proficiency: ''
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
            <Label htmlFor="topics" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              TOPICS
            </Label>
            <Select value={formData.topics} onValueChange={(value) => setFormData(prev => ({ ...prev, topics: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select one." />
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
                <SelectValue placeholder="Select one." />
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
                <SelectValue placeholder="Select one." />
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
                <SelectValue placeholder="Select one." />
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
          
          <div>
            <Label htmlFor="instructor" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              INSTRUCTOR
            </Label>
            <Select value={formData.instructor} onValueChange={(value) => setFormData(prev => ({ ...prev, instructor: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select one." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {instructorOptions.map((option, index) => (
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
