import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { HashRouter } from 'react-router-dom';

render(
  <HashRouter>
    <App/>
  </HashRouter>,
  document.getElementById('react-container')
)


// const greetings: string = 'Hello TypeScript in Webpack!';

// function logGreetings(message: string): void {
//   console.log(message);
// }

// logGreetings(greetings);
// console.log("Another console.log");