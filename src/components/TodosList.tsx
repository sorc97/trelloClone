import React from 'react';
import Task from './Task';
import AddForm from './AddForm'
import { ITask, ITodo } from '../interfaces';
import './stylesheets/TodosList.scss'

type TodosProps = {
  title: string, 
  id?: string,
  tasks?: Array<ITask>,
  onNewTask: (title: string) => void
}

const TodosList: React.FC <TodosProps> = ({ title, tasks, onNewTask }) => 
<li className="todos-item">
  <div className="tasks-header">
    <h2>{title}</h2>
    <AddForm
      placeholder="Add new task"
      handleAdding={onNewTask}
      className="tasks-form"
    />
  </div>
  <ul className="tasks-list">
    {
      tasks.map(task => 
        <Task
          key={task.id}
          {...task}
        />
      )
    }
  </ul>
</li>

export default TodosList;