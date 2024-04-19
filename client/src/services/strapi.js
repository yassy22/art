import qs from "qs"; 

const fetchApi = async (
  {
    endpoint, // endpoint is the URL of the API endpoint that you want to fetch data from.
    query = undefined, // query is an object that contains the query parameters that you want to send to the API endpoint.
    wrappedByKey = "data",// wrappedByKey is the key that the data is wrapped in. This is useful when the API response is wrapped in an object with a key.
    wrappedByList = undefined, // wrappedByList is a boolean that indicates whether the data is wrapped in a list. This is useful when the API response is wrapped in an array.
  },
  options
) => {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  console.log("url", `${import.meta.env.VITE_STRAPI_URL}/api/${endpoint}`);

  const url = new URL(
    `${import.meta.env.VITE_STRAPI_URL}/api/${endpoint}${
      query ? `?${qs.stringify(query, { encode: false })}` : ``
    }`
  );

  console.log("Fetching...", url.toString());

  const res = await fetch(url.toString(), options);

  if (!res.ok) {
    throw new Error(`Error fetching ${url.toString()}`);
  }

  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data;
};

const unwrapAtributes = (item) => {
  return { ...item, ...item.attributes };
};

export { fetchApi, unwrapAtributes };
