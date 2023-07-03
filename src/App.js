import React from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Doctor_form } from "./components/Doctor_form";
import { User_form } from "./components/User_form";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Chat from "./components/chat";
function App() {
  return (
    <div>
    <AuthProvider>

      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Doctor_form" element={<Doctor_form />} />
        <Route path="/User_form" element={<User_form />} />
        <Route path='/chat/:chatId' element={<Chat />} />
      </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;
