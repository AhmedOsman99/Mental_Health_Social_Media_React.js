import React from "react";
import { Doctor_form } from "./components/Doctor_form";
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
        <Route path="" element={<Doctor_form />} />
      </Routes>
    </div>
  );
}

export default App;
