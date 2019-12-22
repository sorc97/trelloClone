import React from 'react';

interface DroppableProps {
  id: string,
  children: React.ReactChild,
  className?: string,
  handleDrop?: (taskId: string, newTodoId: string) => void
}

const Droppable: React.FC<DroppableProps> = ({ id, children, className, handleDrop }) => {

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppableElem = e.target as HTMLElement;
    const data: string = e.dataTransfer.getData('id');

    const card: HTMLElement = document.getElementById(data);
    // console.log(card);
    // card.style.display = 'block';

    handleDrop(data, id);
    document
      .querySelectorAll(className)
      .forEach(item => item.classList.remove('underDrag'));
  }

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  }

  return(
    <div 
      id={id}
      onDrop={drop}
      onDragOver={allowDrop}
      className={className}
    >
      {children}
    </div>
  )

}

export default Droppable;
