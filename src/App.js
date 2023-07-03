import React from "react";
import { Login } from "./components/Login";
import { Doctor_form } from "./components/Doctor_form";
import { NavBar } from "./components/NavBar";
import { Reservation } from "./components/Reservation";
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
      <NavBar />
      <Reservation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Doctor_form" element={<Doctor_form />} />
      </Routes>
    </div>
  );
}

export default App;
