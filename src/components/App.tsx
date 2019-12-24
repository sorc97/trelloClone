import React, { useEffect, useReducer, useState } from 'react';
// import reducer from '../reducer'
import { IBoard, ITodo, ITask, AppState, ITodoList } from '../interfaces';
import { v4 } from 'uuid';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { BoardsProvider } from './context/BoardsContext';
import './stylesheets/style.scss';

const App: React.FunctionComponent = () => 
  <BoardsProvider>
    <Switch>
      <Route exact path='/' component={BoardsPage}/>
      <Route path='/todos/:id' component={TodosPage}/>
    </Switch>
  </BoardsProvider>

export default App;