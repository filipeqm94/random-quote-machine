import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [""],
      index: 0,
    };

    this.randomIndex = this.randomIndex.bind(this);
  }

  randomIndex() {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);

      this.setState({
        index,
      });
    }
  }

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          quotes: res.quotes.filter((quote) => quote.author !== "Bill Cosby"),
          index: Math.floor(Math.random() * res.quotes.length),
        })
      );
  }

  render() {
    const { quotes, index } = this.state;

    const quote = quotes[index];

    return (
      <div className='wrapper d-flex justify-content-center align-items-center row'>
        <div id='quote-box' className='box col-lg-4 col-md-8 px-5 py-3'>
          <div>
            <p className='text-center fs-2' id='text'>
              "{quote.quote}"
            </p>
            <cite className='fs-4 d-block text-end' id='author'>
              - {quote.author}
            </cite>
          </div>
          <div className='d-flex justify-content-between mt-3'>
            <a
              href={`https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`}
              target='_blank'
              rel='noreferrer'
              className='btn btn-primary'
              id='tweet-quote'
            >
              <i className='fab fa-twitter'></i> Tweet
            </a>
            <button
              id='new-quote'
              className='btn btn-primary'
              onClick={this.randomIndex}
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
