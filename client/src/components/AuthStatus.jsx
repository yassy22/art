import { Link, useRouteLoaderData } from "react-router-dom";

const AuthStatus = () => {
  let { user } = useRouteLoaderData("root"); // useRouteLoaderData is a hook that returns the data that was loaded by the route loader. This is useful for accessing the data that was loaded by the route loader in the component.

  return user ? ( //
    <Link to="/artwork/create">Add Cheese</Link>
  ) : (
    <Link to="/auth/login">Sign in</Link>
  );
};

export default AuthStatus;
