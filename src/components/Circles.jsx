// Circles.js
import React from "react";

const Circles = ({ count, radius, color }) => {
  const circles = [];
  for (let i = 0; i < count; i++) {
    // const cx = Math.random() * 200 + 50;
    // const cy = Math.random() * 200 + 50;
    radius = Math.random() * 30 + 10;
    circles.push(
      <circle
        key={i}
        cx={400 / 2}
        cy={400 / 2}
        r={radius}
        stroke={color}
        fill="none"
      />
     
    );
  }

  return circles;
};

export default Circles;
