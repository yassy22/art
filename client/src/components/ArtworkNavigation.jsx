import PropTypes from "prop-types";

const ArtworkNavigation = ({ currentId, artworks }) => {
  console.log(currentId, currentId);
  const currentIndex = artworks.findIndex(
    (artwork) => artwork.id === currentId
  );
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  const previousArtwork = artworks[previousIndex];
  const nextArtwork = artworks[nextIndex];

  return (
    <div className="artwork_navigation">
      {previousArtwork && (
        <a href={`/artworks/${previousArtwork.id}`} className="link__previous">
          Previous
        </a>
      )}
      {nextArtwork && (
        <a href={`/artworks/${nextArtwork.id}`} className="link__next">
          Next
        </a>
      )}
    </div>
  );
};

ArtworkNavigation.propTypes = {
  currentId: PropTypes.number,
  artworks: PropTypes.array,
};
export default ArtworkNavigation;
