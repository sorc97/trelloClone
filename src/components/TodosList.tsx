import React, { useState } from 'react';
import {v4} from 'uuid'
import { ITask, ITodo, ITodoList } from '../interfaces';
import { findElementById, insert } from '../helpers/array-helpers'
import Todo from './Todo'
import './stylesheets/TodosList.scss';

interface TodosListProps {
  currentTodos: ITodoList,
  setNewBoards: (newTodo: ITodoList) => void,
  dragFromTodo?: string
}

// TodosList component
const TodosList: React.FC <TodosListProps> = ({ 
  setNewBoards, currentTodos, dragFromTodo
}) => {

  // 
  const setNewTodosList = (
    todoId: string, newTasks: ITask[]
  ): void => {
    const parentTodo = {...currentTodos[todoId]};
    parentTodo.tasks = newTasks;
    
    const newTodos = {
      ...currentTodos,
      [todoId]: parentTodo
    }

    setNewBoards(newTodos);
  }

  // Task's drop handling
  const onDragTask = (
    taskId: string, newTodoId: string, targetTaskId?: string
  ): void => {

    const currentTodoId = dragFromTodo;
    // Exit if drop on the same todo 
    if( !targetTaskId && (currentTodoId === newTodoId) ) return;
    
    const currentTodo: ITodo = currentTodos[currentTodoId];
    const currentTask: ITask = findElementById(taskId, currentTodo.tasks)
    const newTodo: ITodo = currentTodos[newTodoId];
    
    // Sort if dropped on another task
    if(targetTaskId) {
      let targetTasksList: ITask[] = newTodo.tasks;
      const targetTask: ITask = findElementById(targetTaskId, targetTasksList);
      const targetIndex: number = targetTasksList.indexOf(targetTask);
      //Remove task if same todo
      if(currentTodoId === newTodoId) {
        targetTasksList = targetTasksList.filter(todo => todo.id !== taskId);
      }
      //Tasks sorting
      const sortedTasksList: ITask[] = insert(targetTasksList, targetIndex, currentTask);
      newTodo.tasks = sortedTasksList;
      //State changing if dropped on the same todo
      if(currentTodoId === newTodoId) { 
        const newTodosList: ITodoList = {
          ...currentTodos,
          [newTodoId]: newTodo
        } 

        setNewBoards(newTodosList);
        return;
      }

    } else {
      newTodo.tasks = [ //Task adding if dropped on the list
        ...newTodo.tasks,
        currentTask
      ]
    }
    //Remove task from old todo
    currentTodo.tasks = currentTodo.tasks.filter(task => task.id !== taskId);
    // State changing if dropped on the different todos
    const newTodosList: ITodoList = {
      ...currentTodos,
      [newTodoId]: newTodo,
      [currentTodoId]: currentTodo
    }
    setNewBoards(newTodosList);
  }

  // Todo title editing
  const editTodoTitle = (newTitle: string, todoId: string): void => {
    const editingTodo = {...currentTodos[todoId]};
    editingTodo.title = newTitle;
    
    const newTodosList: ITodoList = {
      ...currentTodos,
      [todoId]: editingTodo 
    }

    setNewBoards(newTodosList); 
  }

  return(
    (!Object.values(currentTodos).length) ?
      <p>No todos</p> :
      <ul className="todos-list">
        {
          Object.values(currentTodos).map(todo =>
            <Todo 
              key={todo.id} 
              {...todo}
              handleDrop={
                (taskId, targetTaskId?) => 
                  onDragTask(taskId, todo.id, targetTaskId)
              }
              onEditTodoTitle={(title) => editTodoTitle(title, todo.id)}
              setNewTodosList={(newTasks) => setNewTodosList(todo.id, newTasks)}
            />
          )
        }
      </ul>
  )
}

export default TodosList;