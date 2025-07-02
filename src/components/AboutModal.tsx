
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
          <DialogTitle className="text-xl font-bold text-foreground">About Pathway Composer</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-foreground leading-relaxed">
            Pathway Composer is a comprehensive music education tool designed to help educators create structured learning experiences across three fundamental musical domains: Harmony, Melody, and Rhythm. This innovative platform enables music teachers to design, organize, and manage personalized learning pathways that guide students through progressive musical concepts and practical exercises.
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            Each pathway consists of four interconnected components: Topics (theoretical concepts), Arrangements (musical settings), Exercises (practice activities), and Actions (performance tasks). Teachers can easily create, edit, copy, and organize these pathways to match their curriculum needs and student skill levels. The intuitive interface supports both light and dark modes, making it accessible for extended use in various teaching environments.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
