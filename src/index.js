import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AuthorQuiz from './AuthorQuiz';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: '../authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
      }
];

const state = {
    turnData: {
        author: authors[0],
        books: authors[0].books
    }
    
};
//authorQuiz receives props => turnData
ReactDOM.render(<AuthorQuiz {...state}/>, document.getElementById('root'));
registerServiceWorker();
