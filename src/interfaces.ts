import { RouteComponentProps } from 'react-router-dom'

interface InitialFields {
  title: string,
  id: string,
}

export interface IBoard extends InitialFields {
  date: Date,
  todos: ITodoList
}

export interface ITodo extends InitialFields {
  tasks: Array<ITask>
}

export interface ITodoList {
  [id: string]: ITodo
}

export interface ITask extends InitialFields {
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
}

export type BoardsState = Array<IBoard>;

export interface MatchParams {
  id: string
}

export interface MatchProps extends RouteComponentProps<MatchParams> {
}
