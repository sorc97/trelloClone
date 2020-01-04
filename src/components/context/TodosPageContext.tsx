import { createContext } from 'react'

interface TodosPageContextData {
  setDragFromTodo: (todoId: string) => void
}

export const TodosPageContext = createContext<TodosPageContextData | null>(null);
