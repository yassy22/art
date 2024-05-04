import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ArtworkNavigation = ({ currentId, artworks }) => {
  const currentIndex = artworks.findIndex(
    (artwork) => artwork.id === currentId
  );
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  const previousArtwork = artworks[previousIndex];
  const nextArtwork = artworks[nextIndex];

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    
  };

  const linkStyle = {
    color: "#ddd",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 16px",
    borderRadius: "4px",
  };

  return (
    <div style={navStyle}>
      {previousArtwork && (
        <Link style={linkStyle} to={`/artworks/${previousArtwork.id}`}>
          &lt; Previous
        </Link>
      )}
      {nextArtwork && (
        <Link style={linkStyle} to={`/artworks/${nextArtwork.id}`}>
          Next &gt;
        </Link>
      )}
    </div>
  );
};

ArtworkNavigation.propTypes = {
  currentId: PropTypes.number,
  artworks: PropTypes.array,
};
export default ArtworkNavigation;
