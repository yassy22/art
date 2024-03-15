import React from "react";

const Etoile = ({ randome, x1, y1, x2, y2, cx1, cy1 }) => {
  const etoils = [];

  for (let i = 0; i < randome; i++) {
    x1 = Math.random() * 400;
    y1 = Math.random() * 400;
    x2 = Math.random() * 400;
    y2 = Math.random() * 400;
    cx1 = Math.random() * 400;
    cy1 = Math.random() * 400;

    etoils.push(
      <polyline
        key={`line${i}`}
        points={`${x1},${y1} ${x2},${y2} ${cx1},${cy1}`}
        fill="none"
        stroke="#CACBD1"
        strokeWidth="0.2"
      />,
      <circle key={`ellips${i}`} cx={x1} cy={y1} r="2" fill="yellow" />,
      <circle key={`ellipse1${i}`} cx={x2} cy={y2} r="2" fill="yellow" />,
      <circle key={`ellipse2${i}`} cx={cx1} cy={cy1} r="2" fill="yellow" />
    );
  }

  return etoils;
};

export default Etoile;
