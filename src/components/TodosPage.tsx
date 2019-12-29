import React, { useContext, useState } from 'react';
import TodosList from './TodosList';
import AddForm from './AddForm';
import Basket from './Basket';
import EditableCaption from './EditableCaption';
import { IBoard, ITodoList, MatchParams } from '../interfaces';
import { v4 } from 'uuid';
import { BoardsContext } from './context/BoardsContext';
import { findElementById } from '../helpers/array-helpers';
import { match } from 'react-router-dom';
import { TodosPageContext } from './context/TodosPageContext';
import './stylesheets/TodosPage.scss';

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

  const editBoard = (newTitle: string) => {
    const newBoardsList: IBoard[] = boards.map(board => {
      if(board.id === boardId) {
        board.title = newTitle;
      }
      
      return board;
    })
    
    setBoards(newBoardsList);
  }
  
  return(
    <TodosPageContext.Provider value={{setDragFromTodo}}>
      <main className='todos'>
        <div className="todos-header">
          <EditableCaption
            title={currentBoard.title}
            captionRole="main"
            className="todos-boardCaption"
            handleEditingEnd={editBoard}
          />
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
        />
      </main>
    </TodosPageContext.Provider>
  )
} 

export default TodosPage;