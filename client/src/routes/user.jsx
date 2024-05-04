import { getUserById } from "../services/user";
import { Link, useLoaderData } from "react-router-dom";
// import CosmosContainer from "../components/CosmosContainer";

const loader = async ({ params }) => {
  const user = await getUserById(params.id);
  return { user };
};

const User = () => {
  const { user } = useLoaderData();

  console.log("user", user.createdAt);
  return (
    <div>
      <div className="section__user__name">
        <h1 className="user_name">
          Hello {user.username} dit zijn jou artworks
        </h1>
      </div>
      <ul>
        {user.artworks.map((artwork) => (
          <li className="my__artworks__list" key={artwork.id}>
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
