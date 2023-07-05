import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import "./App.css";
import { PostContextProvider } from "./components/contexts/PostContextProvider";
import { Doctor_form } from "./components/Doctor_form";
import { AuthProvider } from "./context/AuthContext";
import Chat from "./components/chat";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { NavBar } from "./components/NavBar";
import { PrivateRoute } from "./utils/PrivateRoute";
function App() {
  return (
    <div className="App">
    
      
      <Fragment>
      <AuthProvider>
    <PostContextProvider>
    < NavBar/>
      <Routes>
      <Route exact path='/' element={<PrivateRoute/>}>
              <Route path='/chat/:chatId' element={<Chat />} />
              <Route path="home" element={<Home />} />
            <Route path="profile/:id" element={<Profile />} />
            </Route>
          <Route path="login" element={<Login/>}/>
        <Route path=""  element={<Doctor_form />} />
        </Routes>
        </PostContextProvider>
      </AuthProvider>
        </Fragment>
      
    </div>
  );
}

export default App;
