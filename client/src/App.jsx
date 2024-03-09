import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Component/Pages/SignIn";
import AdminPannel from "./Component/Pages/AdminPannel";
import SignUp from "./Component/Pages/SignUp";
import PrivateRoute from "./Component/Pages/PrivateRoute";
import Profile from "./Component/Pages/Profile";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<AdminPannel/>}/>
      </Routes>
    </>
  );
};

export default App;
