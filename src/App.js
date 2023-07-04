import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
