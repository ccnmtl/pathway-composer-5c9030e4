
import React from 'react';

interface EmptyStateProps {
  category: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ category }) => {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <p>No {category} pathways yet.</p><p py-6>Click "Add a Path" button to get started!</p>
    </div>
  );
};

export default EmptyState;
