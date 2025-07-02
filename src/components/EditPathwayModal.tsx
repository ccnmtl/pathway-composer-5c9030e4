
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PathwayData {
  id: string;
  topics: string;
  arrangements: string;
  exercises: string;
  actions: string;
}

interface EditPathwayModalProps {
  isOpen: boolean;
  onClose: () => void;
  pathway: PathwayData | null;
  onSave: (pathway: PathwayData) => void;
  category: string;
}

const EditPathwayModal: React.FC<EditPathwayModalProps> = ({
  isOpen,
  onClose,
  pathway,
  onSave,
  category
}) => {
  const [formData, setFormData] = useState({
    topics: '',
    arrangements: '',
    exercises: '',
    actions: ''
  });

  useEffect(() => {
    if (pathway) {
      setFormData({
        topics: pathway.topics,
        arrangements: pathway.arrangements,
        exercises: pathway.exercises,
        actions: pathway.actions
      });
    }
  }, [pathway]);

  const handleSave = () => {
    if (pathway) {
      onSave({
        ...pathway,
        ...formData
      });
    }
    onClose();
  };

  const handleCancel = () => {
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
            <Label htmlFor="topics" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              TOPICS
            </Label>
            <Textarea
              id="topics"
              value={formData.topics}
              onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.value }))}
              className="min-h-[80px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              placeholder="Let's explore scales by..."
            />
          </div>
          
          <div>
            <Label htmlFor="arrangements" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              ARRANGEMENTS
            </Label>
            <Textarea
              id="arrangements"
              value={formData.arrangements}
              onChange={(e) => setFormData(prev => ({ ...prev, arrangements: e.target.value }))}
              className="min-h-[80px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              placeholder="singing and playing with..."
            />
          </div>
          
          <div>
            <Label htmlFor="exercises" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              EXERCISES
            </Label>
            <Textarea
              id="exercises"
              value={formData.exercises}
              onChange={(e) => setFormData(prev => ({ ...prev, exercises: e.target.value }))}
              className="min-h-[80px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              placeholder="a beginner exercise. We will sing a..."
            />
          </div>
          
          <div>
            <Label htmlFor="actions" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              ACTIONS
            </Label>
            <Textarea
              id="actions"
              value={formData.actions}
              onChange={(e) => setFormData(prev => ({ ...prev, actions: e.target.value }))}
              className="min-h-[80px] resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              placeholder="sing a scale in canon while playing one part on an instrument."
            />
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
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPathwayModal;
