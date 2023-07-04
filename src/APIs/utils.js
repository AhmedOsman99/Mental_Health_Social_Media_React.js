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

export const fetchComments = async (post_id) => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let response = await axios.get(
    `http://localhost:8000/post/${post_id}/comments`,
    config
  );
  return response;
};

export const addNewComment = async (post_id, newComment) => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let comment = { content: newComment, post: post_id };
  let response = await axios.post(
    `http://localhost:8000/post/${post_id}/comments/`,
    comment,
    config
  );
  return response;
};

export const fetchProfilePosts = async (userId) => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let authuser = JSON.parse(localStorage.getItem("userInfo"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let id = { userId: userId.id };
  console.log(authuser);
  let response = await axios.get(
    `http://localhost:8000/post/user/${userId}`,
    config
  );
  return response;
};

export const getFriendRequests = async () => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let response = await axios.get(
    "http://127.0.0.1:8000/connect/list_requests/",
    config
  );
  return response;
};

export const respondToFriendRequest = async (friendRequestId, response) => {
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));
  let accessToken = authTokens.access;
  console.log(accessToken);
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let data = {
    friend_request_id: friendRequestId,
    response: response,
  };

  try {
    let response = await axios.post(
      "http://127.0.0.1:8000/connect/respond_request/",
      data,
      config
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (userId) => {
  let authuser = JSON.parse(localStorage.getItem("userInfo"));
  let id = {
    id: userId,
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
    "http://127.0.0.1:8000/api/get-user-id/",
    id,
    config
  );
  return response;
};
