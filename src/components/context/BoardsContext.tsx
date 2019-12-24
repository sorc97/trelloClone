import React, { useState, createContext, ReactNode, useEffect} from 'react'
import {AppState, BoardsState} from '../../interfaces'

interface IBoardProviderProps {
  children: ReactNode,
}

type IBoardContextData = [BoardsState, React.Dispatch<React.SetStateAction<BoardsState>>];
export const BoardsContext = createContext<IBoardContextData | null>(null);

// Initial state
/* const getInitialState = (): AppState => {
  return (localStorage['trello-store']) ?
    JSON.parse(localStorage['trello-store']) : 
    []
}
const initialState: AppState = getInitialState(); */
const initialState: BoardsState = [];

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
