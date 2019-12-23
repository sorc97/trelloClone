import React, { useContext, useEffect, useState } from 'react';
import TodosList from './TodosList'
import AddForm from './AddForm'
import { ITodo, IBoard, ITodoList, ITask } from '../interfaces';
import { Context } from '../context';
import './stylesheets/TodosPage.scss';

// Types and Interfaces
interface TodosPageProps {
  boardTitle: string,
  // currentBoard: IBoard,
  todosList: ITodoList,
  storeTodos?: (todosList: ITodoList) => void,
  onNewTodo: (title: string) => void,
  onNewTask: (title: string, todoId: string) => void
  onDragTask: (
    taskId: string, newTodoId: string, currentTodoId: string, targetTaskId?: string
  ) => void
}

type TodosPageState = string;

const TodosPage: React.FC <TodosPageProps> = ({ 
  todosList, boardTitle, onNewTodo, onNewTask, onDragTask
}) => {

  const [dragFromTodo, setDragTodo] = useState<TodosPageState>("");

  const setDragFromTodo = (todoId: string) => {
    setDragTodo(todoId);
  }

  return(
    <main className='todos'>
      <div className="todos-header">
        <h1>{boardTitle}</h1>
        <AddForm
          placeholder="Add new Todo"
          handleAdding={onNewTodo}
          className="todo-form"
        />
      </div>
      {
        (!Object.values(todosList).length) ?
          <p>No todos</p> :
          <ul className="todos-list">
            {
              Object.values(todosList).map(todo => 
                <TodosList 
                  {...todo}
                  onNewTask={(title) => onNewTask(title, todo.id)}
                  key={todo.id}
                  handleDrop={
                    (taskId, targetTaskId?) => 
                      onDragTask(taskId, todo.id, dragFromTodo,targetTaskId)
                  }
                  handleDrag={setDragFromTodo}
                />
              )
            }
          </ul>
      }
    </main>
  )
}

export default TodosPage;