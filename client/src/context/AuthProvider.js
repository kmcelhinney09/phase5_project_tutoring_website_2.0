import React, { useState, useContext, createContext } from "react";
// Code help found at https://hhpendleton.medium.com/useauth-265512bbde3c from Henry Pendleton
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [currentUser, setCurrentUser] = useState([
    {
      // id: "",
      full_name: "",
      school: "",
      grade: "",
      role: "",
    },
  ]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login(loginForm) {
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        });
      } else {
        //res.json().then((e) => setErrors(Object.entries(e.error)));
        res.json().then((e) => console.log(Object.entries(e.error)));
      }
    });
  }

  function signup(signUpForm) {
    setErrors([]);
    setIsLoading(true);
    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpForm),
    }).then((res) => {
      if (res.ok) {
        setIsLoggedIn(true);
        res.json().then(setCurrentUser);
      } else {
        // res.json().then((e) => setErrors(Object.entries(e.error)));
        res.json().then((e) => console.log(Object.entries(e.error)));
      }
    });
  }

  function logout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });
  }

  function auto() {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        });
      } else {
        setIsLoggedIn(false);
      }
    });
  }

  return {
    currentUser,
    login,
    logout,
    signup,
    auto,
    errors,
    isLoading,
    isLoggedIn,
  };
}
