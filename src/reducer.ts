import { IBoard, ITodo, IAction, AppState } from './interfaces';
import { v4 } from 'uuid'

export default function reducer(state: AppState, action: IAction) {
  switch(action.type) {
    case "addBoard": {
      const newBoard = {
        title: action.payload.title,
        id: v4(),
        date: new Date()
      }

      return {
        ...state,
        boardsList: [newBoard , ...state.boardsList]
      }
    }

    case "addTodo": 
      return {
        
      }

    case "addTask": {
      const newTask = {
        title: action.payload.title,
        id: v4(),
        isDone: false
      }

      const currentTodo: ITodo[] = state.activeTodos.map(todo => {
        if(todo.id === action.payload.todoId) {
          todo.tasks = [...todo.tasks, newTask]
        }
        
        return todo;
      })

      return {
        ...state, 
        activeTodos: currentTodo
      }
    }

    case "setActiveTodos": 
    console.log(action.payload.activeTodos);
      const currentBoard = state.boardsList.filter(board => board.id === action.payload.boardId)[0];

      return {
        ...state,
        activeTodos: [...currentBoard.todos]
      }

    case "storeTodos": {
      const boardsList = state.boardsList.map(board => {
        if(board.id === action.payload.boardId) {
          board.todos = [...action.payload.todosList];
        }
        
        return board
      })

      return {
        ...state,
        boardsList
      }
    }
    
    default:
      return state;
  }
}
