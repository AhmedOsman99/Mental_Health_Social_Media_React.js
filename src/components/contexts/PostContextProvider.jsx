import React, { createContext, useEffect, useState } from "react";
import { postContext } from "./PostContext";
import axios from "axios";
import { fetchPosts } from "../../APIs/utils";

export function PostContextProvider(props) {
  let [posts, setPosts] = useState([]);
  let [userById, setuserById] = useState({ first_name: "", last_name: "" });

  return (
    <postContext.Provider value={{ posts, setPosts, userById, setuserById }}>
      {props.children}
    </postContext.Provider>
  );
}
