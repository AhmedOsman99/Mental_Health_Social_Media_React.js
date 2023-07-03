import React from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Doctor_form } from "./components/Doctor_form";
import { User_form } from "./components/User_form";
import { NavBar } from "./components/NavBar";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Doctor_form" element={<Doctor_form />} />
        <Route path="/User_form" element={<User_form />} />
      </Routes>
    </div>
  );
}

export default App;
