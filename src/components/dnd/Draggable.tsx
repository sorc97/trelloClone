import React from 'react';

interface DraggableProps {
  children: React.ReactChild,
  id: string,
  className?: string,
  handleDrag: () => void,
  handleDrop?: (taskId: string, targetTaskId: string) => void,
}

let draggableELem: HTMLElement = null;  // current draggable element

const Draggable: React.FC<DraggableProps> = ({
  id, children, className, handleDrag, handleDrop
}) => {

  const drag = (e: React.DragEvent) => {  // Start of dragging
    draggableELem = e.target as HTMLElement;
    e.dataTransfer.setData("id", draggableELem.id);  // Transfer draggable element id

    handleDrag();  // External drag function

    draggableELem.classList.add('dragged');  // Set styles to draggable element
  }

  const dragEnd = (e: React.DragEvent) => {
    draggableELem.classList.remove('dragged');  // Remove styles from draggable element
    draggableELem = null;  // Reset current draggable element

    document  // Reset all elements with under drag class
      .querySelectorAll(`.${className}`)
      .forEach(item => item.classList.remove('underDrag'));
  }

  const dragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let target = e.currentTarget as HTMLElement;

    if (target === draggableELem) return;
    // If draggable element over another element, change it's style
    target.classList.add('underDrag');
  }

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Do nothing if drag over current draggable element
    if (e.currentTarget === draggableELem) return;
  }

  const dragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    let target = e.currentTarget as HTMLElement;

    if (target === draggableELem) return;

    target.classList.remove('underDrag');  // Remove styles from leaving element
  }

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget as HTMLElement;
    const data: string = e.dataTransfer.getData('id'); // Get data transferred by drag

    if (target === draggableELem) return;  // If drop on the draggable element, do nothing

    handleDrop(data, target.id);  // Change state with new value
    document  // Reset all elements with under drag class
      .querySelectorAll('.draggable-wrapper')
      .forEach(item => item.classList.remove('underDrag'));
  }

  return (
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

Draggable.defaultProps = {
  id: "",
  handleDrag: () => { },
  handleDrop: () => { }
}

export default Draggable;