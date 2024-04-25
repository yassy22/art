import { useLoaderData } from "react-router-dom";
import CosmosContainer from "../components/CosmosContainer";

import { getArtwork } from "../artworks";

export async function loader({ params }) {
  const id = params.id;
  const artwork = await getArtwork(id);
  return { artwork };
}

export default function Img() {
  const { artwork } = useLoaderData();
  const { title } = artwork;
  const parsedSvgVariables = JSON.parse(title); //

  return <CosmosContainer {...parsedSvgVariables} />;
}
