// App.js
import "./App.css";
import React, { useState } from "react";
import Circles from "./components/Circles";
import Slider from "./components/Slider";
import Lins from "./components/Lins";
import Etoile from "./components/Etoile";
import PropTypes from "prop-types";

const generateItem = () => ({
  x1: Math.random() * 400,
  y1: Math.random() * 400,
  x2: Math.random() * 400,
  y2: Math.random() * 400,
  cx1: Math.random() * 400,
  cy1: Math.random() * 400,
  radius: 5,
});
function App() {
  const [lineStle, setLineStyle] = useState({
    numLines: 30,
    lineWidht: 0.1,
  });

  const [style, setStyle] = useState({
    radius: 30,
    circleCount: 10,
    circleColor: "#c3ccdb",
  });

  const defaultList = new Array(4).fill().map(() => generateItem());
  const [radiuss, setRadius] = useState(5);
  const [items, setItems] = useState(defaultList);

  const handleRadiusChange = (radius) => {
    setStyle({ ...style, radius });
  };

  const handleChannelChange = (circleCount) => {
    setStyle({ ...style, circleCount });
  };

  const handleLineWidhtChange = (lineWidht) => {
    setLineStyle({ ...lineStle, lineWidht });
  };

  const handelChangeEtoile = (value) => {
    setRadius(value);
    // const tmpItems = [...items];
    // setItems(
    //   tmpItems.map((item) => {
    //     const tmpItem = { ...item };
    //     tmpItem.radius = value;
    //     return tmpItem;
    //   })
    // );

    const updatedItems = items.map((item) => ({ ...item, radius: value }));
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItem = generateItem();
    setItems([...items, newItem]);
  };

  const handleRemoveItem = () => {
    const tmpItems = [...items];
    tmpItems.pop();
    setItems(tmpItems);
  };

  const handleColorChange = (e) => {
    setStyle({ ...style, circleColor: e.target.value });
  };

  const { radius, circleCount, circleColor } = style;
  const { numLines, lineWidht } = lineStle;

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
            max={100}
            label="lineWidht"
            value={lineWidht}
            onValueChange={(v) => handleLineWidhtChange(v)}
          />
        </div>
        <Slider
          max={50}
          label="sterren radius"
          value={radiuss}
          onValueChange={(v) => handelChangeEtoile(v)}
        />

        <input type="color" value={circleColor} onChange={handleColorChange} />

        <button className="AddButton button" onClick={handleAddItem}>
          +
        </button>
        <button className="removeButton" onClick={handleRemoveItem}>
          -
        </button>
      </div>
      <div className="svg-container">
        <svg viewBox="0 0 400 400">
          <Lins countLine={numLines} widthLine={lineWidht} />
          <Circles count={circleCount} radius={radius} color={circleColor} />
          <Etoile items={items} />
        </svg>
      </div>
    </div>
  );
}
export default App;
