import React from 'react';
import './stylesheets/Task.scss';
import Draggable from './Dnd/Draggable/Draggable';

type TaskProps = {
  id?: string,
  title: string,
  isDone: boolean,
  handleDrag: () => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
}

const Task: React.FC<TaskProps> = ({ title, isDone, id, handleDrag, handleDrop }) =>
<Draggable 
  id={id} 
  className='draggable-wrapper' 
  handleDrag={handleDrag}
  handleDrop={handleDrop}
>
  <li className='tasks-item'>
    {title}
  </li>
</Draggable>

export default Task;
