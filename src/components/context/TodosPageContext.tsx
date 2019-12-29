import React, { createContext } from 'react'

interface TodosPageContextData {
  setDragFromTodo: (todoId: string) => void
  /* startEditing: ( e: React.MouseEvent|MouseEvent ) => void,
  endEditing: (
    e: React.FocusEvent, 
    handleEditing: (title: string, id?: string) => void
  ) => void */
}

export const TodosPageContext = createContext<TodosPageContextData|null>(null);
