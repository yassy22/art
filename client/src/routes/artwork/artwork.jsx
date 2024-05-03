import { getArtworkById } from "../../services/artworks";
import "./artwork.css";
import {
  useLoaderData,
  Form,
  useRouteLoaderData,
  Link,
} from "react-router-dom";
import CosmosContainer from "../../components/CosmosContainer";
//
import PropTypes from "prop-types";

const loader = async ({ params }) => {
  const artwork = await getArtworkById(params.id);

  return { artwork };
};

const Artwork = () => {
  const { artwork } = useLoaderData();
  const { user } = useRouteLoaderData("root");

  // Controleer of alle noodzakelijke data aanwezig is
  if (!user || !artwork || !artwork.user || !artwork.user.data) {
    return <Link to="/register">Log in for see the artwork</Link>;
  }

  const { title, items, style } = artwork;
  return (
    <div>
      <h1>{title}</h1>
      <CosmosContainer  items={items} {...style} />
      <div className="user_interaction_button">
        {user.id === artwork.user.data.id && (
          <>
            <Link to={`/artworks/${artwork.id}/edit`}>Edit artwork</Link>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (
                  !confirm("Please confirm you want to delete this record.")
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </>
        )}
      </div>
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
