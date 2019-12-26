import React, { useContext, useState } from 'react';
import TodosList from './TodosList';
import AddForm from './AddForm';
import Basket from './Basket';
import { IBoard, ITodoList, MatchParams } from '../interfaces';
import { v4 } from 'uuid';
import { BoardsContext } from './context/BoardsContext';
import './stylesheets/TodosPage.scss';
import { findElementById } from '../helpers/array-helpers';
import { match } from 'react-router-dom';


interface TodosPageProps {
  match: match<MatchParams>
}

type TodosPageState = string;

const TodosPage: React.FC <TodosPageProps> = ({match}) => {
  const [boards, setBoards] = useContext(BoardsContext); // Context
  const [dragFromTodo, setDragTodo] = useState<TodosPageState>("");
 
  const boardId = match.params.id;
  const currentBoard: IBoard = findElementById(boardId, boards);
  const currentTodos: ITodoList = {...currentBoard.todos};

  // Set draggable's task parent todo
  const setDragFromTodo = (todoId: string) => {
    setDragTodo(todoId);
  }

  // Insert todos into current board
  const setNewBoards = (newTodos: ITodoList): void => {
    const newBoardsList = boards.map(board => {
      if(board.id === boardId) {
        board.todos = newTodos;
      }
      
      return board
    })
    setBoards(newBoardsList);
  }

  // Creating of new todo
  const addNewTodo = (title: string): void => {
    const id = v4();
    const todos: ITodoList = {
      ...currentTodos,
      [id]: {
        title,
        id,
        tasks: []
      }
    }

    setNewBoards(todos);
  }

  const removeTask = (taskId: string, todoId: string): void => {
    const todo = {...currentTodos[todoId]};
    todo.tasks = todo.tasks.filter(task => task.id !== taskId);
    
    const newTodosList = {
      ...currentTodos,
      [todoId]: todo
    }
    setNewBoards(newTodosList);
  }
  
  return(
    <main className='todos'>
      <div className="todos-header">
        <h1>{currentBoard.title}</h1>
        <AddForm
          placeholder="Add new Todo"
          handleAdding={addNewTodo}
          className="todo-form"
        />
        <Basket 
          removeTask={(taskId) => removeTask(taskId, dragFromTodo)}
          basketText="Drop task here to remove"
        />
      </div>
      <TodosList 
        currentTodos={currentTodos}
        setNewBoards={setNewBoards}
        dragFromTodo={dragFromTodo}
        setDragFromTodo={setDragFromTodo}
      />
    </main>
  )
} 

export default TodosPage;