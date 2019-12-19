import React, { Children } from 'react';

const Droppable: React.FC = () => {

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('id');
  }

  return(
    <div>
      {Children}
    </div>
  )

}

export default Droppable;
