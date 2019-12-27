import React from 'react'

interface TodoContextData {
  startEditing: ( e: React.MouseEvent|MouseEvent ) => void,
  endEditing: (
    e: React.FocusEvent, 
    handleEditing: (title: string, id?: string) => void
  ) => void
}

export const TodoContext = React.createContext<TodoContextData|null>(null);

