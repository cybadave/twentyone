import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PokerClient from './PokerClient';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <PokerClient />, document.getElementById('root'));
registerServiceWorker();
