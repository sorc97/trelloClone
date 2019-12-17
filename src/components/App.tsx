import React, { useEffect, useReducer } from 'react';
import reducer from '../reducer'
import { IBoard, ITodo, ITask } from '../interfaces';
import { v4 } from 'uuid';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Context } from '../context'

// State type
type AppState = {
  boardsList: Array<IBoard>,
  todos: Array<ITodo>
}
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
      todo: []
    }
}

// Initial state
const initialState: AppState = getInitialState();

const App: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState); 
  const { boardsList, todos } = state;

  useEffect(() => {
    localStorage.setItem('trello-store', JSON.stringify(state));
  }, [state])

  console.log(boardsList);
  console.log(todos);

  const findBoardById = (id: string): IBoard => {
    return boardsList.filter(board => board.id === id)[0]
  }

  const currentTodos = (id: string): Array<ITodo> => {
    return todos.filter(todo => todo.boardId === id)
  }

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
            const { title } = findBoardById(match.params.id);
            const boardsTodos = currentTodos(match.params.id);

            return(
              <TodosPage 
                boardTitle={title}
                todosList={boardsTodos}
                boardId={match.params.id}
              />
            )
          }
        }/>
      </Switch>
    </Context.Provider>
    /* <Switch>
        <Route exact path='/' component={
          () => <BoardsPage onNewBoard={this.addNewBoard} boardsList={boardsList}/>
        }/>
        <Route path='/todos/:id' component={
          ({match}: MatchProps) => {
            const { title, id } = this.findBoardById(match.params.id);
            const currentTodos = this.findTodosById(match.params.id);

            return(
              <TodosPage 
                title={title}
                todosList={currentTodos}
                addNewTodo={(title) => this.addNewTodo(title, id)}
                addNewTask={(this.addNewTask)}
              />
            )
          }
        } />
      </Switch> */
  )
}


export default App;