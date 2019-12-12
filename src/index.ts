import './scss/style.scss'

const greetings: string = 'Hello TypeScript in Webpack!';

function logGreetings(message: string): void {
  console.log(message);
}

logGreetings(greetings);
console.log("Another console.log");