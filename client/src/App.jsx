import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Component/Pages/SignUp";
import SignIn from "./Component/Pages/SignIn";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </>
  )
};

export default App;
