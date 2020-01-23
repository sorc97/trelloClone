import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';
import { match } from 'react-router-dom';
import TodosList from './TodosList';
import TodosHeader from './TodosHeader';
import { IBoard, ITodoList, MatchParams } from '../../interfaces';
import { findElementById } from '../../helpers/array-helpers';
import { BoardsContext } from '../context/BoardsContext';
import { TodosPageContext } from '../context/TodosPageContext';
import './TodosPage.scss';

interface TodosPageProps {
  match: match<MatchParams>
}

type TodosPageState = string;

const TodosPage: React.FC<TodosPageProps> = ({ match = {} }) => {
  const [boards, setBoards] = useContext(BoardsContext); // Get context value
  const [dragFromTodo, setDragTodo] = useState<TodosPageState>("");

  const boardId = match.params.id;
  const currentBoard: IBoard = findElementById(boardId, boards);
  const currentTodos: ITodoList = { ...currentBoard.todos };

  // Set draggable's task parent todo
  const setDragFromTodo = (todoId: string) => {
    setDragTodo(todoId);
  }

  // Insert todos into current board
  const setNewTodos = (newTodos: ITodoList): void => {
    const newBoardsList = boards.map(board => {
      if (board.id === boardId) {
        board.todos = newTodos;
      }

      return board
    })
    setBoards(newBoardsList);
  }

  // New todo creation
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

    setNewTodos(todos);
  }

  const removeTask = (taskId: string, todoId: string): void => {
    const todo = { ...currentTodos[todoId] };
    todo.tasks = todo.tasks.filter(task => task.id !== taskId);

    const newTodosList = {
      ...currentTodos,
      [todoId]: todo
    }

    setNewTodos(newTodosList);
  }

  const editBoard = (newTitle: string) => {
    const newBoardsList: IBoard[] = boards.map(board => {
      if (board.id === boardId) {
        board.title = newTitle;
      }

      return board;
    })

    setBoards(newBoardsList);
  }

  return (
    <TodosPageContext.Provider value={{ setDragFromTodo }}>
      <main className='todos'>
        <TodosHeader
          currentBoardTitle={currentBoard.title}
          editBoard={editBoard}
          addNewTodo={addNewTodo}
          removeTask={(taskId) => removeTask(taskId, dragFromTodo)}
        />
        <TodosList
          currentTodos={currentTodos}
          setNewTodos={setNewTodos}
          dragFromTodo={dragFromTodo}
        />
      </main>
    </TodosPageContext.Provider>
  )
}

export default TodosPage;