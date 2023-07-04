import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import "./App.css";
import { PostContextProvider } from "./components/contexts/PostContextProvider";
import { Doctor_form } from "./components/Doctor_form";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/Login";

function App() {
  return (
    <div className="App">
    <AuthProvider>
    
      <PostContextProvider>
        <Routes>
          <Route path="" element={<Home />} />
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
