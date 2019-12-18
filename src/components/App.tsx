import React, { useEffect, useReducer, useState } from 'react';
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
      boardsList: []
    }
}

// Initial state
// const initialState: AppState = getInitialState();
const initialState: AppState = {
  boardsList: []
};

const App: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState); 

  /* useEffect(() => {
    localStorage.setItem('trello-store', JSON.stringify(state));
  }, [state]) */

  useEffect(() => {
    console.log(state);
  }, [state]);

  const findBoardById = (id: string): IBoard => {
    return state.boardsList.filter(board => board.id === id)[0]
  }

  const storeTodos = (boardId: string, todosList: Array<ITodo>): void => {
    console.log('This is store todos', todosList);

    dispatch({
      type: 'storeTodo',
      payload: {
        boardId,
        todosList
      }
    })
  } 

  return (
    <Context.Provider value={{
      dispatch
    }}>
      <Switch>
        <Route exact path='/' component={
          () => <BoardsPage boardsList={state.boardsList}/>
        }/>
        <Route path='/todos/:id' component={
          ({match}: MatchProps) => {
            const { title, todos, id } = findBoardById(match.params.id);

            return(
              <TodosPage 
                todosList={todos||[]}
                boardTitle={title}
                boardId={id}
                storeTodos={(todosList: ITodo[]) => storeTodos(id, todosList)}
              />
            )
          }
        }/>
      </Switch>
    </Context.Provider>
  )
}


export default App;