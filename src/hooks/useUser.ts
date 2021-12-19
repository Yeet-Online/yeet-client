import { useState } from 'react';

// Class used to handle user storage and retrieval using React hooks
// The hook allows for the app to rerender when the user is updated
export default function useUser() {
  /**
     * Gets the user saved in session storage if it exists, otherwise returns undefined
     * @returns {String | undefined} The user value that is saved in session storage
     */
  const getUser = () => {
    const userString = sessionStorage.getItem('YeetUser'); // Retrieves user string from session storage
    const userUser = userString && JSON.parse(userString); // Parses user string into object
    return userUser; // ?. returns undefined if userUser.user is a nullable value
  };
  // Creates hook using the current user value as a start state
  const [user, setUser] = useState(getUser());

  /**
     * Saves the login user in session storage, to persist user sessions
     * @param {*} userUser The user to be saved in session storage
     */
  const saveUser = (userUser: any) => {
    sessionStorage.setItem('YeetUser', JSON.stringify(userUser)); // Saves the userUser to session storage as a JSON string
    setUser(userUser); // Sets user using the hook setter function
  };

  return { // Creates a custom hook
    setUser: saveUser,
    user,
  };
}