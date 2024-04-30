import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { getArtworks } from "../services/artworks";

import CosmosContainer from "../components/CosmosContainer";

const loader = async () => {
  const artworks = await getArtworks();
  return { artworks };
};

const Index = () => {
  const { artworks } = useLoaderData();
  return (
    <div key={artworks.id} className="artwork-list-container">
      <ul className="artwork-list">
        {artworks.map((artwork) => (
          <li key={artwork.id} className="artwork-list-item">
            <Link className="artwork-link" to={`/artworks/${artwork.id}`}>
              <h2>{artwork.title}</h2>
              <CosmosContainer
                items={JSON.parse(artwork.items)}
                {...JSON.parse(artwork.style)}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
Index.loader = loader;

export default Index;
