import React, { useContext, useEffect, useState } from 'react';
import TodosList from './TodosList'
import AddForm from './AddForm'
import { ITodo, IBoard, ITodoList, ITask, MatchProps, MatchParams } from '../interfaces';
import { v4 } from 'uuid';
import { BoardsContext } from './context/BoardsContext';
import './stylesheets/TodosPage.scss';
import { insert, findElementById } from '../helpers/array-helpers';
import { match } from 'react-router-dom';


interface TodosPageProps {
  // routeProps: MatchProps
  match: match<MatchParams>
}

type TodosPageState = string;

const TodosPage: React.FC <TodosPageProps> = ({match}) => {
  // State and context
  const [dragFromTodo, setDragTodo] = useState<TodosPageState>("");
  const [boards, setBoards] = useContext(BoardsContext);
  const boardId = match.params.id;
  const currentBoard: IBoard = findElementById(boardId, boards);
  const currentTodos: ITodoList = {...currentBoard.todos};

  const setDragFromTodo = (todoId: string) => {
    setDragTodo(todoId);
  }

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

    setNewBoards(todos);
  }

  const addNewTask = (title: string, todoId: string): void => {
    const currentTodo: ITodo = {...currentTodos[todoId]};
    currentTodo.tasks = [
      ...currentTodo.tasks,
      {
        title,
        id: v4(),
        isDone: false,
        todoId
      }
    ]

    const newTodosList: ITodoList = {
      ...currentTodos,
      [currentTodo.id]: currentTodo
    }

    setNewBoards(newTodosList);
    /* this.setState({
      todos: {
        ...this.state.todos,
        [todoId]: currentTodo
      }
    }); */
  }

  const setNewBoards = (newTodos: ITodoList, todo?: ITodo): void => {
    const newBoardsList = boards.map(board => {
      if(board.id === boardId) {
        // board.todos = {
        //   ...board.todos,
        //   [todo.id]: todo
        // }
        board.todos = newTodos;
      }
      
      return board
    })
    setBoards(newBoardsList);
  }

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
      newTodo.tasks = [ //Task additing if dropped on the list
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
  
  return(
    <main className='todos'>
      <div className="todos-header">
        <h1>{currentBoard.title}</h1>
        <AddForm
          placeholder="Add new Todo"
          handleAdding={addNewTodo}
          className="todo-form"
        />
      </div>
      {
        (!Object.values(currentTodos).length) ?
          <p>No todos</p> :
          <ul className="todos-list">
            {
              Object.values(currentTodos).map(todo => 
                <TodosList 
                  {...todo}
                  onNewTask={(title) => addNewTask(title, todo.id)}
                  key={todo.id}
                  handleDrop={
                    (taskId, targetTaskId?) => 
                      onDragTask(taskId, todo.id, targetTaskId)
                  }
                  handleDrag={setDragFromTodo}
                />
              )
            }
          </ul>
      }
    </main>
  )
}

export default TodosPage;