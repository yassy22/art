import qs from "qs"; // Dit importeert de qs library
import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
  const artworks = await fetchApi({
    endpoint: "artworks",
    query: { populate: "*" },
  });
  if (!artworks) return [];
  return artworks.map(unwrapAtributes);
};

export async function getArtwork(id) {
  const artwork = await fetchApi({ endpoint: `artworks/${id}` });
  if (!artwork) return null;
  const tmp = unwrapAtributes(artwork);
  tmp.item = JSON.parse(tmp.item);
  return tmp;
}

const createArtworks = async (data) => {
  const artwork = await fetchApi(
    {
      endpoint: "artworks",
    },
    {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return unwrapAtributes(artwork);
};

export { getArtworks, createArtworks };
