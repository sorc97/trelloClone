import React from 'react';
import Task from './Task';
import AddForm from './AddForm'
import { ITask, ITodo } from '../interfaces';

type TodosProps = {
  title: string, 
  id?: string,
  tasks?: Array<ITask>,
  onNewTask: (title: string) => void
}

const TodosList: React.FC <TodosProps> = ({ title, tasks, onNewTask }) => 
<>
  <h2>{title}</h2>
  <AddForm
    placeholder="Add new task"
    handleAdding={onNewTask}
  />
  <ul>
    {
      tasks.map(task => 
        <Task
          key={task.id}
          {...task}
        />
      )
    }
  </ul>
</>

export default TodosList;