import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Component/Pages/SignIn";
import AdminPannel from "./Component/Pages/AdminPannel";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path='/admin' element={<AdminPannel/>}/>
      </Routes>
    </>
  )
};

export default App;
