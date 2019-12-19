import React from 'react';

interface DroppableProps {
  id: string,
  children: React.ReactChild,
  className?: string,
}

const Droppable: React.FC<DroppableProps> = ({ id, children, className }) => {

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppableElem = e.target as HTMLElement;
    const data: string = e.dataTransfer.getData('id');
    console.log(data);

    const card: HTMLElement = document.getElementById(data);
    card.style.display = 'block';

    droppableElem.appendChild(document.getElementById(data));
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
