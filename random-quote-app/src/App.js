import React from "react";
import "./App.css";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Get a random color

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
  }

  componentDidMount() {
    this.getQuote();
    this.changeBodyBackgroundColor();
  }

  getQuote = () => {
    // Fetch a random quote
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          quote: data.content,
          author: data.author,
        });
      })
      .catch((error) => console.log(error));
  };

  changeBodyBackgroundColor = () => {
    document.body.style.backgroundColor = randomColor;
    document.body.style.color = randomColor;
    document.getElementById("new-quote").style.backgroundColor = randomColor;
    document.getElementById("tweet-quote").style.backgroundColor = randomColor;
    document.getElementById("tumblr-quote").style.backgroundColor = randomColor;
  };

  render() {
    return (
      <div id="quote-box">
        <div className="quote-text">
          <i className="fa fa-quote-left"></i>
          <span id="text" style={{ backgroundColor: "#ffffff" }}>
            {this.state.quote}{" "}
          </span>
          <i className="fa fa-quote-right"></i>
        </div>
        <div className="quote-author">
          - <span id="author">{this.state.author}</span>
        </div>
        <div className="buttons">
          <a
            className="button"
            id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            title="Tweet this quote!"
            target="_top"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            className="button"
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            target="_blank"
            href="https://www.tumblr.com/widgets/share/tool?canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&posttype=quote&tags=quotes&caption={author}&content={quote}"
            rel="noreferrer"
          >
            <i className="fa fa-tumblr"></i>
          </a>
          <button
            className="button"
            id="new-quote"
            onClick={() => {
              this.getQuote();
              this.changeBodyBackgroundColor();
            }}
          >
            New quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
