import React, { useContext } from 'react';
// import AddBoardForm from './AddBoardForm';
import AddForm from './AddForm'
import BoardsList from './BoardsList';
import { IBoard } from '../interfaces';
import { Context } from '../context';
import './stylesheets/BoardsPage.scss';

interface BoardsPageProps {
  onNewBoard?(title: string): void,
  boardsList: Array<IBoard>
}

const BoardsPage: React.FC<BoardsPageProps> = ({ boardsList, onNewBoard }) => {
  // const { dispatch } = useContext(Context);  

  /* const onNewBoard = (title: string): void => {
    dispatch({
      type: "addBoard",
      payload: {
        title
      }
    })
  } */

  return (
    <main className='boards'>
      <AddForm 
        handleAdding={onNewBoard}
        placeholder="Enter the name of board"
        button="+"
        className="boards-form"
      />
      <BoardsList boards={boardsList}/>
    </main>
  )
}



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
