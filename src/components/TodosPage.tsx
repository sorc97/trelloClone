import React from 'react'

interface TodosPageProps {
  title: string
}

const TodosPage: React.FC <TodosPageProps> = ({ title }) => {

  return(
    <h1>{title}</h1>
  )
}

export default TodosPage;