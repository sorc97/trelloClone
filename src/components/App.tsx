import React, { Component } from 'react';
import { IBoard } from '../interfaces'
import { v4 } from 'uuid';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

interface AppState {
  boardsList: Array<IBoard>
}

interface MatchParams {
  id: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

/* const initialState: AppState = {
  boardsList: []
} */

const getInitialState = (): AppState => {
  return (localStorage['trello-store']) ?
    JSON.parse(localStorage['trello-store']) : 
    {
      boardsList: []
    }
}

class App extends Component <{}, AppState> {
  readonly state = getInitialState();

  addNewBoard = (title: string): void => {
    const newBoard: IBoard = {
      title,
      id: v4(),
      date: new Date(),
      todosList: [
        {
          title: "In proccess",
          id: v4(),
          tasks: [
            {title: "Initial Webpack Config", id: v4(), isDone: true},
            {title: "Components", id: v4(), isDone: false}
          ]
        }
      ]
    }

    console.log(newBoard);

    let boardsList = [
      newBoard,
      ...this.state.boardsList
    ]

    this.setState({boardsList}, this.setLocalStorage);
  }

  findById = (id: string): IBoard => {
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
          ({match}: MatchProps) => <TodosPage title={this.findById(match.params.id).title}/>
        } />
      </Switch>
    )
  }
} 

export default App;