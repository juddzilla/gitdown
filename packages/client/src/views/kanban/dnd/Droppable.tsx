import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import Card from '../Card';
import Draggable from './Draggable';

const BoardSection = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
      <div className='w-96'>
        <div className='rounded-t-lg text-center font-bold text-xl flex items-center justify-center bg-white text-black border-b border-grey-200 mb-4 h-16'>
          {title}
        </div>
        <SortableContext
            id={id}
            items={tasks}
            strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} className='px-4'>
            {
              tasks.filter(Boolean).map((task) => {
              const draggableId = [id,task.id].join(':');
              return (

                  <div key={ task.id } id={ task.id }>
                    <Draggable id={ draggableId }>
                      <Card data={ task } />
                    </Draggable>
                  </div>
              )
            })}
          </div>
        </SortableContext>
      </div>
  );
};

export default BoardSection;
