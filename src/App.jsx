// App.js
import React, { useState } from "react";
import "./App.css";
import Circles from "./components/Circles";
import Slider from "./components/Slider";

// import Line from './components/Line';
function App() {
  const [style, setStyle] = useState({
    radius: 30,
    circleCount: 3,
    circleColor: "#ff0000",
  });

  const handleRadiusChange = (radius) => {
    setStyle({ ...style, radius });
  };

  const handleChannelChange = (circleCount) => {
    setStyle({ ...style, circleCount });
  };

  const handleColorChange = (e) => {
    setStyle({ ...style, circleColor: e.target.value });
  };

  const { radius, circleCount, circleColor } = style;

  return (
    <div className="App">
      <h1 className="title">Bauhaus SVG React App</h1>
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
        <input type="color" value={circleColor} onChange={handleColorChange} />
      </div>
      <div className="svg-container">
        <svg viewBox="0 0 400 400">
          <Circles count={circleCount} radius={radius} color={circleColor} />
        </svg>
      </div>
    </div>
  );
}

export default App;
