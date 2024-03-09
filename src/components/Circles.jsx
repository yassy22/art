// Circles.js
import React from "react";

const Circles = ({ count, radius, color }) => {
  const circles = [];
  for (let i = 0; i < count; i++) {
    const cx = Math.random() * 400 + 50;
    const cy = Math.random() * 400 + 50;
    circles.push(<circle key={i} cx={cy} cy={cx} r={radius} fill={color} />);
  }
  return circles;
};

export default Circles;
