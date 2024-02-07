import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Play from "../components/Play";
import Login from "../components/Login";
import SignIn from "../components/Signin";
import Insights from "../components/Insights";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Allroutes = () => {
  const email = useSelector((state) => state.email);
  return (
    <BrowserRouter basename="/">
      <Header />
      <Routes>
        <Route
          path="/login"
          exact
          element={email ? <Navigate to="/" replace={true} /> : <Login />}
        />
        <Route
          path="/signin"
          exact
          element={email ? <Navigate to="/" replace={true} /> : <SignIn />}
        />
        <Route
          path="/"
          exact
          element={email ? <Play /> : <Navigate to="/signin" replace={true} />}
        />
        <Route
          path="/matches"
          exact
          element={
            email ? <Insights /> : <Navigate to="/signin" replace={true} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Allroutes;
