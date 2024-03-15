// Circles.js

const Circles = ({ count, radius, color }) => {
  const circles = [];
  const centerX = 200;
  const centerY = 200;

  const stepSize = 32;

  for (let i = 0; i < count; i++) {
    circles.push(
      <circle
        key={`circle${i}`}
        cx={centerX}
        cy={centerY}
        r={radius}
        stroke={color}
        strokeWidth="0.1"
        fill="none"
      />
    );

    // Pas de straal aan voor de volgende cirkel
    radius += stepSize;
  }
  return circles;
};

export default Circles;
