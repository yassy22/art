import React from "react";

const Circle = ({ radius }) => {
  return (
    <svg width="200" height="200">
      <circle cx="100" cy="100" r={radius} fill="blue" />
    </svg>
  );
};

export default Circle;
