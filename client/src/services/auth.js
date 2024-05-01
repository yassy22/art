const AUTH_DATA = "auth-data-artwork"; // AUTH_DATA is a constant that stores the key used to save the authentication data in the local storage. This key is used to retrieve the authentication data when the user logs in or registers.
// van waar komt de naam AUTH_DATA? // AUTH_DATA is a common name used to store authentication data in the local storage. It is a convention to use this name to store the authentication data in the local storage. You can use any name you want, but it is recommended to use a name that is easy to remember and understand.
export const authenticate = async (username, password) => {
  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/auth/local`,
      {
        method: "POST",
        body: JSON.stringify({ identifier: username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Auth response error", error.response);
    throw error;
  }

  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  setAuthData(data);

  return data;
};


export const register = async (username, password, email) => {
  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/auth/local/register`,
      {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("register response error", error.response);
    throw error;
  }

  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  setAuthData(data);

  return data;
};

export const setAuthData = (authData) => {
  if (authData) {
    localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
  }
}; // setAuthData is a function that saves the authentication data in the local storage. This function is used to save the authentication data when the user logs in or registers.

export const getAuthData = () => {
  const authData = localStorage.getItem(AUTH_DATA);
  return authData ? JSON.parse(authData) : {};
}; // getAuthData is a function that retrieves the authentication data from the local storage. This function is used to retrieve the authentication data when the user logs in or registers.

export const getToken = () => {
  const authData = getAuthData();
  return authData.jwt;
};




export const deleteMe = async (id) => {
  let response;
  try {
    response = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/users/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  }
  catch (error) {
    console.log("delete response error", error.response);
    throw error;
  }
  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
};



export const logout = () => {
  localStorage.removeItem(AUTH_DATA);
}; // logout is a function that removes the authentication data from the local storage. This function is used to log out the user and remove the authentication data from the local storage.