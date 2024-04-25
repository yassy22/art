import { useLoaderData } from "react-router-dom";
import { getArtworks } from "../services/artworks";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const loader = async () => {
  const artworks = await getArtworks();
  return { artworks };
};

const Index = () => {
  const { artworks } = useLoaderData();

  console.log(artworks);
  return (
    <div className="artwork-overview__artwork-link" key={artworks.id}>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <Link
              className="artwork-overview__artwork-link"
              to={`/artworks/${artwork.id}`}
            >
              <h2>{artwork.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
Index.loader = loader;

Index.propTypes = {
  artworks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default Index;
/// je blijft in een document dus is beter dat link gebruikt dan a href
