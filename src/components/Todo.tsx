import React, { useContext, useState } from 'react';
import {v4} from 'uuid';
import { ITask } from '../interfaces';
import AddForm from './AddForm';
import Droppable from './Dnd/Droppable/Droppable';
import TasksList from './TasksList';
import AddButton from './AddButton';
import { TodosPageContext } from './context/TodosPageContext';
import { TodoContext } from './context/TodoContext';

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

  // Start of Edding 
  const startEditing = (e: React.MouseEvent|MouseEvent): void => {
    const target = e.target as HTMLElement;
    const parent = target.parentElement;

    if(parent.hasAttribute('draggable')) {
      parent.setAttribute('draggable', 'false');
    }

    target.setAttribute('contenteditable', 'true');
    target.classList.add('editing');
    target.focus();

    target.addEventListener('keypress', (e) => {
      if(e.code === "Enter") {
        target.blur();
        e.preventDefault();
      }
    })
  }

  // End of Edding 
  const endEditing = (
    e: React.FocusEvent, 
    handleEditing: (title: string, id?: string) => void
  ): void => {

    const target = e.target as HTMLElement;
    const newTitle = target.textContent;
    const parent = target.parentElement;

    if(newTitle === '') {
      target.focus();
      return;
    } 

    if(parent.hasAttribute('draggable')) {
      parent.setAttribute('draggable', 'true');
    }

    handleEditing(newTitle);
    target.removeAttribute('contenteditable');
    target.classList.remove('editing');
  }
  
  const toggleAdding = (): void => {
    setAdding(!isAdding);
  }
  
  return(
    <TodoContext.Provider
      value={{startEditing, endEditing}}
    >
      <li className="todos-item">
        <div className="tasks-header">
          <h2 
            onClick={startEditing} 
            className="tasks-caption"
            onBlur={(e) => endEditing(e, onEditTodoTitle)}
          >{title}</h2>
          {/* {console.log(title)} */}
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
            // onNewTask={(title) => addNewTask(title, id)}
          />
        </Droppable>
        {/* <AddForm
          placeholder="Add new task"
          handleAdding={(title) => addNewTask(title, id)}
          className="tasks-form"
        /> */}
        {
          !isAdding &&
            <AddButton
              className="tasks-addButton" 
              text='+ Add new task'
              handleClick={toggleAdding}
            />
        }
      </li> 
    </TodoContext.Provider>
  )
}

export default Todo;