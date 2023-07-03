import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import "./App.css";
import { PostContextProvider } from "./components/contexts/PostContextProvider";

function App() {
  return (
    <div className="App">
      <PostContextProvider>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </PostContextProvider>
    </div>
  );
}

export default App;
