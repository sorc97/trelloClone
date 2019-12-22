import React from 'react';
import Task from './Task';
import AddForm from './AddForm'
import { ITask, ITodo } from '../interfaces';
import Droppable from './Dnd/Droppable/Droppable'
import './stylesheets/TodosList.scss';

type TodosProps = {
  title: string, 
  id?: string,
  tasks?: Array<ITask>,
  onNewTask: (title: string) => void,
  handleDrop?: (taskId: string, newTodoId: string) => void,
  handleDrag?: (todoId: string) => void,
  sortTasks?: (currentTask: string, targetTask: string) => void
}

const TodosList: React.FC <TodosProps> = ({ 
  title, tasks, onNewTask, id, handleDrop, handleDrag, sortTasks
}) => 
<li className="todos-item">
  <div className="tasks-header">
    <h2>{title}</h2>
    <AddForm
      placeholder="Add new task"
      handleAdding={onNewTask}
      className="tasks-form"
    />
  </div>
  <Droppable 
    id={id} 
    className="droppable-wrapper"
    handleDrop={handleDrop}
  >
    <ul className="tasks-list">
      {
        tasks.map(task => 
          <Task
            key={task.id}
            {...task}
            handleDrag={():void => handleDrag(id)}
            sortTasks={sortTasks}
          />
        )
      }
    </ul>
  </Droppable>
</li>

export default TodosList;