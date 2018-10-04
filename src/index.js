import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import AuthorQuiz from "./AuthorQuiz";
//underscore library
import { shuffle, sample } from "underscore";
//import from react router library
import { BrowserRouter ,Route} from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const authors = [
  {
    name: "Mark Twain",
    imageUrl: "../authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures of Huckleberry Finn"]
  },
  {
    name: "Joseph Conrad",
    imageUrl: "../authors/josephconrad.png",
    imageSource: "Wikimedia Commons",
    books: ["Heart of Darkness"]
  },
  {
    name: "J.K. Rowling",
    imageUrl: "../authors/jkrowling.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Daniel Ogren",
    books: ["Harry Potter and the Sorcerers Stone"]
  },
  {
    name: "Stephen King",
    imageUrl: "../authors/stephenking.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"]
  },
  {
    name: "Charles Dickens",
    imageUrl: "../authors/charlesdickens.jpg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two Cities"]
  },
  {
    name: "William Shakespeare",
    imageUrl: "../authors/williamshakespeare.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"]
  }
];

//getTurnData=> select a set of possible answer,shuffling and choosing the first four

function getTurnData(authors) {
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  //using underscore library to shuffle list in random order
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    //to find an author such that the author's books collection contains a books where the tiltle is equal to answer we choose
    author: authors.find(author => 
        author.books.some(title => 
        title === answer))
  };
}
function reducer(
  state = { authors, turnData: getTurnData(authors), highlight: '' }, 
  action) {
    switch (action.type) {
      case 'ANSWER_SELECTED':
        const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
        return Object.assign(
          {}, 
          state, { 
            highlight: isCorrect ? 'correct' : 'wrong'
          });
      case 'CONTINUE': 
          return Object.assign({}, state, { 
            highlight: '',
            turnData: getTurnData(state.authors)
          });
      case 'ADD_AUTHOR':
          return Object.assign({}, state, {
            authors: state.authors.concat([action.author])
          });
      default: return state;
    }
}
/*const state = {
  //function to call author data
  turnData: getTurnData(authors),
  highlight: ""
};

//onAnswerSelected
function onAnswerSelected(answer) {
  //checking whether title of the book selected is right or wrong
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  //based on correct value we select highlight
  state.highlight = isCorrect ? "correct" : "wrong";
  //calling render
  render();
}}*/


//but above don't reflect any change on UI,as we are not updating to React

//reder function to update changes to React

  //authorQuiz receives props => turnData
  let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  ReactDOM.render(
    <BrowserRouter>
      <ReactRedux.Provider store={store}>
        <React.Fragment>
          <Route exact path="/" component={AuthorQuiz} />
          <Route path="/add" component={AddAuthorForm} />
        </React.Fragment>
      </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));
  
  registerServiceWorker();