
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const glossaryTerms = [
    { term: "Canon", definition: "A musical form where a melody is repeated by successive voices, creating harmony through overlapping parts." },
    { term: "Chord", definition: "A group of three or more notes played simultaneously to create harmony." },
    { term: "Harmony", definition: "The combination of simultaneously sounded musical notes to produce chords and chord progressions." },
    { term: "Interval", definition: "The difference in pitch between two sounds, measured in semitones or steps." },
    { term: "Key Signature", definition: "A set of sharp or flat symbols placed after the clef to indicate the key of a piece." },
    { term: "Melody", definition: "A sequence of musical tones that forms the main tune of a piece of music." },
    { term: "Rhythm", definition: "The pattern of beats and timing in music, created by the duration of notes and rests." },
    { term: "Scale", definition: "A series of musical notes ordered by pitch, forming the foundation for melodies and harmonies." },
    { term: "Tempo", definition: "The speed at which a piece of music is played, usually measured in beats per minute." },
    { term: "Timbre", definition: "The character or quality of a musical sound that distinguishes it from other sounds of the same pitch and volume." }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">Music Glossary</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-sm text-foreground">Coming Soon</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlossaryModal;
