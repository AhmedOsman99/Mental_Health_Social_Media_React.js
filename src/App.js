import React from "react";
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
    <div>
    <AuthProvider>

      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path=""  element={<Doctor_form />} />
      </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;
