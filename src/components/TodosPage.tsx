import React, { useContext, useEffect, useState } from 'react';
import TodosList from './TodosList'
import AddForm from './AddForm'
import { ITodo, IBoard, ITodoList, ITask } from '../interfaces';
import { v4 } from 'uuid';
import { Context } from '../context';
import './stylesheets/TodosPage.scss';
import { insert } from '../helpers/array-helpers';

interface TodosPageProps {
  boardTitle: string,
  // currentBoard: IBoard,
  todosList: ITodoList,
  boardId: string,
  storeTodos: (todosList: ITodoList) => void
}

type TodosPageState = {
  todos: ITodoList,
  dragFromTodo: string
}

class TodosPage extends React.Component<TodosPageProps, TodosPageState> {
  readonly state = {
    todos: this.props.todosList,
    dragFromTodo: ""
  };

  componentDidMount() {
    console.log("TODOS PAGES DID MOUNT");
  }

  componentWillUnmount() {
    this.props.storeTodos(this.state.todos);
  }

  addNewTodo = (title: string): void => {
    const id = v4();
    const todos: ITodoList = {
      ...this.state.todos,
      [id]: {
        title,
        id,
        tasks: []
      }
    }
    
    this.setState({todos});
  }

  addNewTask = (title: string, todoId: string): void => {
    const currentTodo: ITodo = {...this.state.todos[todoId]};
    currentTodo.tasks = [
      ...currentTodo.tasks,
      {
        title,
        id: v4(),
        isDone: false,
        todoId
      }
    ]
    
    this.setState({
      todos: {
        ...this.state.todos,
        [todoId]: currentTodo
      }
    });
  }

  setDragFromTodo = (todoId: string) => {
    this.setState({dragFromTodo: todoId})
  }

  addTaskToNewTodo = (
    taskId: string, newTodoId: string, targetTaskId?: string
  ): void => {

    const currentTodoId = this.state.dragFromTodo;
    // Exit if drop on the same todo 
    if( !targetTaskId && (currentTodoId === newTodoId) ) return;
    
    const currentTodo: ITodo = this.state.todos[currentTodoId];
    const currentTask: ITask = currentTodo.tasks.filter(task => task.id === taskId)[0];
    const newTodo: ITodo = this.state.todos[newTodoId];
    
    // Sort if dropped on another task
    if(targetTaskId) {
      let targetTasksList: ITask[] = newTodo.tasks;
      const targetTask: ITask = targetTasksList.filter(task => task.id === targetTaskId)[0];
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
        this.setState({
          todos: {
            ...this.state.todos,
            [newTodoId]: newTodo
          }
        })
        return;
      }

    } else {
      newTodo.tasks = [ //Task additing if dropped on the list
        ...newTodo.tasks,
        currentTask
      ]
    }
    //Remove task from old todo
    currentTodo.tasks = currentTodo.tasks.filter(task => task.id !== taskId);
    // State changing if dropped on the different todos
    this.setState({
      todos: {
        ...this.state.todos,
        [newTodoId]: newTodo,
        [currentTodoId]: currentTodo
      }
    })
  }

  render() {
    const { boardTitle } = this.props;
    const { todos } = this.state;
    console.log(this.state);
    
    return(
      <main className='todos'>
        <div className="todos-header">
          <h1>{boardTitle}</h1>
          <AddForm
            placeholder="Add new Todo"
            handleAdding={this.addNewTodo}
            className="todo-form"
          />
        </div>
        {
          (!Object.values(todos).length) ?
            <p>No todos</p> :
            <ul className="todos-list">
              {
                Object.values(todos).map(todo => 
                  <TodosList 
                    {...todo}
                    onNewTask={(title) => this.addNewTask(title, todo.id)}
                    key={todo.id}
                    handleDrop={
                      (taskId, targetTaskId?) => 
                        this.addTaskToNewTodo(taskId, todo.id, targetTaskId)
                    }
                    handleDrag={this.setDragFromTodo}
                  />
                )
              }
            </ul>
        }
      </main>
    )
  }
}

/* 
const TodosPage: React.FC <TodosPageProps> = ({ 
  todosList, boardTitle, boardId, storeTodos
}) => {

  // const { dispatch } = useContext(Context);
  const [todos, setTodos] = useState<ITodo[]>(todosList);

  const addNewTodo = (title: string) => {
    setTodos([
      ...todos,
      {
        title,
        id: v4(),
        tasks: []
      }
    ]);
  }

  const addNewTask = (title: string, todoId: string) => {

    const currentTodos: ITodo[] = todos.map(todo => {
      if(todo.id === todoId) {
        todo.tasks = [
          ...todo.tasks, 
          {
            title: title,
            id: v4(),
            isDone: false
          }
        ]
      }
      return todo;
    })
    
    setTodos([...currentTodos]);
  }

  return(
    <>
    <h1>{boardTitle}</h1>
    <AddForm
      placeholder="Add new Todo"
      handleAdding={addNewTodo}
    />
    {
      (!todos.length) ?
        <p>No todos</p> :
        <ul>
          {
            todos.map(todo => 
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
} */

export default TodosPage;