// import qs from "qs"; // Dit importeert de qs library
import { fetchApi, unwrapAtributes } from "./strapi";
import { getToken } from "./auth";

const getArtworks = async () => {
  const artworks = await fetchApi({
    endpoint: "artworks",
    query: { populate: ["user"] },
    wrappedByKey: "data",
  });


  if (!artworks) return [];
  return artworks.map(unwrapAtributes);
};




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

const getArtworkById = async (id) => {
  const artwork = await fetchApi({
    endpoint: `artworks/${id}`,
    query: { populate: ["user"] },
    wrappedByKey: "data",
  });
  if (!artwork) return null;
  const tmp = unwrapAtributes(artwork);

  tmp.items = JSON.parse(tmp.items);
  tmp.style = JSON.parse(tmp.style);
  return tmp;
};

const updateArtwork = async (id, data) => {
  const artwork = await fetchApi(
    {
      endpoint: `artworks/${id}`,
    },
    {
      method: "PUT",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return unwrapAtributes(artwork);
};

export async function deleteArtwork(id) {
  const artwork = await fetchApi(
    { endpoint: `artworks/${id}` },
    { method: "DELETE" }
  );
  if (artwork.error) throw new Error(artwork.error);
  return true;
}

export { getArtworks, createArtworks, getArtworkById, updateArtwork };
