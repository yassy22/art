// import { useLoaderData } from "react-router-dom";
// import { getArtworks } from "../services/artworks";
// import Card from "../components/Card";
// import { Link } from "react-router-dom";

// import PropTypes from "prop-types";

// const loader = async () => {
//   const artworks = await getArtworks();
//   return { artworks };
// };

// const ArtworkDetails = () => {
//   const { artworks } = useLoaderData();
 
//   return (
//     <div>
//       <h1>Artwork Details</h1>
//       <Link to="/">Back to index</Link>
//       {artworks.map((artwork) => (
//         <Card key={artwork.id} artwork={artwork} />
//       ))} 
//     </div>
//   );
// };

// ArtworkDetails.loader = loader;

// ArtworkDetails.propTypes = {
//   artworks: PropTypes.array.isRequired,
// };


// export default ArtworkDetails;
