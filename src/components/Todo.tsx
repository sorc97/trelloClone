import React from 'react'
import { ITask } from '../interfaces';
import AddForm from './AddForm';
import Droppable from './Dnd/Droppable/Droppable';
import TasksList from './TasksList';

interface TodoProps {
  title: string, 
  id: string,
  tasks: Array<ITask>,
  onNewTask: (title: string) => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  handleDrag?: (todoId: string) => void,
}

const Todo: React.FC <TodoProps> = ({
  title, id, tasks, onNewTask, handleDrop, handleDrag
}) => {
  
  return(
    <li className="todos-item">
      <div className="tasks-header">
        <h2 className="tasks-caption">{title}</h2>
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
        <TasksList 
          tasks={tasks}
          handleDrag={() => handleDrag(id)}
          handleDrop={handleDrop}
        />
      </Droppable>
    </li> 
  )
}

export default Todo;