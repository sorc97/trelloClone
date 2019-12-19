import React from 'react';
import './stylesheets/Task.scss';


type TaskProps = {
  id?: string,
  title: string,
  isDone: boolean,
}

const Task: React.FC<TaskProps> = ({ title, isDone }) =>
  <li className='tasks-item'>
    <span>{title}</span>
    {/* {!isDone && <span> Not Done</span>} */}
  </li>

export default Task;
