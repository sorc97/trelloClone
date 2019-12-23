import React, { useEffect, useReducer, useState } from 'react';
// import reducer from '../reducer'
import { IBoard, ITodo, ITask, AppState, ITodoList } from '../interfaces';
import { v4 } from 'uuid';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Context } from '../context';
import { insert, findElementById } from '../helpers/array-helpers';
import './stylesheets/style.scss';

// Router params
interface MatchParams {
  id: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

// Initial state func
const getInitialState = (): AppState => {
  return (localStorage['trello-store']) ?
    JSON.parse(localStorage['trello-store']) : 
    {
      boardsList: []
    }
}

// Initial state
const initialState: AppState = getInitialState();
// const initialState: AppState = {boardsList: []};

const App: React.FunctionComponent = () => {
  const [state, setState] = useState<AppState>(initialState);

  useEffect(() => {
    localStorage.setItem('trello-store', JSON.stringify(state));
    console.log(state);
  }, [state])

  // ADD BOARD
  const addBoard = (title: string): void => {
    setState({
      boardsList: [
        ...state.boardsList,
        {
          title,
          id: v4(),
          date: new Date(),
          todos: {}
        }
      ]
    })
  }   

  // ADD TODO
  const addNewTodo = (title: string, boardId: string): void => {
    const id = v4();
    const boardsList = state.boardsList.map(board => {
      if(board.id === boardId) {
        board.todos = {
          ...board.todos,
          [id]: {
            title,
            id,
            tasks: []
          }
        }
      }
      return board;
    })

    setState({boardsList});
  }

  // ADD TASK
  const addNewTask = (title: string, todoId: string, boardId: string): void => {
    const boardsList = state.boardsList.map(board => {  //searching for current board
      if(board.id === boardId) {
        const currentTodo: ITodo = {...board.todos[todoId]};  //copy of current todo
        currentTodo.tasks = [ // new task adding
          ...currentTodo.tasks,
          {
            title,
            id: v4(),
            isDone: false,
            todoId
          }
        ]

        board.todos = {  // todo inserting 
          ...board.todos,
          [todoId]: currentTodo
        }
      }
      
      return board;
    })

    setState({boardsList});
  }

  //Drag and drop handling
  const addTaskToNewTodo = (
    taskId: string, 
    newTodoId: string, 
    currentTodoId: string, 
    boardId: string, 
    targetTaskId?: string
  ): void => {
    // Exit if drop on the same todo 
    if( !targetTaskId && (currentTodoId === newTodoId) ) return;
    
    const currentBoard = findElementById(boardId, state.boardsList);
    
    const currentTodo: ITodo = {...currentBoard.todos[currentTodoId]};
    const currentTask: ITask = findElementById(taskId, currentTodo.tasks);
    const newTodo: ITodo = {...currentBoard.todos[newTodoId]};
    
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
        const boardsList = state.boardsList.map(board => {
          if(board.id === boardId) {
            board.todos = {
              ...board.todos,
              [newTodoId]: newTodo
            }
          }
          return board;
        })
        
        setState({boardsList})
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
    const boardsList = state.boardsList.map(board => {
      if(board.id === boardId) {
        board.todos = {
          ...board.todos,
          [newTodoId]: newTodo,
          [currentTodoId]: currentTodo
        }
      }
      return board;
    })
    
    setState({boardsList});
  }

  return (
    <Switch>
      <Route exact path='/' component={
        () => <BoardsPage boardsList={state.boardsList} onNewBoard={addBoard}/>
      }/>
      <Route path='/todos/:id' component={
        ({match}: MatchProps) => {
          const currentBoard = findElementById(match.params.id, state.boardsList);
          const { title, todos, id: boardId } = currentBoard;

          return(
            <TodosPage 
              todosList={todos||{}}
              boardTitle={title}
              onNewTodo={(title) => addNewTodo(title, boardId)}
              onNewTask={(title, todoId) => addNewTask(title, todoId, boardId)}
              onDragTask={
                (taskId, newTodoId, currentTodoId, targetTaskId?) => 
                  addTaskToNewTodo(taskId, newTodoId, currentTodoId , boardId, targetTaskId)
              }
            />
          )
        }
      }/>
    </Switch>
  )
}

export default App;