import React from 'react';
import Droppable from '../dnd/Droppable';
import './Basket.scss';

interface BasketProps {
  onRemove: (taskId: string) => void,
  basketText: string
}

const Basket: React.FC<BasketProps> = ({
  basketText = "Remove area",
  onRemove = f => f
}) => {
  return (
    <Droppable
      id="basket"
      className="basket"
      handleDrop={onRemove}
    >
      <>
        {basketText}
      </>
    </Droppable>
  )
}

export default Basket;
