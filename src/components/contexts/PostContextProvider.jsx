import React, { createContext, useEffect, useState } from "react";
import { postContext } from "./PostContext";
import axios from "axios";
import { fetchPosts } from "../../APIs/utils";

export function PostContextProvider(props) {
  let [posts, setPosts] = useState([]);



  return (
    <postContext.Provider value={{ posts, setPosts }}>
      {props.children}
    </postContext.Provider>
  );
}
