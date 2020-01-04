import React from 'react'
import Droppable from './Dnd/Droppable/Droppable'
import './stylesheets/Basket.scss'

interface BasketProps {
  onRemove: (taskId: string) => void,
  basketText: string
}

const Basket: React.FC<BasketProps> = ({ onRemove, basketText }) => {
  return (
    <Droppable
      id="basket"
      className="basket-wrapper"
      handleDrop={onRemove}
    >
      <div className="basket">
        {basketText}
      </div>
    </Droppable>
  )
}

export default Basket;
