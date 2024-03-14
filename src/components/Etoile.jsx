const Etoile = ({ randome }) => {
  const etoils = [];
  randome = randome * 10;

  for (let i = 0; i < 5; i++) {
    etoils.push(
      <polyline
        key={`line${i}`}
        points={` ${randome},50 100,160 220,40 `}
        fill="none"
        stroke="#CACBD1"
      />,
      <circle cx={randome} cy="47" r="7" />,
      <circle cx="220" cy="40" r="7" />
    );
  }

  return etoils;
};
export default Etoile;
