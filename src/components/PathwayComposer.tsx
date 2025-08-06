import React, { useState, useEffect } from 'react';
import Header from './Header';
import PathwayTabs from './PathwayTabs';
import EditPathwayModal from './EditPathwayModal';
import AddPathwayModal from './AddPathwayModal';
import AboutModal from './AboutModal';
import GlossaryModal from './GlossaryModal';

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

const PathwayComposer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rhythm');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [editingPathway, setEditingPathway] = useState<PathwayData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [pathways, setPathways] = useState<Record<string, PathwayData[]>>(() => {
    const saved = localStorage.getItem('pathways');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse saved pathways:', error);
      }
    }
    return {
      harmony: [],
      melody: [],
      rhythm: []
    };
  });

  // Save pathways to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pathways', JSON.stringify(pathways));
  }, [pathways]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Apply dark mode class to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAboutClick = () => {
    setIsAboutModalOpen(true);
  };

  const handleGlossaryClick = () => {
    setIsGlossaryModalOpen(true);
  };

  const handleEdit = (pathway: PathwayData) => {
    setEditingPathway(pathway);
    setIsEditModalOpen(true);
  };

  const handleCopy = (pathway: PathwayData) => {
    const newPathway = {
      ...pathway,
      id: Date.now().toString()
    };
    setPathways(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newPathway]
    }));
  };

  const handleDelete = (id: string) => {
    setPathways(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(p => p.id !== id)
    }));
  };

  const handleSave = (updatedPathway: PathwayData) => {
    setPathways(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(p => 
        p.id === updatedPathway.id ? updatedPathway : p
      )
    }));
  };

  const handleAddPath = () => {
    setIsAddModalOpen(true);
  };

  const handleAddPathwaySave = (newPathway: PathwayData) => {
    setPathways(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newPathway]
    }));
  };

  const handleReorderPathways = (sourceIndex: number, destinationIndex: number, category: string) => {
    setPathways(prev => {
      const categoryPathways = [...prev[category]];
      const [reorderedItem] = categoryPathways.splice(sourceIndex, 1);
      categoryPathways.splice(destinationIndex, 0, reorderedItem);
      
      return {
        ...prev,
        [category]: categoryPathways
      };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header 
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onAboutClick={handleAboutClick}
          onGlossaryClick={handleGlossaryClick}
        />

        <PathwayTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pathways={pathways}
          onEdit={handleEdit}
          onCopy={handleCopy}
          onDelete={handleDelete}
          onAddPath={handleAddPath}
          onReorderPathways={handleReorderPathways}
        />

        <EditPathwayModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          pathway={editingPathway}
          onSave={handleSave}
          category={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          existingPathways={pathways[activeTab]}
        />

        <AddPathwayModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddPathwaySave}
          category={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          existingPathways={pathways[activeTab]}
        />

        <AboutModal
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />

        <GlossaryModal
          isOpen={isGlossaryModalOpen}
          onClose={() => setIsGlossaryModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default PathwayComposer;
