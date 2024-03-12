// Circles.js
import React from "react";

const Lins = () => {
  const lines = [];
  const numLines = 30;
  const radius = 40;

  const centerX = 400 / 2;
  const centerY = 400 / 2;

  for (let i = 0; i < numLines; i++) {
    // Bereken de hoek in radialen
    const angle = (i / numLines) * 2 * Math.PI;

    // Bereken de eindpunten van de lijn
    const x1 = centerX + radius * Math.cos(angle);
    const y1 = centerY + radius * Math.sin(angle);
    const x2 = centerX + (radius + 400) * Math.cos(angle); // Verander 50 naar de gewenste lengte van de lijn
    const y2 = centerY + (radius + 400) * Math.sin(angle); // Verander 50 naar de gewenste lengte van de lijn

    // Voeg de lijn toe aan de array
    lines.push(
      <line
        key={`line${i}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="2"
      />
    );
  }

  return lines;
};

export default Lins;
