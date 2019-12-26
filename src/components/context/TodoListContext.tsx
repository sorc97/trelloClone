import React from 'react'

interface TodoListContextData {
  removeTask: () => void
}

export const TodoListContext = React.createContext<TodoListContextData | null>(null);
