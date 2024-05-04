import {
  useLoaderData,
  Form,
  useRouteLoaderData,
  Link,
} from "react-router-dom";
import { getArtworkById, getArtworks } from "../../services/artworks";
import "./artwork.css";
import "../../components/AuthStatus.css";

import CosmosContainer from "../../components/CosmosContainer";
import ArtworkNavigation from "../../components/ArtworkNavigation";
//
import PropTypes from "prop-types";

const loader = async ({ params }) => {
  const artwork = await getArtworkById(params.id);
  const artworks = await getArtworks();
  return { artwork, artworks };
};

const Artwork = () => {
  const { artwork } = useLoaderData();
  const { user } = useRouteLoaderData("root");
  const { artworks } = useLoaderData();
  console.log(artworks);

  // Controleer of alle noodzakelijke data aanwezig is
  if (!user || !artwork || !artwork.user || !artwork.user.data) {
    return <Link to="/login">Log in for see the artwork</Link>;
  }
  const { title, items, style } = artwork;

  const artworkcontainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    margin: "20px",
    borderRadius: "10px",
  };

  const title_style = {
    fontSize: "1em",
    padding: "10px",
  };

  return (
    <div>
      <ArtworkNavigation
        currentId={artwork.id}
        artworks={artworks}
        user={user}
      />
      <div style={artworkcontainer}>
        <h1 style={title_style}>
          {" "}
          <span>Name artwork: </span>{title}
        </h1>
        <CosmosContainer items={items} {...style} />
        <div className="user_interaction_button">
          {user.id === artwork.user.data.id && (
            <>
              <button className="link__edit" type="submit">
                {" "}
                <Link to={`/artworks/${artwork.id}/edit`}>Edit artwork</Link>
              </button>
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
