import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Component/Pages/SignIn";
import AdminPannel from "./Component/Pages/AdminPannel";
import SignUp from "./Component/Pages/SignUp";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='/admin' element={<AdminPannel/>}/>
      </Routes>
    </>
  )
};

export default App;
