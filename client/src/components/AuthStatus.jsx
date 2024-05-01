// import { Link, useRouteLoaderData } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
import { NavLink, Form, useLoaderData } from "react-router-dom";

import "./AuthStatus.css";



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

export default AuthStatus;
