import React from 'react';

interface DraggableProps {
  children: React.ReactChild,
  id: string,
  className?: string,
}

const Draggable: React.FC <DraggableProps> = ({ id, children, className }) => {

  const drag = (e: React.DragEvent) => {
    const elem = e.target as HTMLElement;
    e.dataTransfer.setData("id", elem.id);

    setTimeout(() => {
      elem.style.display = 'none';
    }, 0);
  }

  const notAllowDrop = (e: React.DragEvent) => {
    e.stopPropagation();
  }
  
  return(
    <div 
      id={id} 
      draggable="true" 
      onDragStart={drag} 
      onDragOver={notAllowDrop}
      className={className}
    >
      {children}
    </div>
  )
}

export default Draggable;