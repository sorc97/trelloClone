import React, { useContext, useEffect, useState } from 'react';
import TodosList from './TodosList'
import AddForm from './AddForm'
import { ITodo, IBoard, ITodoList } from '../interfaces';
import { v4 } from 'uuid';
import { Context } from '../context';
import './stylesheets/TodosPage.scss';

interface TodosPageProps {
  boardTitle: string,
  // currentBoard: IBoard,
  todosList: ITodoList,
  boardId: string,
  storeTodos: (todosList: ITodoList) => void
}
type TodosPageState = {
  todos: ITodoList
}
// const initialState: TodosPageState = {
//   todos: []
// }

class TodosPage extends React.Component<TodosPageProps, TodosPageState> {
  readonly state = {
    todos: this.props.todosList
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

  removeTask = (id: string, todoId: string): void => {
    
  }

  addTaskToNewTodo = (id: string, todoId: string): void => {

  }

  /* handleDrop = (id: string, todoId: string): void => {

  } */

  render() {
    const { boardTitle } = this.props;
    const { todos } = this.state;
    // const currentTodos = todos.filter(todo => todo.board === boardId);
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
                    onNewTask={(title: string) => this.addNewTask(title, todo.id)}
                    key={todo.id}
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