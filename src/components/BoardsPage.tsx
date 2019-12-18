import React, { useContext } from 'react';
// import AddBoardForm from './AddBoardForm';
import AddForm from './AddForm'
import BoardsList from './BoardsList';
import { IBoard } from '../interfaces';
import { Context } from '../context'

interface BoardsPageProps {
  onNewBoard?(title: string): void,
  boardsList: Array<IBoard>
}

const BoardsPage: React.FC<BoardsPageProps> = ({ boardsList }) => {
  const { dispatch } = useContext(Context);  

  const onNewBoard = (title: string): void => {
    dispatch({
      type: "addBoard",
      payload: {
        title
      }
    })
  }

  return (
    <>
      <AddForm 
        handleAdding={onNewBoard}
        placeholder="Enter the name of board"
        button="Create"
      />
      <BoardsList boards={boardsList}/>
    </>
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
