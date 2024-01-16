import React from "react";
import "./App.css";
import { marked } from "marked";

const { useState, useEffect } = React;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);

  useEffect(() => {
    // Pass options to the marked function directly
    const parsedMarkdown = marked(markdown, { breaks: true });
    document.getElementById("preview").innerHTML = parsedMarkdown;

    // Change the body background color
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
    document.getElementById("editor-header").style.backgroundColor =
      randomColor;
    document.getElementById("preview-header").style.backgroundColor =
      randomColor;
  }, [markdown]);

  const handleInputChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleExpandClick = () => {
    setIsEditorExpanded(!isEditorExpanded);
  };

  return (
    <div className="container">
      <h1 className="text-center">Markdown Previewer</h1>
      <div className="row">
        <div className="col">
          <div className="box">
            <div className="header" id="editor-header">
              <h2 className="title">Editor</h2>
              <i
                className={`fa ${
                  isEditorExpanded ? "fa-compress" : "fa-arrows-alt"
                }`}
                onClick={handleExpandClick}
                aria-hidden="true"
              ></i>
            </div>
            <textarea
              className="textarea"
              id="editor"
              rows={isEditorExpanded ? 25 : 5}
              value={markdown}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="box">
            <div className="header" id="preview-header">
              <h2 className="title">Previewer</h2>
            </div>
            <div
              className="preview"
              id="preview"
              rows={isEditorExpanded ? 15 : 5}
              dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultMarkdown =
  "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHere's some code,`<div></div>`,between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![Markdown Logo](https://miro.medium.com/v2/resize:fit:786/format:webp/1*eZ7YPTqzcyFVoQxIOIQ9kQ.png)\n";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default App;
