// App.js
import "./App.css";
import React, { useState } from "react";
import Circles from "./components/Circles";
import Slider from "./components/Slider";
import Lins from "./components/Lins";
import Etoile from "./components/Etoile";

function App() {
  const [lineStle, setLineStyle] = useState({
    numLines: 30,
    lineWidht: 0.1,
  });
  const [style, setStyle] = useState({
    radius: 30,
    circleCount: 10,
    circleColor: "#ff0000",
  });

  const [etoile, setEtoile] = useState({
    changeRandome: 0,
  });

  const handleRadiusChange = (radius) => {
    setStyle({ ...style, radius });
  };

  const handleChannelChange = (circleCount) => {
    setStyle({ ...style, circleCount });
  };

  const handleLineWidhtChange = (lineWidht) => {
    setLineStyle({ ...lineStle, lineWidht });
  };

  const handelChangeEtoile = (changeRandome) => {
    setEtoile({ ...etoile, changeRandome });
    console.log(changeRandome);
  };

  const { radius, circleCount, circleColor } = style;
  const { numLines, lineWidht } = lineStle;
  const { changeRandome } = etoile;

  return (
    <div className="App">
      <h1 className="title">cosmos</h1>
      <div className="controls">
        <Slider
          max={50}
          label="Radius"
          value={radius}
          onValueChange={(v) => handleRadiusChange(v)}
        />
        <Slider
          max={50}
          label="count"
          value={circleCount}
          onValueChange={(v) => handleChannelChange(v)}
        />

        <div className="lineInput">
          <Slider
            max={50}
            label="lineWidht"
            value={lineWidht}
            onValueChange={(v) => handleLineWidhtChange(v)}
          />
        </div>

        <Slider
          max={50}
          label="randomePos"
          value={changeRandome}
          onValueChange={(v) => handelChangeEtoile(v)}
        />
      </div>
      <div className="svg-container">
        <svg viewBox="0 0 400 400">
          <Lins countLine={numLines} widthLine={lineWidht} />
          <Circles count={circleCount} radius={radius} color={circleColor} />
          <Etoile randome={changeRandome} />
        </svg>
      </div>
    </div>
  );
}
export default App;
