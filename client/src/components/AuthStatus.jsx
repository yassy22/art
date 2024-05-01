// import { Link, useRouteLoaderData } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
import { NavLink, redirect, Form, useLoaderData } from "react-router-dom";
import * as jose from "jose";

import "./AuthStatus.css";

const loader = () => {
  //doesnt work correctly, this component doesnt rerender every click so this doesnt get checked every time it needs to be
  const user = JSON.parse(localStorage.getItem("user"));
  const jwt = localStorage.getItem("jwt");

  if (jwt !== null) {
    const claims = jose.decodeJwt(jwt);
    const expires = new Date(claims.exp * 1000);
    if (expires < new Date()) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      setTimeout(() => {
        alert("Your session has expired. Please log in again.");
      }, 100);
      return redirect("/login");
    } else {
      return { user, jwt };
    }
  } else {
    return null;
  }
};

const AuthStatus = () => {
  const data = useLoaderData();
  let user;
  let jwt;
  if (data) {
    user = data.user;
    jwt = data.jwt;
  }

  const loggedIn = jwt && user;

  let links;
  if (loggedIn) {
    links = (
      <>
        <div className="nav_link_wrapp">
          <div className="all_links">
            <li>
              <NavLink className="navlink" to="/">
                EXPLORE
              </NavLink>
            </li>
            <li>
              <NavLink className="navlink" to="/artwork/create">
                NIEUW ARTWORK
              </NavLink>
            </li>
            <li>
              <NavLink className="navlink" to={`/user/${user.id}`}>
                MY ARTWORK 
              </NavLink>
            </li>
            {/* <li>
          <NavLink className="navlink" to="/liked">
            LIKED
          </NavLink>
        </li> */}
          </div>
          <div>
            <Form method="post" action="/auth/logout">
              <button className="logout-button" type="submit">
                LOG OUT
              </button>
            </Form>
          </div>
        </div>
      </>
    );
  } else {
    links = (
      <>
        <li>
          <NavLink className="navlink" to="/">
            EXPLORE
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" to="/login">
            LOG IN
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" to="/register">
            SIGN UP
          </NavLink>
        </li>
      </>
    );
  }

  return <ul className="nav_links">{links}</ul>;
};

AuthStatus.loader = loader;
export default AuthStatus;
