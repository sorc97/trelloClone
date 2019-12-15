import React from 'react'

type TaskProps = {
  id?: string,
  title: string,
  isDone: boolean,
}

const Task: React.FC<TaskProps> = ({ title, isDone }) =>
  <li className='todos-item'>
    <span>{title}</span>
    {!isDone && <span>Not Done</span>}
  </li>

export default Task;
