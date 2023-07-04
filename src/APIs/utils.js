import axios from "axios";

export const getChats = async () => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let response = await axios.get("http://127.0.0.1:8000/chat/mychats/", config);
  return response;
};

export const addNewPost = async (newPost) => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let response = await axios.post(
    "http://localhost:8000/post/",
    newPost,
    config
  );
  return response;
};

export const sendRequest = async (recipient_id) => {
  let id = {
    recipient_id: recipient_id,
  };
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let response = await axios.post(
    "http://localhost:8000/connect/send_request/",
    id,
    config
  );
  return response;
};

export const fetchPosts = async () => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let response = await axios.get("http://localhost:8000/post/", config);
  return response;
};

export const fetchProfilePosts = async () => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let authuser = JSON.parse(localStorage.getItem("userInfo"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  console.log(authuser);
  let response = await axios.get(
    `http://localhost:8000/post/user/${authuser.user.id}`,
    config
  );
  return response;
};
