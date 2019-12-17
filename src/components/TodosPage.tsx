import React, { useContext } from 'react';
import TodosList from './TodosList'
import AddForm from './AddForm'
import { ITodo } from '../interfaces';
import { v4 } from 'uuid';
import { Context } from '../context';

interface TodosPageProps {
  boardTitle: string,
  todosList: Array<ITodo>,
  boardId: string
}

const TodosPage: React.FC <TodosPageProps> = ({ 
  boardTitle, todosList, boardId
}) => {

  const { dispatch } = useContext(Context);

  const addNewTodo = (title: string) => {
    dispatch({
      type: 'addTodo',
      payload: {
        title,
        boardId
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
    </>
  )
}

/* interface TodosPageProps {
  title: string,
  boardId: string
} */

/* type TodosPageState = {
  todos: Array<ITodo>
}

const initialState: TodosPageState = {
  todos: []
}

class TodosPage extends React.Component<TodosPageProps, TodosPageState> {
  readonly state = initialState;

  componentDidMount() {
    console.log("TODOS PAGES DID MOUNT");
  }

  addNewTodo = (title: string): void => {
    const { boardId } = this.props;
    const todos = [
      {
        title,
        id: v4(),
        board: boardId,
        tasks: []
      },
      ...this.state.todos
    ]
    
    this.setState({todos});
  }

  addNewTask = (title: string, todoId: string): void => {
    const todos = this.state.todos.map(
      todo => (todo.id !== todoId) ?
        todo :
        {
          ...todo,
          tasks:[
            ...todo.tasks,
            {
              title,
              id: v4(),
              isDone: false
            }
          ]
        }
    )

    this.setState({todos});
  }

  render() {
    const { title, boardId } = this.props;
    const { todos } = this.state;
    const currentTodos = todos.filter(todo => todo.board === boardId);
    console.log(this.state);
    console.log(boardId);
    
    return(
      <>
      <h1>{title}</h1>
      <AddForm
        placeholder="Add new Todo"
        handleAdding={this.addNewTodo}
      />
      <ul>
        {
          currentTodos.map(todo => 
            <li key={todo.id}>
              <TodosList 
                {...todo}
                onNewTask={(title: string) => this.addNewTask(title, todo.id)}
              />
            </li>
          )
        }
      </ul>
      </>
    )
  }
} */

export default TodosPage;