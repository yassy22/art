import PropTypes from "prop-types";
import Lins from "./Lins";
import Circles from "./Circles";
import Etoiles from "./Etoiles";

const CosmosContainer = ({
  numLines,
  lineWidht,
  circleCount,
  radiusCircle,
  circleColor,
  radiusStars,
  items,
}) => {
  return (
    <div className="svg-container">
      <svg viewBox="0 0 800 800">
        <Lins countLine={numLines} lineWidht={lineWidht} />
        <Circles
          count={circleCount}
          radiusCircle={radiusCircle}
          color={circleColor}
        />
        <Etoiles items={items} radiusStars={radiusStars} />
      </svg>
    </div>
  );
};
CosmosContainer.propTypes = {
  numLines: PropTypes.number.isRequired,
  lineWidht: PropTypes.number.isRequired,
  circleCount: PropTypes.number.isRequired,
  radiusCircle: PropTypes.number.isRequired,
  circleColor: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  radiusStars: PropTypes.number.isRequired,
};
export default CosmosContainer;
