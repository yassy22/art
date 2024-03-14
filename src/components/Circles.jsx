// Circles.js

const Circles = ({ count, radius }) => {
  const circles = [];
  const centerX = 200;
  const centerY = 200;

  const stepSize = 32;

  // Dupliceren van de cirkels met een groeiende straal
  for (let i = 0; i < count; i++) {
    // Voeg de cirkel toe aan de array
    circles.push(
      <circle
        key={`circle${i}`}
        cx={centerX}
        cy={centerY}
        r={radius}
        stroke="#CACBD1"
        strokeWidth="0.1"
        fill="none"
      />
    );

    // Pas de straal aan voor de volgende cirkel
    radius += stepSize; // Groeisnelheid
  }
  return circles;
};

export default Circles;
