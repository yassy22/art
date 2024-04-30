import { Outlet } from "react-router-dom";
import AuthStatus from "../components/AuthStatus";
import { getAuthData } from "../services/auth";

const loader = async () => {
  const data = getAuthData();
  return data;
};

const Root = () => {
  return (
    <>
      <AuthStatus />

      <main>
        <Outlet />
      </main>
    </>
  );
};

Root.loader = loader;

export default Root;
