import { redirect } from "react-router-dom";
import { logout as action } from "../services/auth";

const Logout = () => {
  return redirect("/");
}

Logout.action = action;

export default Logout;