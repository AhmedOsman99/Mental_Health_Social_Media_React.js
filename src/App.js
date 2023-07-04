import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import "./App.css";
import { PostContextProvider } from "./components/contexts/PostContextProvider";
import { Doctor_form } from "./components/Doctor_form";
import { AuthProvider } from "./context/AuthContext";
import Chat from "./components/chat";
import {Login } from "./components/Login"
function App() {
  return (
    <div className="App">
    <AuthProvider>
    <PostContextProvider>
      <Routes>
        <Route path='/chat/:chatId' element={<Chat />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login/>}/>
        <Route path=""  element={<Doctor_form />} />
        </Routes>
      </PostContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
