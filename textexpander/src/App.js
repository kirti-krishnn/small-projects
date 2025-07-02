import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TextExtractor count={20}>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExtractor>
      <TextExtractor expand={true}>
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExtractor>
      <TextExtractor>
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExtractor>
    </div>
  );
}

function TextExtractor({ children, count = 10, expand = false }) {
  const [expanded, setExpanded] = useState(expand);
  const arr = children.split(" ");

  const textdisplay = {
    display: "block",
  };

  const texthide = {
    display: "none",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
  };

  return (
    <div style={{ textAlign: "left" }}>
      <p>
        {arr.slice(0, count).join(" ")}
        <span style={expanded ? textdisplay : texthide}>
          {arr.slice(count).join(" ")}
        </span>
      </p>
      <button onClick={() => setExpanded((exp) => !exp)} style={buttonStyle}>
        {expanded ? (
          <span style={{ color: "#1f09cd" }}>show less...</span>
        ) : (
          <span style={{ color: "#ff6622" }}>show more...</span>
        )}
      </button>
      <br></br>
    </div>
  );
}

export default App;
