
import React, { useState } from 'react';
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

interface AddPathwayModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const getExerciseContent = (category: string, topic: string) => {
  if (!topic) {
    return "Select a topic first.";
  }

  switch (category) {
    case "Rhythm":
      switch (topic) {
        case "Beat":
          return [
            "Beginner/Solo: Teacher performs a beat. Student performs the same beat.",
            "Intermediate/Duo: One student performs same beat. Another student divides it into (2, 3, 4).",
            "Advanced/Trio: Student performs a beat. One student performs the beat, another performs the division, another finds the \"subdivision.\" Change order of performances."
          ];
        case "Meter":
          return [
            "Beginner/Solo: Teacher performs beats in a time signature. One student performs the meter of those beats.",
            "Intermediate/Duo: Teacher performs beats in a time signature. One student performs the meter of one measure, another student performs two measures of meter.",
            "Advanced/Trio: Student performs beats in a time signature, another performs the meter, another performs the division of the beat",
            "Advanced/Quartet: Student performs subdivision of a beat in a time signature. One student finds the meter, another student finds the beat, another student finds the division of the beat. Change order of performances."
          ];
        case "Syncopation":
          return [
            "Beginner/Solo: Teacher performs a syncopated pattern with a beat. One student performs the beat then the syncopated pattern.",
            "Intermediate/Duo: One student performs a beat. Another student performs a syncopated pattern. Reverse the students. Out of tempo at first. Then in tempo. Then switching every four measures, then every two measures.",
            "Advanced/Trio: One student performs a syncopated pattern. Another student performs the beat. Another student performs the meter."
          ];
        default:
          return "Select a topic first.";
      }
    case "Melody":
      switch (topic) {
        case "Scales":
          return [
            "Beginner/Solo: One student plays a scale in canon at the piano.",
            "Intermediate/Duo: One student plays a scale in canon, another student sings the same scale in canon.",
            "Advanced/Trio: One student plays a canon at the piano, two other students sing the same scale in canon.",
            "Advanced/Quartet: One student plays a major and minor scale in canon. Could be done in two or three parts."
          ];
        case "Intervals":
          return [
            "Beginner/Solo: Student 1 plays an interval. Then sings it back.",
            "Beginner/Duo: Student 1 plays an interval and Student 2 sings it back.",
            "Intermediate/Trio: Student 1 plays an interval, Student 2 sings it back on \"lu\"and Student 3 writes it down on manuscript paper.",
            "Advanced/Quartet: Student 1 plays an interval, a Student 2 sings it back on \"lu,\" Student 3 writes it down on manuscript paper, Student 4 writes it down transposed by a specific interval in bass, alto, tenor, soprano clef.",
            "Advanced/Quartet: Student 1 plays an interval, Student 2 sings it back on \"lu,\" Student 3 writes it down on manuscript paper, Student 4 writes it down transposed by a specific interval in alto, tenor, soprano clef, and student 5 writes the interval down for a transposing instrument= key of F, Bb, Eb or A."
          ];
        case "Chromaticism":
          return [
            "Beginner/Solo: Teacher or student plays 2/3/4-note step-wise Melody: One student repeats that melody and changes one of the notes to an accidental – flat, sharp, or natural.",
            "Intermediate/Duo: Two students sing a unison. One student holds the unison, the other student sings a 2/3/4 note step-wise melody above or below the unison held by the other student then changes one of the notes to a flat, sharp, or natural. Repeat switching parts.",
            "Advanced/Trio: Two students sing a unison. Both students alter their note by a half step in contrary motion creating a simultaneous upper and lower neighbor tone. A third student identifies the interval. Gradually expand the use of intervals. Expand the use of intervals which are altered chromatically.",
            "Advanced/Quartet: Teacher plays a two, three, or four – note melody. Teacher asks an advanced student to chromatically alter one of the notes Another student notates what is being played/sung Another student notates a transposiQon of the altered melody by a specific chromaQc interval: Tritone, Augmented fifth, minor seventh, for example and/or a transposing instrument."
          ];
        default:
          return "Select a topic first.";
      }
    case "Harmony":
      switch (topic) {
        case "Consonance and Disonance":
          return [
            "Beginner/Solo: Teacher plays two notes, consonant or a dissonant interval. Teacher asks one student to sing either the upper or the lower note of the pair.",
            "Intermediate/Duo: Teacher plays a two-note interval, consonant or dissonant and asks two students to sing either the upper or lower note together. Then they switch.",
            "Advanced/Trio: Teacher plays a three-note harmony and asks three students to sing one of the three notes one at a time asking them to idenQfy which are the consonant and which are the dissonant intervals.",
            "Advanced/Quartet: Teacher plays two, three, or four chord combinations and asks four students to perform them back singing and/or playing an instrument. Other students in the class notate what is being played, other students identify the tonality of the harmonies played."
          ];
        case "Chord Positions":
          return [
            "Beginner/Solo: Teacher plays two chords: one in root position the other not in root position. One student identifies which is which including the chord quality.",
            "Intermediate/Duo: Two students sing an arpeggio in canon. Change chord qualities: major, minor, diminished, augmented.",
            "Advanced/Trio: One student sings a root position triad. Another student sings its first inversion. Another student sings it second inversion.",
            "Advanced/Quartet: One student sings an inverted seventh chord. Each of the other three students sings that same seventh chord in the remaining positions."
          ];
        case "Enharmony":
          return [
            "Beginner/Solo: Teacher sings or plays a note. Student changes the name. Example: Bb becomes A#  - creating a new leading tone Student sings up a half-step. Example: Student sings A# and moves half-step up to B natural.",
            "Intermediate/Duo: One student sings two whole-step notes. Example: Eb F The other student changes the note names. Example: D# E#.",
            "Advanced/Trio: Same as b. but the third student sings a new scale built around the enharmonic respelling of the whole step which can be interpreted into more than one scale. Example: Eb F = scale degree 1 and 2 in Eb Major D# E# = scale degrees 6 and 7 in F# major.",
            "Advanced/Quartet: Teacher plays two chord combinations that can be spelled two different ways. Using a diminished seventh chord is a good option. Four students sing one note at a time building up from the bottom -First chord one, then chord two. Other students in the class identify the two versions of the combination. Other students notate what is being performed."
          ];
        default:
          return "Select a topic first.";
      }
    default:
      return "Select a topic first.";
  }
};

