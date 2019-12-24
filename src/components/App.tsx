import React, { useEffect, useReducer, useState } from 'react';
// import reducer from '../reducer'
import { IBoard, ITodo, ITask, AppState, ITodoList } from '../interfaces';
import { v4 } from 'uuid';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { BoardsProvider } from './context/BoardsContext';
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
  }, [state])

  useEffect(() => {
    console.log(state);
  }, [state]);

  const findBoardById = (id: string): IBoard => {
    return state.boardsList.filter(board => board.id === id)[0]
  }

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

  const storeTodos = (boardId: string, todosList: ITodoList): void => {
    console.log('This is store todos', todosList);

    const boardsList = state.boardsList.map(board => {
      if(board.id === boardId) {
        board.todos = {...todosList};
      }
      
      return board
    })
    
    setState({boardsList});
  } 

  /* const currentTodos = (id: string): Array<ITodo> => {
    return todos.filter(todo => todo.boardId === id)
  } */

  return (
    <BoardsProvider>
      <Switch>
        <Route exact path='/' component={
          () => <BoardsPage boardsList={state.boardsList} onNewBoard={addBoard}/>
        }/>
        <Route path='/todos/:id' component={
          ({match}: MatchProps) => {
            const { title, todos, id } = findBoardById(match.params.id);
            // const currentBoard = findBoardById(match.params.id);
            // const boardsTodos = currentTodos(match.params.id);

            return(
              <TodosPage 
                todosList={todos||{}}
                boardTitle={title}
                boardId={id}
                storeTodos={(todosList: ITodoList) => storeTodos(id, todosList)}
              />
            )
          }
        }/>
      </Switch>
      </BoardsProvider>
  )
}


export default App;