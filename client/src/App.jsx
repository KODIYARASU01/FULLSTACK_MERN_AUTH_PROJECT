import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Component/Pages/SignIn";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </>
  )
};

export default App;
