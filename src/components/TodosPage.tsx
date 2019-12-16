import React from 'react';
import TodosList from './TodosList'
import AddForm from './AddForm'
import { ITodo } from '../interfaces';
import { v4 } from 'uuid';

interface TodosPageProps {
  title: string,
  todosList: Array<ITodo>,
  addNewTodo: (title: string) => void,
  addNewTask: (title: string, id: string) => void
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

const TodosPage: React.FC <TodosPageProps> = ({ 
  title, todosList, addNewTodo, addNewTask
}) => {

  return(
    <>
    <h1>{title}</h1>
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

export default TodosPage;