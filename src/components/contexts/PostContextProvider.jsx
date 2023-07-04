import React, { createContext, useEffect, useState } from "react";
import { postContext } from "./PostContext";
import axios from "axios";

export function PostContextProvider(props) {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    // getResponse()
    axios.get("http://localhost:8000/post/").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <postContext.Provider value={{ posts, setPosts }}>
      {props.children}
    </postContext.Provider>
  );
}
