
import React from 'react';

interface EmptyStateProps {
  category: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ category }) => {
  const getBackgroundColor = () => {
    switch (category.toLowerCase()) {
      case 'rhythm':
      case 'melody':
        return '#0077c8';
      case 'harmony':
        return '#ff9800';
      default:
        return '#0077c8';
    }
  };

  return (
    <div className="text-center py-12">
      <div className="inline-block px-4 py-2 rounded-lg text-white" style={{ backgroundColor: getBackgroundColor() }}>
        <p>No {category} pathways yet.</p>
        <p className="py-2">Click the "Add a Path" button to get started!</p>
      </div>
    </div>
  );
};

export default EmptyState;
