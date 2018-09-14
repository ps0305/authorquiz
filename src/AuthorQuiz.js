import React from "react";
import "./App.css";
import "./bootstrap.min.css";

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by Author shown</p>
      </div>
    </div>
  );
}
function Turn({ author, books, highlight }) {
  //mapping whether user choosed correct or incorrect answer
  function highlightBgColor(highlight) {
    const mapping = {
      'none':'',
      'correct':'green',
      'wrong': 'red'
    }
    return mapping[highlight];
  }
  return (
    <div className="row turn" style={{ backgroundColor: highlightBgColor(highlight) }}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title => <Book title={title} key={title} />))}
      </div>
    </div>);
}

function Book({ title }) {
  return (
    <div className="answer">
      <h4>{title}</h4>
    </div>
  );
}
function Continue() {
  return <div />;
}
function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from{" "}
          <a href="http://commons.wikimedia.org/wiki/Main_Page">
            Wikemedia Commons
          </a>{" "}
          and are in the public domain
        </p>
      </div>
    </div>
  );
}
//adding highlight props
function AuthorQuiz({ turnData,highlight }) {
  return (
    <div>
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} />
        <Continue />
        <Footer />
      </div>
    </div>
  );
}

export default AuthorQuiz;
