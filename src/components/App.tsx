import React, { Component } from 'react';
import { IBoard, ITodo } from '../interfaces'
import { v4 } from 'uuid';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

// State type
type AppState = {
  boardsList: Array<IBoard>
}
// Router params
interface MatchParams {
  id: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

// Initial state func
/* const getInitialState = (): AppState => {
  return (localStorage['trello-store']) ?
    JSON.parse(localStorage['trello-store']) : 
    {
      boardsList: []
    }
} */

// Initial state
// const initialState = getInitialState();
const initialState: AppState = {
  boardsList: []
};

class App extends Component <{}, AppState> {
  readonly state = initialState;
  
  componentDidMount() {
    console.log("APP DID MOUNT");
  }

  addNewBoard = (title: string): void => {
    const newBoard: IBoard = {
      title,
      id: v4(),
      date: new Date(),
      todosList: []
    }

    console.log(newBoard);

    let boardsList = [
      newBoard,
      ...this.state.boardsList
    ]

    this.setState({boardsList}, this.setLocalStorage);
  }

  addNewTodo = (title: string, id: string): void => {
    let boardsList = this.state.boardsList.map(
      board => (board.id !== id) ? 
        board:
        {
          ...board,
          todosList: [
            ...board.todosList,
            {
              title,
              id: v4(),
              tasks: []
            }
          ]
        }
    )
    
    // this.setState({boardsList}, this.setLocalStorage);
  }

  addNewTask = (boardId: string, title: string, id: string): void => {
    const boardsList = this.state.boardsList.map(
      board => (board.id !== boardId) ?
        board:
        {
          ...board,
          todosList: [
            ...board.todosList,
            
          ]
        } 
    )
    // this.setState({boardsList}, this.setLocalStorage);
  }

  findBoardById = (id: string): IBoard => {
    const { boardsList } = this.state;
    const elem = boardsList.filter(item => item.id === id)[0];
    return elem;
  }

  setLocalStorage = (): void => {
    localStorage['trello-store'] = JSON.stringify(this.state);
  }

  render() {
    const { boardsList } = this.state;
    console.log(this.state);
    return(
      <Switch>
        <Route exact path='/' component={
          () => <BoardsPage onNewBoard={this.addNewBoard} boardsList={boardsList}/>
        }/>
        <Route path='/todos/:id' component={
          ({match}: MatchProps) => {
            const { title, id } = this.findBoardById(match.params.id);
            // const board = this.findBoardById(match.params.id);

            return(
              <TodosPage 
                title={title}
                boardId={id}
              />
              /* <TodosPage 
                title={title}
                todosList={todosList}
                addNewTodo={(title: string) => this.addNewTodo(title, boardId)}
                addNewTask={(title: string, id: string) => this.addNewTask(boardId, title, id)}
              /> */
            )
          }
        } />
      </Switch>
    )
  }
} 

export default App;