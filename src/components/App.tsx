import React from 'react';
import BoardsPage from './boards/BoardsPage';
import TodosPage from './todos/TodosPage';
import { BoardsProvider } from './context/BoardsContext';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

const App: React.FunctionComponent = () =>
  <BoardsProvider>
    <Switch>
      <Route exact path='/' component={BoardsPage} />
      <Route path='/board/:id' component={TodosPage} />
    </Switch>
  </BoardsProvider>


export default App;