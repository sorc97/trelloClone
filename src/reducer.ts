import { IBoard, ITodo, IAction } from './interfaces';
import { v4 } from 'uuid'

type AppState = {
  boardsList: Array<IBoard>,
  todos: Array<ITodo>
}

export default function reducer(state: AppState, action: IAction) {
  switch(action.type) {
    case "addBoard":
      const newBoard = {
        title: action.payload.title,
        id: v4(),
        date: new Date()
      }

      return {
        ...state,
        boardsList: [newBoard , ...state.boardsList]
      }

    case "addTodo":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload.title,
            id: v4(),
            boardId: action.payload.boardId,
            tasks: []
          }
        ]
      }

    case "addTask": 
      const newTask = {
        title: action.payload.title,
        id: v4(),
        isDone: false
      }

      const currentTodo: ITodo[] = state.todos.map(todo => {
        if(todo.id === action.payload.todoId) {
          todo.tasks = [...todo.tasks, newTask]
        }
        
        return todo;
      })

      return {...state, todos: currentTodo};
    
    default:
      return state;
  }
}
