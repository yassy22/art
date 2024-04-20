import { useLoaderData } from "react-router-dom";
import { getArtworks } from "../services/artworks";
import ArtworkCard from "../components/cards/ArtworkCard";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// import styles from "./index.module.css";

const loader = async () => {
  const artworks = await getArtworks();
  return { artworks };
};

const Index = () => {
  const { artworks } = useLoaderData();
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <Link to={`/artwork/${artwork.id}`}>
            <h3>{artwork.titel}</h3>
            <ArtworkCard artwork={artwork} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
Index.loader = loader;
ArtworkCard.loader = loader;
ArtworkCard.propTypes = {
  artwork: PropTypes.object,
};

// Index.propTypes = {
//   artworks: PropTypes.array.isRequired,
// };

export default Index;
