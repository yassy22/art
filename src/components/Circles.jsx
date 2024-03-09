// Circles.js
import React from "react";

const Circles = ({ count, radius, color }) => {
  const circles = [];
  for (let i = 0; i < count; i++) {
    const cx = Math.random() * 200 + 50;
    const cy = Math.random() * 200 + 50;
    radius = Math.random() * 30 + 10;
    circles.push(<rect key={i} x={cy} y={cx} width={radius} height={radius} />);
  }

  return circles;
};

export default Circles;
