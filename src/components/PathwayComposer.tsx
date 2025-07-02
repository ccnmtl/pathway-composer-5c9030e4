
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PathwayCard from './PathwayCard';
import EditPathwayModal from './EditPathwayModal';

interface PathwayData {
  id: string;
  topics: string;
  arrangements: string;
  exercises: string;
  actions: string;
}

const PathwayComposer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('harmony');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPathway, setEditingPathway] = useState<PathwayData | null>(null);
  
  const [pathways, setPathways] = useState<Record<string, PathwayData[]>>({
    harmony: [
      {
        id: '1',
        topics: "Let's explore scales by...",
        arrangements: 'singing and playing with...',
        exercises: 'a beginner exercise. We will sing a scale in canon while playing one part on an instrument. Let\'s...',
        actions: 'sing a scale in canon while playing one part on an instrument.'
      },
      {
        id: '2',
        topics: "Let's explore scales by...",
        arrangements: 'singing and playing with...',
        exercises: 'a beginner exercise. We will sing a scale in canon while playing one part on an instrument. Let\'s...',
        actions: 'sing a scale in canon while playing one part on an instrument.'
      },
      {
        id: '3',
        topics: "Let's explore scales by...",
        arrangements: 'singing and playing with...',
        exercises: 'a beginner exercise. We will sing a scale in canon while playing one part on an instrument. Let\'s...',
        actions: 'sing a scale in canon while playing one part on an instrument.'
      }
    ],
    melody: [],
    rhythm: []
  });

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
    const newPathway: PathwayData = {
      id: Date.now().toString(),
      topics: "Let's explore scales by...",
      arrangements: 'singing and playing with...',
      exercises: 'a beginner exercise. We will sing a scale in canon while playing one part on an instrument. Let\'s...',
      actions: 'sing a scale in canon while playing one part on an instrument.'
    };
    setPathways(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newPathway]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">PATHWAY COMPOSER</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Dark Mode</span>
            <span className="text-sm text-gray-500">About</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-auto grid-cols-3 bg-white border border-gray-200">
              <TabsTrigger value="harmony" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                Harmony
              </TabsTrigger>
              <TabsTrigger value="melody" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                Melody
              </TabsTrigger>
              <TabsTrigger value="rhythm" className="px-6 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                Rhythm
              </TabsTrigger>
            </TabsList>
            
            <Button
              onClick={handleAddPath}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            >
              Add a Path
            </Button>
          </div>

          <TabsContent value="harmony" className="mt-0">
            <div className="space-y-4">
              {pathways.harmony.map((pathway) => (
                <PathwayCard
                  key={pathway.id}
                  pathway={pathway}
                  onEdit={handleEdit}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                />
              ))}
              {pathways.harmony.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No harmony pathways yet. Click "Add a Path" to get started!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="melody" className="mt-0">
            <div className="space-y-4">
              {pathways.melody.map((pathway) => (
                <PathwayCard
                  key={pathway.id}
                  pathway={pathway}
                  onEdit={handleEdit}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                />
              ))}
              {pathways.melody.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No melody pathways yet. Click "Add a Path" to get started!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rhythm" className="mt-0">
            <div className="space-y-4">
              {pathways.rhythm.map((pathway) => (
                <PathwayCard
                  key={pathway.id}
                  pathway={pathway}
                  onEdit={handleEdit}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                />
              ))}
              {pathways.rhythm.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No rhythm pathways yet. Click "Add a Path" to get started!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <EditPathwayModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          pathway={editingPathway}
          onSave={handleSave}
          category={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        />
      </div>
    </div>
  );
};

export default PathwayComposer;
