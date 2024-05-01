import { redirect } from "react-router-dom";
import { deleteArtwork } from "../services/artworks";

export async function action({ params }) {
  await deleteArtwork(params.id);
  return redirect("/");
}



