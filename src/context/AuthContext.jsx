import { createContext, useState, useEffect } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("registeredUsers")) || []
  );

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  return (
    <Auth.Provider
      value={{
        registeredUsers,
        setRegisteredUsers,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};