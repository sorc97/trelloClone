import React, { useEffect, useReducer } from 'react';
import reducer from '../reducer'
import { IBoard, ITodo, ITask, AppState } from '../interfaces';
import { v4 } from 'uuid';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Context } from '../context'

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
      boardsList: [],
      activeTodos: []
    }
}

// Initial state
const initialState: AppState = getInitialState();

const App: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState); 
  const { boardsList, activeTodos } = state;

  useEffect(() => {
    localStorage.setItem('trello-store', JSON.stringify(state));
  }, [state])

  useEffect(() => {
    console.log(state);
  }, [state]);

  const findBoardById = (id: string): IBoard => {
    return boardsList.filter(board => board.id === id)[0]
  }

  /* const currentTodos = (id: string): Array<ITodo> => {
    return todos.filter(todo => todo.boardId === id)
  } */

  return (
    <Context.Provider value={{
      dispatch
    }}>
      <Switch>
        <Route exact path='/' component={
          () => <BoardsPage boardsList={boardsList}/>
        }/>
        <Route path='/todos/:id' component={
          ({match}: MatchProps) => {
            const { title, todos, id } = findBoardById(match.params.id);
            // const currentBoard = findBoardById(match.params.id);
            // const boardsTodos = currentTodos(match.params.id);

            useEffect(() => {
              console.log('HI');
              dispatch({
                type: "setActiveTodos",
                payload: {
                  activeTodos: todos || []
                }
              })
            }, [])

            return(
              <TodosPage 
                todosList={activeTodos}
                boardTitle={title}
                boardId={id}
              />
            )
          }
        }/>
      </Switch>
    </Context.Provider>
  )
}


export default App;