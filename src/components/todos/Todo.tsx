import React, { useContext, useState } from 'react';
import Droppable from '../dnd/Droppable';
import TasksList from '../tasks/TasksList';
import AddButton from '../common/AddButton';
import EditableCaption from '../common/EditableCaption';
import { ITask } from '../../interfaces';
import { TodosPageContext } from '../context/TodosPageContext';
import './Todo.scss';

interface TodoProps {
  title: string,
  id: string,
  tasks: Array<ITask>,
  handleDrop?: (taskId: string, targetTaskId?: string) => void,
  onEditTodoTitle?: (title: string) => void,
  setNewTasks?: (newTasks: ITask[]) => void,
  onRemoveTodo: () => void
}

type TodoState = boolean;

const Todo: React.FC<TodoProps> = ({
  title,
  id,
  tasks,
  handleDrop,
  onEditTodoTitle,
  setNewTasks,
  onRemoveTodo
}) => {

  const { setDragFromTodo } = useContext(TodosPageContext);
  const [isAdding, setAdding] = useState<TodoState>(false);

  const toggleAdding = (): void => {
    setAdding(!isAdding);
  }

  return (
    <li className="todos-item">
      <div className="tasks-header">
        <EditableCaption
          handleEditingEnd={onEditTodoTitle}
          className='tasks-caption'
          title={title}
          captionRole='h2'
        />
        <button 
          onClick={onRemoveTodo}
          className="tasks-removeTodo">
          &times;
        </button>
      </div>
      <Droppable
        id={id}
        handleDrop={handleDrop}
        className="droppable-wrapper"
      >
        <TasksList
          tasks={tasks}
          handleDrag={() => setDragFromTodo(id)}
          handleDrop={handleDrop}
          setNewTasks={setNewTasks}
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