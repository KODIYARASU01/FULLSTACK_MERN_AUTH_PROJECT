import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import Home from "./Component/Pages/Home";
import About from "./Component/Pages/About";
import SignUp from "./Component/Pages/SignUp";
import SignIn from "./Component/Pages/SignIn";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </>
  )
};

export default App;
