import { Outlet } from "react-router-dom";
import AuthStatus from "../components/AuthStatus";
// import { getAuthData } from "../services/auth";

// const loader = async () => {
//   const data = getAuthData();
//   return data;
// };

const Root = () => {
  return (
    <>
      <AuthStatus />

      <main>
        <h1>hello root</h1>
        <Outlet />
      </main>
    </>
  );
};

// Root.loader = loader;

export default Root;
