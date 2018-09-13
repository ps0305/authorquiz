import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AuthorQuiz from './AuthorQuiz';

ReactDOM.render(<AuthorQuiz />, document.getElementById('root'));
registerServiceWorker();