const AddPathwayModal: React.FC<AddPathwayModalProps> = ({
  isOpen,
  onClose,
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

  const handleSave = () => {
    // Check if topic is selected
    if (!formData.topic) {
      setShowError(true);
      setShowDuplicateError(false);
      return; // Don't save if topic is not selected
    }

    // Check for duplicates (only based on topic since other fields are display-only)
    const isDuplicate = existingPathways.some(pathway => 
      pathway.topic === formData.topic
    );

    if (isDuplicate) {
      setShowDuplicateError(true);
      setShowError(false);
      return;
    }

    const exerciseContent = getExerciseContent(category, formData.topic);
    const exerciseText = typeof exerciseContent === 'string' ? exerciseContent : exerciseContent.join('\n\n');
    
    const newPathway: PathwayData = {
      id: Date.now().toString(),
      topic: formData.topic,
      proficiency: getProficiencyOptions(category).join(', '),
      ensemble: getEnsembleOptions(category).join(', '),
      activity: getActivityOptions(category).join(', '),
      instruction: instructionOptions.join(', '),
      exercise: exerciseText,
      facultyNotes: formData.facultyNotes
    };
    onSave(newPathway);
    onClose();
    setShowError(false);
    setShowDuplicateError(false);
    // Reset form to defaults
    setFormData({
      topic: '',
      proficiency: '',
      ensemble: '',
      activity: '',
      instruction: '',
      exercise: '',
      facultyNotes: ''
    });
  };

  const handleCancel = () => {
    onClose();
    setShowError(false);
    setShowDuplicateError(false);
    // Reset form to defaults
    setFormData({
      topic: '',
      proficiency: '',
      ensemble: '',
      activity: '',
      instruction: '',
      exercise: '',
      facultyNotes: ''
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
            <Label htmlFor="topic" className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              TOPIC
            </Label>
            <Select value={formData.topic} onValueChange={(value) => setFormData(prev => ({ ...prev, topic: value }))}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select one." />
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
              {(() => {
                const content = getExerciseContent(category, formData.topic);
                if (typeof content === 'string') {
                  return <div>{content}</div>;
                }
                return (
                  <ul className="list-disc list-outside space-y-1 ml-4">
                    {content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                );
              })()}
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
            Please select a topic.
          </div>
        )}
        
        {showDuplicateError && (
          <div className="text-red-500 text-sm mt-4">
            A pathway with this topic already exists. Please select a different topic.
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
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPathwayModal;
