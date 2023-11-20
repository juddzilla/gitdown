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

  return Object.keys(boardSections).find((key) =>
      boardSections[key].find((item) => item.id === id)
  );
};

const BoardSectionList = (tasks, onDrop) => {
  const initialBoardSections = tasks.reduce((acc, cur) => {
    acc[cur.name || '(none)'] = cur.results;
    return acc;
  }, {});

  const [boardSections, setBoardSections] = useState(initialBoardSections);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  useEffect(() => {
    setBoardSections(initialBoardSections);
  }, [tasks])

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
    // Find the containers
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
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];
      const activeIndex = activeItems.findIndex(
          (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
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
        activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
        (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
        (task) => task.id === over?.id
    );

    onDrop({ destination: overContainer, item: task });

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
    const group = T.find(t => t.results.some(item => item.id === activeId));
    return group.results.find(i => i.id === activeId);
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  return (
      <div>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
          <div className='border border-black flex'>
            {Object.keys(boardSections).map((boardSectionKey) => (
                <div className='border border-red' key={boardSectionKey}>
                  <Droppable
                      id={boardSectionKey}
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
      </div>
  );
};

export default BoardSectionList;
