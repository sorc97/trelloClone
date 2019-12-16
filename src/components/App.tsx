import React, { Component } from 'react';
import { IBoard, ITodo, ITask } from '../interfaces'
import { v4 } from 'uuid';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

// State type
type AppState = {
  boardsList: Array<IBoard>,
  todos: Array<ITodo>
}
// Router params
interface MatchParams {
  id: string
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

// Initial state func
const getInitialState = (): AppState => {
  return (localStorage['trello-store']) ?
    JSON.parse(localStorage['trello-store']) : 
    {
      boardsList: [],
      todo: []
    }
}

// Initial state
// const initialState = getInitialState();
const initialState: AppState = getInitialState();

class App extends Component <{}, AppState> {
  readonly state = initialState;
  
  componentDidMount() {
    console.log("APP DID MOUNT");
  }

  addNewBoard = (title: string): void => {
    const newBoard: IBoard = {
      title,
      id: v4(),
      date: new Date()
    }

    console.log(newBoard);

    let boardsList = [
      newBoard,
      ...this.state.boardsList
    ]

    this.setState({boardsList}, this.setLocalStorage);
  }

  addNewTodo = (title: string, boardId: string): void => {
    const todos = [
      {
        title,
        id: v4(),
        tasks: [],
        boardId
      },
      ...this.state.todos
    ]
    
    this.setState({todos}, this.setLocalStorage);
  }

  addNewTask = (title: string, todoId: string): void => {
    let todos: Array<ITodo> = this.state.todos.map(
      todo => (todo.id !== todoId) ?
        todo :
        {
          ...todo,
          tasks: [
            ...todo.tasks,
            {
              title,
              id: v4(),
              isDone: false
            }
          ]
        }
    )
    console.log(todos);
    this.setState({todos}, this.setLocalStorage);
  }

  findBoardById = (id: string): IBoard => {
    const { boardsList } = this.state;
    const elem = boardsList.filter(item => item.id === id)[0];
    return elem;
  }

  findTodosById = (id: string): Array<ITodo> => {
    const { todos } = this.state;
    return todos.filter(todo => todo.boardId === id);
  }

  setLocalStorage = (): void => {
    localStorage['trello-store'] = JSON.stringify(this.state);
  }

  render() {
    const { boardsList } = this.state;
    console.log(this.state);
    return(
      <Switch>
        <Route exact path='/' component={
          () => <BoardsPage onNewBoard={this.addNewBoard} boardsList={boardsList}/>
        }/>
        <Route path='/todos/:id' component={
          ({match}: MatchProps) => {
            const { title, id } = this.findBoardById(match.params.id);
            const currentTodos = this.findTodosById(match.params.id);

            return(
              <TodosPage 
                title={title}
                todosList={currentTodos}
                addNewTodo={(title) => this.addNewTodo(title, id)}
                addNewTask={(this.addNewTask)}
              />
            )
          }
        } />
      </Switch>
    )
  }
} 

export default App;