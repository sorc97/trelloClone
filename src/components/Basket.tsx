import React from 'react'
import Droppable from './Dnd/Droppable/Droppable'
import './stylesheets/Basket.scss'

interface BasketProps {
  removeTask: (taskId: string) => void,
  basketText: string
}

const Basket: React.FC <BasketProps> = ({removeTask, basketText}) => {
  return(
    <Droppable
      id="basket"
      className='basket-wrapper'
      handleDrop={removeTask}
    >
      <div className="basket">
        {basketText}
      </div>
    </Droppable>
  )
}

export default Basket;
