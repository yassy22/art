// import qs from "qs"; // Dit importeert de qs library
import { fetchApi, unwrapAtributes } from "./strapi";
import { getToken } from "./auth";

const getArtworks = async () => {
  const artworks = await fetchApi({
    endpoint: "artworks",
    wrappedByKey: "data",
  });
  if (!artworks) return [];
  return artworks.map(unwrapAtributes);
};

export async function getArtwork(id) {
  const artwork = await fetchApi({
    endpoint: `artworks/${id}`,
    wrappedByKey: "data",
  });
  if (!artwork) return null;
  const tmp = unwrapAtributes(artwork);

  tmp.items = JSON.parse(tmp.items);
  tmp.style = JSON.parse(tmp.style);
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
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return unwrapAtributes(artwork);
};

const getCheeseById = async (id) => {
  const artwork = await fetchApi({
    endpoint: `artworks/${id}`,
    query: { populate: ["owner"] },
    wrappedByKey: undefined,
  });
  return unwrapAtributes(artwork);
};

export { getArtworks, createArtworks, getCheeseById };
