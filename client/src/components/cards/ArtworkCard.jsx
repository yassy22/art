
import React from "react";
import PropTypes from "prop-types";

const ArtworkCard = (artwork) => {
  return (
    <article>
      <h3>{artwork.titel}</h3>
    </article>
  );
};

ArtworkCard.propTypes = {
  artwork: PropTypes.object,
};
ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titel: PropTypes.string.isRequired,
  }),
};
export default ArtworkCard;
