import { getArtwork } from "../services/artworks";
import { useLoaderData } from "react-router-dom";
import CosmosContainer from "../components/CosmosContainer";
import PropTypes from "prop-types";

const loader = async ({ params }) => {
  const artwork = await getArtwork(params.id);

  console.log(artwork);
  return { artwork };
};

const Artwork = () => {
  const { artwork } = useLoaderData();
  const { item, title, lineWidht } = artwork;

  let itemObject = JSON.stringify(item[0]);
  console.log(itemObject);

  return (
    <div>
      <CosmosContainer />
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

/// in de mdn
