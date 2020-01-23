import React from 'react';

interface DroppableProps {
  id: string,
  children: React.ReactChild,
  className?: string,
  handleDrop?: (taskId: string) => void
}

const Droppable: React.FC<DroppableProps> = ({
  id, children, className, handleDrop
}) => {

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    const data: string = e.dataTransfer.getData('id');  // Get data transferred by drag

    handleDrop(data);
    document  // Reset all elements with under drag class
      .querySelectorAll(`.${className}`)
      .forEach(item => item.classList.remove('underDrag'));
  }

  const dragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    // Apply styles to droppable element
    target.classList.add('underDrag'); 
  }

  const dragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    // Remove styles from droppable element
    target.classList.remove('underDrag');
  }

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  }

  return (
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

Droppable.defaultProps = {
  id: "",
  handleDrop: () => { }
}

export default Droppable;
