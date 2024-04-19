// App.js
import "../App.css";
import React, { useState } from "react";
import Slider from "../components/Slider";
import CosmosContainer from "../components/CosmosContainer";
import { Outlet } from "react-router-dom";

const generateItem = () => ({
  x1: Math.random() * 800,
  y1: Math.random() * 800,
  x2: Math.random() * 800,
  y2: Math.random() * 800,
  cx1: Math.random() * 800,
  cy1: Math.random() * 800,
  radius: 5,
});
function Root() {
  const gradient = (
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
      <stop offset="50%" stopColor="#ffff00" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
    </linearGradient>
  );
  const [lineStle, setLineStyle] = useState({
    numLines: 30,
    lineWidht: 0.1,
  });

  const [style, setStyle] = useState({
    radius: 0,
    circleCount: 0,
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

  const handleSave = async () => {
    const data = {
      titel: "Cosmos",
      description: "A beautiful cosmos",
      image: "https://images.unsplash.com/photo-1631521349298-2f1b2b3c1f3b",
      style: {
        radius: style.radius,
        circleCount: style.circleCount,
        circleColor: style.circleColor,
      },
      lineStyle: {
        numLines: lineStle.numLines,
        lineWidht: lineStle.lineWidht,
      },
      items: items,
      radiuss: radiuss,
    };

    // const response = await fetch("http://localhost:1337/api/artworks", {

    const response = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/artworks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );

    const result = await response.json();
    console.log(result);
  };

  const { radius, circleCount, circleColor } = style;
  const { numLines, lineWidht } = lineStle;

  return (
    <div className="App">
      <div className="container">
        <div className="controls">
          <h1 className="title">cosmos</h1>
          <Slider
            max={33}
            label="Add circle"
            value={circleCount}
            onValueChange={handleChannelChange}
            className="slider"
          />
          <Slider
            max={100}
            label="Make circle biger"
            value={radius}
            onValueChange={handleRadiusChange}
          />

          <Slider
            max={100}
            label="Line widht"
            value={lineWidht}
            onValueChange={handleLineWidhtChange}
            className="slider"
          />

          <Slider
            max={50}
            label="Let the etoils shine"
            value={radiuss}
            onValueChange={handelChangeEtoile}
            className="slider"
          />

          <div className="amount_etoil">
            <label htmlFor="">Add or remove etoils</label>
            <div className="buttons">
              <button className="AddButton button" onClick={handleAddItem}>
                +
              </button>
              <button
                className="removeButton button"
                onClick={handleRemoveItem}
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div>
          <CosmosContainer
            numLines={numLines}
            lineWidht={lineWidht}
            circleCount={circleCount}
            radius={radius}
            circleColor={circleColor}
            items={items}
            gradient={gradient}
          />
        </div>
      </div>
      <div>
        <button onClick={handleSave}>save</button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default Root;
