import React, { useState, createContext, ReactNode, useEffect} from 'react'
import { BoardsState } from '../../interfaces'

interface IBoardProviderProps {
  children: ReactNode,
}

type IBoardContextData = [BoardsState, React.Dispatch<React.SetStateAction<BoardsState>>];
export const BoardsContext = createContext<IBoardContextData | null>(null);

// Initial state
const getInitialState = (): BoardsState => {
  return (localStorage['trello-store']) ?
    JSON.parse(localStorage['trello-store']) : 
    []
}
const initialState: BoardsState = getInitialState();
// const initialState: BoardsState = [];

// Provider Component 
export const BoardsProvider: React.FC <IBoardProviderProps> = ({children}) => {
  const [boards, setBoards] = useState<BoardsState>(initialState);

  useEffect(() => {
    localStorage.setItem('trello-store', JSON.stringify(boards));
  }, [boards])

  return(
    <BoardsContext.Provider value={[boards, setBoards]}>
      {children}
    </BoardsContext.Provider>
  )
}
