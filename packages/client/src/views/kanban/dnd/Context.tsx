import React, { useEffect, useState } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

import Draggable from './Draggable';
import Droppable from './Droppable';
import Card from '../Card';

export const findBoardSectionContainer = (
    boardSections,
    id
) => {

  if (id in boardSections) {
    return id;
  }
  const parts = id.split(':');
  return parts[1];
};

const BoardSectionList = (group, tasks, onDrop) => {
  const initialBoardSections = tasks.reduce((acc, cur) => {
    acc[cur.name || '(none)'] = cur.results;
    return acc;
  }, {});

  const [boardSections, setBoardSections] = useState(initialBoardSections);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  useEffect(() => {
    setBoardSections(initialBoardSections);
  }, [tasks]);

  useEffect(() => {
    setActiveTaskId(null);
  }, [group]);

  const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };


  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer = findBoardSectionContainer(
        boardSections,
        active.id as string
    );
    const overContainer = findBoardSectionContainer(
        boardSections,
        over?.id as string
    );

    if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer].filter(Boolean);
      const overItems = boardSection[overContainer].filter(Boolean);

      const activeIndex = activeItems.findIndex((item) => item.id === active.id);
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(Boolean).filter(
              (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
              overIndex,
              boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const parts = active.id.split(':');
    const activeContainer = findBoardSectionContainer(
        boardSections,
        active.id as string
    );
    const overContainer = findBoardSectionContainer(
        boardSections,
        over?.id as string
    );

    if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
        (task) => task.id === parts[1]
    );

    const overIndex = boardSections[overContainer].filter(Boolean).findIndex(
        (task) => task.id === parts[1]
    );
    onDrop({ from: activeContainer, to: overContainer, item: task });

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
            boardSection[overContainer],
            activeIndex,
            overIndex
        ),
      }));
    }

    setActiveTaskId(null);

  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const getTaskById = (T, activeId) => {
    const parts = activeId.split(':');
    const data = T.find(t => t.name === parts[1]);
    return data.results.find(i => i.id === parts[2]);
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;
  return (
      <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
      >
        <div className='flex h-full'>
          {Object.keys(boardSections).map((boardSectionKey) => (
              <div className='mr-2 bg-slate-50' key={boardSectionKey}>
                <Droppable
                    id={[group, boardSectionKey].join(':')}
                    title={boardSectionKey}
                    tasks={boardSections[boardSectionKey]}
                />
              </div>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            { task ? <Draggable id={task.id}><Card data={task} /></Draggable> : null}
          </DragOverlay>
        </div>
      </DndContext>
  );
};

export default BoardSectionList;
