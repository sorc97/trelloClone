import React from 'react'
import { ITask } from '../interfaces';
import AddForm from './AddForm';
import Droppable from './Dnd/Droppable/Droppable';
import TasksList from './TasksList';
import AddButton from './AddButton';

interface TodoProps {
  title: string, 
  id: string,
  tasks: Array<ITask>,
  onNewTask: (title: string) => void,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  handleDrag?: (todoId: string) => void,
  onEditTodoTitle?: (title: string) => void,
  setNewTodosList?: (newTasks: ITask[]) => void
}

const Todo: React.FC <TodoProps> = ({
  title, 
  id, 
  tasks, 
  onNewTask, 
  handleDrop, 
  handleDrag, 
  onEditTodoTitle,
  setNewTodosList
}) => {

  // Start of Edding 
  const startEditing = (e: React.MouseEvent): void => {
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

    let target = e.target as HTMLElement;
    let newTitle = target.textContent;
    const parent = target.parentElement;

    if(newTitle === '') {
      target.focus();
      return;
    } 

    if(parent.hasAttribute('draggable')) {
      parent.setAttribute('draggable', 'true');
    }

    handleEditing(target.textContent);
    target.removeAttribute('contenteditable');
    target.classList.remove('editing');
  }
  
  return(
    <li className="todos-item">
      <div className="tasks-header">
        <h2 
          onClick={startEditing} 
          className="tasks-caption"
          onBlur={(e) => endEditing(e, onEditTodoTitle)}
        >{title}</h2>
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
          startEditing={startEditing}
          endEditing={endEditing}
          setNewTodosList={setNewTodosList}
        />
      </Droppable>
      <AddForm
        placeholder="Add new task"
        handleAdding={onNewTask}
        className="tasks-form"
      />
      {/* <AddButton className="tasks-addButton" text='+ Add new task'/> */}
    </li> 
  )
}

export default Todo;