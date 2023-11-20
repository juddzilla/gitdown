import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import Card from '../Card';
import Draggable from './Draggable';

const BoardSection = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
      <div style={{ backgroundColor: '#eee', padding: 2 }}>
        <div>
          {title}
        </div>
        <SortableContext
            id={id}
            items={tasks}
            strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef}>
            {tasks.map((task) => (
                <div key={task.id} className='mb-2'>
                  <Draggable id={task.id}>
                    <Card data={task} />
                  </Draggable>
                </div>
            ))}
          </div>
        </SortableContext>
      </div>
  );
};

export default BoardSection;
