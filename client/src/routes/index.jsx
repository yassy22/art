import { Link, useLoaderData } from "react-router-dom";
import { getArtworks } from "../services/artworks";
import "../index.css";

import CosmosContainer from "../components/art/CosmosContainer";
import "./reset.module.css";

const loader = async () => {
  const artworks = await getArtworks();
  return { artworks };
};

const Index = () => {
  const { artworks } = useLoaderData();
  return (
    <div key={artworks.id} className="artwork-list-container">
      <div className=" section__user__name">
        <h1 className="welkom">The platform explore page</h1>
      </div>
      <ul className="artwork-list">
        {artworks.map((artwork) => (
          <li key={artwork.id} className="artwork-list-item">
            <Link className="artwork__link" to={`/artworks/${artwork.id}`}>
              <CosmosContainer
                items={JSON.parse(artwork.items)}
                {...JSON.parse(artwork.style)}
              />
            </Link>
            <h2 className="title_artwork">
              {" "}
              <span>name artwork: </span>
              {artwork.title}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};
Index.loader = loader;

export default Index;
