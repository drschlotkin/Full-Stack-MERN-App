import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './Components/Context'
import './styles/global.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
