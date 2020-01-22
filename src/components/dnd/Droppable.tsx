import React from 'react';

interface DroppableProps {
  id: string,
  children: React.ReactChild,
  className?: string,
  handleDrop?: (taskId: string) => void
}

const Droppable: React.FC<DroppableProps> = ({id, children, className, handleDrop }) => {

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppableElem = e.target as HTMLElement;
    const data: string = e.dataTransfer.getData('id');

    handleDrop(data);
    document
      .querySelectorAll(`.${className}`)
      .forEach(item => item.classList.remove('underDrag'));
  }

  const dragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.add('underDrag');
  }

  const dragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('underDrag');
  }

  const allowDrop = (e: React.DragEvent) => { 
    e.preventDefault();
  }

  return(
    <div 
      id={id}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={drop}
      onDragOver={allowDrop}
      className={className}
    >
      {children}
    </div>
  )

}

export default Droppable;
