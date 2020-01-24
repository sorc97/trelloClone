import React from 'react';
import Todo from './Todo';
import { ITask, ITodo, ITodoList } from '../../interfaces';
import { findElementById, insert } from '../../helpers/array-helpers';
import './TodosList.scss';

interface TodosListProps {
  currentTodos: ITodoList,
  setNewTodos: (newTodo: ITodoList) => void,
  dragFromTodo?: string
}

// TodosList component
const TodosList: React.FC<TodosListProps> = ({
  setNewTodos, currentTodos, dragFromTodo
}) => {

  const todosArray = Object.values(currentTodos);
  // 
  const setNewTasks = (
    todoId: string, newTasks: ITask[]
  ): void => {
    const parentTodo = { ...currentTodos[todoId] };
    parentTodo.tasks = newTasks;

    const newTodos = {
      ...currentTodos,
      [todoId]: parentTodo
    }

    setNewTodos(newTodos);
  }

  // Task's drop handling
  const onDropTask = (
    taskId: string, newTodoId: string, targetTaskId?: string
  ): void => {

    const currentTodoId = dragFromTodo;
    // Exit if drop on the same todo 
    if (!targetTaskId && (currentTodoId === newTodoId)) return;

    const currentTodo: ITodo = { ...currentTodos[currentTodoId] };
    const newTodo: ITodo = { ...currentTodos[newTodoId] };
    const currentTask: ITask = findElementById(taskId, currentTodo.tasks);

    // Sort if dropped on another task
    if (targetTaskId) {
      let targetTasksList: ITask[] = newTodo.tasks;
      const targetTask: ITask = findElementById(targetTaskId, targetTasksList);
      const targetIndex: number = targetTasksList.indexOf(targetTask);
      //Remove task if same todo
      if (currentTodoId === newTodoId) {
        targetTasksList = targetTasksList.filter(todo => todo.id !== taskId);
      }
      //Tasks sorting
      const sortedTasksList: ITask[] = insert(targetTasksList, targetIndex, currentTask);
      newTodo.tasks = sortedTasksList;
      //State changing if dropped on the same todo
      if (currentTodoId === newTodoId) {
        const newTodosList: ITodoList = {
          ...currentTodos,
          [newTodoId]: newTodo
        }

        setNewTodos(newTodosList);
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
    setNewTodos(newTodosList);
  }

  // Todo title editing
  const editTodoTitle = (newTitle: string, todoId: string): void => {
    const editingTodo = { ...currentTodos[todoId] };
    editingTodo.title = newTitle;

    const newTodosList: ITodoList = {
      ...currentTodos,
      [todoId]: editingTodo
    }

    setNewTodos(newTodosList);
  }

  const removeTodo = (id: string) => {
    const newTodosList = { ...currentTodos };
    delete newTodosList[id];

    setNewTodos(newTodosList);
  }

  return (
    <section className="todos-section">
      {
        (!todosArray.length) ?
          <p className="todos-empty empty">No todos</p> :
          <ul className="todos-list">
            {todosArray.map(todo =>
              <Todo
                key={todo.id}
                {...todo}
                handleDrop={
                  (taskId, targetTaskId?) =>
                    onDropTask(taskId, todo.id, targetTaskId)
                }
                onEditTodoTitle={(title) => editTodoTitle(title, todo.id)}
                setNewTasks={(newTasks) => setNewTasks(todo.id, newTasks)}
                onRemoveTodo={() => removeTodo(todo.id)}
              />
            )}
          </ul>
      }
    </section>
  )
}

TodosList.defaultProps = {
  currentTodos: {},
  setNewTodos: () => { },
  dragFromTodo: ''
}

export default TodosList;