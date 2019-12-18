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
type TodosPageState = {
  todos: Array<ITodo>
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
    const todos = [
      {
        title,
        id: v4(),
        tasks: []
      },
      ...this.state.todos
    ]
    
    this.setState({todos});
  }

  addNewTask = (title: string, todoId: string): void => {

    const todos: ITodo[] = this.state.todos.map(todo => {
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
    
    this.setState({todos});
  }

  render() {
    const { boardTitle } = this.props;
    const { todos } = this.state;
    // const currentTodos = todos.filter(todo => todo.board === boardId);
    console.log(this.state);
    
    return(
      <>
      <h1>{boardTitle}</h1>
      <AddForm
        placeholder="Add new Todo"
        handleAdding={this.addNewTodo}
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
                    onNewTask={(title: string) => this.addNewTask(title, todo.id)}
                  />
                </li>
              )
            }
          </ul>
      }
      </>
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