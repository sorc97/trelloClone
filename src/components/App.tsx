import React, { Component } from 'react';
import AddBoardForm from './AddBoardForm';
import BoardsList from './BoardsList';
import { IBoard } from '../interfaces';

interface AppState {
  boardsList: Array<IBoard>
}

const initialState: AppState = {
  boardsList: []
}

class App extends Component <{}, AppState> {
  readonly state = initialState;

  addNewBoard = (title: string): void => {
    const newBoard: IBoard = {
      title,
      id: Date.now(),
      date: new Date()
    }

    let boardsList = [
      newBoard,
      ...this.state.boardsList
    ]

    this.setState({boardsList});
  }

  render() {
    const { boardsList } = this.state;
    console.log(this.state);
    return(
      <>
        <AddBoardForm onNewBoard={this.addNewBoard}/>
        <BoardsList boards={boardsList}/>
      </>
    )
  }
} 

export default App;