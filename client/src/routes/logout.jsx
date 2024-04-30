import { redirect } from "react-router-dom";

export async function action() {
  localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    localStorage.removeItem("authData");

  return redirect("/login");
}
export default action;