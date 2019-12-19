import React from 'react';
import './stylesheets/Task.scss';
import Draggable from './Dnd/Draggable/Draggable';


type TaskProps = {
  id?: string,
  title: string,
  isDone: boolean,
}

const Task: React.FC<TaskProps> = ({ title, isDone, id }) =>
<Draggable id={id} className='draggable-wrapper'>
  <li className='tasks-item'>
    <span>{title}</span>
    {/* {!isDone && <span> Not Done</span>} */}
  </li>
</Draggable>

export default Task;
