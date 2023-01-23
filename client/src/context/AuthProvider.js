import React, { useState, useContext, createContext } from "react";
import { getUserInfo } from "../components/ManageUsers/userSlice";
import { useDispatch } from "react-redux";

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
  const [currentUser, setCurrentUser] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  function login(loginForm) {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          dispatch(getUserInfo(loginForm));
          const newUser = JSON.parse(JSON.stringify(user));

          setCurrentUser(user);
          setIsLoggedIn(true);
        });
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));
        setShowAlert(true);
      }
    });
  }

  function signup(signUpForm) {
    setErrors([]);
    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        });
      } else {
        res.json().then((e) => setErrors(Object.entries(e.error)));
        setShowAlert(true);
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
          setCurrentUser(user);
          setIsLoggedIn(true);
        });
      } else {
        setIsLoggedIn(false);
      }
    });
  }

  function updateCurrentUser(new_user) {
    setCurrentUser(new_user);
  }
  function handleShowAlertClose() {
    setShowAlert(false);
  }

  return {
    currentUser,
    login,
    logout,
    signup,
    auto,
    updateCurrentUser,
    handleShowAlertClose,
    errors,
    showAlert,
    isLoggedIn,
  };
}
