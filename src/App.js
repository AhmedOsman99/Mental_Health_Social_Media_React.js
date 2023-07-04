import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile";
import { NavBar } from "./components/NavBar";
import {Doctor_form} from "./components/Doctor_form";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        
        <Route path="" element={<Doctor_form />} />


      </Routes>
    </div>
  );
}

export default App;
