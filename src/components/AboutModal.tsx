
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">About Guide Composer</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-foreground">Coming Soon</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
