
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

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
      return ["Beginner", "Intermediate", "Advanced"];
   case "Melody":
      return ["Beginner", "Intermediate", "Advanced"];
    case "Harmony":
      return ["Beginner", "Intermediate", "Advanced"];
    default:
      return [];
  }
};

const getEnsembleOptions = (category: string) => {
  switch (category) {
    case "Rhythm":
      return ["Solo", "Duet", "Trio", "Quartet"];
    case "Melody":
      return ["Solo", "Duet", "Trio", "Quartet"];
    case "Harmony":
      return ["Solo", "Duet", "Trio", "Quartet"];
    default:
      return [];
  }
};

const getActivityOptions = (category: string) => {
  switch (category) {
    case "Rhythm":
      return ["Compose", "Improvise", "Move", "Notate", "Play", "Read", "Sing"];
    case "Melody":
      return ["Compose", "Improvise", "Move", "Notate", "Play", "Read", "Sing"];
    case "Harmony":
      return ["Compose", "Improvise", "Move", "Notate", "Play", "Read", "Sing"];
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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [contentByTopic, setContentByTopic] = useState<Record<string, {
    proficiency: string;
    ensemble: string;
    activity: string;
    instruction: string;
    exercise: string;
    facultyNotes: string;
  }>>({});

  // Pre-populate fields when category changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      proficiency: getProficiencyOptions(category).join(', '),
      ensemble: getEnsembleOptions(category).join(', '),
      activity: getActivityOptions(category).join(', '),
      instruction: instructionOptions.join(', ')
    }));
  }, [category]);

  // Handle topic change with content saving
  // Function to filter exercise content based on selected proficiency levels
  const getFilteredExerciseContent = () => {
    if (!formData.topic) return "Select a topic first.";
    
    const exerciseContent = getExerciseContent(category, formData.topic);
    if (typeof exerciseContent === 'string') return exerciseContent;
    
    const selectedProficiencies = formData.proficiency.split(', ').filter(p => p);
    
    // If all proficiency levels are selected, show all content
    const allProficiencies = getProficiencyOptions(category);
    if (selectedProficiencies.length === allProficiencies.length) {
      return exerciseContent.join('\n\n');
    }
    
    // Filter content based on selected proficiency levels
    const filteredContent = exerciseContent.filter(exercise => {
      return selectedProficiencies.some(proficiency => 
        exercise.startsWith(`${proficiency}/`)
      );
    });
    
    return filteredContent.join('\n\n');
  };

  const handleTopicChange = (newTopic: string) => {
    // Save current content for the previous topic
    if (formData.topic) {
      setContentByTopic(prev => ({
        ...prev,
        [formData.topic]: {
          proficiency: formData.proficiency,
          ensemble: formData.ensemble,
          activity: formData.activity,
          instruction: formData.instruction,
          exercise: formData.exercise,
          facultyNotes: formData.facultyNotes
        }
      }));
    }

    // Update form data with new topic
    setFormData(prev => ({ ...prev, topic: newTopic }));

    // Load saved content for new topic or default content
    const savedContent = contentByTopic[newTopic];
    if (savedContent) {
      setFormData(prev => ({ 
        ...prev, 
        proficiency: savedContent.proficiency,
        ensemble: savedContent.ensemble,
        activity: savedContent.activity,
        instruction: savedContent.instruction,
        exercise: savedContent.exercise,
        facultyNotes: savedContent.facultyNotes
      }));
    } else {
      const exerciseContent = getExerciseContent(category, newTopic);
      const exerciseText = typeof exerciseContent === 'string' ? exerciseContent : exerciseContent.join('\n\n');
      setFormData(prev => ({ 
        ...prev, 
        proficiency: getProficiencyOptions(category).join(', '),
        ensemble: getEnsembleOptions(category).join(', '),
        activity: getActivityOptions(category).join(', '),
        instruction: instructionOptions.join(', '),
        exercise: exerciseText,
        facultyNotes: ''
      }));
    }
  };

  const handleSave = () => {
    // Check if topic is selected
    if (!formData.topic) {
      setShowError(true);
      setShowDuplicateError(false);
      setValidationErrors([]);
      return; // Don't save if topic is not selected
    }

    // Validate at least one checkbox is selected from each section
    const errors: string[] = [];
    
    const proficiencySelected = formData.proficiency.split(', ').filter(o => o.trim() !== '').length > 0;
    const ensembleSelected = formData.ensemble.split(', ').filter(o => o.trim() !== '').length > 0;
    const activitySelected = formData.activity.split(', ').filter(o => o.trim() !== '').length > 0;
    const instructionSelected = formData.instruction.split(', ').filter(o => o.trim() !== '').length > 0;

    if (!proficiencySelected) {
      errors.push("At least one checkbox from the PROFICIENCY section must be selected.");
    }
    if (!ensembleSelected) {
      errors.push("At least one checkbox from the ENSEMBLE section must be selected.");
    }
    if (!activitySelected) {
      errors.push("At least one checkbox from the ACTIVITY section must be selected.");
    }
    if (!instructionSelected) {
      errors.push("At least one checkbox from the INSTRUCTION section must be selected.");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowError(false);
      setShowDuplicateError(false);
      return;
    }

    // Check for duplicates (only based on topic since other fields are display-only)
    const isDuplicate = existingPathways.some(pathway => 
      pathway.topic === formData.topic
    );

    if (isDuplicate) {
      setShowDuplicateError(true);
      setShowError(false);
      setValidationErrors([]);
      return;
    }

    const newPathway: PathwayData = {
      id: Date.now().toString(),
      topic: formData.topic,
      proficiency: formData.proficiency,
      ensemble: formData.ensemble,
      activity: formData.activity,
      instruction: formData.instruction,
      exercise: getFilteredExerciseContent(), // Save the filtered content
      facultyNotes: formData.facultyNotes
    };
    onSave(newPathway);
    onClose();
    setShowError(false);
    setShowDuplicateError(false);
    setValidationErrors([]);
    // Reset form to defaults with pre-populated content
    setFormData({
      topic: '',
      proficiency: getProficiencyOptions(category).join(', '),
      ensemble: getEnsembleOptions(category).join(', '),
      activity: getActivityOptions(category).join(', '),
      instruction: instructionOptions.join(', '),
      exercise: '',
      facultyNotes: ''
    });
  };

  const handleCancel = () => {
    onClose();
    setShowError(false);
    setShowDuplicateError(false);
    setValidationErrors([]);
    // Reset form to defaults with pre-populated content
    setFormData({
      topic: '',
      proficiency: getProficiencyOptions(category).join(', '),
      ensemble: getEnsembleOptions(category).join(', '),
      activity: getActivityOptions(category).join(', '),
      instruction: instructionOptions.join(', '),
      exercise: '',
      facultyNotes: ''
    });
  };

  const getModalBgClass = (category: string) => {
    switch (category) {
      case "Rhythm":
        return "bg-[hsl(var(--modal-rhythm-bg))]";
      case "Melody":
        return "bg-[hsl(var(--modal-melody-bg))]";
      case "Harmony":
        return "bg-[hsl(var(--modal-harmony-bg))]";
      default:
        return "bg-background";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[96vh] overflow-y-auto ${getModalBgClass(category)}`}>
         <DialogHeader>
           <DialogTitle className="text-lg font-medium text-white">
             {category} / Add New Pathway
           </DialogTitle>
         </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
             <Label htmlFor="topic" className="text-xs font-medium text-white uppercase tracking-wider mb-2 block">
               TOPIC
             </Label>
            <Select value={formData.topic} onValueChange={handleTopicChange}>
              <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-[hsl(var(--modal-input-bg))] text-[hsl(var(--modal-input-text))]">
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
              <Label className="text-xs font-medium text-white uppercase tracking-wider mb-2 block">
                PROFICIENCY
              </Label>
              <div className="flex flex-wrap gap-2">
                 {getProficiencyOptions(category).map((option) => {
                   const isChecked = formData.proficiency.split(', ').includes(option);
                   return (
                     <div key={option} className={`px-2 py-1 rounded text-sm flex items-center gap-2 ${isChecked ? 'bg-transparent border border-black text-black' : 'border border-white text-white'}`} style={!isChecked ? { backgroundColor: '#333333' } : {}}>
                        <Checkbox
                          id={`proficiency-${option}`}
                          checked={isChecked}
                          disabled={!formData.topic}
                          onCheckedChange={(checked) => {
                            const currentOptions = formData.proficiency.split(', ').filter(o => o);
                            if (checked) {
                             const newOptions = [...currentOptions, option];
                             const newFormData = { ...formData, proficiency: newOptions.join(', ') };
                             setFormData(newFormData);
                             // Update exercise content based on new proficiency selection
                             if (newFormData.topic) {
                               const filteredExercise = getFilteredExerciseContent();
                               setFormData(prev => ({ ...prev, exercise: filteredExercise }));
                             }
                           } else {
                             const newOptions = currentOptions.filter(o => o !== option);
                             const newFormData = { ...formData, proficiency: newOptions.join(', ') };
                             setFormData(newFormData);
                             // Update exercise content based on new proficiency selection
                             if (newFormData.topic) {
                               const filteredExercise = getFilteredExerciseContent();
                               setFormData(prev => ({ ...prev, exercise: filteredExercise }));
                             }
                           }
                          }}
                          className="data-[state=checked]:bg-transparent data-[state=checked]:border-black data-[state=checked]:text-black border-white text-white"
                          style={!isChecked ? { backgroundColor: '#333333' } : {}}
                       />
                       {option}
                     </div>
                   );
                 })}
              </div>
          </div>
          
          <div>
              <Label className="text-xs font-medium text-white uppercase tracking-wider mb-2 block">
                ENSEMBLE
              </Label>
              <div className="flex flex-wrap gap-2">
                 {getEnsembleOptions(category).map((option) => {
                   const isChecked = formData.ensemble.split(', ').includes(option);
                   return (
                     <div key={option} className={`px-2 py-1 rounded text-sm flex items-center gap-2 ${isChecked ? 'bg-transparent border border-black text-black' : 'border border-white text-white'}`} style={!isChecked ? { backgroundColor: '#333333' } : {}}>
                        <Checkbox
                          id={`ensemble-${option}`}
                          checked={isChecked}
                          disabled={!formData.topic}
                          onCheckedChange={(checked) => {
                            const currentOptions = formData.ensemble.split(', ').filter(o => o);
                            if (checked) {
                              const newOptions = [...currentOptions, option];
                              setFormData(prev => ({ ...prev, ensemble: newOptions.join(', ') }));
                            } else {
                              const newOptions = currentOptions.filter(o => o !== option);
                              setFormData(prev => ({ ...prev, ensemble: newOptions.join(', ') }));
                            }
                          }}
                          className="data-[state=checked]:bg-transparent data-[state=checked]:border-black data-[state=checked]:text-black border-white text-white"
                          style={!isChecked ? { backgroundColor: '#333333' } : {}}
                       />
                       {option}
                     </div>
                   );
                 })}
              </div>
          </div>
          
          <div>
              <Label className="text-xs font-medium text-white uppercase tracking-wider mb-2 block">
                ACTIVITY
              </Label>
              <div className="flex flex-wrap gap-2">
                 {getActivityOptions(category).map((option) => {
                   const isChecked = formData.activity.split(', ').includes(option);
                   return (
                     <div key={option} className={`px-2 py-1 rounded text-sm flex items-center gap-2 ${isChecked ? 'bg-transparent border border-black text-black' : 'border border-white text-white'}`} style={!isChecked ? { backgroundColor: '#333333' } : {}}>
                        <Checkbox
                          id={`activity-${option}`}
                          checked={isChecked}
                          disabled={!formData.topic}
                          onCheckedChange={(checked) => {
                            const currentOptions = formData.activity.split(', ').filter(o => o);
                            if (checked) {
                              const newOptions = [...currentOptions, option];
                              setFormData(prev => ({ ...prev, activity: newOptions.join(', ') }));
                            } else {
                              const newOptions = currentOptions.filter(o => o !== option);
                              setFormData(prev => ({ ...prev, activity: newOptions.join(', ') }));
                            }
                          }}
                          className="data-[state=checked]:bg-transparent data-[state=checked]:border-black data-[state=checked]:text-black border-white text-white"
                          style={!isChecked ? { backgroundColor: '#333333' } : {}}
                       />
                       {option}
                     </div>
                   );
                 })}
              </div>
          </div>
          
          <div>
              <Label className="text-xs font-medium text-white uppercase tracking-wider mb-2 block">
                INSTRUCTION
              </Label>
              <div className="flex flex-wrap gap-2">
                 {instructionOptions.map((option) => {
                   const isChecked = formData.instruction.split(', ').includes(option);
                   return (
                     <div key={option} className={`px-2 py-1 rounded text-sm flex items-center gap-2 ${isChecked ? 'bg-transparent border border-black text-black' : 'border border-white text-white'}`} style={!isChecked ? { backgroundColor: '#333333' } : {}}>
                        <Checkbox
                          id={`instruction-${option}`}
                          checked={isChecked}
                          disabled={!formData.topic}
                          onCheckedChange={(checked) => {
                            const currentOptions = formData.instruction.split(', ').filter(o => o);
                            if (checked) {
                              const newOptions = [...currentOptions, option];
                              setFormData(prev => ({ ...prev, instruction: newOptions.join(', ') }));
                            } else {
                              const newOptions = currentOptions.filter(o => o !== option);
                              setFormData(prev => ({ ...prev, instruction: newOptions.join(', ') }));
                            }
                          }}
                          className="data-[state=checked]:bg-transparent data-[state=checked]:border-black data-[state=checked]:text-black border-white text-white"
                          style={!isChecked ? { backgroundColor: '#333333' } : {}}
                       />
                       {option}
                     </div>
                   );
                 })}
              </div>
          </div>
          
          <div>
             <Label htmlFor="exercise" className="text-xs font-medium text-white uppercase tracking-wider mb-2 block">
               EXERCISE MODELS
             </Label>
             <Textarea
               id="exercise"
               value={getFilteredExerciseContent()}
               onChange={(e) => setFormData(prev => ({ ...prev, exercise: e.target.value }))}
               placeholder={formData.topic ? "Exercise content will appear here..." : "Select a topic first."}
               disabled={!formData.topic}
               className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 min-h-[120px] disabled:opacity-50 disabled:cursor-not-allowed bg-[hsl(var(--modal-input-bg))] text-[hsl(var(--modal-input-text))]"
             />
          </div>
          
          <div>
             <Label htmlFor="facultyNotes" className="text-xs font-medium text-white uppercase tracking-wider mb-2 block">
               FACULTY NOTES
             </Label>
             <Textarea
               id="facultyNotes"
               value={formData.facultyNotes}
               onChange={(e) => setFormData(prev => ({ ...prev, facultyNotes: e.target.value }))}
               placeholder={formData.topic ? "Enter exercise notes..." : "Select a topic first."}
               disabled={!formData.topic}
               className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed bg-[hsl(var(--modal-input-bg))] text-[hsl(var(--modal-input-text))]"
             />
          </div>
        </div>
        
        {showError && (
          <div className="bg-red-500 text-white text-sm mt-4 p-3 rounded">
            Please select a topic.
          </div>
        )}
        
        {showDuplicateError && (
          <div className="bg-red-500 text-white text-sm mt-4 p-3 rounded">
            A pathway with this topic already exists. Please select a different topic.
          </div>
        )}
        
        {validationErrors.length > 0 && (
          <div className="bg-red-500 text-white text-sm mt-4 p-3 rounded">
            {validationErrors.map((error, index) => (
              <div key={index} className="mb-1">{error}</div>
            ))}
          </div>
        )}
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="modalCancel"
            onClick={handleCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            variant="modalAction"
            onClick={handleSave}
            className="px-6"
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPathwayModal;
