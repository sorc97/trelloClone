import React from 'react';
import './stylesheets/Task.scss';
import Draggable from './Dnd/Draggable/Draggable';


type TaskProps = {
  id?: string,
  title: string,
  isDone: boolean,
  handleDrag: () => void
}

const Task: React.FC<TaskProps> = ({ title, isDone, id, handleDrag }) =>
<Draggable id={id} className='draggable-wrapper' handleDrag={handleDrag}>
  <li className='tasks-item'>
    <span>{title}</span>
    {/* {!isDone && <span> Not Done</span>} */}
  </li>
</Draggable>

export default Task;
