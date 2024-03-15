// Circles.js
import React from "react";

const Lins = ({ countLine, widthLine }) => {
  const lines = [];
  const radius = 40;

  const centerX = 400 / 2;
  const centerY = 400 / 2;

  for (let e = 0; e < countLine; e++) {
    const angle = (e / countLine) * 2 * Math.PI;

    const x1 = centerX + radius * Math.cos(angle);
    const y1 = centerY + radius * Math.sin(angle);
    const x2 = centerX + (radius + 700) * Math.cos(angle); // Verander 50 naar de gewenste lengte van de lijn
    const y2 = centerY + (radius + 700) * Math.sin(angle); // Verander 50 naar de gewenste lengte van de lijn

    // Voeg de lijn toe aan de array
    lines.push(
      <line
        key={`line${e}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#CACBD1"
        strokeWidth={widthLine}
      />
    );
  }

  return lines;
};

export default Lins;
