import { getArtwork } from "../services/artworks";
import { useLoaderData , Form } from "react-router-dom";
import CosmosContainer from "../components/CosmosContainer";
import PropTypes from "prop-types";

const loader = async ({ params }) => {
  const artwork = await getArtwork(params.id);

  return { artwork };
};

const Artwork = () => {
  const { artwork } = useLoaderData();
  const { title, items, style } = artwork;
  console.log("artwork", style);
  console.log("artwork", items);
  console.log("artwork", title);

  return (
    <div>
      <p className="artwork_name">{title}</p>
      <CosmosContainer items={items} {...style} />
      <p>Creator</p>

      <Form
        method="post"
        action="destroy"
        onSubmit={(event) => {
          if (!confirm("Please confirm you want to delete this record.")) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Delete</button>
      </Form>
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
