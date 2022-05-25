import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Login, Dashboard, Home, PaymentDetails } from "./screens";

import "./App.css";

export const loginContext = createContext();

const initialState = {
  isLoggedIn: sessionStorage.getItem("isLoggedIn") || false,
  activeUsername: sessionStorage.getItem("activeUsername") || "",
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        activeUsername: action.payload.username,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        activeUsername: "",
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

const App = () => {
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  return (
    <loginContext.Provider value={{ loginState, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loginState.isLoggedIn ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/PaymentDetails" element={<PaymentDetails />} />
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
};

export default App;
