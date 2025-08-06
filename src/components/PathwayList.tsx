
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import PathwayCard from './PathwayCard';

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

interface PathwayListProps {
  pathways: PathwayData[];
  category: string;
  onEdit: (pathway: PathwayData) => void;
  onCopy: (pathway: PathwayData) => void;
  onDelete: (id: string) => void;
  onReorderPathways: (sourceIndex: number, destinationIndex: number, category: string) => void;
}

const PathwayList: React.FC<PathwayListProps> = ({
  pathways,
  category,
  onEdit,
  onCopy,
  onDelete,
  onReorderPathways
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    onReorderPathways(sourceIndex, destinationIndex, category);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={`${category}-pathways`}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {pathways.map((pathway, index) => (
              <Draggable key={pathway.id} draggableId={pathway.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`${snapshot.isDragging ? 'opacity-50' : ''}`}
                  >
                    <PathwayCard
                      pathway={pathway}
                      onEdit={onEdit}
                      onCopy={onCopy}
                      onDelete={onDelete}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PathwayList;
