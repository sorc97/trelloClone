import React, { useContext, useEffect, useState } from 'react';
import TodosList from './TodosList'
import AddForm from './AddForm'
import { ITodo, IBoard, ITodoList, ITask } from '../interfaces';
import { Context } from '../context';
import './stylesheets/TodosPage.scss';

// Types and Interfaces
interface TodosPageProps {
  boardTitle: string,
  // currentBoard: IBoard,
  todosList: ITodoList,
  storeTodos?: (todosList: ITodoList) => void,
  onNewTodo: (title: string) => void,
  onNewTask: (title: string, todoId: string) => void,
  onDragTask: (
    taskId: string, newTodoId: string, currentTodoId: string, targetTaskId?: string
  ) => void
}

// type TodosPageState = string;
type TodosPageState = {
  dragFromTodo: string
};

class TodosPage extends React.Component<TodosPageProps, TodosPageState> {
  /* constructor(props: TodosPageProps) {
    super(props);
    this.state = {
      dragFromTodo: ""
    }
    // this.todosListRef = React.createRef();
  } */
  private todosListRef: React.RefObject<HTMLUListElement> = React.createRef();

  readonly state = {
    dragFromTodo: ""
  };

  setDragFromTodo = (title: string): void => {
    this.setState({
      dragFromTodo: title
    })
  }

  componentDidMount() {
    console.log("WAS MOUNTED");
  }

  getSnapshotBeforeUpdate(prevProps: TodosPageProps, prevState: TodosPageState) {
    // Добавляются ли в список новые элементы?
    // Запоминаем значение прокрутки, чтобы использовать его позже.
    /* if (prevProps.todosList.length < this.props.todosList.length) {
      const list = this.todosListRef.current;
      return list.scrollWidth - list.scrollLeft;
    }
    return null; */
    const list = this.todosListRef.current;
    // return list.scrollWidth - list.scrollLeft;
    return list.scrollLeft;
  }

  componentDidUpdate(prevProps: TodosPageProps, prevState: TodosPageState, snapshot: any) {
    // Если снимок (snapshot) передан, значит элементы добавлены.
    // Выравниваем прокрутку так, чтобы новые элементы не выталкивали старые.
    // (снимок – значение, переданное из getSnapshotBeforeUpdate)
    /* if (snapshot !== null) {
      const list = this.todosListRef.current;
      list.scrollLeft = list.scrollWidth - snapshot;
    } */
    console.log("Was update");
    const list = this.todosListRef.current;
    list.scrollLeft = snapshot;
  }
  
  render() {
  const {todosList, boardTitle, onNewTodo, onNewTask, onDragTask} = this.props;
  const { dragFromTodo } = this.state;
    return(
      <main className='todos'>
        <div className="todos-header">
          <h1>{boardTitle}</h1>
          <AddForm
            placeholder="Add new Todo"
            handleAdding={onNewTodo}
            className="todo-form"
          />
        </div>
        {
          (!Object.values(todosList).length) ?
            <p>No todos</p> :
            <ul className="todos-list" ref={this.todosListRef}>
              {
                Object.values(todosList).map(todo => 
                  <TodosList 
                    {...todo}
                    onNewTask={(title) => onNewTask(title, todo.id)}
                    key={todo.id}
                    handleDrop={
                      (taskId, targetTaskId?) => 
                        onDragTask(taskId, todo.id, dragFromTodo, targetTaskId)
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



/* const TodosPage: React.FC <TodosPageProps> = ({ 
  todosList, boardTitle, onNewTodo, onNewTask, onDragTask
}) => {

  const [dragFromTodo, setDragTodo] = useState<TodosPageState>("");

  const setDragFromTodo = (todoId: string) => {
    setDragTodo(todoId);
  }

  return(
    <main className='todos'>
      <div className="todos-header">
        <h1>{boardTitle}</h1>
        <AddForm
          placeholder="Add new Todo"
          handleAdding={onNewTodo}
          className="todo-form"
        />
      </div>
      {
        (!Object.values(todosList).length) ?
          <p>No todos</p> :
          <ul className="todos-list">
            {
              Object.values(todosList).map(todo => 
                <TodosList 
                  {...todo}
                  onNewTask={(title) => onNewTask(title, todo.id)}
                  key={todo.id}
                  handleDrop={
                    (taskId, targetTaskId?) => 
                      onDragTask(taskId, todo.id, dragFromTodo,targetTaskId)
                  }
                  handleDrag={setDragFromTodo}
                />
              )
            }
          </ul>
      }
    </main>
  )
} */

export default TodosPage;