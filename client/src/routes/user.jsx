import { getUserById } from "../services/user";
import { Link, useLoaderData } from "react-router-dom";
// import CosmosContainer from "../components/CosmosContainer";

const loader = async ({ params }) => {
  const user = await getUserById(params.id);
  return { user };
};

const User = () => {
  const { user } = useLoaderData();
  

  return (
    <div>
      <h1>{user.username}</h1>
      <ul>
        {user.artworks.map((artwork) => (
          <li key={artwork.id}>
            <Link to={`/artworks/${artwork.id}`}>{artwork.title}</Link>
            {/* <CosmosContainer
              items={JSON.parse(artwork.items)}
              {...JSON.parse(artwork.style)}
            /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

User.loader = loader;

export default User;
