import React from 'react';
// import AddBoardForm from './AddBoardForm';
import AddForm from './AddForm'
import BoardsList from './BoardsList';
import { IBoard } from '../interfaces';

interface BoardsPageProps {
  onNewBoard(title: string): void,
  boardsList: Array<IBoard>
}

const BoardsPage: React.FC<BoardsPageProps> = ({ onNewBoard, boardsList }) => 
  <>
    <AddForm 
      handleAdding={onNewBoard}
      placeholder="Enter the name of board"
      button="Create"
    />
    <BoardsList boards={boardsList}/>
  </>



/* 
class BoardsPage extends Component <{}, BoardsState> {
  readonly state = initialState;

  addNewBoard = (title: string): void => {
    const newBoard: IBoard = {
      title,
      id: v4(),
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
 */
export default BoardsPage;
