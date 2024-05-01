// Circles.js

const Circles = ({ count, radiusCircle, color }) => {
  const circles = [];
  const centerX = 400;
  const centerY = 400;
  const stepSize = 32;

  for (let i = 0; i < count; i++) {
    circles.push(
      <circle
        key={`circle${i}`}
        cx={centerX}
        cy={centerY}
        r={radiusCircle}
        stroke={color}
        strokeWidth="0.1"
        fill="none"
      />
    );

    // Pas de straal aan voor de volgende cirkel
    radiusCircle += stepSize;
  }
  return circles;
};

export default Circles;
