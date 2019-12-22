import React from 'react';
import './stylesheets/Task.scss';
import Draggable from './Dnd/Draggable/Draggable';


type TaskProps = {
  id?: string,
  title: string,
  isDone: boolean,
  handleDrag: () => void,
  sortTasks?: (currentTask: string, targetTask: string) => void
}

const Task: React.FC<TaskProps> = ({ title, isDone, id, handleDrag, sortTasks }) =>
<Draggable 
  id={id} 
  className='draggable-wrapper' 
  handleDrag={handleDrag}
  handleDrop={sortTasks}
>
  <li className='tasks-item'>
    {title}
  </li>
</Draggable>

export default Task;
