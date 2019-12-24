import { RouteComponentProps, match } from 'react-router-dom'

interface InitialFields {
  title: string,
  id: string,
}

export interface IBoard extends InitialFields {
  date: Date,
  todos: ITodoList
  // todos?: Array<ITodo>
  // todosList?: Array<ITodo>
}

export interface ITodo extends InitialFields {
  // boardId: string,
  tasks: Array<ITask>
}

export interface ITodoList {
  [id: string]: ITodo
}

export interface ITask extends InitialFields {
  isDone: boolean,
  todoId: string
}

export interface IAction {
  type: string,
  payload: IPayloadData
}

export interface IPayloadData {
  title?: string,
  todoId?: string,
  boardId?: string,
  activeTodos?: Array<ITodo>,
  todosList?: Array<ITodo>
}

export type AppState = {
  boardsList: Array<IBoard>,
  // activeTodos: Array<ITodo>
}

export type BoardsState = Array<IBoard>;

export interface MatchParams {
  id: string
}

export interface MatchProps extends RouteComponentProps<MatchParams> {
}
