import React, { useContext } from 'react';
import { v4 } from 'uuid';
import { IBoard } from '../interfaces';
import AddForm from './AddForm'
import BoardsList from './BoardsList';
import { BoardsContext } from './context/BoardsContext';
import './stylesheets/BoardsPage.scss';

const BoardsPage: React.FC = () => {
  const [boards, setBoards] = useContext(BoardsContext);

  const addNewBoard = (title: string): void => {
    const newBoard: IBoard = {
      title,
      id: v4(),
      date: new Date,
      todos: {}
    }

    setBoards(prevState => [...prevState, newBoard]);
  }

  const removeBoard = (id: string): void => {
    const newBoardsList = boards.filter(board => board.id !== id);
    setBoards(newBoardsList);
  }

  return (
    <main className='boards'>
      <AddForm
        handleAdding={addNewBoard}
        placeholder="New board name"
        button="+"
        className="boards-form"
      />
      <BoardsList 
        boards={boards} 
        onRemove={removeBoard}
      />
    </main>
  )
}

export default BoardsPage;