import React from 'react';

interface DraggableProps {
  children: React.ReactChild,
  id: string,
  className?: string,
  handleDrag?: () => void,
  handleDrop?: (taskId: string, targetTaskId: string) => void,
}

let draggableELem: HTMLElement = null;

const Draggable: React.FC <DraggableProps> = ({ 
  id, children, className, handleDrag, handleDrop
}) => {

  const drag = (e: React.DragEvent) => {
    draggableELem = e.target as HTMLElement;
    e.dataTransfer.setData("id", draggableELem.id);

    handleDrag();

    setTimeout(() => {
      draggableELem.classList.add('dragged');
    } , 0)
  }

  const dragEnd = (e: React.DragEvent) => {
    draggableELem.classList.remove('dragged');
    draggableELem = null;
    
    document
      .querySelectorAll(`.${className}`)
      .forEach(item => item.classList.remove('underDrag'));
  }

  const dragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let target = e.currentTarget as HTMLElement;

    if(target === draggableELem) return;

    target.classList.add('underDrag');
    // console.log("Enter");
  }

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if(e.currentTarget === draggableELem) return;

  }

  const dragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    let target = e.currentTarget as HTMLElement;

    if(target === draggableELem) return;

    target.classList.remove('underDrag');
    // console.log("Leave");
  }

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget as HTMLElement;
    const data: string = e.dataTransfer.getData('id');

    if(target === draggableELem) return;

    handleDrop( data, target.id );
    document
      .querySelectorAll('.draggable-wrapper')
      .forEach(item => item.classList.remove('underDrag'));
  }

  const notAllowDrop = (e: React.DragEvent) => {
    // e.stopPropagation();
  }
  
  return(
    <div 
      id={id} 
      draggable="true" 
      onDragStart={drag} 
      onDragEnd={dragEnd}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={drop}
      className={className}
    >
      {children}
    </div>
  )
}

export default Draggable;