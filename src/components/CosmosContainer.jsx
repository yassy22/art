import React from "react";
import PropTypes from "prop-types";
import Lins from "./Lins";
import Circles from "./Circles";
import Etoiles from "./Etoiles";

const CosmosContainer = ({
  numLines,
  lineWidht,
  circleCount,
  radius,
  circleColor,
  items,
}) => {
  return (
    <div className="svg-container">
      <svg viewBox="0 0 400 400">
        <Lins countLine={numLines} widthLine={lineWidht} />
        <Circles count={circleCount} radius={radius} color={circleColor} />
        <Etoiles items={items} />
      </svg>
    </div>
  );
};

CosmosContainer.propTypes = {
  numLines: PropTypes.number.isRequired,
  lineWidht: PropTypes.number.isRequired,
  circleCount: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  circleColor: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
export default CosmosContainer;
