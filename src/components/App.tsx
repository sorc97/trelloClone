import React from 'react';
import BoardsPage from './BoardsPage';
import TodosPage from './TodosPage';
import { Route, Switch } from 'react-router-dom';
import { BoardsProvider } from './context/BoardsContext';
import './stylesheets/style.scss';

const App: React.FunctionComponent = () =>
  <BoardsProvider>
    <Switch>
      <Route exact path='/' component={BoardsPage} />
      <Route path='/board/:id' component={TodosPage} />
    </Switch>
  </BoardsProvider>


export default App;