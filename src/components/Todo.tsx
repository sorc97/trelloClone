import React, { useContext, useState } from 'react';
import {v4} from 'uuid';
import { ITask } from '../interfaces';
import Droppable from './Dnd/Droppable/Droppable';
import TasksList from './TasksList';
import AddButton from './AddButton';
import { TodosPageContext } from './context/TodosPageContext';
import EditableCaption from './EditableCaption';

interface TodoProps {
  title: string, 
  id: string,
  tasks: Array<ITask>,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  onEditTodoTitle?: (title: string) => void,
  setNewTodosList?: (newTasks: ITask[]) => void
}

type TodoState = boolean;

const Todo: React.FC <TodoProps> = ({
  title, 
  id, 
  tasks, 
  handleDrop, 
  onEditTodoTitle,
  setNewTodosList
}) => {

  const { setDragFromTodo } = useContext(TodosPageContext);
  const [ isAdding, setAdding ] = useState<TodoState>(false);
  
  const toggleAdding = (): void => {
    setAdding(!isAdding);
  }
  
  return(
      <li className="todos-item">
        <div className="tasks-header">
          <EditableCaption
            handleEditingEnd={onEditTodoTitle}
            className='tasks-caption'
            title={title}
            captionRole='h2'
          />
        </div>
        <Droppable 
          id={id} 
          className="droppable-wrapper"
          handleDrop={handleDrop}
        >
          <TasksList 
            tasks={tasks}
            handleDrag={() => setDragFromTodo(id)}
            handleDrop={handleDrop}
            setNewTodosList={setNewTodosList}
            isAdding={isAdding}
            toggleAdding={toggleAdding}
          />
        </Droppable>
        {
          !isAdding &&
            <AddButton
              className="tasks-addButton" 
              text='+ Add new task'
              handleClick={toggleAdding}
            />
        }
      </li> 
  )
}

export default Todo;