
import React from 'react';

interface EmptyStateProps {
  category: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ category }) => {
  const getBackgroundColor = () => {
    switch (category.toLowerCase()) {
      case 'rhythm':
        return '#0077c8';
      case 'melody':
        return '#0077c8';
      case 'harmony':
        return '#ff9800';
      default:
        return '#0077c8';
    }
  };

  return (
    <div 
      className="text-center py-12 text-white rounded-lg"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>No {category} pathways yet.</p>
      <p className="py-6">Click the "Add a Path" button to get started!</p>
    </div>
  );
};

export default EmptyState;
