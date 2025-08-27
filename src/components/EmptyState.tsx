
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
        return '#76881d';
      case 'harmony':
        return '#ff9800';
      default:
        return '#0077c8';
    }
  };

  return (
    <div className="text-center py-12">
      <div className="inline-block px-4 py-2 rounded-lg text-white" style={{ backgroundColor: getBackgroundColor() }}>
        <p>No {category} guides yet.</p>
        <p className="py-2">Click the "Add a Guide" button to get started!</p>
      </div>
    </div>
  );
};

export default EmptyState;
