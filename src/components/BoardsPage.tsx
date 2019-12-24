import React, { useContext, useEffect } from 'react';
import { v4 } from 'uuid';
import AddForm from './AddForm'
import BoardsList from './BoardsList';
import { IBoard } from '../interfaces';
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
    setBoards([...boards, newBoard]);
  }

  useEffect(() => {
    console.log("PROVIDER", boards);
  }, []);
  
  return (
    <main className='boards'>
      <AddForm 
        handleAdding={addNewBoard}
        placeholder="Enter the name of board"
        button="+"
        className="boards-form"
      />
      <BoardsList boards={boards}/>
    </main>
  )
}

export default BoardsPage;