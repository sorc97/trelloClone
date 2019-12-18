import React, { useContext, useEffect, useState } from 'react';
import TodosList from './TodosList'
import AddForm from './AddForm'
import { ITodo, IBoard } from '../interfaces';
import { v4 } from 'uuid';
import { Context } from '../context';

interface TodosPageProps {
  boardTitle: string,
  // currentBoard: IBoard,
  todosList: Array<ITodo>,
  boardId: string,
  storeTodos: (todosList: ITodo[]) => void
}


const TodosPage: React.FC <TodosPageProps> = ({ 
  todosList, boardTitle, boardId, storeTodos
}) => {

  const { dispatch } = useContext(Context);

  useEffect(()=> {
    dispatch({
      type: 'setActiveTodos',
      payload: {
        boardId
      }
    })
  }, [])

  const addNewTodo = (title: string) => {
    dispatch({
      type: 'addTodo',
      payload: {
        title
      }
    })
  }

  const addNewTask = (title: string, todoId: string) => {
    dispatch({
      type: 'addTask',
      payload: {
        title,
        todoId
      }
    })
  }

  return(
    <>
    <h1>{boardTitle}</h1>
    <AddForm
      placeholder="Add new Todo"
      handleAdding={addNewTodo}
    />
    {
      (!todosList.length) ?
        <p>No todos</p> :
        <ul>
          {
            todosList.map(todo => 
              <li key={todo.id}>
                <TodosList 
                  {...todo}
                  onNewTask={(title: string) => addNewTask(title, todo.id)}
                />
              </li>
            )
          }
        </ul>
    }
    </>
  )
}

export default TodosPage;