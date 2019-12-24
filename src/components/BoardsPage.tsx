import React, { useContext, useEffect } from 'react';
// import AddBoardForm from './AddBoardForm';
import AddForm from './AddForm'
import BoardsList from './BoardsList';
import { IBoard } from '../interfaces';
import { BoardsContext } from './context/BoardsContext';
import './stylesheets/BoardsPage.scss';

interface BoardsPageProps {
  onNewBoard?(title: string): void,
  boardsList: Array<IBoard>
}

const BoardsPage: React.FC<BoardsPageProps> = ({ boardsList, onNewBoard }) => {
  const [boards, setBoards] = useContext(BoardsContext);

  useEffect(() => {
    console.log("PROVIDER", boards);
  }, []);
  
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

export default BoardsPage;
