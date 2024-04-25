import { getArtwork } from "../services/artworks";
import { useLoaderData } from "react-router-dom";
import CosmosContainer from "../components/CosmosContainer";
import PropTypes from "prop-types";

const loader = async ({ params }) => {
  const artwork = await getArtwork(params.id);

  return { artwork };
};

const Artwork = () => {
  const { artwork } = useLoaderData();
  const { item } = artwork;
  console.log("Artwork", item[0].radiusCircle);
  console.log("Artwork", item[0].numLines);
  console.log("Artwork", item[0].lineWidht);
  

  return (
    <div>
      <CosmosContainer
        items={item}
        radiusCircle={item[0].radiusCircle}
        numLines={item[0].numLines}
        lineWidht={item[0].lineWidht}
        circleCount={item[0].circleCount}
        circleColor={item[0].circleColor}
        radiusStars={item[0].radiusStars}
      />
      <p>Creator</p>
    </div>
  );
};

Artwork.loader = loader;

export default Artwork;
Artwork.propTypes = {
  artwork: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
