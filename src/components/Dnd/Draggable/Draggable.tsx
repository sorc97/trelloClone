import React from 'react';

interface DraggableProps {
  children: React.ReactChild,
  id: string,
  className?: string,
  handleDrag?: () => void
}

let draggableELem: HTMLElement = null;
// let dragOverElem: Element = null;

const Draggable: React.FC <DraggableProps> = ({ id, children, className, handleDrag }) => {

  const drag = (e: React.DragEvent) => {
    draggableELem = e.target as HTMLElement;
    e.dataTransfer.setData("id", draggableELem.id);
    handleDrag();
    draggableELem.classList.add('dragged');
  }

  const dragEnd = (e: React.DragEvent) => {
    draggableELem.classList.remove('dragged');
    draggableELem = null;
    document
      .querySelectorAll('.draggable-wrapper')
      .forEach(item => item.classList.remove('underDrag'));
  }

  /* const dragEnter = (e: React.DragEvent) => {
    if(dragOverElem) return;

    console.log(dragOverElem);

    let target = e.target as HTMLElement;
    let elem = target.closest('.draggable-wrapper');

    if(!elem) return;

    dragOverElem = elem;
    dragOverElem.classList.add('underDrag');
  } */

  const dragEnter = (e: React.DragEvent) => {
    /* if(target === draggableELem.firstChild) return;
    target.classList.add('underDrag');
    console.log(e.target); */
    let target = e.currentTarget as HTMLElement;
    if(target === draggableELem) return;
    target.classList.add('underDrag');
    console.log(e.currentTarget);
  }

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if(e.currentTarget === draggableELem.firstChild) return;
  }

  /* const dragLeave = (e: React.DragEvent) => {
    if(!dragOverElem) return;
    
    let target = e.currentTarget as HTMLElement;
    
    while(target) {
      if(dragOverElem === target) return;

      target = target.parentElement;
    }

    dragOverElem.classList.remove('underDrag');
    dragOverElem = null;
  } */

  const dragLeave = (e: React.DragEvent) => {
    let target = e.currentTarget as HTMLElement;
    // if(target === draggableELem.firstChild) return;
    // target.classList.remove('underDrag');
    if(target === draggableELem) return;
    target.classList.remove('underDrag');
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
      className={className}
    >
      {children}
    </div>
  )
}

export default Draggable;