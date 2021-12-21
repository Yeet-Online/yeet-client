import { useState } from 'react';

// Class used to handle token storage and retrieval using React hooks
// The hook allows for the app to rerender when the token is updated
export default function useToken() {
  /**
     * Gets the token saved in session storage if it exists, otherwise returns undefined
     * @returns {String | undefined} The token value that is saved in session storage
     */
  const getToken = () => {
    const tokenString = sessionStorage.getItem('YeetToken'); // Retrieves token string from session storage
    const userToken = tokenString && JSON.parse(tokenString); // Parses token string into object
    return `${userToken}`; // ?. returns undefined if userToken.token is a nullable value
  };
  // Creates hook using the current token value as a start state
  const [token, setToken] = useState(getToken());

  /**
     * Saves the login token in session storage, to persist user sessions
     * @param {*} userToken The token to be saved in session storage
     */
  const saveToken = (userToken: any) => {
    sessionStorage.setItem('YeetToken', JSON.stringify(userToken)); // Saves the userToken to session storage as a JSON string
    setToken(userToken); // Sets token using the hook setter function
  };

  return { // Creates a custom hook
    setToken: saveToken,
    token,
  };
}