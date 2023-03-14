import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Signin from "./Signin";
import Profile from "./Profile";

import "./App.scss";

function App() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Signin />;
  }

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/" element={<Chat />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
