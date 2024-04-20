import qs from "qs"; // Dit importeert de qs library
import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
  const query = qs.stringify(
    {
      populate: "*", // Dit voegt '?populate=*' toe aan de URL
    },
    {
      addQueryPrefix: true, // Dit voegt de '?' toe aan het begin van de string
    }
  );

  const artworks = await fetchApi({ endpoint: `artworks${query}` });
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
        // Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return unwrapAtributes(artwork);
};

export { getArtworks, createArtworks };
