import Application from './Application';

const rootEl = global.document.querySelector('body');
// global z ECMAScript
const app = new Application(rootEl);
app.start();


console.log('hello src');

